# Self hosted brand fonts

The [design brief](fidret-design-brief.md) requires Manrope for the interface and occasional Newsreader editorial accents. The website bundles Latin WOFF2 subsets and their complete SIL Open Font License notices. There are no font requests to a third-party service at runtime.

Retrieved 2026-10-24 from the Fontsource font-files repository, which packages the Google Fonts distributions:

| Public file | Source | SHA256 |
| --- | --- | --- |
| `public/fonts/manrope-latin-variable.woff2` | [Manrope variable Latin](https://github.com/fontsource/font-files/blob/main/fonts/variable/manrope/files/manrope-latin-wght-normal.woff2) | `a30ddcd349703aff7464c34bef3fffdff405ee50c113440d7c8693c02d210972` |
| `public/fonts/newsreader-latin-italic-400.woff2` | [Newsreader Latin 400 italic](https://github.com/fontsource/font-files/blob/main/fonts/google/newsreader/files/newsreader-latin-400-italic.woff2) | `fa9b900403949d9a723106752a5c8ad2797012a0c9057427b1da2db72d552148` |

The corresponding notices are [Manrope](../../public/fonts/OFL-Manrope.txt) and [Newsreader](../../public/fonts/OFL-Newsreader.txt). Keep them with the fonts. Astro copies these source assets into generated `website/fonts/`, preserving the public `/fonts/` URLs. Manrope is declared for the used 400–600 weights, and Newsreader is used at 400 italic. Both declarations use `font-display: swap` and the brief's fallback families.

The supplied 24 October 2026 design brief had SHA256 `a3f8535259a853da13c95799c32e413756354393f4e32c749c6471224a493e94` and remains in Git history before the design revamp. The current [v2 design language](fidret-design-brief.md) replaces its composition defaults while retaining these licensed font assets.
