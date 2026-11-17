# Hand-off · next export

Running list of screen changes since the last export. Each design chat adds its changes here before it ends. At export, rename this file `HANDOFF-<YYYY-MM-DD>.md`.

Last export: Nov 11, 2026, 18:15 AEDT (`HANDOFF-2026-11-11.md`). That file could not vouch for any screen. Changes made between Nov 11 and Nov 13 in other chats are not listed here. Compare against `versions/` for those.

## Changes

| Date | File and screen | Type | What changed | Why |
|---|---|---|---|---|
| Nov 13 | `decisions.html` · 12 Decision log | CHANGED (data only) | Rebuilt from `DECISIONS.md` after the log consolidation and seven rulings: 352 decisions, 3 conflicts left. No layout or copy change. | `DECISIONS.md` is now the only decision log. |
| Nov 17 | `decisions.html` · 12 Decision log | CHANGED (copy) | The header's "Last written" date now comes from the day `DECISIONS.md` last changed. It read "Nov 11", hard-coded in `tools/build_decisions.py`. | The date was wrong after every log change. |
| Nov 17 | `index.html` | CHANGED (copy) | The intro line says "Earlier versions are in git." It named the `versions/` folder. | Neuma V3 is a git repo. `versions/`, `archive/` and `snapshot.py` are gone. |
| Nov 17 | `decisions.html` · 12 Decision log | CHANGED (data only) | Rebuilt with the git decision: 353 decisions. | Logged under Scope. |
| Nov 17 | `contexts.html` · 2 Empty, 2 Contexts directory | CHANGED | Left nav is now Feed, Contexts, Agents, Automations, Sources, Settings. Feed links to `feed.html`. Agents, Automations and Sources go nowhere yet. | V3 nav decision. The other screens still have the old two-item nav. |
| Nov 17 | `contexts.html` · 2 Contexts directory | CHANGED | Sub nav below Shared with you is People, Accounts, Meetings, Projects, Teams. Each filters the table by Context type (`data-ctype` on the row). The old sample views (1/1s, Sales, Clients, Recruitment) are gone. Tags are unchanged. | The five are Context types and saved views. |
| Nov 17 | `contexts.html` · 2 Contexts directory | NEW (rows) | Two sample rows: Weekly leadership sync (Meetings) and Customer Success team (Teams), each with hover peek content. | Meetings and Teams had no visible rows. |
| Nov 17 | `decisions.html` · 12 Decision log | CHANGED (data only) | Rebuilt from the fresh V3 log: 12 decisions, 5 open questions, no conflicts. The Sources tab lists `DECISIONS.md` only. | Jared started a fresh decision log for V3. The V2 log is reference only. |

## Not product

`decisions.html` is a prototype. It is not part of the V2 build.

## Mockups now behind the log

Decided on Nov 13 and not yet drawn. Build from `DECISIONS.md`, not from these screens, until they are updated.

- `rollup.html` · Manage access: needs the setting that turns access to linked Contexts on or off. The note "sharing gives the full Roll up, not the Contexts in it" is out of date.
- `settings.html` · 8.3 People: checked Nov 17. Already done. The role dropdown has Super admin and the note says it replaces See all.
- `settings.html` · Access tab: not drawn. There is no Screen 8.5. The log gives the Access tab three things: who is Super admin, the workspace default for Full sources, and the switch for full transcripts in AI tools.
- `rollup.html` · Manage access: three rough sketches shown to Jared on Nov 17 (A switch row, B two choices up top, C inside General access). Waiting on his pick.
