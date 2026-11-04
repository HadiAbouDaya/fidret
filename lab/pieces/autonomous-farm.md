---
schema_version: 1
slug: "autonomous-farm"
title: "Autonomous farm: the whole system"
kind: "architecture"
status: "published"
authors: ["hadi"]
created: "2026-11-04"
published: "2026-11-04"
updated: "2026-11-04"
summary: "Make five decisions on a cloud-coordinated farm, then inspect the architecture, scenarios and operating limits."
resources: [{"label": "FAO56: crop evapotranspiration and soil-water balance", "url": "https://www.fao.org/4/X0490E/x0490e04.htm"}, {"label": "University of Minnesota: soil moisture sensors and irrigation scheduling", "url": "https://extension.umn.edu/natural-resources/conservation/agricultural-soil-and-water/irrigation/soil-moisture-sensors-for-irrigation-scheduling"}, {"label": "NMSU: hydroponic growing and nutrient solutions", "url": "https://pubs.nmsu.edu/_h/H180/index.html"}, {"label": "FAO: integrated pest management", "url": "https://www.fao.org/pest-and-pesticide-management/ipm/integrated-pest-management/en"}, {"label": "England: Farming Rules for Water", "url": "https://www.gov.uk/guidance/rules-for-farmers-and-land-managers-to-prevent-water-pollution"}, {"label": "WOAH: dairy cattle welfare, 2024 edition", "url": "https://www.woah.org/fileadmin/Home/eng/Health_standards/tahc/2024/en_chapitre_aw_dairy_cattle.htm"}, {"label": "England: sheep and goat welfare recommendations", "url": "https://www.gov.uk/government/publications/code-of-recommendations-for-the-welfare-of-livestock-sheep/sheep-and-goats-welfare-recommendations"}, {"label": "EFSA: welfare of laying hens and broilers", "url": "https://op.europa.eu/en/publication-detail/-/publication/8a2955b4-f2cf-11ed-a05c-01aa75ed71a1/language-en"}, {"label": "USDA APHIS: poultry biosecurity basics", "url": "https://www.aphis.usda.gov/livestock-poultry-disease/avian/defend-the-flock/biosecurity-basics"}, {"label": "FDA: talk to your veterinarian before treating food animals", "url": "https://www.fda.gov/animal-veterinary/animal-health-literacy/talk-you-treat"}, {"label": "European Commission: general food-law requirements", "url": "https://food.ec.europa.eu/horizontal-topics/general-food-law/food-law-general-requirements_en"}, {"label": "European Commission: slaughter and stunning", "url": "https://food.ec.europa.eu/animals/animal-welfare/eu-animal-welfare-legislation/slaughter-stunning_en"}, {"label": "HSE: agricultural workplace welfare and slurry hazards", "url": "https://www.hse.gov.uk/agriculture/topics/welfare.htm"}, {"label": "NIST SP 800-82 Rev. 3: operational technology security", "url": "https://csrc.nist.gov/pubs/sp/800/82/r3/final"}, {"label": "NIST: IoT device cybersecurity capability catalog", "url": "https://pages.nist.gov/IoT-Device-Cybersecurity-Requirement-Catalogs/"}, {"label": "AWS IoT: desired and reported device state", "url": "https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-document.html"}, {"label": "AWS IoT: command execution monitoring", "url": "https://docs.aws.amazon.com/iot/latest/developerguide/iot-remote-command-execution-start-monitor.html"}, {"label": "OASIS: MQTT 5.0 specification", "url": "https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html"}, {"label": "OWASP: excessive agency", "url": "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/"}, {"label": "OWASP: prompt-injection prevention", "url": "https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html"}, {"label": "CNIL: cloud security guidance", "url": "https://www.cnil.fr/fr/securite-cloud-informatique-en-nuage"}, {"label": "CNIL: encryption practices in public cloud", "url": "https://www.cnil.fr/fr/les-pratiques-de-chiffrement-dans-linformatique-en-nuage-cloud-public"}, {"label": "European Commission: Data Act explained", "url": "https://digital-strategy.ec.europa.eu/en/factpages/data-act-explained"}, {"label": "EU Data Act: Regulation 2023/2854", "url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R2854"}, {"label": "EDPB: international transfers, final guidelines v2", "url": "https://www.edpb.europa.eu/system/files/2023-02/edpb_guidelines_05-2021_interplay_between_the_application_of_art3-chapter_v_of_the_gdpr_v2_en_0.pdf"}, {"label": "NSW DPIRD: greenhouse computer control and sensing", "url": "https://www.dpird.nsw.gov.au/agriculture/horticulture/greenhouse/structures-and-technology/computer-control"}]
media: []
snippets: []
---

## Question

What would it take for a farm to do its routine work autonomously, while farmers can understand what is happening and make the decisions that matter?

Imagine vegetables in open fields, tomatoes in a greenhouse, sheep on pasture, dairy cattle, laying hens and broilers. Sensors observe the farm. Cloud agents compare needs, propose work and coordinate robots. Water, energy, nutrients, clean routes and human attention connect everything.

The ambition is broad automation across the farm. Responsibility stays with people, and important local functions remain independent of the cloud. This is a fictional architecture to explore those relationships, not an operating farm or a validated agricultural system.

Start with this simple explanation. The [scenario desk](/lab/autonomous-farm/scenario-desk/) lets you make 28 consequential decisions. The [technical blueprint](/lab/autonomous-farm/blueprint/) opens the engineering detail behind each idea.

## Approach

### The short version: observe, decide, act, check

A soil probe suggests that a vegetable plot needs water. The farm does not immediately obey it. It checks whether the probe is recent and representative, whether other evidence agrees, whether water is available, and whether the proposed cycle fits the farmer’s plan.

If the checks pass, a bounded command reaches the local irrigation controller. The controller checks its own conditions, opens the intended zone and observes flow. Later evidence establishes how much water actually moved. A cloud message saying “accepted” cannot establish that the pipe delivered the right amount.

That pattern repeats across the farm: observations, a proposal, independent permission, local execution and evidence of the result. [Inspect the full architecture](/lab/autonomous-farm/blueprint/#architecture) and [the observation contract](/lab/autonomous-farm/blueprint/#observations).

### The agents have different jobs

A crop agent follows growth, weather and possible pests. A water agent plans competing allocations. An animal-care agent flags observations for a stockperson. A fleet agent plans routes and maintenance. An energy agent considers available supply, while a logistics agent keeps identified products moving.

They submit proposals to a shared planner. They do not each receive unrestricted robot credentials. An independent policy service checks permissions, evidence, shared resources and required human decisions. Local equipment retains its own protective controls.

One agent may want to irrigate while another needs the same water for cooling or drinking. Both plans can look sensible alone and be impossible together. The planner must show the conflict instead of inventing a perfect schedule. [Read about resource arbitration](/lab/autonomous-farm/blueprint/#coordination) and [bounded agent tools](/lab/autonomous-farm/blueprint/#agents).

### Different living systems need different plans

For vegetables, useful observations include soil/root conditions, crop stage, weather, pests and harvest readiness. The greenhouse adds temperature, humidity, light, ventilation and solution chemistry. Conductivity can indicate overall dissolved salts, but it cannot identify which nutrient is missing. A grower needs better evidence before changing a recipe.

An analyzed compost-derived amendment could be part of a qualified soil plan. That does not make raw manure or an improvised dose acceptable. Material quality, crop timing, runoff, pathogens and local restrictions remain part of the decision. [Explore water](/lab/autonomous-farm/blueprint/#water), [nutrients](/lab/autonomous-farm/blueprint/#nutrients) and [crop planning](/lab/autonomous-farm/blueprint/#crops).

Cattle, sheep, laying hens and broilers have their own care plans. Activity, feeding, housing and product signals help people notice a problem; they do not turn a model into a veterinarian. A cattle ration is not automatically suitable for sheep. An uncertain lambing or calving alert may need prompt attendance rather than more model analysis. [Open species-specific care](/lab/autonomous-farm/blueprint/#livestock).

### Milk, eggs, vegetables and meat remain traceable

The system links feed and material lots to fields or animal groups, then to collected products, handling and recipients. A milk history gap or unresolved treatment record can block release even when the latest reading looks normal.

Egg collection and identified vegetable movement may be routine automation. Food eligibility remains a separate controlled decision. The meat pathway uses qualified handlers, transporters and authorized processors. An optimization agent does not receive permission to improvise an irreversible animal intervention. [Follow the food chain](/lab/autonomous-farm/blueprint/#food).

### The farmer receives decisions, not just notifications

A useful message explains what happened, why it matters, what is uncertain, what action is proposed, who must respond and what evidence comes next. Urgent alarms have acknowledgement and escalation. A quiet phone is not approval.

A farmer’s approval covers an exact plan for a limited time. If the weather, target, material or animal state changes, the old approval cannot silently cover the new action. Veterinary, agronomic, food and machinery decisions need the relevant qualified people. [See how human oversight works](/lab/autonomous-farm/blueprint/#people).

## Takeaways

### Local protection keeps its own authority

A worker entering a robot aisle triggers the reviewed local protective response. The cloud does not need to finish a conversation first. But “stop everything” is also the wrong rule: animals may still need ventilation, drinking water and cooling.

A cloud outage suspends new discretionary work unless a current local delegation covers it. Validated essential-care routines, local alarms and attending people remain necessary. Backup power lasts only as long as its actual capacity and maintenance allow. [Inspect machinery boundaries](/lab/autonomous-farm/blueprint/#robots), [welfare-critical functions](/lab/autonomous-farm/blueprint/#welfare) and [outage recovery](/lab/autonomous-farm/blueprint/#continuity).

### Some effects cannot be retried casually

Suppose a nutrient command times out. The pump might already have delivered material. Retrying with a fresh identity can apply it twice. The correct next step is to reconcile the durable operation record with physical evidence and keep the possible dose reserved.

If the operation is already confirmed complete, return its recorded result without repeating the action. If a robot is unreachable, “stop requested” must remain different from “stop confirmed.” [Read the command and recovery contract](/lab/autonomous-farm/blueprint/#commands), then try those cases at the [scenario desk](/lab/autonomous-farm/scenario-desk/).

### Security and sovereignty include the whole path

Each device, service and person needs an appropriate identity and narrow access. A compromised sensor must not become a robot commander. A hostile instruction inside a vendor manual cannot authorize a data export or disable a limit.

Choosing an EU storage region answers only where some data resides. Support access, backups, model prompts, plaintext processing, subprocessors and the ability to leave a provider matter too. Soil readings, animal records and worker video do not all have the same privacy implications. [Inspect security](/lab/autonomous-farm/blueprint/#security) and [data control and exit](/lab/autonomous-farm/blueprint/#sovereignty).

## Limits

This is an original researched design under Hadi’s direction, with AI-assisted research and implementation. The sources were checked on 4 November 2026. They support individual constraints, not validation of an end-to-end autonomous farm or demonstrated Fidret delivery capability. The blueprint identifies jurisdiction-specific examples and distinguishes guidance from applicable law.

The scenario desk is a native interactive teaching interface. It evaluates a small action-gating model at build time. It does not simulate plant growth, animal physiology, disease, chemistry, farm economics, robot dynamics or actual command execution. Its 28 cases are selected examples, not every possible scenario. Multiple responses may be required during a real incident.

There are no universal moisture targets, fertilizer recipes, feed formulations, medicine doses, withdrawal periods or machinery limits here. Those require local evidence and qualified responsibility. No physical action, diagnosis, product release or compliance status is authorized by this Lab. A simulation result does not establish a physical outcome.

## Next steps

Use the [scenario desk](/lab/autonomous-farm/scenario-desk/) to ask three questions: what evidence is missing, who can respond, and what might already have happened? Follow each case into its technical section.

Then take the [editable operating brief](/lab/autonomous-farm/operating-brief.md) into a discussion with the people who would own a real system. Start with one bounded software-only workflow, compare it with a simpler baseline and test compound failures. [The evaluation plan](/lab/autonomous-farm/blueprint/#evaluation) and [the economics section](/lab/autonomous-farm/blueprint/#economics) describe the evidence still needed.

Any later physical trial requires its own qualified operators, independent protective controls, validated operating envelope and authorization. Broad autonomy is a design ambition. Earning the right to use it is continuing work.
