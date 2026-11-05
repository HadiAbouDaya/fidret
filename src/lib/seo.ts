import {authorRegistry} from './lab-schema.ts';
import {workCatalogue,workPath} from './work.ts';

export const SITE_URL = 'https://fidret.com';
export const SOCIAL_IMAGE = `${SITE_URL}/social/fidret.png`;
export type ArticleMetadata = {headline:string; authors:string[]; published:string; updated:string};
export const absolute = (path:string) => new URL(path, SITE_URL).href;

export function socialPreview(canonical: string) {
  const path = new URL(canonical).pathname;
  const work = workCatalogue.find(work => path === workPath(work)
    || (work.sourceSlug && path.startsWith(`/lab/${work.sourceSlug}/`))
    || (work.slug === 'signal-freshness' && path.startsWith('/explorations/signal-freshness/')));
  return work ? {url:absolute(`/social/${work.preview}.png`),alt:`${work.title}. ${work.kind}. Original explanatory diagram.`}
    : {url:SOCIAL_IMAGE,alt:'Fidret. Trust earned. Physical AI, experiments and engineering.'};
}

export function searchGraph(canonical:string, title:string, description:string, article?:ArticleMetadata) {
  const org = {'@type':'Organization','@id':`${SITE_URL}/#organization`,name:'Fidret',url:`${SITE_URL}/`,description:'A company developing its first practice in Physical AI. Expertise that earns trust through sound judgment, useful work and reliable delivery.'};
  const site = {'@type':'WebSite','@id':`${SITE_URL}/#website`,name:'Fidret',url:`${SITE_URL}/`,publisher:{'@id':org['@id']},inLanguage:'en'};
  const path = new URL(canonical).pathname;
  const person = Object.entries(authorRegistry).find(([,p]) => absolute(p.url)===canonical)?.[1];
  const page = {'@type':person?'ProfilePage':['/lab/','/work/'].includes(path)?'CollectionPage':'WebPage','@id':`${canonical}#webpage`,url:canonical,name:title,description,inLanguage:'en',isPartOf:{'@id':site['@id']},publisher:{'@id':org['@id']},breadcrumb:{'@id':`${canonical}#breadcrumb`},...(person?{mainEntity:{'@id':`${canonical}#person`}}:{})};
  const crumbs = [{name:'Home',item:`${SITE_URL}/`},...(path.startsWith('/lab/')&&path!=='/lab/'?[{name:'Fidret Lab',item:`${SITE_URL}/lab/`}]:[]),...(path.startsWith('/work/')&&path!=='/work/'?[{name:'Our work',item:`${SITE_URL}/work/`}]:[]),...(path!=='/'?[{name:title.split(' | ')[0]!,item:canonical}]:[])];
  const graph:Record<string,unknown>[] = [org,site,page,{'@type':'BreadcrumbList','@id':`${canonical}#breadcrumb`,itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,...c}))}];
  if(person) graph.push({'@type':'Person','@id':`${canonical}#person`,name:person.name,url:canonical});
  if(article) {
    const authors=article.authors.map(id=>authorRegistry[id]!);
    for(const author of authors) graph.push({'@type':'Person','@id':`${absolute(author.url)}#person`,name:author.name,url:absolute(author.url)});
    graph.push({'@type':'Article','@id':`${canonical}#article`,headline:article.headline,description,url:canonical,mainEntityOfPage:{'@id':page['@id']},author:authors.map(a=>({'@id':`${absolute(a.url)}#person`})),publisher:{'@id':org['@id']},datePublished:article.published,dateModified:article.updated,inLanguage:'en'});
  }
  return {'@context':'https://schema.org','@graph':graph};
}

// Escaping '<' prevents any metadata string from ending its inert script element.
export const serializeGraph = (graph:unknown) => JSON.stringify(graph).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
