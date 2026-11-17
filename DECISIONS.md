# Neuma V3 · Decisions

The only decision log for Neuma V3. Design, scope and strategy. One line each. Newest at the bottom of each section.

## How to use this file

- Add a line the moment Jared decides something: date, decision, why, status, importance.
- Write the why at the time. It is the part that gets lost.
- Status is one of: Decided, Later, Option, Open, Superseded.
- Importance is one of: Critical, Important, Medium, Low.
  - Critical: who can see or reach data, what Neuma takes in, keeps or deletes, legal exposure, or the scope of the product. Getting it wrong breaks trust or forces a rebuild.
  - Important: shapes how a core flow, the architecture or the cost works.
  - Medium: how one feature behaves.
  - Low: copy, layout and small UI detail.
- When a decision changes, add a new line and mark the old one Superseded. Do not delete it.
- US date format (Nov 3).
- Run `python3 tools/build_decisions.py` after each change.

## About this log

Started fresh on Nov 17, 2026, when Neuma V3 forked from the Contexts mockups. It holds only decisions made for V3.

- The V2 log (361 decisions) no longer binds V3. It is reference only. Find it in git history (commit `01a50ce`) and in the old Contexts folder on Google Drive.
- The screens were copied from V2 and still show V2 behaviour. Where a screen and this log disagree, this log wins.

## Scope

File: `README.md, index.html`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 17 | Neuma V3 is a fork of the Contexts mockups, kept as a git repo at `~/git/neuma-v3` with GitHub as the remote. Git replaces `archive/`, `versions/` and `snapshot.py`. | Numbered copies grew to over 400 MB. The repo sits outside Google Drive because Drive sync can corrupt a git repo. | Decided | Medium |
| Nov 17 | The V3 decision log starts fresh. V2 decisions are reference only. | Jared's call. | Decided | Critical |
| Nov 17 | The left nav is Feed, Contexts, Agents, Automations, Sources, Settings, in that order. | Not recorded | Decided | Critical |
| Nov 17 | Agents, Automations and Sources are new pages. They are blank for now. Sources is not Integrations renamed. | Not recorded | Decided | Critical |
| Nov 17 | Every Member sees all six left nav items. | Not recorded | Decided | Important |

## Contexts directory (Screen 2)

File: `contexts.html`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 17 | The Contexts sub nav is All, Yours, Shared with you, then People, Accounts, Meetings, Projects, Teams. Saved views and Suggested stay below. | The five replace the V2 sample views. | Decided | Important |
| Nov 17 | People, Accounts, Meetings, Projects and Teams are Context types. Each is also a saved view in the sub nav, filtered by type. | Not recorded | Decided | Critical |
| Nov 17 | Where do Roll ups sit among the five Context types? In the Screen 2 mockup they show under All, Yours and Shared with you only. | Not recorded | Open | Medium |
| Nov 17 | What order do the five types take in the sub nav? Proposed: People, Teams, Accounts, Projects, Meetings. | Who first, then what, then Meetings as the catch-all. | Open | Low |

## People Contexts

File: `contexts.html`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 17 | A People Context is created automatically between two individuals. | Not recorded | Decided | Critical |
| Nov 17 | A People Context holds issues, actions, decisions and patterns, plus the meetings and emails between the two people. | Not recorded | Decided | Critical |
| Nov 17 | Every meeting both people joined counts towards their People Context, not only meetings with just the two of them. | Not recorded | Decided | Critical |
| Nov 17 | Only the two people can open their People Context. Super admin cannot. | Not recorded | Decided | Critical |
| Nov 17 | The second person in a People Context can be outside the company. | Not recorded | Decided | Critical |
| Nov 17 | Where do the emails in a People Context come from: connected inboxes, forwarding to the Context, or a live read through the person's AI tool? | V2 ruled out connecting inboxes. | Open | Critical |
| Nov 17 | When the second person is outside the company, can they open the People Context, or only the person on Neuma? | Not recorded | Open | Critical |
| Nov 17 | A shared team meeting feeds many People Contexts. Does an item from it show in every pair that was in the room, or only when it involves both people? | Not recorded | Open | Important |
