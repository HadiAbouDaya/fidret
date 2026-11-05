#!/usr/bin/env python3
"""Deterministic search contracts, not a ranking/citation or field-CWV score."""
from __future__ import annotations

import json
import re
import sys
from collections import Counter
from datetime import date
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
from urllib.robotparser import RobotFileParser
from xml.etree import ElementTree as ET

ORIGIN = 'https://fidret.com'
SEARCH_BOTS = ('Googlebot', 'bingbot', 'OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot')


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.tags = []
        self.head_tags = []
        self.duplicate_attributes = False
        self.titles = []
        self.h1 = []
        self.graphs = []
        self.times = []
        self.main_text = []
        self.head = self.main = False
        self.capture = None
        self.buffer = []
        self.feed(text)

    def handle_starttag(self, tag, attributes):
        attrs = {}
        for key,value in attributes:
            if key in attrs: self.duplicate_attributes = True
            attrs.setdefault(key,value)
        self.tags.append((tag, attrs))
        if tag == 'head': self.head = True
        if self.head: self.head_tags.append((tag,attrs))
        if tag == 'main': self.main = True
        if tag == 'time': self.times.append(attrs.get('datetime'))
        if (tag == 'title' and self.head) or tag == 'h1' or (tag == 'script' and attrs.get('type') == 'application/ld+json'):
            self.capture, self.buffer = tag, []

    def handle_data(self, text):
        if self.capture: self.buffer.append(text)
        elif self.main: self.main_text.append(text)

    def handle_endtag(self, tag):
        if tag == self.capture:
            text = ''.join(self.buffer).strip()
            {'title': self.titles, 'h1': self.h1, 'script': self.graphs}[tag].append(text)
            self.capture = None
        if tag == 'head': self.head = False
        if tag == 'main': self.main = False

    def meta(self, name):
        attribute = 'property' if name.startswith(('og:', 'article:')) else 'name'
        return [a.get('content', '') for t, a in self.head_tags if t == 'meta' and a.get(attribute) == name]


def page_url(path, site):
    relative = path.relative_to(site).as_posix()
    return ORIGIN + '/' + relative.removesuffix('index.html')


def validate(root: Path) -> list[str]:
    site = root / 'website'
    errors, pages, titles, descriptions = [], {}, [], []
    empty_profiles, credited_profiles = set(), set()
    if not site.is_dir(): return ['SEO output directory is missing']
    for path in sorted(site.rglob('*.html')):
        relative = path.relative_to(site).as_posix()
        p = Page(path.read_text(encoding='utf-8'))
        if relative == '404.html':
            if not any('noindex' in v for v in p.meta('robots')): errors.append('404.html: must remain noindex')
            continue
        url = page_url(path, site)
        pages[url] = p
        label = f'{relative}: '
        if p.duplicate_attributes: errors.append(label + 'duplicate HTML attributes are ambiguous')
        if len(p.titles) != 1 or not p.titles[0].strip(): errors.append(label + 'expected one nonempty head title')
        else: titles.append(p.titles[0])
        desc = p.meta('description')
        if len(desc) != 1 or not desc[0].strip(): errors.append(label + 'expected one nonempty description')
        else: descriptions.append(desc[0])
        canon = [a.get('href') for t,a in p.head_tags if t=='link' and a.get('rel')=='canonical']
        if canon != [url]: errors.append(label + 'canonical must match the exact public URL')
        if len(p.h1)!=1 or not p.h1[0]: errors.append(label + 'expected one meaningful H1')
        if not ''.join(p.main_text).strip(): errors.append(label + 'main content must exist before browser execution')
        for field, expected in [('og:url',url),('og:title',p.titles[0] if p.titles else ''),('og:description',desc[0] if desc else ''),('og:site_name','Fidret'),('twitter:card','summary_large_image')]:
            if p.meta(field) != [expected]: errors.append(label + f'{field} does not match page metadata')
        images = p.meta('og:image')
        image = urlsplit(images[0]) if len(images)==1 else None
        image_path = unquote(image.path) if image else ''
        image_file = (site / image_path.lstrip('/')).resolve()
        if (not image or image.scheme!='https' or image.netloc!='fidret.com' or image.query or image.fragment
                or any(part in ('', '.', '..') for part in image_path.split('/')[1:])
                or not image_file.is_relative_to(site.resolve()) or not image_file.is_file()):
            errors.append(label + 'expected a real same-origin social image')
        if not p.meta('og:image:alt') or not p.meta('og:image:alt')[0].strip(): errors.append(label + 'social image needs descriptive alt text')
        if p.meta('twitter:image') != images: errors.append(label + 'social preview images differ')
        if len(p.graphs)!=1:
            errors.append(label + 'expected one structured-data graph')
            continue
        try:
            graph = json.loads(p.graphs[0])
            assert isinstance(graph,dict)
            assert graph.get('@context')=='https://schema.org'
            nodes = graph['@graph']
            assert isinstance(nodes,list) and all(isinstance(n,dict) for n in nodes)
            ids = [n['@id'] for n in nodes]
            assert len(ids)==len(set(ids)) and all(isinstance(i,str) and i.startswith(ORIGIN+'/') for i in ids)
            by_id = {n['@id']:n for n in nodes}
            def refs(value):
                if isinstance(value,dict):
                    if set(value)=={'@id'}: assert value['@id'] in by_id
                    for v in value.values(): refs(v)
                elif isinstance(value,list):
                    for v in value: refs(v)
            refs(nodes)
            page = by_id[url+'#webpage']
            assert page['url']==url and page['name']==p.titles[0] and page['description']==desc[0]
            assert page['@type'] in ('WebPage','ProfilePage','CollectionPage')
            assert by_id[ORIGIN+'/#organization']['@type']=='Organization'
            assert by_id[ORIGIN+'/#organization']['name']=='Fidret'
            assert by_id[ORIGIN+'/#website']['@type']=='WebSite'
            assert by_id[ORIGIN+'/#website']['url']==ORIGIN+'/'
            for node in nodes:
                assert node['@type'] in ('Organization','WebSite','WebPage','ProfilePage','CollectionPage','Person','Article','BreadcrumbList')
                if node['@type']=='Person':
                    assert node['name'] in ' '.join(p.main_text+p.h1) and pages_or_profile_urls(root).get(node['url'])==node['name']
                if node['@type']=='Article':
                    assert node['url']==url and node['headline']==p.h1[0]
                    assert isinstance(node['author'],list) and node['author'] and all(isinstance(a,dict) and set(a)=={'@id'} and by_id[a['@id']]['@type']=='Person' for a in node['author'])
                    assert p.meta('og:type')==['article']
                    published, modified = date.fromisoformat(node['datePublished']), date.fromisoformat(node['dateModified'])
                    assert published<=modified<=date.today()
                    assert node['datePublished'] in p.times and node['dateModified'] in p.times
                    assert p.meta('article:published_time')==[node['datePublished']]
                    assert p.meta('article:modified_time')==[node['dateModified']]
                    credited_profiles.update(by_id[a['@id']]['url'] for a in node['author'])
            if p.meta('og:type')==['article']: assert any(n['@type']=='Article' for n in nodes)
            assert '\u2014' not in json.dumps(graph,ensure_ascii=False)
            if (page['@type']=='ProfilePage' and url in pages_or_profile_urls(root)
                    and any(tag=='div' and 'person-empty' in (attrs.get('class') or '').split()
                            for tag,attrs in p.tags)):
                empty_profiles.add(url)
        except (ValueError,KeyError,AssertionError,TypeError,IndexError): errors.append(label + 'structured data is invalid or inconsistent with visible page/identity/dates')
    for field, values in [('title',titles),('description',descriptions)]:
        errors.extend(f'Duplicate {field}: {v}' for v,n in Counter(values).items() if n>1)
    try:
        sitemap = ET.parse(site/'sitemap.xml').getroot()
        assert sitemap.tag=='{http://www.sitemaps.org/schemas/sitemap/0.9}urlset'
        urls = [e.text for e in sitemap.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
        assert len(urls)==len(set(urls)) and set(urls)==set(pages)
        for lastmod in sitemap.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod'): assert date.fromisoformat(lastmod.text)<=date.today()
    except (OSError,ValueError,ET.ParseError,AssertionError,TypeError): errors.append('Sitemap must contain each indexable canonical HTML URL exactly once with valid dates')
    try:
        robots = (site/'robots.txt').read_text()
        assert f'Sitemap: {ORIGIN}/sitemap.xml' in robots
        policy = RobotFileParser();policy.parse(robots.splitlines())
        assets = {a.get('href') for p in pages.values() for t,a in p.tags if t=='link' and a.get('rel')=='stylesheet'}
        for bot in SEARCH_BOTS:
            assert all(policy.can_fetch(bot,u) for u in [*pages,*[ORIGIN+a for a in assets]])
    except (OSError,AssertionError,TypeError): errors.append('Robots policy must allow intended search pages/assets and declare the sitemap')
    # An optional human/AI directory is useful only if it does not leak withdrawn material.
    try:
        directory = (site/'llms.txt').read_text()
        links = re.findall(r'\]\((https://[^)]+)\)',directory)
        assert directory.startswith('# Fidret\n') and links and len(links)==len(set(links))
        assert all(link in pages for link in links)
        assert all(url in links for url in pages if re.fullmatch(ORIGIN+r'/lab/[^/]+/',url))
    except (OSError,AssertionError): errors.append('AI discovery directory must point only to canonical published pages and include every published Lab')
    # Published work and active profiles must be reachable through real links.
    # Keep registered empty profile routes stable without advertising authors
    # who have no published pieces. This exception ends when credit exists.
    seen, queue = set(), [ORIGIN+'/']
    while queue:
        url=queue.pop()
        if url in seen or url not in pages: continue
        seen.add(url)
        for tag,a in pages[url].tags:
            href=a.get('href','').split('#')[0]
            if tag=='a' and href.startswith('/') and not href.startswith('//'): queue.append(ORIGIN+href)
    orphans = set(pages)-seen-(empty_profiles-credited_profiles)
    if orphans: errors.append('Orphaned indexable pages: '+', '.join(sorted(orphans)))
    return errors


def pages_or_profile_urls(root):
    return {ORIGIN+p['url']:p['name'] for p in json.loads((root/'lab/authors.json').read_text()).values()}


if __name__=='__main__':
    result=validate(Path(__file__).resolve().parents[1])
    for error in result: print('- '+error)
    print('SEO/GEO contracts failed' if result else 'SEO/GEO OK: canonical metadata, identity, sitemap, crawler access and published discovery.')
    sys.exit(bool(result))
