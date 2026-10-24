# Fidret design and implementation brief

Version 1.0 · 24 October 2026

## 1. Task for the coding agent

Apply the Fidret visual identity described here to the requested website or interface. The result should communicate **quiet confidence: thoughtful expertise, clear judgment, and dependable delivery**.

Use this brief as the visual specification. Follow the project's existing instructions, framework, routing, accessibility conventions, and component architecture. Preserve working functionality and unrelated content. Adapt the examples below to the existing stack rather than introducing a new framework or design library.

This is a brand and interface brief. It does not require a new backend, authentication, analytics, extra pages, or a full dark-mode system. Implement those only when separately required by the actual project task.

## 2. Brand context

| Item | Direction |
| --- | --- |
| Brand name | **Fidret** — capital F, remaining letters lowercase |
| Suggested pronunciation | FID-ret |
| Business | Expertise in robotics, IoT / connected systems, and artificial intelligence |
| Meaning | A modern coined name inspired by the Latin trust root in *fidere*: to trust or rely upon. Do not describe the complete name as an ancient Latin word. |
| Brand idea | Expertise that earns trust |
| Short brand line | **Trust earned.** |
| Intended readers | Business and technical decision-makers evaluating expertise |
| Character | Precise, calm, capable, human, contemporary, European in its editorial restraint |

The name and logo should stay broad and independent of a particular technology. Website copy can clearly explain the actual areas of expertise. Trust should also be expressed through readable information, honest claims, working interactions, and useful evidence.

## 3. Required visual direction

Use **deep forest green, warm ivory, and a restrained copper accent**. Combine a disciplined layout and clear sans-serif typography with occasional editorial serif accents.

- Keep most reading surfaces light and warm.
- Establish hierarchy through spacing, alignment, typography, and concise content.
- Use forest green for the wordmark, headings, primary actions, and selected large sections.
- Use copper as a small distinctive detail. Render it as a flat color.
- Use fine rules, simple rectangles, and modest corner rounding.
- Prefer meaningful diagrams and real project imagery when appropriate assets exist.

The visual direction should not turn into a generic technology template. Avoid neon, glow effects, purple-blue gradients, floating 3D spheres, circuit-brain illustrations, robot mascots, glass panels, oversized pill buttons, and grids of decorative dashboard cards. Also avoid faux paper textures, metallic gold effects, ornate crests, and classical columns. These exclusions apply to decorative branding; a real project photograph or a necessary technical diagram can show the technology being discussed.

## 4. Color system

### Core palette

| Token | Color | Hex | Use |
| --- | --- | --- | --- |
| Forest | Deep forest green | `#153E35` | Brand color, wordmark, headings, primary buttons, dark sections |
| Ivory | Warm ivory | `#F6F2E9` | Main canvas, light content surfaces, text on forest |
| Charcoal | Dark neutral | `#242A27` | Body copy and detailed information on light surfaces |
| Sage | Pale sage | `#D9E3DA` | Secondary surfaces and subtle highlights |
| Copper | Muted copper | `#A4543B` | Limited accents and selected emphasis on ivory |

As a composition guideline, aim for roughly **75% light surfaces, 20% dark structure, and 5% copper** across a typical page. Do not implement these as rigid quotas. A presentation cover or footer can be predominantly forest green.

### Supporting interface colors

| Role | Hex | Use |
| --- | --- | --- |
| Muted text | `#58665D` | Secondary text on ivory |
| Control border | `#66766A` | Input boundaries on ivory |
| Decorative rule | `#C8D2C8` | Section dividers and nonessential separators |
| Forest hover | `#0D2E27` | Hover background for a forest primary button |
| Inverse decorative rule | `#547064` | Nonessential dividers on forest |

Decorative rules are not suitable substitutes for a clearly visible input boundary or focus indicator. Preserve existing accessible semantic colors for error, warning, and success states; those functional colors may extend the brand palette. Pair status colors with text or an icon that conveys the same meaning.

### Approved contrast combinations

The following ratios are calculated from the specified sRGB values and rounded for display.

| Foreground | Background | Contrast ratio | Intended use |
| --- | --- | --- | --- |
| Forest | Ivory | 10.61:1 | Headings, links, wordmark |
| Charcoal | Ivory | 13.09:1 | Body text |
| Copper | Ivory | 4.81:1 | Selected text accents |
| Muted text | Ivory | 5.41:1 | Secondary text |
| Forest | Sage | 9.00:1 | Text on secondary surfaces |
| Charcoal | Sage | 11.11:1 | Body text on secondary surfaces |
| Ivory | Forest | 10.61:1 | Inverse text and labels |
| Sage | Forest | 9.00:1 | Secondary inverse text |

**Copper on sage is approximately 4.08:1, and copper on forest is approximately 2.21:1. Do not use those pairs for normal-sized text.** On sage, use forest or charcoal text. On forest, use ivory or sage text. Small copper details on forest must be purely decorative, not essential icons or information.

Use WCAG AA contrast targets: at least 4.5:1 for normal text, 3:1 for qualifying large text, and 3:1 for required non-text control and graphical cues. Check the actual rendered foreground/background combinations, including hover, focus, and validation states. A passing palette does not establish accessibility for the complete interface.

## 5. Typography

### Main family: Manrope

Use Manrope for the wordmark treatment, navigation, body copy, buttons, labels, and most headings.

- Body: regular 400.
- Navigation, buttons, labels: medium 500 or semibold 600.
- Main headings: medium 500 or semibold 600.
- Wordmark starting point: semibold 600, with careful optical spacing.

### Editorial family: Newsreader

Use Newsreader regular or italic 400 for a small number of display phrases or quotations. Suitable examples include **Lasting value.** or **Trust earned.** Keep the main interface in Manrope. Do not apply the serif to every heading or use it for form controls and navigation.

### Type scale

| Element | Recommended size | Line height | Notes |
| --- | --- | --- | --- |
| Hero heading | Fluid 36–64 px | 1.08–1.15 | Approximately `-0.035em` tracking; preserve natural wrapping |
| Section heading | Fluid 28–44 px | 1.15–1.25 | Clear hierarchy without excessive weight |
| Subheading | 20–24 px | 1.25–1.35 | Usually Manrope 500/600 |
| Lead paragraph | 18–20 px | 1.5–1.65 | A short introduction |
| Body | 16–18 px | 1.6–1.7 | Limit reading width to approximately 60–68 characters |
| Labels / navigation | 14–16 px | 1.4–1.5 | Clear at small sizes |
| Minor caption | 12–14 px | 1.4–1.5 | Secondary information only |

Use sentence case for normal headings and controls. Reserve short uppercase labels with restrained letter spacing for occasional section markers. Keep paragraphs at normal tracking.

Use the existing framework's font-loading mechanism. Prefer its build-time or self-hosted option when available; load only the weights and subsets used. Provide `Arial, sans-serif` and `Georgia, serif` fallbacks, and use `font-display: swap` when managing font files directly. Preserve the license notices when bundling fonts. The Google Fonts edition of Manrope and the Newsreader project referenced below use the SIL Open Font License.

## 6. Wordmark and logo treatment

Start with a typographic **Fidret** wordmark. This is a usable starting treatment, not a claim that a final bespoke logo has already been designed.

- Capital F, lowercase remaining letters.
- Medium to semibold visual weight.
- Balanced spacing; a starting tracking value of `-0.04em` is acceptable for the display wordmark, then judge it optically.
- Forest on ivory, or ivory on forest.
- Keep the lettering readable at a small header size.
- Keep clear space around the mark; approximately half the capital-F height is a useful starting rule.
- Keep the tagline separate from the mark so both can scale appropriately.

If an approved logo asset is already provided, use that asset. Otherwise use live text for the initial implementation. A future custom letter detail or F symbol should be developed as a separate logo task; do not substitute a generic shield, handshake, or technology icon.

## 7. Layout and spacing

Use an 8 px spacing rhythm, with 4 px increments available for small adjustments.

- Main content container: approximately 1,200 px maximum width, centered.
- Reading measure: approximately 60–68 characters for paragraphs.
- Mobile gutters: 16–24 px; increase toward 32–48 px on larger screens.
- Section spacing: approximately 48–64 px on mobile and 80–96 px on desktop.
- Align the wordmark, hero text, section titles, and content to a consistent grid.
- Use a 12-column desktop grid when the content benefits from it; collapse into simple vertical flow on small screens.
- Use cards only when content needs grouping or an interactive boundary. Many sections should work as typography, imagery, and dividers on the page canvas.
- Keep shadows minimal. Reserve stronger elevation for overlays that need it.
- Avoid fixed-height text containers and forced heading line breaks that break at narrow widths or larger text settings.

The default experience is light. Use forest-green sections for limited emphasis, such as a closing contact section or footer. A separate selectable dark theme is optional and outside the default scope. In any inverse section, explicitly adapt text, links, borders, actions, and focus styles together.

## 8. Component guidance

| Component | Direction |
| --- | --- |
| Header | Clear wordmark on the left, a short navigation, one main contact action when its destination exists |
| Primary button | Forest background, ivory text, 6 px corner radius, Manrope 500/600; darker forest hover |
| Secondary button | Transparent/ivory surface, forest text and visible forest boundary; sage hover |
| Text link | Forest and underlined on light surfaces; ivory and underlined on forest |
| Inputs | Ivory background, charcoal text, visible control border, persistent label, clear help/error text |
| Cards | Flat ivory or sage surfaces; 6–8 px radius at most; purposeful grouping |
| Dividers | Thin neutral rules; use spacing to carry most of the hierarchy |
| Icons | Reuse the project's icon family; consistent size and stroke; label important actions |
| Inverse section | Forest surface, ivory primary text, sage secondary text, ivory focus indicator |

Make interactive targets comfortably usable, aiming for at least 44 × 44 px for primary controls and touch interactions. Preserve visible keyboard focus. Use a copper focus outline on ivory and an ivory focus outline on forest, separated from the element by a small offset.

Use real links for navigation and real buttons for actions. Reuse an existing working contact handler. If there is no handler, use an existing verified contact link or report the missing destination. Do not simulate a successful submission or invent a business email address.

## 9. CSS starting point

Integrate these semantic tokens into the existing styling system. Equivalent Tailwind theme entries, CSS modules, or component-library tokens are acceptable. Keep color values centralized. The `.fd-*` classes are examples, not a requirement to rename existing components.

```css
:root {
  color-scheme: light;

  --fd-forest: #153e35;
  --fd-ivory: #f6f2e9;
  --fd-charcoal: #242a27;
  --fd-sage: #d9e3da;
  --fd-copper: #a4543b;

  --fd-bg: var(--fd-ivory);
  --fd-surface: var(--fd-ivory);
  --fd-text: var(--fd-charcoal);
  --fd-heading: var(--fd-forest);
  --fd-muted: #58665d;
  --fd-link: var(--fd-forest);
  --fd-accent-ink: var(--fd-copper);
  --fd-rule: #c8d2c8;
  --fd-control-border: #66766a;
  --fd-focus: var(--fd-copper);
  --fd-action-bg: var(--fd-forest);
  --fd-action-text: var(--fd-ivory);
  --fd-action-hover: #0d2e27;
  --fd-secondary-hover: var(--fd-sage);

  --fd-font-ui: "Manrope", Arial, sans-serif;
  --fd-font-editorial: "Newsreader", Georgia, serif;
  --fd-radius: 6px;
  --fd-radius-surface: 8px;
  --fd-container: 75rem;
  --fd-reading-width: 64ch;
  --fd-space-1: 0.25rem;
  --fd-space-2: 0.5rem;
  --fd-space-3: 0.75rem;
  --fd-space-4: 1rem;
  --fd-space-6: 1.5rem;
  --fd-space-8: 2rem;
  --fd-space-12: 3rem;
  --fd-space-16: 4rem;
  --fd-space-24: 6rem;
}

.fd-inverse {
  --fd-bg: var(--fd-forest);
  --fd-surface: var(--fd-forest);
  --fd-text: var(--fd-ivory);
  --fd-heading: var(--fd-ivory);
  --fd-muted: var(--fd-sage);
  --fd-link: var(--fd-ivory);
  --fd-accent-ink: var(--fd-ivory);
  --fd-rule: #547064;
  --fd-control-border: var(--fd-sage);
  --fd-focus: var(--fd-ivory);
  --fd-action-bg: var(--fd-ivory);
  --fd-action-text: var(--fd-forest);
  --fd-action-hover: var(--fd-sage);
  --fd-secondary-hover: #0d2e27;
  background: var(--fd-bg);
  color: var(--fd-text);
}

.fd-sage-surface {
  --fd-bg: var(--fd-sage);
  --fd-surface: var(--fd-sage);
  --fd-text: var(--fd-charcoal);
  --fd-heading: var(--fd-forest);
  --fd-muted: #58665d;
  --fd-link: var(--fd-forest);
  --fd-accent-ink: var(--fd-forest);
  --fd-rule: #66766a;
  --fd-control-border: #66766a;
  --fd-focus: var(--fd-forest);
  --fd-action-bg: var(--fd-forest);
  --fd-action-text: var(--fd-ivory);
  --fd-action-hover: #0d2e27;
  --fd-secondary-hover: var(--fd-ivory);
  background: var(--fd-bg);
  color: var(--fd-text);
}

.fd-page {
  margin: 0;
  background: var(--fd-bg);
  color: var(--fd-text);
  font-family: var(--fd-font-ui);
  font-size: 1rem;
  line-height: 1.65;
}

.fd-container {
  width: 100%;
  max-width: var(--fd-container);
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 3rem);
  box-sizing: border-box;
}

.fd-hero-title {
  margin: 0;
  color: var(--fd-heading);
  font-family: var(--fd-font-ui);
  font-size: clamp(2.25rem, calc(1.4rem + 3.6vw), 4rem);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.fd-editorial {
  font-family: var(--fd-font-editorial);
  font-weight: 400;
  font-style: italic;
  font-optical-sizing: auto;
}

.fd-reading {
  max-width: var(--fd-reading-width);
}

.fd-button-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.75rem 1.25rem;
  border: 1px solid transparent;
  border-radius: var(--fd-radius);
  background: var(--fd-action-bg);
  color: var(--fd-action-text);
  font: 600 1rem / 1.3 var(--fd-font-ui);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
}

.fd-button-primary:hover {
  background: var(--fd-action-hover);
}

.fd-page :where(a, button, input, textarea, select):focus-visible {
  outline: 2px solid var(--fd-focus);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .fd-button-primary {
    transition: none;
  }
}
```

Use these tokens for component states rather than applying opacity to all text. Scope the inverse and sage themes explicitly; do not change the entire page in response to the operating system theme unless a full theme feature is requested. Adapt disabled, loading, validation, menu, and form states using the project's existing accessible components. Apply reduced-motion handling to every additional animation introduced; the CSS example above only covers its button transition.

## 10. Imagery and motion

Use supplied, licensed imagery that helps explain the work: real environments, materials, people at work, prototypes, or specific technical details. Keep compositions calm, lighting natural, and visual emphasis clear. Do not fabricate a portfolio or imply that unrelated stock work belongs to Fidret.

When photography is unavailable, a strong typographic layout or a useful diagram is sufficient. Diagrams should use clear labels and the same spacing and color system. Do not add decorative technical diagrams solely to fill space.

Keep motion purposeful and brief, typically around 120–180 ms for ordinary UI transitions. Honor reduced-motion preferences. Avoid continuous decorative motion and interactions that obscure content or interfere with scrolling.

## 11. Copy and page structure

Use clear, specific language. Prefer short sentences, concrete services, and an understandable next step. Preserve the project's language and existing verified business information.

### Suggested hero copy

- Small label: **Expertise with integrity**
- Main heading: **Clear thinking. Lasting value.**
- Supporting sentence: **Expertise in robotics, connected systems and AI.**
- Primary action: **Discuss your project** — connect it to a real destination.
- Short brand line for the footer or selected brand materials: **Trust earned.**

These are draft brand lines, not evidence of business results. Do not invent client logos, testimonials, numerical outcomes, certifications, team biographies, project case studies, addresses, or contact details.

If the project task includes a new marketing homepage, a suitable starting order is:

1. Header with wordmark and concise navigation.
2. Hero with one clear positioning statement and primary action.
3. Expertise overview covering the actual service areas.
4. Approach section describing only an agreed or supplied working process.
5. Selected work or evidence, when verified material is available.
6. Contact section and concise footer.

Use the existing information architecture when editing an established site. Omit unsupported sections rather than filling them with invented proof. Keep necessary placeholders clearly identifiable in the working draft and report any missing material at handoff.

## 12. Implementation sequence

1. Inspect the existing project instructions, structure, style tokens, components, fonts, and working routes.
2. Map the palette and semantic tokens into the existing styling system.
3. Load the selected typography efficiently using the project's font strategy.
4. Apply the wordmark treatment, layout rhythm, headings, and reusable component styles.
5. Adapt each inverse section and interactive state explicitly.
6. Preserve working links, forms, navigation, and existing business content.
7. Review the result at narrow mobile, tablet, and desktop widths, including larger text settings.
8. Run relevant existing build, lint, and functional checks. Add tests only when they address a concrete risk introduced by the implementation.
9. Report the changed files, checks performed, and any missing content or functional destination that remains unresolved.

## 13. Acceptance checklist

- [ ] The brand is consistently written **Fidret**.
- [ ] The five core hex values match this brief and are centralized in tokens.
- [ ] Most reading surfaces are ivory; copper remains a restrained accent.
- [ ] Manrope is the main typeface, with Newsreader used sparingly.
- [ ] The page feels calm, clear, and precise through spacing and hierarchy.
- [ ] Wordmark, headings, and major content share a consistent alignment system.
- [ ] No horizontal overflow or clipped text occurs at 320, 360, 768, and 1,440 px viewport widths.
- [ ] Text remains usable with browser zoom and larger text settings.
- [ ] Foreground/background pairs are checked in real component states, including inverse sections.
- [ ] Keyboard navigation works, focus remains visible, and interactive controls have accessible names.
- [ ] Important meaning does not depend on color or hover alone.
- [ ] Added motion respects reduced-motion preferences.
- [ ] Navigation targets and contact actions work; no fake success states exist.
- [ ] Business claims, images, testimonials, metrics, and contact details are supplied or verified.
- [ ] Existing project behavior and unrelated content are preserved.
- [ ] The final implementation has been visually reviewed on mobile and desktop.

## 14. Reference sources

These sources support the lexical, font, and accessibility facts. The palette, layout, and component choices are the design direction specified in this brief.

- Latin trust root: [Logeion — fido](https://logeion.org/fido).
- Manrope font information: [Google Fonts — Manrope metadata](https://github.com/google/fonts/blob/main/ofl/manrope/METADATA.pb).
- Manrope license for the Google Fonts distribution: [SIL Open Font License](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt).
- Newsreader design information: [Production Type — Newsreader](https://productiontype.com/font/newsreader).
- Newsreader project and license: [Production Type — Newsreader repository](https://github.com/productiontype/Newsreader).
- Text contrast: [W3C — Understanding WCAG 2.2 Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- Non-text contrast: [W3C — Understanding WCAG 2.2 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
