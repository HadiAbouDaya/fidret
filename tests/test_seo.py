"""Failure fixtures for observable search contracts, independent of the Astro renderer."""
import json
import tempfile
import unittest
from pathlib import Path
from scripts.check_seo import validate, ORIGIN


class SearchContracts(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory();self.addCleanup(self.temp.cleanup)
        self.root=Path(self.temp.name);self.site=self.root/'website';self.site.mkdir()
        (self.root/'lab').mkdir();(self.root/'lab/authors.json').write_text(json.dumps({'hadi':{'name':'Hadi Abou Daya','url':'/people/hadi/'}}))
        (self.site/'social').mkdir();(self.site/'social/fidret.png').write_bytes(b'fixture')
        self.graph={'@context':'https://schema.org','@graph':[
            {'@id':ORIGIN+'/#organization','@type':'Organization','name':'Fidret'},
            {'@id':ORIGIN+'/#website','@type':'WebSite','url':ORIGIN+'/'},
            {'@id':ORIGIN+'/#webpage','@type':'WebPage','url':ORIGIN+'/','name':'Fidret | Physical AI','description':'Developing a Physical AI practice.'}]}
        self.html='''<html lang="en"><head><title>Fidret | Physical AI</title><meta name="description" content="Developing a Physical AI practice."><link rel="canonical" href="https://fidret.com/">
<meta property="og:url" content="https://fidret.com/"><meta property="og:title" content="Fidret | Physical AI"><meta property="og:description" content="Developing a Physical AI practice."><meta property="og:site_name" content="Fidret"><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image"><meta property="og:image" content="https://fidret.com/social/fidret.png"><meta property="og:image:alt" content="Fidret, Trust earned."><meta name="twitter:image" content="https://fidret.com/social/fidret.png">
<script type="application/ld+json">SCHEMA</script></head><body><main><h1>Fidret | Physical AI</h1><p>A developing company and its work.</p></main></body></html>'''
        self.write()
        (self.site/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: https://fidret.com/sitemap.xml\n')
        (self.site/'sitemap.xml').write_text('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://fidret.com/</loc></url></urlset>')
        (self.site/'llms.txt').write_text('# Fidret\n\n- [Home](https://fidret.com/)\n')

    def write(self):
        (self.site/'index.html').write_text(self.html.replace('SCHEMA',json.dumps(self.graph)))

    def test_valid_contract(self): self.assertEqual(validate(self.root),[])

    def test_head_metadata_semantics_duplicate_attributes_and_namespace_are_real_contracts(self):
        original=self.html
        for text in [original.replace('name="description"','property="description"'),
                     original.replace('</head>','<meta name="description" name="unused" content="Conflicting description"></head>'),
                     original.replace('<meta name="description" content="Developing a Physical AI practice.">','').replace('</main>','<meta name="description" content="Developing a Physical AI practice."></main>')]:
            self.html=text;self.write();self.assertTrue(validate(self.root))
        self.html=original;self.write()
        path=self.site/'sitemap.xml';path.write_text(path.read_text().replace('<url>','<url xmlns="https://wrong.example/">'))
        self.assertTrue(validate(self.root))

    def test_malformed_graphs_and_wrong_stable_identity_types_fail(self):
        original=json.dumps(self.graph)
        for value in [[],None,{},'not a graph']:
            self.graph=value;self.write();self.assertTrue(validate(self.root))
        self.graph=json.loads(original)
        self.graph['@graph'][0]['@type']='WebPage';self.write();self.assertTrue(validate(self.root))

    def test_missing_duplicate_and_misdirected_metadata(self):
        original=self.html
        for before,after in [('<title>Fidret | Physical AI</title>',''),
            ('</head>','<title>Duplicate</title></head>'),
            ('name="description"','name="missing"'),
            ('rel="canonical" href="https://fidret.com/"','rel="canonical" href="https://fidret.com/other/?x=1"'),
            ('</head>','<link rel="canonical" href="https://fidret.com/"></head>'),
            ('property="og:url" content="https://fidret.com/"','property="og:url" content="https://example.com/"'),
            ('content="https://fidret.com/social/fidret.png"','content="https://fidret.com/social/missing.png"')]:
            with self.subTest(after=after):
                self.html=original.replace(before,after);self.write();self.assertTrue(validate(self.root))
        self.html=original;self.write()

    def test_social_assets_cannot_escape_public_output(self):
        (self.root/'private.png').write_bytes(b'private fixture')
        self.html=self.html.replace('https://fidret.com/social/fidret.png','https://fidret.com/../private.png');self.write()
        self.assertTrue(any('social image' in e for e in validate(self.root)))

    def test_sitemap_must_cover_canonicals_once_and_not_private_or_error_routes(self):
        path=self.site/'sitemap.xml';original=path.read_text()
        for text in [original.replace('<url><loc>https://fidret.com/</loc></url>',''),original.replace('</urlset>','<url><loc>https://fidret.com/</loc></url></urlset>'),original.replace('</urlset>','<url><loc>https://fidret.com/lab/draft/</loc></url></urlset>')]:
            path.write_text(text);self.assertTrue(validate(self.root))
        path.write_text(original)

    def test_search_bot_block_and_missing_ai_directory_target_fail(self):
        path=self.site/'robots.txt';original=path.read_text()
        path.write_text(original+'\nUser-agent: OAI-SearchBot\nDisallow: /\n')
        self.assertTrue(any('Robots' in e for e in validate(self.root)));path.write_text(original)
        (self.site/'llms.txt').write_text('# Fidret\n\n- [Private](https://fidret.com/lab/draft/)\n')
        self.assertTrue(any('discovery' in e for e in validate(self.root)))

    def test_schema_identity_and_references_cannot_drift(self):
        original=json.dumps(self.graph)
        for mutate in [lambda g:g.update({'@context':'https://example.com'}),
                       lambda g:g['@graph'][2].update({'url':ORIGIN+'/wrong/'}),
                       lambda g:g['@graph'][2].update({'publisher':{'@id':ORIGIN+'/#missing'}}),
                       lambda g:g['@graph'].append(g['@graph'][0])]:
            self.graph=json.loads(original);mutate(self.graph);self.write();self.assertTrue(validate(self.root))

    def test_article_requires_visible_identity_and_real_edition_dates(self):
        self.graph['@graph'] += [
            {'@type':'Person','@id':ORIGIN+'/people/hadi/#person','url':ORIGIN+'/people/hadi/','name':'Hadi Abou Daya'},
            {'@type':'Article','@id':ORIGIN+'/#article','url':ORIGIN+'/','headline':'Fidret | Physical AI','author':[{'@id':ORIGIN+'/people/hadi/#person'}],'datePublished':'2025-01-01','dateModified':'2025-01-02'}]
        self.html=self.html.replace('content="website"','content="article"').replace('</head>','<meta property="article:published_time" content="2025-01-01"><meta property="article:modified_time" content="2025-01-02"></head>').replace('</main>','<p>By Hadi Abou Daya</p><time datetime="2025-01-01">1 January 2025</time><time datetime="2025-01-02">2 January 2025</time></main>')
        self.write();self.assertEqual(validate(self.root),[])
        self.graph['@graph'][-1]['dateModified']='2024-12-31';self.write();self.assertTrue(validate(self.root))
        self.graph['@graph'][-1]['dateModified']='2025-01-02';self.html=self.html.replace('datetime="2025-01-02"','datetime="2025-02-02"');self.write();self.assertTrue(validate(self.root))

    def test_inert_data_is_not_accepted_as_main_content_or_orphan_discovery(self):
        self.html=self.html.replace('<p>A developing company and its work.</p>','');self.write();self.assertTrue(validate(self.root))

    def test_only_registered_empty_uncredited_profiles_may_remain_unadvertised(self):
        url=ORIGIN+'/people/hadi/'
        graph=json.loads(json.dumps(self.graph))
        graph['@graph'][2].update({'@id':url+'#webpage','@type':'ProfilePage','url':url,
                                 'name':'Hadi Abou Daya','description':'Published contributions by Hadi.'})
        profile=self.html.replace('https://fidret.com/"',url+'"').replace('Fidret | Physical AI','Hadi Abou Daya').replace('Developing a Physical AI practice.','Published contributions by Hadi.')
        profile=profile.replace('<p>A developing company and its work.</p>', '<div class="person-empty">No published pieces.</div>')
        path=self.site/'people/hadi/index.html';path.parent.mkdir(parents=True)
        path.write_text(profile.replace('SCHEMA',json.dumps(graph)))
        sitemap=self.site/'sitemap.xml';sitemap.write_text(sitemap.read_text().replace('</urlset>',f'<url><loc>{url}</loc></url></urlset>'))
        self.assertEqual(validate(self.root),[])
        path.write_text(path.read_text().replace('person-empty','ordinary-section'))
        self.assertTrue(any('Orphaned' in e for e in validate(self.root)))
        path.write_text(profile.replace('SCHEMA',json.dumps(graph)))
        # A registered profile with an Article credit must have a real link,
        # even if a stale empty-state marker remains on the profile.
        self.graph['@graph'] += [
            {'@type':'Person','@id':url+'#person','url':url,'name':'Hadi Abou Daya'},
            {'@type':'Article','@id':ORIGIN+'/#article','url':ORIGIN+'/',
             'headline':'Fidret | Physical AI','author':[{'@id':url+'#person'}],
             'datePublished':'2025-01-01','dateModified':'2025-01-02'}]
        self.html=self.html.replace('content="website"','content="article"').replace('</head>',
            '<meta property="article:published_time" content="2025-01-01"><meta property="article:modified_time" content="2025-01-02"></head>').replace('</main>',
            '<p>By Hadi Abou Daya</p><time datetime="2025-01-01">1 January 2025</time><time datetime="2025-01-02">2 January 2025</time></main>')
        self.write()
        self.assertTrue(any('Orphaned' in e for e in validate(self.root)))
