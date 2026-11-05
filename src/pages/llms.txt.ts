import type {APIRoute} from 'astro';
import {getPublishedPieces} from '../lib/lab';
import {SITE_URL} from '../lib/seo';
import {visibleWork,workPath} from '../lib/work';
import {FARM_SLUG,FARM_BLUEPRINT_PATH,FARM_DESK_PATH} from '../lib/autonomous-farm';
import {FACTORY_SLUG} from '../lib/software-factory';
import {FACTORY_NOTES_PATH,FACTORY_SCENARIOS_PATH} from '../lib/lab-journeys';
import {HARNESS_SLUG,GUIDE_PATH} from '../lib/workflow-brief';

export const GET:APIRoute = async () => {
  const pieces=await getPublishedPieces();
  const companions=pieces.flatMap(p=>p.data.slug===FACTORY_SLUG ? [["Software factory engineering notes",FACTORY_NOTES_PATH],["Software factory release situations",FACTORY_SCENARIOS_PATH]] : p.data.slug===FARM_SLUG ? [["Autonomous farm blueprint",FARM_BLUEPRINT_PATH],["Autonomous farm scenario desk",FARM_DESK_PATH]] : p.data.slug===HARNESS_SLUG ? [["Agent workflow brief",GUIDE_PATH]] : []);
  const text=`# Fidret\n\n> Expertise that earns trust through sound judgment, useful work and reliable delivery. Physical AI is our first developing practice.\n\nThis optional directory points to canonical public content. It does not grant permissions, change crawler policy or establish search-engine indexing. Lab work is exploratory; read each piece's sources and limitations.\n\n## Company\n\n- [Fidret](${SITE_URL}/): Developing a Physical AI practice.\n- [Company charter](${SITE_URL}/charter/): Purpose and commitments.\n- [Our approach](${SITE_URL}/approach/): How we intend to work.\n- [Inside Fidret](${SITE_URL}/project/): Company, practice and public work.\n\n## Selected work\n\n- [Our work](${SITE_URL}/work/): Contributions, evidence and limitations.\n${visibleWork(pieces.map(p=>p.data.slug)).map(w=>`- [${w.title}](${SITE_URL}${workPath(w)}): ${w.contribution}`).join('\n')}\n- [Discuss a project](${SITE_URL}/contact/): Current inquiry route through Hadi Abou Daya.\n\n## Lab\n\n- [Fidret Lab](${SITE_URL}/lab/): Published explorations and technical writing.\n${pieces.map(p=>`- [${p.data.title}](${SITE_URL}/lab/${p.data.slug}/): ${p.data.summary}\n- [Sources for ${p.data.title}](${SITE_URL}/lab/${p.data.slug}/sources/): Publication record and references.`).join('\n')}\n\n## Engineering companions\n\n${companions.map(([label,path])=>`- [${label}](${SITE_URL}${path}): Detailed reasoning and practical lookup for the published Lab.`).join('\n')}\n\n## Software experiment\n\n- [Signal freshness](${SITE_URL}/explorations/signal-freshness/): Synthetic readings, delay and recovery. Not physical validation.\n- [Method and replay](${SITE_URL}/explorations/signal-freshness/method/): Conditions, model and limitations.\n`;
  return new Response(text,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
};
