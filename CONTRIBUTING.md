# Contributing to WebKit

WebKit is deliberately small. The bar for adding or changing anything is **token-styled, accessible, documented, and CI-green**.

## Adding a component

1. **File:** `webkit.js` — one custom element per component, prefix `wk-`, light-DOM, slotted content.
2. **Styling:** *only* token references (`var(--wk-…)`). No raw hex values, no magic pixels. If the value you need is missing, add a **token** first.
3. **Accessibility (non-negotiable):**
   - Interactive → native elements only (`button`, `input`, `a`).
   - State → exposed with ARIA (`role`, `aria-invalid`, `aria-describedby`, `aria-live` as needed).
   - Focus + reduced-motion handled by the global rules.
4. **Docs:** add a live demo section to `index.html` (usage snippet included) — the site *is* the documentation.
5. **Quality:** `node a11y-check.mjs` and `node lh-check.mjs` must pass locally; CI re-runs both on the PR.
6. **Version:** bump `CHANGELOG.md` (semver) and note any token-contract change in the PR description.

## Tokens

`tokens.json` is the public contract. Renaming or removing a token is a **breaking change** — say so in the PR title with `BREAKING:`.

## Build log & review

Agent-assisted commits are fine and expected in this repo: the standard is **agent-drafted → human-reviewed → human-merged**. Every PR gets a human sign-off on accessibility and tone-of-voice.
