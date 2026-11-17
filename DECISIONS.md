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
| Nov 17 | Where do Roll ups sit among the five Context types? In the Screen 2 mockup they show under All, Yours and Shared with you only. | Not recorded | Superseded | Medium |
| Nov 17 | Roll ups stay in V3. They are not one of the five types. They show under All, Yours and Shared with you. | Jared's answer: Roll ups still exist. The placement is the current mockup. | Decided | Important |
| Nov 17 | What order do the five types take in the sub nav? Proposed: People, Teams, Accounts, Projects, Meetings. | Who first, then what, then Meetings as the catch-all. | Superseded | Low |
| Nov 17 | The type order stays People, Accounts, Meetings, Projects, Teams. | Jared's call, over the proposed reorder. | Decided | Low |

## People Contexts

File: `contexts.html`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 17 | A People Context is created automatically between two individuals. | Not recorded | Decided | Critical |
| Nov 17 | A People Context holds issues, actions, decisions and patterns, plus the meetings and emails between the two people. | Not recorded | Decided | Critical |
| Nov 17 | Every meeting both people joined counts towards their People Context, not only meetings with just the two of them. | Not recorded | Decided | Critical |
| Nov 17 | Only the two people can open their People Context. Super admin cannot. | Not recorded | Decided | Critical |
| Nov 17 | The second person in a People Context can be outside the company. | Not recorded | Decided | Critical |
| Nov 17 | Where do the emails in a People Context come from: connected inboxes, forwarding to the Context, or a live read through the person's AI tool? | V2 ruled out connecting inboxes. | Superseded | Critical |
| Nov 17 | Emails in a People Context come from connected inboxes. Neuma connects to email in V3. | Jared's answer. V2 had ruled inboxes out. | Decided | Critical |
| Nov 17 | When the second person is outside the company, can they open the People Context, or only the person on Neuma? | Not recorded | Superseded | Critical |
| Nov 17 | An outside second person cannot open the People Context yet. Only the person on Neuma opens it. | Jared's answer: not yet. | Later | Critical |
| Nov 17 | A shared team meeting feeds many People Contexts. Does an item from it show in every pair that was in the room, or only when it involves both people? | Not recorded | Superseded | Important |
| Nov 17 | An item from a shared meeting shows in a People Context only when it involves both people. | Otherwise every pair in the room gets the same team items. | Decided | Critical |
| Nov 17 | The People Context page leads with a two-way ledger on Summary: You owe them, They owe you, Open between you. The Issues, Actions and Decisions tabs stay as on other Contexts. | Jared picked layout A of three. A relationship has two directions, and one Actions list hides that. | Superseded | Important |
| Nov 17 | Meetings and emails on a People Context get their own display, not a plain Sources tab. | Jared's call. | Decided | Important |
| Nov 17 | How are meetings and emails displayed on a People Context? Sketched: by topic, as a mixed timeline, or by medium. | Not recorded | Superseded | Important |
| Nov 17 | A People Context has an Ask button. It asks an AI version of the other person, which answers from the context that person has. | Jared's call. | Decided | Critical |
| Nov 17 | What can the AI version of a person draw on: only this People Context, everything both people can open, or everything that person has? The third reaches Contexts the asker cannot open, including the person's other People Contexts. | That conflicts with "Only the two people can open their People Context". | Open | Critical |
| Nov 17 | Who sees patterns on a People Context: each person only their own, both the same, or nobody at first? | A pattern about one person would be shown to that person. | Superseded | Critical |
| Nov 17 | On a People Context, patterns show as Needs attention. Both people see the same list. It works like an agenda made ahead of time. | Jared's call. | Decided | Critical |
| Nov 17 | Each person has their own Might be useful list on a People Context. It draws on other Contexts that person can open, and only that person sees it. | Jared's call. Each side brings context the other may not have, without leaking it. | Decided | Critical |
| Nov 17 | Meetings have their own tab on a People Context: a list with a topic filter on the left, and the meeting on the right with Notes and actions, Transcript and a Follow-up agent button. | Jared's mockup. | Decided | Important |
| Nov 17 | The meeting transcript can be read inside Neuma on the Meetings tab. | It is in Jared's mockup. V2 had no transcript reader. | Decided | Critical |
| Nov 17 | Emails have their own tab, separate from Meetings: threads on the left with Waiting on you, Waiting on them or Done, and the thread on the right with what Neuma found above the emails. | Claude's design, at Jared's request. Not yet reviewed. | Option | Important |
| Nov 17 | What does the Follow-up agent on a meeting do? | Not recorded | Open | Medium |
| Nov 17 | People Context actions are one list, not two. Each row shows its owner with an initials avatar and name. Rows use the Screen 3 Actions row. Open between you stays its own card. | Jared's call. Replaces the You owe and They owe split. | Decided | Important |
