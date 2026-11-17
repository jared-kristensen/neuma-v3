# Neuma UI · Decisions

The only decision log for Neuma. Design, scope and strategy. One line each. Newest at the bottom of each section.

## How to use this file

- Add a line whenever a design chat settles something: date, decision, why, status, importance.
- Write the why at the time. It is the part that gets lost.
- Status is one of: Decided, Later, Excluded from V2, Option, Open.
- Importance is one of: Critical, Important, Medium, Low.
  - Critical: who can see or reach data, what Neuma takes in, keeps or deletes, legal exposure, or the scope of the product. Getting it wrong breaks trust or forces a rebuild.
  - Important: shapes how a core flow, the architecture or the cost works.
  - Medium: how one feature behaves.
  - Low: copy, layout and small UI detail.
- When a decision changes, add a new line and mark the old one Superseded. Do not delete it.
- US date format (Nov 3).

## About the first version

Built on Nov 11, 2026 from the notes already written on the screens. 74 decisions.

- **First seen** is the date the wording first appears in a saved version of the screen. The decision may be older. Saved versions start on Nov 4.
- **Why** is filled only where the screen states a reason. 12 of 74 have one. The rest say Not recorded.
- Decisions made in chat and never written on a screen are not here.

## About the backfill

Added on Nov 11, 2026. 195 lines from the two project docs, `integrations-decisions.md` and `onboarding-decisions.md`. 33 have a why.

- These sections sit after Onboarding and name their source doc.
- **First seen** is the date the doc gives for the section. "Nov 11 or earlier" means the doc gives none.
- Rules already in this file were not added twice.
- Where a backfilled line disagrees with an older line, both are kept. Neither is marked Superseded yet. That is for Jared and Jason to settle.
- Open questions stay in the project docs.

## About the consolidation

Done on Nov 13, 2026. This file is now the only decision log.

- The three project docs (`integrations-decisions.md`, `onboarding-decisions.md`, `pilot-link-decisions.md`) are frozen as reference detail. Nothing new is written there. Where they disagree with this file, this file wins.
- Added: the pilot link lines and its 8 open questions, a Strategy section, and two decisions made in chat and never logged.
- Marked Superseded: three lines that a later line had already replaced.
- Conflicts still waiting on a ruling are listed on the Summary tab of `decisions.html`.
- Open questions from the integrations and onboarding docs stay in `tools/build_decisions.py`.

## Open questions and options

| Question | Status | Screen |
|---|---|---|
| A 'Contexts that need you' card on Summary, ranked by critical items, then open items. | Option | Roll up (Screens 4 to 4.3) |
| Who owns a deactivated person's Contexts. | Open | Settings (Screens 8 to 8.4) |

## Scope

File: `README.md, index.html`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 4 or earlier | UI copy uses short declarative sentences, no em dashes, plain words, outcome first and US dates. | Not recorded | Decided | Low |
| Nov 4 | V2 includes Contexts, Context, Roll up, Meeting Brief, Slack, AI Tools MCP, Integrations and Settings. | Not recorded | Superseded | Critical |
| Nov 10 | The CEO Feed is parked. | Not recorded | Excluded from V2 | Important |
| Nov 11 | Onboarding is not in V2. | Not recorded | Superseded | Important |
| Nov 11 | Screens keep the slate, white and rounded style. No screen is restyled to the brand unless asked. | A brand-styled onboarding was tried on Nov 11 and reverted. | Decided | Low |
| Nov 12 | V2 includes Contexts, Context, Meeting Brief, AI Tools MCP, Integrations and Settings. Roll up and Slack are not in V2. | Not recorded | Superseded | Critical |
| Nov 12 | V2 includes Contexts, Context, AI Tools MCP, Integrations and Settings. Meeting Brief, Roll up and Slack are not in V2. | Not recorded | Superseded | Critical |
| Nov 12 | V2 includes Contexts, Context, Roll up, AI Tools MCP, Integrations and Settings. Meeting Brief and Slack are not in V2. | Not recorded | Superseded | Critical |
| Nov 12 | V2 includes Onboarding, Contexts, Context, Roll up, AI Tools MCP, Integrations and Settings. Meeting Brief and Slack are not in V2. | Not recorded | Decided | Critical |
| Nov 12 | The index groups screens in four bands, split by a line: Included V2, Excluded, Prototype, Graveyard. | Not recorded | Decided | Low |
| Nov 12 | The mockups have a Scope switch in the top bar: V2 or Everything. Deferred features carry `data-later`. V2 hides them and is the default. Everything shows them unmarked, as they will look. Mockup only, never ships. | One file per screen stays the source of truth. Dev builds from V2 view and still sees what is coming, so the build leaves room for it. | Decided | Important |
| Nov 17 | Neuma V3 is a fork of the Contexts mockups, kept as a git repo at `~/git/neuma-v3` with GitHub as the remote. Git replaces `archive/`, `versions/` and `snapshot.py`. Older history stays in the Contexts folder on Google Drive. | Jared's call. Numbered copies grew to over 400 MB. The repo sits outside Google Drive because Drive sync can corrupt a git repo. | Decided | Medium |
| Nov 17 | In Neuma V3 the left nav is Feed, Contexts, Agents, Automations, Sources, Settings, in that order. | Jared's call for V3. Not recorded further. | Decided | Critical |
| Nov 17 | What are Agents, Automations and Sources in the V3 left nav, and which nav items do Members see? The CEO Feed is still logged as parked, and Integrations as admin only. | Not recorded | Superseded | Critical |
| Nov 17 | Agents, Automations and Sources are new pages in V3. They are blank for now. Sources is not Integrations renamed. | Jared's answer. Answers the open question above. | Decided | Critical |
| Nov 17 | Every Member sees all six left nav items in V3. | Jared's answer. | Decided | Important |

## Contexts directory (Screen 2)

File: `contexts.html`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 4 or earlier | Name is the only required field when creating a Context. | Not recorded | Decided | Low |
| Nov 9 | If a tool isn't connected, the source picker offers to connect it in place. | Not recorded | Decided | Medium |
| Nov 11 | Only the owner can delete a Context. Transcripts not in another Context are deleted after 30 days. | Not recorded | Decided | Critical |
| Nov 11 | Suggested Contexts are not in V2. The idea is outside companies you meet often. | Not recorded | Excluded from V2 | Medium |
| Nov 11 | A series whose transcripts aren't shared with you can still be added. Invite asks the host. | Not recorded | Decided | Medium |
| Nov 11 | The directory shows 25 Contexts a page, ordered by last activity. | Not recorded | Decided | Low |
| Nov 11 | Make private asks first. Only the Owner sees the Context, and the others aren't told. | Not recorded | Decided | Important |
| Nov 12 | + New Context is a split button. The ▾ on its right, behind a thin divider, opens New Context and New Roll up. The empty state keeps a plain + New Context. | Roll ups need a way in from the directory. An empty workspace has no Contexts to roll up. | Decided | Low |
| Nov 12 | Hidden Contexts come back through a "Show hidden" switch in the Filter panel, not a nav item. When on, they show greyed with a Hidden label and the Filter count goes up by one. Their ⋯ menu has Unhide. | Keeps the left nav clean. Hiding is rare, so finding hidden Contexts can sit one step away. | Decided | Low |
| Nov 12 | In Create Context and its states (2.1, 2.2), Fathom reads Coming soon and sits last. The Channels drawer state is Later. Suggested stays in the second nav. | Matches Integrations and Your connections. | Decided | Low |
| Nov 13 | Confirmed: Make private does not tell the people who lose access. | Jared's ruling. The docs had left it open. | Decided | Important |

## Context (Screens 3 to 3.3)

File: `context.html`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 4 or earlier | Summary leads. Sources sits behind it. | Not recorded | Decided | Medium |
| Nov 4 or earlier | Only the owner sees Patterns. | Not recorded | Decided | Important |
| Nov 4 or earlier | Email in only sees threads sent to the Context's address. No inbox is connected. | Not recorded | Later | Important |
| Nov 9 | An Account Context is made from a Salesforce account. Contacts, logged meetings and the account's domains bring items in automatically. | Not recorded | Later | Important |
| Nov 9 | A title that mentions an account only suggests. A person decides. | Not recorded | Later | Medium |
| Nov 9 | Personal email addresses only match an exact contact. Meetings with only internal people never match an account. | Not recorded | Later | Medium |
| Nov 9 | Add source groups by what you add, not by tool. | Not recorded | Decided | Low |
| Nov 9 | Sharing has three roles: Owner, Editor and Viewer. | Not recorded | Decided | Critical |
| Nov 9 | Managers see their team's Contexts as a list, never what's inside. Request access goes to the Owner, who decides. | Not recorded | Later | Critical |
| Nov 9 | A declined access request shows as Not shared, with no reason. | Not recorded | Later | Low |
| Nov 9 | Members are told whenever someone gets access. | Not recorded | Later | Important |
| Nov 10 | Rules that bring in matching meetings automatically come later. | Not recorded | Later | Medium |
| Nov 11 | Full sources is one switch per Context. It is off by default, Owner only, and covers Neuma and AI tools together. | Not recorded | Decided | Critical |
| Nov 11 | With Full sources off, a Viewer still sees the source list and what Neuma pulled from each source. The transcript, thread or file is locked. | Not recorded | Decided | Critical |
| Nov 11 | The first version takes meeting transcripts and uploaded files. Channels, Email in and Account come later. | Not recorded | Decided | Critical |
| Nov 12 | The Sources tab has a Status column. It is empty for a normally read source and shows Reading, No transcript, or Not read. A meeting whose host isn’t on Neuma shows Invite [host] and is Later: hidden in V2. Code works out Not read: meetings outside the latest 10 transcripts. | Rows looked finished when they weren't. A Viewer couldn't tell why an old meeting gave nothing. | Superseded | Medium |
| Nov 12 | Source Status uses the same labels and dots as the Integrations meeting lists, on every row: Ready, Waiting on Zoom (or Meet, Teams), No transcript. Contexts add Not read for meetings outside the latest 10 transcripts. A meeting whose host isn’t on Neuma shows Invite [host] and is Later. | The first labels were confusing. One set of words across Integrations and Contexts. | Superseded | Medium |
| Nov 12 | Source Status says only whether the transcript is there: Ready, Waiting on Zoom (or Meet, Teams), No transcript, plus Invite [host] (Later). "Not read" is gone. Every source is part of the Context. A meeting Neuma never extracted explains it in its drawer, in place of items. The MCP field is extracted, not read. | "Not read" suggested a source was outside the Context, when it can still be searched and opened, including through Claude. | Superseded | Medium |
| Nov 12 | Source Status says only whether the transcript is there: Ready, Waiting on Zoom (or Meet, Teams), No transcript, plus Host not on Neuma (Later), with Invite [host] in the drawer. There is no read or not-read state. | Every source is extracted and stays in the Context, so a read state means nothing to people. | Decided | Medium |
| Nov 12 | Issues, actions and decisions are extracted from every transcript in a Context. Only the summary and patterns use the latest 10. Every transcript stays in the Context and can be searched and opened with Full sources on. | Replaces "extraction runs on the latest 10". People expect every meeting they add to count. | Superseded | Critical |
| Nov 12 | Neuma extracts issues, actions and decisions from the latest 10 transcripts as they come in, and everything found stays. A transcript added past the 10 stays in the Context with nothing extracted. Its row reads Ready, and its drawer says Nothing extracted and why. Summary and patterns use the latest 10. Every transcript can be searched and opened with Full sources on. | Keeps cost flat while nothing added is lost. | Decided | Critical |
| Nov 12 | When every meeting in a Context is the same series, source rows lead with the date and don't repeat the title. Hand-built Contexts with several series keep the title. | Recurring meetings become Contexts, so most Contexts are one series. | Decided | Low |
| Nov 12 | Source dates use US format (Oct 21), relative under 7 days. | House style. | Decided | Low |
| Nov 12 | Source rows show no topic text. Topics and the per-meeting summary stay in the source drawer, and are written only from items visible to everyone in the Context, never from host-only items or excluded content. Extraction prompt version 004. | A topic or summary drawn from the whole transcript could reveal a host-only item, such as a performance concern, to Viewers. | Superseded | Important |
| Nov 12 | Sources show no per-meeting summary or topics, in the row or the drawer. The drawer shows the issues, actions and decisions found in that meeting. | Simpler, and nothing written from the whole transcript can reach a Viewer. | Decided | Important |
| Nov 12 | Screens 3.2 (Account Context) and 3.3 (Request access) are retired to the Graveyard. | Both were already marked Do later. | Excluded from V2 | Medium |
| Nov 12 | The Next meeting card (with Open brief) on the Context page is Later. It goes with the Meeting Brief, which is excluded. | Not recorded | Later | Low |
| Nov 12 | Remove from Context (Owner and Editors) confirms first and states the effect: the issues, actions and decisions from that meeting, and that any also raised in another meeting stay. On Remove the row leaves Sources with Undo, everyone with access is told, and summary and patterns rebuild. | Removing a source can delete items people rely on, so the effect is stated before it happens. | Decided | Medium |
| Nov 12 | After a source is removed, the next-newest older meeting moves into the latest 10 and is extracted, so a Context keeps reading 10. A meeting removed from a series-fed Context isn't added back by the series. Its transcript is deleted after retention unless it's in another Context. | Keeps the window full, and removal stays removed. | Decided | Medium |
| Nov 13 | Said and seen (Screen 3.4 mockup): Issues, Actions and Decisions hold only what was said in a meeting, with who and when. Neuma's ideas come from Patterns as Suggestions. They sit on the tab they would join (action suggestions on Actions, issue suggestions on Issues), with a count on the tab, Accept and Dismiss. Needs attention on Summary can carry the strongest one, with Accept and Dismiss. Accepted items join the list marked Suggested. Unaccepted suggestions never leave the Context. | Mixing Neuma's guesses with what was said erodes trust, and would leak guesses into Roll ups, Slack and the MCP as things the team said. | Superseded | Critical |
| Nov 13 | Suggestion lifecycle (Screen 3.4 mockup): at most 5 open per type per Context, one per pattern per type. 3 show, the rest behind Show more. Each shows its age. A suggestion retires after 30 days with no new evidence (or 3 meetings, whichever is longer), when its pattern goes away, or when a meeting covers it. A covered item shows "Neuma suggested this on [date]". Past suggestions keeps 30 days of dismissed, retired and covered ones, with Restore for dismissed. Ignoring counts as a weak not-useful signal. | Suggestions should be a short live list Neuma keeps current, not an inbox that grows to hundreds. | Option | Important |
| Nov 13 | Suggestions under patterns (Screen 3.5 mockup, an alternative to 3.4): Neuma suggests actions only. Each pattern has Track as issue, and a tracked pattern joins Issues marked Seen with who tracked it. Each suggested action sits under its pattern in one card, one open per pattern. On Actions the card lists only patterns with an open suggestion. | A pattern is already an issue Neuma sees, so an issue suggestion repeats it. Patterns and suggestions mapped one to one across two cards. | Superseded | Important |
| Nov 13 | Suggestion quality (Screen 3.5 mockup): every suggested action can be finished once, never a standing habit, and it shows the items behind it (the actions or the meetings). | A habit accepted into Actions can never be marked done. A suggestion with no evidence can't be judged. | Superseded | Important |
| Nov 13 | Accept and Dismiss (Screen 3.5 mockup): Accept asks who owns it, with Decide later. Dismiss reasons are Not useful, Already done and Pattern is wrong. Already done offers to log a done action. Pattern is wrong retires the pattern and its open suggestions. | An accepted action with no owner feeds the dropped-actions pattern. A wrong pattern would suggest again in new words. | Superseded | Medium |
| Nov 13 | Suggestion visibility and tab label (Screen 3.5 mockup): open suggestions are Only you, like their pattern. Accept or Track is what shares. The Actions tab reads "3 suggested", not a bare number. | Sharing an open suggestion would leak an Only you pattern. A bare number reads as the list count. | Superseded | Medium |
| Nov 13 | Screen 3.5 is removed. It was too complex. Screen 3.4 stays the mockup. On its Actions tab the Patterns card is gone and Suggested actions keeps its card, with the pattern named in plain text. Summary and Issues keep the Patterns card. | Patterns beside the Actions list added weight without helping the choice to accept. | Option | Medium |
| Nov 13 | In the Screen 3.4 mockup, Summary and Issues are the same as Screen 3. Neuma suggests actions only, on the Actions tab. Needs attention carries no suggestion, and there are no suggested issues. | Suggestions on three tabs were too complex. Actions is where a suggestion gets acted on. | Superseded | Important |
| Nov 13 | The Suggested actions card (Screen 3.4 mockup) is quiet: no gradient header or "ranked by Neuma", smaller grey titles, Accept and Dismiss as text links, no footer note. The suggested date shows on hover. | The card overpowered the Actions list, which is the main content. | Option | Low |
| Nov 13 | Neuma records what people committed to, and judges what the problems are and what to do next. Decisions and Actions are extracted only and never invented. Issues, Patterns and Suggested actions are Neuma's judgement, each with evidence. A suggested action becomes an action only when a person accepts it. Neuma never records a decision nobody made. | The value of Neuma is its judgement, not extraction. A decision or action is a fact about a person, so inventing one puts words in their mouth. An issue is an assessment, so it can be Neuma's. | Decided | Critical |
| Nov 13 | Issues are Neuma's list (Screen 3.4 mockup). Each row shows its basis: "Said by [name] · [date]", or "Identified by Neuma" with how many meetings it was seen across. A Neuma-identified issue needs no accept step and has Dismiss with a reason (Not an issue, Already fixed, Wrong). Patterns sit beside Issues as the evidence. Summary is the same as Screen 3. | A wrong issue costs more trust than a missed one, so the basis is always shown and a wrong one can be dismissed. | Option | Important |
| Nov 13 | The extraction prompt must change to match: issues may also come from the patterns pass, with a source field (said or identified by Neuma). The source label travels to Roll ups, Slack and the MCP, which say "identified by Neuma" and never "the team said". Not yet done in the prompt. | The prompt still says an issue must be stated, not inferred. Without the label, a Neuma judgement would read as something the team said. | Later | Important |
| Nov 11 | Neuma has no transcript reader. A meeting's source panel links out: Open in Zoom (or Meet, Teams). An uploaded transcript shows Open file. | The meeting tool decides who can read a transcript. Logged Nov 13: the change was made on Nov 11 and never recorded. | Decided | Important |
| Nov 13 | Nobody reads a meeting transcript inside Neuma. The source links out to the meeting tool, which decides who can open it. Neuma keeps the transcripts that are in a Context for extraction, search and AI tools. Full sources covers AI tools, search across sources and opening uploaded files. | Jared's ruling. The reader was removed on Nov 11, and the older lines still described the Owner reading transcripts in Neuma. | Decided | Critical |
| Nov 13 | The switch is called Full sources. Older lines that say source access mean Full sources. | It is the name on the screens. | Decided | Low |

## Roll up (Screens 4 to 4.3)

File: `rollup.html`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 4 or earlier | A Roll up is the same page as a Context. A Contexts tab replaces Sources. | Not recorded | Decided | Medium |
| Nov 4 or earlier | Items roll up, and each says which Context it came from. Ticking it in the Roll up ticks it in the Context. | Not recorded | Decided | Important |
| Nov 4 or earlier | Patterns don't roll up. Neuma finds them across all linked Contexts. A Context's own patterns stay in that Context. | Not recorded | Decided | Medium |
| Nov 4 or earlier | A 'Contexts that need you' card on Summary, ranked by critical items, then open items. | It answers which accounts need me this week. | Option | Medium |
| Nov 11 | In the first version you pick a Roll up's Contexts by hand. Rules come later. | Not recorded | Decided | Medium |
| Nov 12 | Screen 4.1, Contexts that need you, is retired to the Graveyard. | Not recorded | Excluded from V2 | Medium |
| Nov 12 | Roll up Share opens Manage access, built like the Context one: add people or teams with a role, sharing notifies everyone with access, Make owner, Remove access, General access Restricted, Make private, Copy link. Roles are Editor (change which Contexts are in it, share) and Viewer (see the full Roll up). No Full sources section. A note says sharing gives the full Roll up, not the Contexts in it. | Same pattern as Context. Roll up Viewers get the Roll up only. | Decided | Important |
| Nov 12 | Roll up ⋯ menu matches the Context one. Owner: Edit Roll up, Make private, Hide for me, Delete for everyone. Someone else's Roll up: Hide for me, and "Only the owner can delete it." Share and Add Context show for the Owner only. Deleting a Roll up never touches the Contexts in it. | Same pattern as Context. | Decided | Medium |
| Nov 12 | Roll up Create has no Pick by hand / Use a rule toggle. Contexts are picked by hand. The rule builder is removed from the mockup. | Rules come with Teams, later. | Decided | Low |
| Nov 12 | The Roll up's Next meeting card is Later, like the Context page's. | It goes with the excluded Meeting Brief. | Later | Low |
| Nov 13 | A Roll up has a sharing setting that turns access to its linked Contexts on or off. On: people the Roll up is shared with can open the Contexts in it. Off: they get the Roll up only. This replaces the fixed rule that sharing never gives the Contexts underneath, and the note saying so in Manage access. | Jared's ruling on the conflict between the Nov 3 and Nov 9 rules. The Owner chooses per Roll up. | Decided | Critical |
| Nov 13 | Is the Roll up setting for sharing its linked Contexts on or off by default? Proposed: off. Not mocked. | Not recorded | Open | Important |

## Meeting brief (Screens 5 to 5.4)

File: `meeting-brief.html`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 4 or earlier | A Slack nudge 10 minutes before the meeting opens the brief. It goes to the host and Neuma users on the invite, by email when Slack isn't connected. Each person can turn it off. | Not recorded | Decided | Medium |
| Nov 4 or earlier | The full page and the companion are the same page at different widths. | No second screen to build. | Decided | Medium |
| Nov 4 or earlier | The calendar organiser gets the Host view. Attendees on your domain with Neuma get the Attendees view. | Not recorded | Decided | Important |
| Nov 4 or earlier | Neuma never guesses silently which Context a meeting belongs to. It suggests, and ticking the series box creates a rule. | Not recorded | Decided | Important |
| Nov 4 or earlier | When a meeting matches more than one Context, the most specific leads. An account beats the Roll up that contains it. | Not recorded | Decided | Medium |
| Nov 4 or earlier | Phone calls, huddles and corridor chats can open a brief, but nothing new is added to the Context. | Neuma can't record these. | Decided | Low |
| Nov 4 or earlier | External guests never get the brief by default. Sharing with a client is a deliberate step that opens a separate, editable version. | Not recorded | Decided | Critical |

## Slack (Screens 6 to 6.3)

File: `slack.html`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 4 or earlier | In a channel, Neuma uses only Contexts every member can see. In a DM, it uses every Context you can see. | Not recorded | Decided | Critical |
| Nov 4 or earlier | Patterns are never posted to Slack. | Not recorded | Decided | Important |
| Nov 4 or earlier | Neuma says when it doesn't know. It never answers from outside the Contexts. | Not recorded | Decided | Critical |
| Nov 4 or earlier | Thumbs up and down in Slack train the ranking, the same as thumbs on the Context page. | Not recorded | Decided | Low |
| Nov 4 | Slack is read only. Changes happen in Neuma. | Not recorded | Decided | Important |
| Nov 4 | Slack answers lead with one line that settles the question, then the dated facts. Each date links to its source. No quotes in chat. | Not recorded | Decided | Medium |
| Nov 5 | If the channel can't see the Context, only the asker gets the answer, by DM. | The channel sees nothing. | Decided | Critical |
| Nov 5 | Neuma reads only the message that mentions it. It never reads channel history or stores Slack messages. | Not recorded | Decided | Critical |

## AI tools MCP (Screens 10 to 10.2)

File: `claude.html`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 10 or earlier | Neuma pays for reading the latest 10 meetings. Searching and opening sources run on the person's own AI usage. | Not recorded | Decided | Important |
| Nov 10 or earlier | Every search_sources and get_source call goes to the admin audit log. | Not recorded | Decided | Important |
| Nov 10 | The AI tool starts with get_context and goes to sources only when the question needs quotes, older meetings or detail. | Most questions stop at what Neuma already knows. | Decided | Medium |
| Nov 10 | Every call runs as the signed-in person, never as a service account. | Not recorded | Decided | Critical |
| Nov 10 | The MCP server is read only in v1. Write tools (mark an action done, add a note, Editors only) come later. | Not recorded | Decided | Critical |
| Nov 10 | A missing Context and one the person can't open return the same error. | Nothing leaks. | Decided | Important |
| Nov 10 | Search is Postgres full-text in v1. Meaning-based search comes later if keyword search misses things. | Not recorded | Decided | Medium |
| Nov 10 | Sources past the latest 10 are flagged as not read. | Not recorded | Superseded | Low |
| Nov 11 | The behaviour rules go in each tool's description. | ChatGPT ignores server-level instructions. | Decided | Low |
| Nov 11 | search_sources and get_source need Full sources on. list_sources works without it. | It returns titles, dates and attendees only. | Decided | Important |
| Nov 11 | A Super admin's wider access in Neuma does not carry into AI tools. | Not recorded | Decided | Critical |
| Nov 13 | Confirmed: list_sources works with Full sources off. It returns titles, dates and attendees only. | Jared's ruling between two lines that disagreed. | Decided | Important |

## Integrations (Screens 7 to 7.6)

File: `integrations.html`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 5 | Only Neuma admins see Integrations. | Not recorded | Decided | Important |
| Nov 5 | With Salesforce, accounts, contacts and deals always come in together. | Not recorded | Decided | Low |
| Nov 9 | Microsoft is one connection with two products, so one page with tabs. | A Microsoft admin approves it once. | Decided | Low |
| Nov 9 | Each person connects their own calendar from Your connections. | Not recorded | Decided | Important |
| Nov 9 | Transcripts stay in Zoom, and Zoom decides who can open them. | Not recorded | Superseded | Critical |
| Nov 12 | In V2 the Integrations directory has Meetings and AI tools only. All CRM (Salesforce, HubSpot), all Messaging (Slack, Teams channels), and Gong, Chorus and Fathom are Later. Category counts follow the Scope switch. | Not recorded | Superseded | Critical |
| Nov 12 | In the V2 Integrations directory, all CRM (Salesforce, HubSpot), all Messaging (Slack, Teams channels), and Gong, Chorus and Fathom stay visible but read Coming soon in place of Connect, in V2 and Everything. | Shows where Neuma is going without promising it in V2. | Later | Critical |
| Nov 12 | Integrations 7.3 Connect (Salesforce) and the Salesforce card in 7.4 are Later. | Salesforce is Coming soon in V2. | Later | Medium |

## Settings (Screens 8 to 8.4)

File: `settings.html`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 9 | Neuma works bottom up. Anyone can connect any tool that works for one person, and Neuma only sees their data. | Not recorded | Decided | Critical |
| Nov 9 | People can remove a meeting they host, which deletes the transcript and everything pulled from it. Meetings they only attended can't be removed. | Others rely on them. | Decided | Important |
| Nov 11 | Who owns a deactivated person's Contexts. | Not recorded | Open | Important |
| Nov 11 | Whether people join by invite or approval. | Under it, no company data comes in from someone the company hasn't cleared. | Superseded | Critical |
| Nov 11 | Three account roles: Member, Admin and Super admin, who can also open any Context. | Not recorded | Decided | Critical |
| Nov 12 | In V2, Your connections has Calendar only (Google Calendar, Outlook). Meetings, CRM, Messaging and AI tools are Later, on Screens 8 Empty, 8 and 8.1. | Not recorded | Superseded | Critical |
| Nov 12 | Row states and drawers for meeting tools and CRM are Later. V2 keeps the calendar states: connected, more than one account, sign-in expired, and the accounts drawer. | Follows the Calendar-only scope. | Superseded | Medium |
| Nov 12 | In V2, Your connections shows every section, as in Everything. Fathom, Salesforce, HubSpot, Slack and Teams (messaging) read Coming soon in place of Connect, in V2 and Everything, the same as Admin Integrations. Meeting row states are back in V2. Only the Salesforce sign-in-expired state stays Later, with a Google Calendar version in V2. | Matches Admin Integrations. Keeps the roadmap visible without promising it. | Decided | Critical |
| Nov 12 | Choosing how people join (Automatically or By invite or approval) is Later. In V2 same-domain people join automatically, with no setting. | By invite or approval was only a proposal. | Later | Medium |
| Nov 12 | Admins see an "Admin settings →" link at the right of the Settings tabs, on Your connections and Profile. A link, not a tab. Members see only the two tabs. The account menu entry stays. | The account menu is hard to find. A tab would mix personal and workspace settings in one row. | Decided | Low |
| Nov 12 | Admins can delete the workspace from Admin settings › General. They type the domain to confirm. Everyone loses access at once and is emailed, AI tools are cut off, and any admin can cancel within 14 days before everything is deleted. | A destructive, company-wide action needs a typed confirm and a way back. | Decided | Critical |
| Nov 13 | The role that can open every Context is Super admin. It replaces the See all permission and its name. Account roles are Member, Admin and Super admin. Admins still read nothing by default. Older lines that say See all mean Super admin. | Jared's ruling on the conflict between the two names. | Decided | Critical |

## Onboarding (Screens 11 to 11.6)

File: `onboarding.html`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 11 or earlier | Sign-in asks for calendar access in the same consent. The workspace is created silently from the email domain. No admin is needed. | Not recorded | Decided | Important |
| Nov 11 | Every recurring meeting on the calendar becomes a Context on first visit. | Not recorded | Decided | Critical |
| Nov 11 | The first person to sign up is always the admin. | Not recorded | Superseded | Important |
| Nov 11 | Calendar access is required, so there is no Skip. Personal accounts get an error on sign in. | Not recorded | Decided | Medium |
| Nov 11 | Teammates in a meeting see its summary, not the transcript. | Not recorded | Decided | Critical |
| Nov 11 | Only the host, or someone who can already see the transcript in the meeting tool, can bring a meeting in. | Not recorded | Decided | Critical |
| Nov 12 | A series whose host isn't on Neuma shows Invite [name] in the Owner column in every state, including Calendar only. The Last source added cell stays empty. | Someone not on Neuma can't be an Owner. | Decided | Medium |
| Nov 12 | Calendar access declined: Continue stays off until Allow. | Calendar access is required. | Decided | Low |
| Nov 12 | After a meeting tool connects (11.1b), the right panel is empty. No meeting list or transcript counts. The meetings show on the Contexts page as they are read. | Counting transcripts takes minutes, so a list there would be wrong or slow. | Decided | Low |
| Nov 12 | Onboarding step 2 lists only tools available in V2: Zoom, Meet, Teams, and Otter, Fireflies and Granola. Fathom, Gong and Chorus are left out until they ship. | Onboarding shouldn't offer something that only says Coming soon. | Decided | Medium |
| Nov 13 | A pilot link flow (Screen 11.6) for people Jared sends a link to: sign in, create one Context, upload transcripts, see it. No calendar, no meeting tool. | Design partners need to see value before connecting anything. | Decided | Important |
| Nov 13 | The pilot link signs in with email and a magic link first. Google and Microsoft sit below and ask for sign-in only. The full flow (11 to 11.5) still requires Google or Microsoft. | Microsoft tenants often need admin consent for a new app, which blocks a pilot on day one. The reasons for requiring Google or Microsoft (calendar, account offboarding, admin proof) don't apply to a pilot. | Decided | Critical |
| Nov 13 | A magic-link work email joins its domain workspace as an unverified Member. Only a Google or Microsoft sign-in can verify it or make someone an admin. A personal email gets a workspace of one. | Keeps admin claims tied to proof of the company account, and stops personal emails sharing one gmail.com workspace. | Decided | Critical |
| Nov 13 | Magic links work once, for 15 minutes. Send again turns off for 30 seconds. | Not recorded | Superseded | Medium |
| Nov 13 | The sign-in email has a link and a 6-digit code. Both work for 15 minutes. Check your email has a code field. | Email security scanners open every link and would use up a single-use link. The code also works when the email is read on another device. | Decided | Important |
| Nov 13 | The magic link opens to a Continue as [email] button, not a straight sign-in. | A scanner opening the link signs no one in. | Decided | Important |
| Nov 13 | Check your email leads with Open Gmail or Open Outlook, chosen from the domain's mail provider and hidden when unknown. Send again is a text link, off for 30 seconds after each send. Every link and code sent stays valid until it expires. | Getting to the inbox is the main action. Sending again shouldn't break the first email. | Superseded | Medium |
| Nov 13 | Check your email has no Open Gmail or Open Outlook button. The code field is the main action. Send again is a text link, off for 30 seconds after each send. Every link and code sent stays valid until it expires. | Detecting the mail provider (MX and SPF lookups) was too complex for what it saves. | Decided | Medium |
| Nov 13 | Pilot Contexts are private to the uploader until shared. Deleting one deletes its transcripts within 30 days. Not said on the upload screen (removed Nov 13). | People upload before they trust the product. | Decided | Critical |
| Nov 13 | Uploaded meetings take their date from the file. A file with no date asks for one. Unreadable files are skipped, not blocking. | Order drives Needs attention and patterns. | Decided | Medium |
| Nov 13 | Create a Context in the pilot asks only for a name and transcripts. No type, no intro line, no Paste text, no right-panel copy about privacy or what Neuma finds. | Kept to the minimum to get to the result. | Decided | Medium |
| Nov 13 | Needs attention and Patterns wait until every uploaded meeting is read. Then one line offers Connect Zoom as the step up to the full flow. | The first view should be complete, not half a list. | Superseded | Important |
| Nov 13 | Once a pilot Context is ready, one line offers "Keep this Context current. Connect your meeting tool and new meetings come in on their own." with Zoom, Meet and Teams logos, Connect and ×. No tool is named. Connect goes to the meeting tool step. | Neuma can't tell which meeting tool someone uses from uploaded files. | Decided | Low |
| Nov 13 | Needs attention, Top issues, Top actions and Patterns wait until every uploaded meeting is read. The meta line shows the bar and "Reading 2 of 4". | The first view should be complete, not half a list. | Decided | Important |
| Nov 13 | Create Context in the pilot opens the real Context page, built from the same parts as Screen 3. No type badge and no Private label. | One Context page to build and to learn. | Decided | Low |
| Nov 13 | The pilot sign-in heading is "Get started with Neuma". No subline, no inviter pill and no caption. | Not recorded | Decided | Low |
| Nov 13 | Pilot uploads take .txt, .vtt, .docx and .doc, up to 20 files. PDF is not accepted. | Not recorded | Decided | Medium |
| Nov 13 | Fewer than 3 uploaded meetings still works, with "Add 3 or more to see patterns." | Not recorded | Decided | Low |
| Nov 13 | Pilot file problems never block Create Context: video is skipped, a file with no speakers offers Add anyway, and a failed upload offers Try again. One unreadable transcript leaves the rest in, with Try again or Remove. | Not recorded | Decided | Medium |
| Nov 13 | Connecting a meeting tool or calendar later matches the verified Google or Microsoft email to the magic-link account. Same account, nothing lost. | Not recorded | Decided | Important |
| Nov 13 | The pilot link flow lives on the onboarding tab as its own section, not a separate tab. | It shares the frame, sign-in and Context page with the full flow. | Decided | Low |
| Nov 13 | Does the pilot link itself expire, or carry a usage limit? Proposed: links stay valid, and Jared can turn one off. | Not recorded | Open | Medium |
| Nov 13 | What does a pilot user's Contexts page show beyond the one Context? Proposed: the real Contexts page with one row, and + New Context. | Not recorded | Open | Low |
| Nov 13 | Is the pilot path open to anyone with the link, or only the email Jared named? | Not recorded | Open | Important |
| Nov 13 | When a pilot user's colleague signs up through the full flow, do they see the pilot Context? Proposed: no. It stays private until shared. | Not recorded | Open | Critical |
| Nov 13 | Should the pilot sign-in email still name the inviter, now that the sign-in screen doesn't? | Not recorded | Open | Low |
| Nov 13 | Wrong sign-in code: how many tries before it locks? Proposed: 5, then "Too many tries. Send a new code." Not drawn. | Not recorded | Open | Medium |
| Nov 13 | A dropped .pdf has no error state drawn. Proposed: the same red row as video, "Neuma can't read PDF. It will be skipped." | Not recorded | Open | Low |
| Nov 13 | Could Neuma guess the meeting tool from the transcript file? Proposed: not for now. | Not recorded | Open | Low |
| Nov 13 | The first verified sign-in from a domain becomes the admin. Verified means Google or Microsoft. A pilot user who signed in by email first stays an unverified Member. | "The first person to sign up is always the admin" left a workspace with no admin when a pilot user arrived first. | Decided | Critical |

## Connections: personal and company

File: `settings.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 11 or earlier | An admin can connect a tool for the whole company. Neuma works top down as well as bottom up. | Not recorded | Decided | Important |
| Nov 11 or earlier | Personal tools live in Settings › Your connections. Company connections live in Integrations. | The split is by whose data it is. | Decided | Medium |
| Nov 11 or earlier | Both pages use the same section names, a description under each row and 84px buttons. | Not recorded | Decided | Low |
| Nov 11 or earlier | Integrations rows say "Transcripts from Zoom." Your connections rows say "Your Zoom transcripts." | Not recorded | Decided | Low |
| Nov 11 or earlier | A personal meeting connection gets the meetings the person hosts, plus transcripts shared with them where the tool's API allows it. | Not recorded | Decided | Important |
| Nov 11 or earlier | Each row in Your connections says who it covers: Connected (by you), or Connected for everyone. | Not recorded | Decided | Low |
| Nov 11 or earlier | Company connections that bring in a person's own meetings show in Your connections with a View drawer. Company-only tools don't. | Not recorded | Decided | Low |
| Nov 11 or earlier | Any tool can hold more than one account. | Not recorded | Decided | Medium |
| Nov 11 or earlier | Meeting drawers show the person's own sync status and meetings, paged. Calendars show accounts only. | Not recorded | Decided | Low |
| Nov 11 or earlier | When an admin connects a tool for everyone, personal connections fold into it silently. The row change is the only signal. | Not recorded | Decided | Medium |
| Nov 11 or earlier | A member's Connect that needs approval reaches the Neuma admin by email. There is no requests inbox. | Not recorded | Decided | Low |

## Personal connections on a company tool

File: `integrations.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 11 | The admin sees who connected their own tool, never what. The row shows "3 people connected their own". | Not recorded | Decided | Important |
| Nov 11 | The list shows name, team, date connected and meetings synced. No titles and no attendees. | Not recorded | Decided | Important |
| Nov 11 | The same panel links to "Connect [tool] for everyone". | Not recorded | Decided | Low |
| Nov 11 | Each tool has one setting, "Members can connect their own", on by default. | Governance is the pitch, so a small version of the enterprise control was pulled forward. | Decided | Important |
| Nov 11 | Turning it off stops new personal connections and pauses existing ones. It confirms first and states the effect. | Not recorded | Decided | Medium |
| Nov 11 | When it is off, the Integrations row reads "Personal connections off" and the member's row reads "Turned off by your admin". | Not recorded | Decided | Low |
| Nov 11 | Turning the setting off never deletes anything. What is already in a Context stays. | Not recorded | Decided | Medium |
| Nov 11 | Allow lists, approving each request and rules per team are not in the first version. | Not recorded | Later | Low |

## Transcript access

File: `context.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 11 | Neuma is never wider than the tool the transcript came from. This replaces "taking part is the permission". | Not recorded | Decided | Critical |
| Nov 11 | The person whose own notetaker recorded a meeting can add it to a Context. | Not recorded | Decided | Important |
| Nov 11 | Only the Owner reads the full transcript, unless the Owner switches source access on for that Context. | Not recorded | Superseded | Critical |
| Nov 11 | With a personal connection, Neuma fetches with the person's own sign-in. A meeting they can't get in the tool never shows in their list. | Not recorded | Decided | Important |
| Nov 11 | With a company connection, only the host can add a meeting. | Neuma fetches through one account and can't tell who personally has access. | Decided | Critical |
| Nov 11 | Teammates means people in the workspace. Outside attendees never get access. | Not recorded | Decided | Critical |
| Nov 11 | "Was in the meeting" means hosted, joined, or invited by name without declining. | Catching up is the main reason to skip. | Decided | Critical |
| Nov 11 | Declined, invited only through a group, added after the meeting, or had the link and never joined: none of these count. | It stops people forwarding themselves access. | Decided | Important |
| Nov 11 | Host and joined come from the meeting tool. Invited, declined and when you were added come from the calendar. | Not recorded | Decided | Medium |
| Nov 11 | Auto-created Contexts have three guards: What stays out, a one-time notice to the host, and Make private. | They are the one place the host hasn't made an active choice. | Decided | Important |
| Nov 11 | A meeting hosted by a colleague who isn't on Neuma doesn't come in unless you can see its transcript or recorded it. The row shows "Invite [name]". | Not recorded | Decided | Important |
| Nov 11 | An AI tool never reads a full transcript for someone who can't read it in Neuma. It says so and names the Owner to ask. | Asking questions of a transcript is reading it. | Decided | Critical |

## Access and admin visibility

File: `integrations.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 11 or earlier | Members' sidebar shows Contexts and Settings only. | Not recorded | Superseded | Low |
| Nov 11 or earlier | A company connection is set up by the tool's own admin. Neuma admins manage it after. | Not recorded | Decided | Medium |
| Nov 11 or earlier | Neuma keeps every transcript that is in a Context, including ones past the latest 10. Retention only deletes what isn't in a Context. | Not recorded | Decided | Critical |
| Nov 11 or earlier | Neuma never answers questions from a transcript that isn't in a Context. | Not recorded | Decided | Critical |
| Nov 11 or earlier | What Neuma pulls from a transcript follows the Context's sharing. The "Open in Zoom" link still follows Zoom. | Not recorded | Decided | Critical |
| Nov 10 | Admins see full details only for meetings they took part in. Everything else is a count. Admins who are also the meeting tool's admin see the full list. | The meeting tool already shows it to them. | Decided | Critical |
| Nov 11 or earlier | Company-wide settings that destroy data need a confirm that states the effect. | Not recorded | Decided | Important |
| Nov 11 or earlier | Company connections only cover meetings on the company's own account. Meetings on other companies' Zoom don't come in. | Not recorded | Decided | Important |
| Nov 11 or earlier | The Add meeting transcripts picker only shows meetings you can add. Nobody browses a colleague's calendar. | Not recorded | Decided | Important |
| Nov 11 or earlier | In v1, other people's meetings reach a Context three ways: they add their own, an account Context, or a recurring meeting that became a Context. | Not recorded | Decided | Medium |
| Nov 12 | Admins reach Admin settings and Integrations from the account menu at the bottom-left, not the sidebar. A Member's account menu has Sign out only. | The sidebar is the same for everyone. | Decided | Low |

## Reading cap

File: `context.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 10 | Each Context reads its latest 10 transcripts, counted across every series and single meeting in it. Channels, email and files don't count. | Not recorded | Decided | Critical |
| Nov 10 | Admins can change the cap in Settings. A higher cap raises usage billing, and the setting says so. | Not recorded | Decided | Medium |
| Nov 10 | Summary, extraction and Patterns all run on the latest 10. Each extraction run also gets the open issues and actions from every meeting. | It can close or update an item raised in a meeting that has since dropped out. | Decided | Important |
| Nov 10 | Long-term patterns across months are a separate feature. | Not recorded | Later | Medium |
| Nov 10 | The window rolls. A new meeting gets read, and the oldest of the 10 stops being read. | Not recorded | Decided | Medium |
| Nov 10 | Issues, actions and decisions stay in the lists after their meeting drops out of the 10. | Not recorded | Decided | Important |
| Nov 10 | Backfill reads the latest 10. This replaces the 90-day backfill. | Not recorded | Decided | Important |
| Nov 10 | People can add more than 10 meetings. Older ones are kept, not blocked. | Not recorded | Decided | Low |

## Source access

File: `context.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 11 | With source access on, everyone with access can read every source in full, including transcripts never read. | Not recorded | Decided | Critical |
| Nov 11 | Turning source access on notifies everyone with access. | Nothing is opened up silently. | Decided | Important |
| Nov 11 | Admins set the workspace default for source access, and can keep full transcripts out of AI tools entirely. When blocked, the Context setting is off and locked. | Not recorded | Decided | Critical |

## MCP tools

File: `claude.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 10 | get_context is always available. Every item carries its quote, speaker, date and link. | Answers have evidence even with source access off. | Decided | Important |
| Nov 10 | list_sources works only with source access on. | Not recorded | Superseded | Important |
| Nov 10 | get_source has two modes. Passages is the default. Full returns the whole transcript. | The passages default keeps most chats light. | Decided | Medium |
| Nov 10 | Every response carries a link back to the source in Neuma, so citations open the original. | Not recorded | Decided | Low |
| Nov 10 | Text an AI tool reads stays in that tool's chat, under the person's account. | Not recorded | Decided | Important |
| Nov 10 | In v1 Claude does the searching. Neuma only enforces access and serves the four tools. | Most Contexts are small. A weekly meeting for a year is 52 transcripts. | Decided | Important |
| Nov 10 | Only sources in a Context are searchable. Removing or deleting a source removes it from search. | Not recorded | Decided | Important |
| Nov 10 | People don't have to name a Context. Claude finds it from the question, and the first step shows which one it used. | Not recorded | Decided | Medium |
| Nov 10 | When several Contexts match, Claude answers from each and labels the parts. It asks only when the question is unclear. | Not recorded | Decided | Low |
| Nov 10 | A Context can be pinned to a Claude Project, so every chat in that project starts from it. | Not recorded | Decided | Low |

## Asking across tools

File: `slack.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 11 | Neuma does not connect to inboxes, and does not ingest email or Slack so people can ask across them inside Neuma. | An inbox is a much bigger trust ask than meetings, the AI tools already have those connectors, and Slack's terms don't let a third party keep messages. | Decided | Critical |
| Nov 11 | Asking across Neuma, email and Slack happens in the person's AI tool. Neuma is one more source there, through MCP. | Not recorded | Decided | Critical |
| Nov 11 | What keeps Neuma from being a plain data pipe: the extracted layer, the access rules, and briefs that arrive unasked. | Not recorded | Decided | Important |
| Nov 11 | Slack's API terms stop third parties keeping copies, archives or indexes of Slack data. The sanctioned route is a live lookup as the signed-in user. | Checked Nov 11, 2026. Not legal advice. | Decided | Critical |

## Contexts directory: views, filters and rows

File: `contexts.html` · Source: `integrations-decisions.md` and `onboarding-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 11 | Views live in a second nav: All, Yours, Shared with you, then saved views, then Suggested. | Not recorded | Superseded | Medium |
| Nov 10 | Views are private. Nobody else sees or changes them. | Not recorded | Decided | Medium |
| Nov 11 | The table footer reads "Showing 1–25 of 47" with arrows. With no rows it reads "0 Contexts" and hides the arrows. | Not recorded | Decided | Low |
| Nov 11 | Filter sits beside search: Access, Type and Tags. Filters apply as you pick. | Not recorded | Decided | Low |
| Nov 11 | Tag views and tag filters combine. | Not recorded | Decided | Low |
| Nov 11 | Saving a view is always deliberate. Changed filters show a bar with Save view and Save as new view. Built-in views only offer Save as new view. | Not recorded | Decided | Low |
| Nov 11 | New views come only from filtering. There is no "+ New view" in the nav. | Not recorded | Decided | Low |
| Nov 11 | Custom views have Rename, Edit filters and Delete view, and drag to reorder. Built-in views stay on top. | Not recorded | Decided | Low |
| Nov 11 | When no filter matches, the table reads "No Contexts match these filters · Reset filters". | Not recorded | Decided | Low |
| Nov 11 | Only one dropdown is open at a time. | Not recorded | Decided | Low |
| Nov 11 | There is no Sort control. | Not recorded | Decided | Low |
| Nov 11 | Relative times are short everywhere: 10m ago, 3h ago, 5d ago. Only full sentences spell them out. | Not recorded | Decided | Low |
| Nov 11 | The table shows no role labels and no total count. | Not recorded | Decided | Low |
| Nov 11 | The Owner column always shows a person. Auto-created Contexts show their host, never Neuma. | Not recorded | Decided | Low |
| Nov 11 | A blue dot marks a Context the person hasn't opened. It clears when they open it. | Not recorded | Decided | Low |
| Nov 11 | There is no "ready" icon. Only rows that aren't ready carry a status. | Not recorded | Decided | Low |
| Nov 11 | Hovering a ready Context's name shows the top 3 from its Needs attention list. | Not recorded | Decided | Low |
| Nov 12 | Hovering a Roll up's name on Contexts shows the same peek: the top 3 Needs attention items across its Contexts, each led by the Context name. | Consistent with Context rows | Decided | Low |
| Nov 11 | Row menu: the Owner gets Share, Make private, Edit, Add tags, Add sources, Hide for me and Delete for everyone. Editors get Share, Edit, Add tags, Add sources and Hide for me. Viewers get Hide for me. | Not recorded | Decided | Medium |
| Nov 11 | Everyone can Hide for me. It removes the row from their own table only, with Undo. | Not recorded | Decided | Medium |
| Nov 11 | Delete removes the Context for everyone with access, and tells them. The confirm states the effect. | Not recorded | Decided | Important |
| Nov 11 | Deleting an auto-created Context offers "Stop making this series a Context", ticked by default. | Not recorded | Decided | Medium |
| Nov 11 | A Context whose host isn't on Neuma has no owner yet, so nobody can delete it. | Not recorded | Decided | Medium |
| Nov 11 | The Suggested badge only shows when there is something to suggest. | Not recorded | Decided | Low |
| Nov 11 | Suggestions come from outside domains with 3 or more transcripts in the last 60 days. Neuma suggests and never auto-creates. | People in sales mostly have one-off meetings, so recurring-only gives them a thin first visit. | Later | Medium |
| Nov 11 | The bottom-left account block shows name and domain only. No role. | Not recorded | Decided | Low |
| Nov 17 | In Neuma V3 the Contexts sub nav is All, Yours, Shared with you, then People, Accounts, Meetings, Projects, Teams. | Jared's call for V3. It replaces the sample views 1/1s, Teams, Projects, Sales, Clients and Recruitment. | Decided | Important |
| Nov 17 | Do saved views and Suggested stay in the V3 Contexts sub nav, and is each of People, Accounts, Meetings, Projects and Teams a Context type or a filter? | Not recorded | Superseded | Important |
| Nov 17 | People, Accounts, Meetings, Projects and Teams are Context types. Each is also a saved view in the sub nav, filtered by type. Saved views and Suggested stay. | Jared's answer. Answers the open question above. | Decided | Critical |
| Nov 17 | Where do Roll ups sit among the five Context types? In the Screen 2 mockup they show under All, Yours and Shared with you only. | Not recorded | Open | Medium |
| Nov 17 | A People Context is created automatically between two individuals. It holds their actions, decisions, meetings and emails. | Jared's call for V3. | Decided | Critical |
| Nov 17 | Emails in a People Context conflict with the Nov 11 line that Neuma does not connect to inboxes or ingest email. Where do the emails come from? | Not recorded | Open | Critical |
| Nov 17 | People Contexts: which meetings count (only the two of them, or any meeting both joined), who can open one, who owns it, and can the second person be outside the company? | Not recorded | Open | Critical |

## Recurring meetings become Contexts

File: `contexts.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 9 | The host owns the auto-created Context. Nobody has to set anything up. | Not recorded | Decided | Important |
| Nov 9 | A series already added to a Context by hand is skipped. No duplicates. | Not recorded | Decided | Low |
| Nov 9 | On creation, the Context reads the latest 10 past meetings. | Not recorded | Decided | Medium |
| Nov 9 | What stays out runs before a Context is created. HR, performance and interview titles never become Contexts. | Not recorded | Decided | Critical |

## Access to Contexts

File: `context.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 9 | Access has three levels: See all Contexts, Manager, and everyone else. Neuma never guesses what a meeting is. | Not recorded | Decided | Critical |
| Nov 9 | See all Contexts is a permission for named people, separate from Admin. It works as Viewer on every Context. | Not recorded | Superseded | Critical |
| Nov 9 | Admins manage tools and settings but read nothing by default. | Not recorded | Decided | Critical |
| Nov 9 | See all is disclosed once when someone joins, and on a Settings page everyone can see. Every open goes to the admin audit log. | Not recorded | Decided | Important |
| Nov 9 | An approved access request makes the manager a Viewer. | Not recorded | Later | Low |
| Nov 9 | Copy link works like Google Docs. Only people with access can open the link. | Not recorded | Decided | Important |

## Roles and sharing

File: `context.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 9 | In auto-created Contexts the host is Owner and the other participants are Viewers. | Not recorded | Decided | Critical |
| Nov 9 | There is always exactly one Owner, and it is a person. The Owner can hand over ownership. | Not recorded | Decided | Important |
| Nov 9 | Owners and Editors share with people. There is no approval step, even in a two-person Context. | Not recorded | Decided | Important |
| Nov 9 | Manage access confirms before sharing: "Sharing with Sam K. notifies everyone with access. Continue?" | Not recorded | Decided | Low |
| Nov 9 | An Editor can only add meetings they could add themselves. | Not recorded | Decided | Important |
| Nov 9 | Roll ups use the same three roles as Contexts. | Not recorded | Decided | Medium |
| Nov 9 | You can only add a Context to a Roll up if you could share that Context yourself. | A Roll up can never share more than its Editors could share directly. | Decided | Critical |
| Nov 9 | A private Roll up can include any Context its Owner can open. | Not recorded | Decided | Medium |
| Nov 9 | Anyone can build a Roll up for themselves from Contexts they can open. | Not recorded | Decided | Medium |
| Nov 9 | Sharing a Roll up gives the full Roll up, with quotes, but not the Contexts underneath. Clicking through shows Request access. | Not recorded | Superseded | Critical |
| Nov 9 | A Context's Manage access shows every shared Roll up it is in. | Not recorded | Decided | Low |

## Settings: admin tabs

File: `settings.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 11 | Members see only Your connections and Profile. | Not recorded | Decided | Medium |
| Nov 11 | People lists everyone with role and last active. Invite is by email. The role dropdown is Admin or Member. | Not recorded | Decided | Medium |
| Nov 11 | Nobody changes their own role. | There is always an admin. | Decided | Medium |
| Nov 11 | Workspace holds the name, the fixed domain and how people join. | Not recorded | Decided | Low |
| Nov 11 | Access holds who has See all, the workspace default for source access, and the switch for full transcripts in AI tools. | Not recorded | Decided | Medium |

## Processing cost

Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 9 | Every meeting is processed once. It re-runs only when something changes. | Not recorded | Decided | Important |
| Nov 9 | The brief prompt runs before a meeting, or when a Context changes. Never nightly over idle Contexts. | Not recorded | Decided | Important |
| Nov 9 | Backfill runs through the Batch API. | Not recorded | Decided | Medium |
| Nov 9 | The extraction system prompt is cached. | It is the same on every call. | Decided | Low |
| Nov 9 | Extract plus brief costs about 8 to 9 cents a meeting. Under $1 per seat a month. | Estimate at Sonnet 5.5 list pricing, from a third-party tracker, Oct 2026. | Decided | Important |
| Nov 9 | The cost that grows with use is questions, not extraction. | Not recorded | Decided | Important |

## What comes in and privacy

File: `integrations.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 11 or earlier | All meetings come in. Privacy is handled by What stays out, Context sharing and retention, not by filtering at the door. | Not recorded | Decided | Critical |
| Nov 9 | There is no company-wide calendar connection. | Reading everyone's calendar is too personal. | Decided | Critical |
| Nov 11 or earlier | One connected attendee is enough for Neuma to know a meeting. | A meeting sits on every invitee's calendar. | Decided | Medium |
| Nov 11 or earlier | Calendars bring every meeting in the next 14 days, plus recurring series. Private events never come in. | Not recorded | Decided | Important |
| Nov 11 or earlier | For messages, admins choose all channels or specific ones. 1:1 chats, group chats and Google Chat never come in. | Under review. Slack's API terms don't allow storing channel messages. | Later | Important |
| Nov 11 or earlier | Salesforce is read only. | Not recorded | Decided | Important |
| Nov 11 or earlier | What stays out works by meeting title, series or attendee email or domain. It is company-wide and applies to new meetings only. | Not recorded | Decided | Important |
| Nov 11 or earlier | Anything not in a Context is deleted after 30 days by default. Admins can pick 7, 30, 60 or 90. | Not recorded | Decided | Critical |
| Nov 11 or earlier | Deleted means deleted, with no stubs. A past meeting comes back by fetching it again from the meeting tool. | Not recorded | Decided | Critical |

## Add meeting transcripts drawer

File: `context.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 11 or earlier | The drawer's tabs are Recurring, Upcoming and Past. | Not recorded | Decided | Low |
| Nov 11 or earlier | The tabs only show your own meetings. Meetings others added show in Sources. | Not recorded | Decided | Medium |
| Nov 11 or earlier | Each row shows one logo, the meeting tool. The calendar logo is not shown. | Not recorded | Decided | Low |
| Nov 10 | Adding a series always brings its future meetings and its past meetings. There is no option. | Not recorded | Decided | Medium |
| Nov 11 or earlier | Items already in the Context show "Added". The button states what it adds. | Not recorded | Decided | Low |
| Nov 11 or earlier | With nothing connected, each tab asks to connect what it needs. | Not recorded | Decided | Low |

## Integration pages

File: `integrations.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 11 or earlier | There is no Calendar tab anywhere. The Calendars section is gone from the Integrations directory. | Not recorded | Decided | Low |
| Nov 11 or earlier | Needs attention sits above the tabs. Each issue names its tab. | Not recorded | Decided | Low |
| Nov 11 or earlier | The key issue to flag is that transcription is off by default in Teams and Meet. | Not recorded | Decided | Medium |
| Nov 11 or earlier | Admins remove a meeting from its row menu. Hosts remove their own from Context screens. | Not recorded | Decided | Medium |
| Nov 11 or earlier | Removing a hosted meeting offers "Also keep out future meetings in this series". | Not recorded | Decided | Low |
| Nov 11 or earlier | Zoom and Teams identify recurring meetings themselves. Google Meet series come from the calendars people connect. | Not recorded | Decided | Medium |

## Account Contexts (Salesforce)

File: `context.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 10 | Account Contexts follow the CRM's visibility. The account owner is Owner, the account team are Viewers, and people above the owner can see it. | Nobody shares them one by one. | Later | Critical |
| Nov 10 | If the CRM lets everyone read every account, Neuma follows that. | It is the company's choice, made in their CRM. | Later | Important |
| Nov 10 | By default, accounts with a meeting in the last 90 days become Contexts. | Not recorded | Later | Medium |
| Nov 10 | Past meetings are fetched and kept in the account's Context, so retention doesn't remove them. | Not recorded | Later | Medium |
| Nov 10 | The Account Context shows why each item is there. | Not recorded | Later | Low |
| Nov 10 | Neuma does not classify accounts as customer, prospect or churned. | Not recorded | Later | Medium |

## Email into a Context

File: `context.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 11 | Each Context has its own readable address. There is no shared address. | There is no matching to do and no Unfiled list. | Later | Medium |
| Nov 11 | Only the Owner and Editors can send, from their verified work address. Anything else is dropped. | Not recorded | Later | Important |
| Nov 11 | The address stays the same when the Context is renamed. | Not recorded | Later | Low |
| Nov 11 | An email is a source like a transcript. The full email follows source access. | Not recorded | Later | Medium |

## Rules

File: `context.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 10 | Rules match meeting details, never what's said in the transcript. | Not recorded | Later | Important |
| Nov 10 | Rules are per person and run on each person's own meetings. | Two Editors never overwrite each other. | Later | Important |
| Nov 10 | Conditions are Title contains, Attendee is, Attendee domain is and Has external attendees. No any/all choice and no Call type. | Not recorded | Later | Low |
| Nov 10 | Picking anyone other than the rule's author locks on "Has external attendees". | Internal meetings are never pulled from other people. | Later | Important |
| Nov 10 | Rules on other people's meetings use recordings only, never calendars. | Not recorded | Later | Medium |
| Nov 10 | People whose meetings an admin rule includes are told. | Not recorded | Later | Medium |
| Nov 10 | A rule takes exactly what its conditions say. No hidden exceptions. | Not recorded | Later | Low |
| Nov 10 | Private calendar events never match a rule. | Not recorded | Later | Medium |
| Nov 10 | Anyone can remove their own meeting from a rule-fed Context. | Not recorded | Later | Low |
| Nov 10 | Rules come back when v1 users keep asking to gather non-recurring meetings. | Not recorded | Later | Low |

## Teams

File: `settings.html` · Source: `integrations-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 10 | A team is a named group managed by admins, created in Neuma or imported from a Google or Microsoft group. | Not recorded | Later | Medium |
| Nov 10 | Teams are used for rules, sharing, Roll up rules and sharing all account Contexts with a team. | Not recorded | Later | Medium |
| Nov 10 | Everyone can see which teams exist and who's in them. | Not recorded | Later | Low |

## Onboarding flow

File: `onboarding.html` · Source: `onboarding-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 11 | Onboarding is three steps: sign in, connect a meeting tool, land on Contexts. | Not recorded | Decided | Important |
| Nov 11 | There is no workspace screen and no separate first Context screen. | Not recorded | Decided | Medium |
| Nov 11 | Row status sits in the Last source added column: Ready, Reading, Waiting or No meeting link. | Not recorded | Decided | Low |
| Nov 11 | The first visit shows one dismissible line explaining what became a Context and who sees what. | Not recorded | Decided | Medium |
| Nov 11 | There is no checklist anywhere. | Not recorded | Decided | Low |
| Nov 11 | Someone who hosts no recurring meetings lands on the same page, showing the Contexts they are a Viewer of. | Not recorded | Decided | Medium |
| Nov 11 | Joining an existing workspace goes to the meeting tool step, unless the company already connected one. | Not recorded | Decided | Medium |
| Nov 11 | Every low-content state is the real Contexts page, not a separate screen. | Not recorded | Decided | Low |
| Nov 11 | The first version keeps only states that happen often and break the flow without handling. | Not recorded | Decided | Medium |

## Sign in and workspace

File: `onboarding.html` · Source: `onboarding-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 11 | Sign in is Google or Microsoft only. No magic links and no passwords. | Neuma needs their calendar anyway, disabling a work account ends Neuma access, and the sign-in can prove someone is the IT admin. | Decided | Critical |
| Nov 11 | Company SSO comes later, for enterprise. | Not recorded | Later | Medium |
| Nov 11 | Signing in and signing up are the same click. | Not recorded | Decided | Low |
| Nov 11 | The workspace is named by its domain. | A real company name can't be derived reliably from a Google sign-in. | Decided | Medium |
| Nov 11 | Everyone after the first person joins automatically as a Member. No approval step. | Not recorded | Decided | Critical |
| Nov 11 | Only an admin can make someone else an admin. | Not recorded | Decided | Important |
| Nov 11 | There is one workspace per domain. | Not recorded | Decided | Important |
| Nov 11 | Step 2 makes no sharing promise and has no sharing control. | Transcripts are opened per Context, so there is no default to choose at sign-up. | Decided | Medium |
| Nov 11 | Captions make no privacy claim. Who sees what is said once, on the first visit to Contexts. | Every version that did either overpromised or needed too many words. | Decided | Medium |
| Nov 11 | The headline stays "Connect your meeting tool". | "Connect your meeting transcripts" read as too daunting. | Decided | Low |

## Meeting tool step and matching

File: `onboarding.html` · Source: `onboarding-decisions.md`

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Nov 11 | Continue is disabled until a tool connects. Skip for now is the only way past without one. | Not recorded | Decided | Low |
| Nov 11 | A switch picks "Just me" or "Everyone at [domain]". Everyone is for admins. | Not recorded | Decided | Medium |
| Nov 11 | A tool that needs admin approval shows as Connection failed in the first version. | Not recorded | Decided | Low |
| Nov 11 | Neuma looks for a meeting link in the meeting field, the location and the description. | Not recorded | Decided | Medium |
| Nov 11 | With no link, Zoom and Teams transcripts still match by time and attendees. | Not recorded | Decided | Medium |
| Nov 11 | In-person meetings only get a transcript from a notetaker recording in the room. | Not recorded | Decided | Medium |
| Nov 11 | Notetaker transcripts match by meeting link, then event ID, then time and attendees. Title and day only suggest. | Not recorded | Decided | Important |
| Nov 11 | When a meeting tool and a notetaker bring the same meeting, Neuma keeps one transcript, the meeting tool's first. | Not recorded | Decided | Important |
| Nov 11 | An unmatched transcript stays a standalone meeting. The person can add it to a Context by hand. | Not recorded | Decided | Low |

## Strategy

Added Nov 13, 2026 from chat. Product direction, pricing and roadmap. The Oct and Nov lines were decided in chat and the exact day was not recorded.

| First seen | Decision | Why | Status | Importance |
|---|---|---|---|---|
| Oct | Contexts is the product wedge for this iteration. | Atoms need merging, decay and verification solved first. That is too hard for a first version. | Decided | Critical |
| Oct | The difference is multiplayer. Neuma serves people who weren't in the room. | Capture is a commodity. Any notetaker does it. | Decided | Critical |
| Oct | Detected actions are insights. Neuma is not a project-management or assignment system, and has no "Send to" integrations. | Send to was too complicated. | Decided | Important |
| Nov | Pricing: free for individuals and teams, paid for companies, no seat caps. Free has unlimited Contexts, with Summary and Patterns kept current on 3. External participants are always free. Roll ups and MCP access are paid. Company plans are priced on accounts covered, with meeting hours as the fair-use limit. A manager who wants more than 3 counts as a company. | Not recorded | Decided | Critical |
| Nov | Roadmap after Contexts: extracted durable intelligence, then verified intelligence with decay, then agent write back. | Not recorded | Decided | Important |
| Nov 13 | The wedge must head towards a vision. An Output tab that does the work for prospects and customers is being explored. | Follow-up emails and CRM updates are commoditised, so it needs a levelled-up version. | Open | Important |
