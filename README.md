# WebKit

**A tiny, tokenized design system — built in the open with an AI agent team.**

WebKit is Field Kit **FK-1** in the [rhytoleaf.ca](https://rhytoleaf.ca) *Proof of Capability* series: a working reference for **design tokens → reusable accessible components → automated quality**, the three disciplines a modern web-platform team runs daily.

- 5 zero-dependency Web Components (`wk-button`, `wk-badge`, `wk-card`, `wk-field`, `wk-notice`)
- A design-token pipeline (`tokens.json` → `dist/tokens.css` custom properties, drift-checked in CI)
- **WCAG 2.2 AA** and **Core Web Vitals enforced in CI** on every push (axe-core + Lighthouse)
- The documentation gallery *is* the live site · MIT licensed

## What this proves

| Discipline | Evidence in this repo |
|---|---|
| Design tokens | `tokens.json` is the single source of truth; CSS custom properties generated; CI fails on drift |
| Reusable components | 5 framework-agnostic Web Components — token-styled, slotted, versioned |
| Accessibility | WCAG 2.2 AA: semantic roles, label association, focus-visible, reduced-motion, ≥4.5:1 contrast — axe-core in CI on every push |
| Performance | Live Core Web Vitals panel (web-vitals) + Lighthouse gate ≥90 across all categories |
| Contribution standards | `CONTRIBUTING.md`: token-only styling, a11y review, docs, changelog |
| Versioning | Semver `CHANGELOG.md`; the token file is the public contract |
| Open source | MIT, built in public, 100% of the code reviewable |

## Tech ring
- **Languages:** JavaScript (ES2022) · HTML · CSS
- **Tooling:** Node.js · GitHub Actions · Lighthouse · axe-core · web-vitals
- **Deployment:** GitHub Pages (this repo is the demo site — Settings → Pages → *Deploy from a branch* → `main` / root)

## How this was built
Scaffold published **2026-10-28**; component set and CI gates completed through **2026-10-31** with the RhytoLeaf AI agent team (agent-drafted, human-reviewed, human-merged). The build log lives in the commit history.

## Links
- Series & portfolio: [rhytoleaf.ca](https://rhytoleaf.ca)
- More kits: [github.com/RhytoLeaf](https://github.com/RhytoLeaf)
- [LinkedIn](https://www.linkedin.com/in/reginald-pradel-b-eng-21481711b)

## Licence
MIT — see `LICENCE`.
