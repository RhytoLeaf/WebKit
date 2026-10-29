# Accessibility (WCAG 2.2 AA)

WebKit targets **WCAG 2.2 Level AA**. This page documents how each relevant success criterion is met and how it is enforced automatically.

## Component-level criteria

| Criterion | How WebKit meets it |
|---|---|
| 1.4.3 Contrast (min) | Every semantic color pair is verified ≥ 4.5:1 against the surface (`--wk-color-semantic-*` on `--wk-color-neutral-0`/`-50`). Tokens are the contract: contrast is a property of the palette, audited in CI. |
| 2.1.1 Keyboard | All interactive elements are native `<button>` / `<input>` — focusable and operable by keyboard by construction. |
| 2.4.7 Focus visible | Global `:focus-visible` ring (3px, `--wk-color-semantic-primary`, 2px offset). |
| 3.3.1 Error identification / 3.3.2 Labels | `wk-field` renders a visible `<label for>`, `aria-invalid`, and `aria-describedby` error/hint wiring; errors carry `role=alert`. |
| 4.1.2 Name, role, value | `wk-notice` exposes `role=status` (info/success/warning) and `role=alert` (danger). |
| 2.3.3 Animation from interactions | `prefers-reduced-motion: reduce` disables all transitions/animations site-wide. |
| 1.4.11 Non-text contrast | Component borders, focus rings, and state accents use tokens checked against adjacent surfaces. |

## Automation

- **axe-core** runs on every push (`.github/workflows/ci.yml` → `a11y-check.mjs`) with the WCAG 2.0/2.1/2.2 A + AA tag set. Any violation fails the build.
- **Lighthouse** gates accessibility ≥ 90 in the same run.
- New components must pass both before merge (see `CONTRIBUTING.md`).

## Manual audit checklist (pre-merge)

1. Tab through every demo: one stop per interactive element, visible ring, logical order.
2. Screen-reader pass (NVDA/VoiceOver): labels, notice roles, error announcements.
3. Zoom 200% + browser-text 200%: no clipped content.
4. Reduced-motion check: no animation.
5. Contrast spot-check via DevTools for any new color use.
