# Neuma UI · V3

Design mockups for Neuma. Open `index.html` to see every screen.

## Files

| File | Screens |
|---|---|
| `feed.html` | 1 Feed |
| `contexts.html` | 2 Empty (first visit), 2 Contexts directory, 2.1 Create Context, 2.2 Sources drawer states |
| `context.html` | 3 Context detail, 3.1 Edit Context |
| `rollup.html` | 4 Context Roll Up detail, 4 Discovery (Roll up of first calls), 4.2 Label options, 4.3 New Roll up |
| `meeting-brief.html` | 5 Entry, 5.1 Prep, 5.2 Zoom app, 5.3 Other platforms, 5.4 States |
| `slack.html` | 6 Ask in a channel, 6.1 Direct message, 6.2 Ask about a customer, 6.3 States |
| `integrations.html` | 7 Integrations directory, 7.1 Detail (Zoom), 7.1b Detail (Teams, tabbed), 7.1c Detail (Google, tabbed), 7.2 Directory states, 7.3 Connect (Salesforce), 7.4 Settings by provider, 7.5 Detail states, 7.6 All meetings |
| `settings.html` | 8 Your connections, 8 Empty, 8.1 Your connections states, 8.2 Profile |
| `graveyard.html` | 9 Retired designs, including Roll up 4.1, Context Account 3.2 and Request access 3.3 |
| `claude.html` | 10 Ask with the Neuma MCP, 10.1 Source access off, 10.2 Build notes |
| `onboarding.html` | 11 Sign in, 11.1 Meeting tool, 11.2 First Context, 11.3 Non-host path, 11.4 Checklist in the app, 11.5 States |
| `decisions.html` | 12 Decision log (prototype: a Context that agents write to). Summary, Decisions, Questions, Sources |

Shared files, used by every screen:

- `shared/neuma.css`: brand styles, cards, tabs, lists
- `shared/tailwind-config.js`: brand colours and fonts for Tailwind
- `shared/nav.js`: the top bar and the Scope switch. Add a new screen to its list once and it appears everywhere. Every screen loads it fresh on each refresh, so Safari never shows an old copy. New screens copy the same loader line from `index.html`
- `shared/neuma.js`: behaviour for Contexts, Context and Roll up (tabs, ticks, drawers, menus)
- `shared/rollup.js`: Roll up sample data and rendering, also used for the Roll up rows on Contexts

`meeting-brief.html` and `graveyard.html` still carry their own styles inside the file.

`integrations.html` is built, not hand-edited. Change `tools/build_integrations.py` (directory, directory states, Connect) or `tools/integrations_detail.py` (Detail, Settings by provider, Detail states, All meetings), then run:

    python3 tools/build_integrations.py

It writes `integrations.html`. Commit first.

`decisions.html` is built too. It reads `DECISIONS.md`. Run:

    python3 tools/build_decisions.py

## Brand

The brand system is `references/Neuma Brand Identity.html`. Open it in a browser. The live version is in Claude Design: https://claude.ai/design/p/f73210ec-b610-4885-b33f-4002d577904b?file=Neuma+Brand+Identity.html&via=share

The screens do not follow it yet. They use the slate, white and rounded style. A brand-styled onboarding was tried on Nov 11 and reverted (kept in the old Contexts folder as `versions/onboarding/onboarding-v003.html`). Do not restyle a screen to the brand unless asked.

The brand rules, for reference:

- Surfaces: Paper `#F3EFE7`, Bone `#E8E2D3`, Navy `#0B0E2E`. Type: Ink `#05061A`.
- Accents: Indigo `#2A2FA6` for links and done. Cobalt `#4A5BFF` for live. Ember `#FF7A4D` for signal only, never body text. On Navy use Lavender `#C5A6E8`, not Cobalt.
- Type: Space Grotesk for headlines, Geist for UI, Geist Mono for labels and meta.
- Corner radius 0. Dividers 1px Ink at 14%. One shadow. Focus is a 2px Indigo outline.
- Icons: 1.75px stroke, square caps, miter joins.
- Flat Aperture mark in the product. The gradient mark is for hero moments only.
- Type opacity never below 60%. Nothing pulses.
- Errors say what happened, the consequence, then the action. Empty states define the concept, then the action.

## Scope: V2 and Later

The top bar has a Scope switch: V2 or Everything. It is part of the mockups only and never ships.

- V2 is the default and the build spec. Build from V2 view.
- Everything shows features planned for later as they will look, with no marking. They are there so the V2 build leaves room for them.
- To defer something, add `data-later` to the element: a tab, column, menu item, button or section. Mark whole features, not single words.
- If a screen needs different copy when the Later part is hidden, put the V2 copy in an element with `data-v2-only`.
- `DECISIONS.md` keeps the written list of what is deferred. The switch shows it. The log is the record.

## Versioning

This folder is a git repo. Git is the only version history. There is no `versions/` or `archive/` folder and no snapshot tool.

- The repo lives at `~/git/neuma-v3`, outside Google Drive. GitHub is the remote.
- The screen file is always the latest version. Edit it in place.
- Commit before a risky change and after every finished change. One change per commit, with a message that says what changed on which screen.
- To see what changed: `git log --oneline -- rollup.html` and `git diff`.
- To roll a file back: `git checkout <commit> -- rollup.html`.
- To try something big, work on a branch and merge it when it is picked.

History before Nov 17, 2026 is not in git. It stays in the old Contexts folder on Google Drive, under `versions/` and `archive/`.

## Working with Claude

- One chat per screen or topic. Long chats get slow and expensive.
- Start a new chat with: "Read README.md in the neuma-v3 repo, then work on `<screen>.html`."
- Claude edits only the screen file you name, plus `shared/` when a change must apply everywhere.
- Claude commits each finished change, then gives the link with a `#` to the section that changed.
- `DECISIONS.md` is the only decision log, for design, scope and strategy. Claude logs each decision the moment it is made, mid-chat: date, decision, why, status, importance (Critical, Important, Medium or Low). One line each, under the screen it belongs to, or under Strategy. A changed decision is a new line, and the old one is marked Superseded. Then Claude runs `python3 tools/build_decisions.py`.
- If a new decision conflicts with a logged one, Claude says so before building.
- The V3 log started fresh on Nov 17, 2026. The V2 log and the three docs in the Claude project under `decisions/` are reference only. They do not bind V3.
- For a new concept, Claude shows 2 or 3 rough sketches side by side, each rated out of 10, and builds the polished version only after one is picked.
- Claude adds every screen change to `HANDOFF-next.md` before the chat ends. At export, that file is renamed with the date.

## Writing style for UI copy

Short declarative sentences. No em dashes. Plain words. Outcome first. US date format (Nov 3, Oct 28, 2026).
