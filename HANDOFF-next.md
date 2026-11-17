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
| Nov 17 | `contexts.html` · 2 Contexts directory | CHANGED | The People view lists 9 people, one row per person: 7 colleagues and 2 outside contacts, with the company in grey beside the name. "Sarah M. 1:1" and "Daniel K. 1:1" are now "Sarah M." and "Daniel K.". Each new row has hover peek content. "Priya S. · Senior PM candidate" moved to Projects. | A People Context is between two individuals, not a 1:1 meeting series. |
| Nov 17 | `person.html` · 13 People Context | NEW | The People Context page for Sarah M. Header with rhythm line, lock and Ask button. Tabs: Summary, Issues, Actions, Decisions, Meetings, Emails. Summary has Needs attention (both people), the two-way ledger, Open between you, and Might be useful (only you). Meetings and Emails are list and detail. Ask opens a right panel with cited answers. | V3 People Context decisions. The Ask scope and the Follow-up agent are open questions. |
| Nov 17 | `contexts.html` · 2 Contexts directory | CHANGED | A People row opens `person.html`. | The People Context page exists now. |
| Nov 17 | `shared/nav.js` | CHANGED | People Context added to the top bar. | New screen. |
| Nov 17 | `person.html` · 13 People Context | CHANGED | You owe Sarah and Sarah owes you are stacked, not side by side. Both use the Actions tab rows from Screen 3: tick, title, one line of detail, date, priority badge, source. Each card has See all and "done hidden · Show". The Actions tab uses the same two cards. Styles now come from Screen 3. | Jared asked for the same UI as Actions. |
| Nov 17 | `person.html` · 13 People Context | CHANGED | The two action cards merged into one Actions card on Summary and on the Actions tab. Each row leads its meta line with the owner: initials avatar and name. | Jared asked for a single table with owner initials. |
| Nov 17 | `person.html` · 13 People Context | CHANGED | Summary shows each item once. Actions skips the two already in Needs attention and says "2 more in Needs attention". Open between you is gone. New Recent decisions card: last three, dated, See all. Might be useful rows open their source and have a hover dismiss with Undo. | Review scored the page 7/10 for repeats and dead ends. |
| Nov 18 | `person.html` · 13 People Context | CHANGED | Recent decisions removed from Summary. Needs attention holds 5, shows 3, with Show 2 more. Emails tab removed. Issues, Actions and Decisions tabs use the Screen 3 cards: sparkle header with search, sort and filter; severity dots and basis on issues; date blocks on decisions; resolved and done hidden behind Show. Tab counts removed. | Jared's review of the tabs. |
| Nov 18 | `person.html` · 13 People Context | CHANGED | Action rows drop the detail line: title, then owner, date, priority and source. Sample data has 9 open actions and 3 done. | Jared asked for more actions and one less line per row. |
| Nov 18 | `person.html` · 13 People Context | CHANGED | Action rows: second line is owner initials, "5 days ago", then the source as a link (meeting title or "Email: subject"). Meeting links open the meeting on the Meetings tab. No priority badge, no due date. Meeting titles are now descriptive, such as "Weekly 1:1 Sarah / Jared: Q1 targets and Initech". | Jared's format for the action row. |
| Nov 18 | `person.html` · 13 People Context | CHANGED | Source references are grey, not blue: on action rows (meeting or email) and in Might be useful. They darken and underline on hover. The › after Might be useful sources is gone. | Blue was too loud for a reference. |

## Not product

`decisions.html` is a prototype. It is not part of the V2 build.

## Mockups now behind the log

Decided on Nov 13 and not yet drawn. Build from `DECISIONS.md`, not from these screens, until they are updated.

- `rollup.html` · Manage access: needs the setting that turns access to linked Contexts on or off. The note "sharing gives the full Roll up, not the Contexts in it" is out of date.
- `settings.html` · 8.3 People: checked Nov 17. Already done. The role dropdown has Super admin and the note says it replaces See all.
- `settings.html` · Access tab: not drawn. There is no Screen 8.5. The log gives the Access tab three things: who is Super admin, the workspace default for Full sources, and the switch for full transcripts in AI tools.
- `rollup.html` · Manage access: three rough sketches shown to Jared on Nov 17 (A switch row, B two choices up top, C inside General access). Waiting on his pick.
