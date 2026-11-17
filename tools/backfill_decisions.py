#!/usr/bin/env python3
"""One-off backfill, Nov 11, 2026. Adds the rules from the two project docs
(integrations-decisions.md, onboarding-decisions.md) to DECISIONS.md as single lines.

    python3 tools/backfill_decisions.py

Saves versions/DECISIONS-vNNN.md first. Does nothing if the backfill is already there.
Lines already in DECISIONS.md were left out. A row is text, or (text, why), or
(text, why, status), or (text, why, status, date).
"""
import os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MARK = '## About the backfill'
INT, ONB = 'integrations-decisions.md', 'onboarding-decisions.md'
E = 'Nov 11 or earlier'

# (title, file, source doc, default date, default status, rows)
SECTIONS = [
 ('Connections: personal and company', 'settings.html', INT, E, 'Decided', [
  'An admin can connect a tool for the whole company. Neuma works top down as well as bottom up.',
  ('Personal tools live in Settings › Your connections. Company connections live in Integrations.', 'The split is by whose data it is.'),
  'Both pages use the same section names, a description under each row and 84px buttons.',
  'Integrations rows say "Transcripts from Zoom." Your connections rows say "Your Zoom transcripts."',
  'A personal meeting connection gets the meetings the person hosts, plus transcripts shared with them where the tool\'s API allows it.',
  'Each row in Your connections says who it covers: Connected (by you), or Connected for everyone.',
  'Company connections that bring in a person\'s own meetings show in Your connections with a View drawer. Company-only tools don\'t.',
  'Any tool can hold more than one account.',
  'Meeting drawers show the person\'s own sync status and meetings, paged. Calendars show accounts only.',
  'When an admin connects a tool for everyone, personal connections fold into it silently. The row change is the only signal.',
  'A member\'s Connect that needs approval reaches the Neuma admin by email. There is no requests inbox.',
 ]),
 ('Personal connections on a company tool', 'integrations.html', INT, 'Nov 11', 'Decided', [
  'The admin sees who connected their own tool, never what. The row shows "3 people connected their own".',
  'The list shows name, team, date connected and meetings synced. No titles and no attendees.',
  'The same panel links to "Connect [tool] for everyone".',
  ('Each tool has one setting, "Members can connect their own", on by default.', 'Governance is the pitch, so a small version of the enterprise control was pulled forward.'),
  'Turning it off stops new personal connections and pauses existing ones. It confirms first and states the effect.',
  'When it is off, the Integrations row reads "Personal connections off" and the member\'s row reads "Turned off by your admin".',
  'Turning the setting off never deletes anything. What is already in a Context stays.',
  ('Allow lists, approving each request and rules per team are not in the first version.', '', 'Later'),
 ]),
 ('Transcript access', 'context.html', INT, 'Nov 11', 'Decided', [
  'Neuma is never wider than the tool the transcript came from. This replaces "taking part is the permission".',
  'The person whose own notetaker recorded a meeting can add it to a Context.',
  'Only the Owner reads the full transcript, unless the Owner switches source access on for that Context.',
  'With a personal connection, Neuma fetches with the person\'s own sign-in. A meeting they can\'t get in the tool never shows in their list.',
  ('With a company connection, only the host can add a meeting.', 'Neuma fetches through one account and can\'t tell who personally has access.'),
  'Teammates means people in the workspace. Outside attendees never get access.',
  ('"Was in the meeting" means hosted, joined, or invited by name without declining.', 'Catching up is the main reason to skip.'),
  ('Declined, invited only through a group, added after the meeting, or had the link and never joined: none of these count.', 'It stops people forwarding themselves access.'),
  'Host and joined come from the meeting tool. Invited, declined and when you were added come from the calendar.',
  ('Auto-created Contexts have three guards: What stays out, a one-time notice to the host, and Make private.', 'They are the one place the host hasn\'t made an active choice.'),
  'A meeting hosted by a colleague who isn\'t on Neuma doesn\'t come in unless you can see its transcript or recorded it. The row shows "Invite [name]".',
  ('An AI tool never reads a full transcript for someone who can\'t read it in Neuma. It says so and names the Owner to ask.', 'Asking questions of a transcript is reading it.'),
 ]),
 ('Access and admin visibility', 'integrations.html', INT, E, 'Decided', [
  'Members\' sidebar shows Contexts and Settings only.',
  'A company connection is set up by the tool\'s own admin. Neuma admins manage it after.',
  'Neuma keeps every transcript that is in a Context, including ones past the latest 10. Retention only deletes what isn\'t in a Context.',
  'Neuma never answers questions from a transcript that isn\'t in a Context.',
  'What Neuma pulls from a transcript follows the Context\'s sharing. The "Open in Zoom" link still follows Zoom.',
  ('Admins see full details only for meetings they took part in. Everything else is a count. Admins who are also the meeting tool\'s admin see the full list.', 'The meeting tool already shows it to them.', 'Decided', 'Nov 10'),
  'Company-wide settings that destroy data need a confirm that states the effect.',
  'Company connections only cover meetings on the company\'s own account. Meetings on other companies\' Zoom don\'t come in.',
  'The Add meeting transcripts picker only shows meetings you can add. Nobody browses a colleague\'s calendar.',
  'In v1, other people\'s meetings reach a Context three ways: they add their own, an account Context, or a recurring meeting that became a Context.',
 ]),
 ('Reading cap', 'context.html', INT, 'Nov 10', 'Decided', [
  'Each Context reads its latest 10 transcripts, counted across every series and single meeting in it. Channels, email and files don\'t count.',
  'Admins can change the cap in Settings. A higher cap raises usage billing, and the setting says so.',
  ('Summary, extraction and Patterns all run on the latest 10. Each extraction run also gets the open issues and actions from every meeting.', 'It can close or update an item raised in a meeting that has since dropped out.'),
  ('Long-term patterns across months are a separate feature.', '', 'Later'),
  'The window rolls. A new meeting gets read, and the oldest of the 10 stops being read.',
  'Issues, actions and decisions stay in the lists after their meeting drops out of the 10.',
  'Backfill reads the latest 10. This replaces the 90-day backfill.',
  'People can add more than 10 meetings. Older ones are kept, not blocked.',
 ]),
 ('Source access', 'context.html', INT, 'Nov 11', 'Decided', [
  'With source access on, everyone with access can read every source in full, including transcripts never read.',
  ('Turning source access on notifies everyone with access.', 'Nothing is opened up silently.'),
  'Admins set the workspace default for source access, and can keep full transcripts out of AI tools entirely. When blocked, the Context setting is off and locked.',
 ]),
 ('MCP tools', 'claude.html', INT, 'Nov 10', 'Decided', [
  ('get_context is always available. Every item carries its quote, speaker, date and link.', 'Answers have evidence even with source access off.'),
  'list_sources works only with source access on.',
  ('get_source has two modes. Passages is the default. Full returns the whole transcript.', 'The passages default keeps most chats light.'),
  'Every response carries a link back to the source in Neuma, so citations open the original.',
  'Text an AI tool reads stays in that tool\'s chat, under the person\'s account.',
  ('In v1 Claude does the searching. Neuma only enforces access and serves the four tools.', 'Most Contexts are small. A weekly meeting for a year is 52 transcripts.'),
  'Only sources in a Context are searchable. Removing or deleting a source removes it from search.',
  'People don\'t have to name a Context. Claude finds it from the question, and the first step shows which one it used.',
  'When several Contexts match, Claude answers from each and labels the parts. It asks only when the question is unclear.',
  'A Context can be pinned to a Claude Project, so every chat in that project starts from it.',
 ]),
 ('Asking across tools', 'slack.html', INT, 'Nov 11', 'Decided', [
  ('Neuma does not connect to inboxes, and does not ingest email or Slack so people can ask across them inside Neuma.', 'An inbox is a much bigger trust ask than meetings, the AI tools already have those connectors, and Slack\'s terms don\'t let a third party keep messages.'),
  'Asking across Neuma, email and Slack happens in the person\'s AI tool. Neuma is one more source there, through MCP.',
  'What keeps Neuma from being a plain data pipe: the extracted layer, the access rules, and briefs that arrive unasked.',
  ('Slack\'s API terms stop third parties keeping copies, archives or indexes of Slack data. The sanctioned route is a live lookup as the signed-in user.', 'Checked Nov 11, 2026. Not legal advice.'),
 ]),
 ('Contexts directory: views, filters and rows', 'contexts.html', INT + '` and `' + ONB, 'Nov 11', 'Decided', [
  'Views live in a second nav: All, Yours, Shared with you, then saved views, then Suggested.',
  ('Views are private. Nobody else sees or changes them.', '', 'Decided', 'Nov 10'),
  'The table footer reads "Showing 1–25 of 47" with arrows. With no rows it reads "0 Contexts" and hides the arrows.',
  'Filter sits beside search: Access, Type and Tags. Filters apply as you pick.',
  'Tag views and tag filters combine.',
  'Saving a view is always deliberate. Changed filters show a bar with Save view and Save as new view. Built-in views only offer Save as new view.',
  'New views come only from filtering. There is no "+ New view" in the nav.',
  'Custom views have Rename, Edit filters and Delete view, and drag to reorder. Built-in views stay on top.',
  'When no filter matches, the table reads "No Contexts match these filters · Reset filters".',
  'Only one dropdown is open at a time.',
  'There is no Sort control.',
  'Relative times are short everywhere: 10m ago, 3h ago, 5d ago. Only full sentences spell them out.',
  'The table shows no role labels and no total count.',
  'The Owner column always shows a person. Auto-created Contexts show their host, never Neuma.',
  'A blue dot marks a Context the person hasn\'t opened. It clears when they open it.',
  'There is no "ready" icon. Only rows that aren\'t ready carry a status.',
  'Hovering a ready Context\'s name shows the top 3 from its Needs attention list.',
  'Row menu: the Owner gets Share, Make private, Edit, Add tags, Add sources, Hide for me and Delete for everyone. Editors get Share, Edit, Add tags, Add sources and Hide for me. Viewers get Hide for me.',
  'Everyone can Hide for me. It removes the row from their own table only, with Undo.',
  'Delete removes the Context for everyone with access, and tells them. The confirm states the effect.',
  'Deleting an auto-created Context offers "Stop making this series a Context", ticked by default.',
  'A Context whose host isn\'t on Neuma has no owner yet, so nobody can delete it.',
  'The Suggested badge only shows when there is something to suggest.',
  ('Suggestions come from outside domains with 3 or more transcripts in the last 60 days. Neuma suggests and never auto-creates.', 'People in sales mostly have one-off meetings, so recurring-only gives them a thin first visit.', 'Later'),
  'The bottom-left account block shows name and domain only. No role.',
 ]),
 ('Recurring meetings become Contexts', 'contexts.html', INT, 'Nov 9', 'Decided', [
  'The host owns the auto-created Context. Nobody has to set anything up.',
  'A series already added to a Context by hand is skipped. No duplicates.',
  'On creation, the Context reads the latest 10 past meetings.',
  'What stays out runs before a Context is created. HR, performance and interview titles never become Contexts.',
 ]),
 ('Access to Contexts', 'context.html', INT, 'Nov 9', 'Decided', [
  'Access has three levels: See all Contexts, Manager, and everyone else. Neuma never guesses what a meeting is.',
  'See all Contexts is a permission for named people, separate from Admin. It works as Viewer on every Context.',
  'Admins manage tools and settings but read nothing by default.',
  'See all is disclosed once when someone joins, and on a Settings page everyone can see. Every open goes to the admin audit log.',
  ('An approved access request makes the manager a Viewer.', '', 'Later'),
  'Copy link works like Google Docs. Only people with access can open the link.',
 ]),
 ('Roles and sharing', 'context.html', INT, 'Nov 9', 'Decided', [
  'In auto-created Contexts the host is Owner and the other participants are Viewers.',
  'There is always exactly one Owner, and it is a person. The Owner can hand over ownership.',
  'Owners and Editors share with people. There is no approval step, even in a two-person Context.',
  'Manage access confirms before sharing: "Sharing with Sam K. notifies everyone with access. Continue?"',
  'An Editor can only add meetings they could add themselves.',
  'Roll ups use the same three roles as Contexts.',
  ('You can only add a Context to a Roll up if you could share that Context yourself.', 'A Roll up can never share more than its Editors could share directly.'),
  'A private Roll up can include any Context its Owner can open.',
  'Anyone can build a Roll up for themselves from Contexts they can open.',
  'Sharing a Roll up gives the full Roll up, with quotes, but not the Contexts underneath. Clicking through shows Request access.',
  'A Context\'s Manage access shows every shared Roll up it is in.',
 ]),
 ('Settings: admin tabs', 'settings.html', INT, 'Nov 11', 'Decided', [
  'Members see only Your connections and Profile.',
  'People lists everyone with role and last active. Invite is by email. The role dropdown is Admin or Member.',
  ('Nobody changes their own role.', 'There is always an admin.'),
  'Workspace holds the name, the fixed domain and how people join.',
  'Access holds who has See all, the workspace default for source access, and the switch for full transcripts in AI tools.',
 ]),
 ('Processing cost', '', INT, 'Nov 9', 'Decided', [
  'Every meeting is processed once. It re-runs only when something changes.',
  'The brief prompt runs before a meeting, or when a Context changes. Never nightly over idle Contexts.',
  'Backfill runs through the Batch API.',
  ('The extraction system prompt is cached.', 'It is the same on every call.'),
  ('Extract plus brief costs about 8 to 9 cents a meeting. Under $1 per seat a month.', 'Estimate at Sonnet 5.5 list pricing, from a third-party tracker, Oct 2026.'),
  'The cost that grows with use is questions, not extraction.',
 ]),
 ('What comes in and privacy', 'integrations.html', INT, E, 'Decided', [
  'All meetings come in. Privacy is handled by What stays out, Context sharing and retention, not by filtering at the door.',
  ('There is no company-wide calendar connection.', 'Reading everyone\'s calendar is too personal.', 'Decided', 'Nov 9'),
  ('One connected attendee is enough for Neuma to know a meeting.', 'A meeting sits on every invitee\'s calendar.'),
  'Calendars bring every meeting in the next 14 days, plus recurring series. Private events never come in.',
  ('For messages, admins choose all channels or specific ones. 1:1 chats, group chats and Google Chat never come in.', 'Under review. Slack\'s API terms don\'t allow storing channel messages.', 'Later'),
  'Salesforce is read only.',
  'What stays out works by meeting title, series or attendee email or domain. It is company-wide and applies to new meetings only.',
  'Anything not in a Context is deleted after 30 days by default. Admins can pick 7, 30, 60 or 90.',
  'Deleted means deleted, with no stubs. A past meeting comes back by fetching it again from the meeting tool.',
 ]),
 ('Add meeting transcripts drawer', 'context.html', INT, E, 'Decided', [
  'The drawer\'s tabs are Recurring, Upcoming and Past.',
  'The tabs only show your own meetings. Meetings others added show in Sources.',
  'Each row shows one logo, the meeting tool. The calendar logo is not shown.',
  ('Adding a series always brings its future meetings and its past meetings. There is no option.', '', 'Decided', 'Nov 10'),
  'Items already in the Context show "Added". The button states what it adds.',
  'With nothing connected, each tab asks to connect what it needs.',
 ]),
 ('Integration pages', 'integrations.html', INT, E, 'Decided', [
  'There is no Calendar tab anywhere. The Calendars section is gone from the Integrations directory.',
  'Needs attention sits above the tabs. Each issue names its tab.',
  'The key issue to flag is that transcription is off by default in Teams and Meet.',
  'Admins remove a meeting from its row menu. Hosts remove their own from Context screens.',
  'Removing a hosted meeting offers "Also keep out future meetings in this series".',
  'Zoom and Teams identify recurring meetings themselves. Google Meet series come from the calendars people connect.',
 ]),
 ('Account Contexts (Salesforce)', 'context.html', INT, 'Nov 10', 'Later', [
  ('Account Contexts follow the CRM\'s visibility. The account owner is Owner, the account team are Viewers, and people above the owner can see it.', 'Nobody shares them one by one.'),
  ('If the CRM lets everyone read every account, Neuma follows that.', 'It is the company\'s choice, made in their CRM.'),
  'By default, accounts with a meeting in the last 90 days become Contexts.',
  'Past meetings are fetched and kept in the account\'s Context, so retention doesn\'t remove them.',
  'The Account Context shows why each item is there.',
  'Neuma does not classify accounts as customer, prospect or churned.',
 ]),
 ('Email into a Context', 'context.html', INT, 'Nov 11', 'Later', [
  ('Each Context has its own readable address. There is no shared address.', 'There is no matching to do and no Unfiled list.'),
  'Only the Owner and Editors can send, from their verified work address. Anything else is dropped.',
  'The address stays the same when the Context is renamed.',
  'An email is a source like a transcript. The full email follows source access.',
 ]),
 ('Rules', 'context.html', INT, 'Nov 10', 'Later', [
  'Rules match meeting details, never what\'s said in the transcript.',
  ('Rules are per person and run on each person\'s own meetings.', 'Two Editors never overwrite each other.'),
  'Conditions are Title contains, Attendee is, Attendee domain is and Has external attendees. No any/all choice and no Call type.',
  ('Picking anyone other than the rule\'s author locks on "Has external attendees".', 'Internal meetings are never pulled from other people.'),
  'Rules on other people\'s meetings use recordings only, never calendars.',
  'People whose meetings an admin rule includes are told.',
  'A rule takes exactly what its conditions say. No hidden exceptions.',
  'Private calendar events never match a rule.',
  'Anyone can remove their own meeting from a rule-fed Context.',
  'Rules come back when v1 users keep asking to gather non-recurring meetings.',
 ]),
 ('Teams', 'settings.html', INT, 'Nov 10', 'Later', [
  'A team is a named group managed by admins, created in Neuma or imported from a Google or Microsoft group.',
  'Teams are used for rules, sharing, Roll up rules and sharing all account Contexts with a team.',
  'Everyone can see which teams exist and who\'s in them.',
 ]),
 ('Onboarding flow (not in V2)', 'onboarding.html', ONB, 'Nov 11', 'Decided', [
  'Onboarding is three steps: sign in, connect a meeting tool, land on Contexts.',
  'There is no workspace screen and no separate first Context screen.',
  'Row status sits in the Last source added column: Ready, Reading, Waiting or No meeting link.',
  'The first visit shows one dismissible line explaining what became a Context and who sees what.',
  'There is no checklist anywhere.',
  'Someone who hosts no recurring meetings lands on the same page, showing the Contexts they are a Viewer of.',
  'Joining an existing workspace goes to the meeting tool step, unless the company already connected one.',
  'Every low-content state is the real Contexts page, not a separate screen.',
  'The first version keeps only states that happen often and break the flow without handling.',
 ]),
 ('Sign in and workspace (not in V2)', 'onboarding.html', ONB, 'Nov 11', 'Decided', [
  ('Sign in is Google or Microsoft only. No magic links and no passwords.', 'Neuma needs their calendar anyway, disabling a work account ends Neuma access, and the sign-in can prove someone is the IT admin.'),
  ('Company SSO comes later, for enterprise.', '', 'Later'),
  'Signing in and signing up are the same click.',
  ('The workspace is named by its domain.', 'A real company name can\'t be derived reliably from a Google sign-in.'),
  'Everyone after the first person joins automatically as a Member. No approval step.',
  'Only an admin can make someone else an admin.',
  'There is one workspace per domain.',
  ('Step 2 makes no sharing promise and has no sharing control.', 'Transcripts are opened per Context, so there is no default to choose at sign-up.'),
  ('Captions make no privacy claim. Who sees what is said once, on the first visit to Contexts.', 'Every version that did either overpromised or needed too many words.'),
  ('The headline stays "Connect your meeting tool".', '"Connect your meeting transcripts" read as too daunting.'),
 ]),
 ('Meeting tool step and matching (not in V2)', 'onboarding.html', ONB, 'Nov 11', 'Decided', [
  'Continue is disabled until a tool connects. Skip for now is the only way past without one.',
  'A switch picks "Just me" or "Everyone at [domain]". Everyone is for admins.',
  'A tool that needs admin approval shows as Connection failed in the first version.',
  'Neuma looks for a meeting link in the meeting field, the location and the description.',
  'With no link, Zoom and Teams transcripts still match by time and attendees.',
  'In-person meetings only get a transcript from a notetaker recording in the room.',
  'Notetaker transcripts match by meeting link, then event ID, then time and attendees. Title and day only suggest.',
  'When a meeting tool and a notetaker bring the same meeting, Neuma keeps one transcript, the meeting tool\'s first.',
  'An unmatched transcript stays a standalone meeting. The person can add it to a Context by hand.',
 ]),
]

def main():
    path = os.path.join(ROOT, 'DECISIONS.md')
    text = open(path, encoding='utf-8').read()
    if MARK in text:
        sys.exit('Backfill already in DECISIONS.md. Nothing changed.')
    vdir = os.path.join(ROOT, 'versions')
    nums = [int(m.group(1)) for f in os.listdir(vdir) for m in [re.match(r'DECISIONS-v(\d+)\.md$', f)] if m]
    bak = os.path.join(vdir, 'DECISIONS-v%03d.md' % (max(nums, default=0) + 1))
    shutil.copy2(path, bak)
    out, total, whys = [], 0, 0
    for title, file, src, date, status, rows in SECTIONS:
        out += ['', '## ' + title, '', ('File: `%s` · ' % file if file else '') + 'Source: `%s`' % src, '',
                '| First seen | Decision | Why | Status |', '|---|---|---|---|']
        for r in rows:
            r = (r,) if isinstance(r, str) else r
            t, why = r[0], (r[1] if len(r) > 1 else '')
            st, dt = (r[2] if len(r) > 2 else status), (r[3] if len(r) > 3 else date)
            assert '|' not in t + why and '—' not in t + why, t
            out.append('| %s | %s | %s | %s |' % (dt, t, why or 'Not recorded', st))
            total += 1; whys += bool(why)
    note = (MARK + '\n\nAdded on Nov 11, 2026. %d lines from the two project docs, `%s` and `%s`. %d have a why.\n\n'
            '- These sections sit after Onboarding and name their source doc.\n'
            '- **First seen** is the date the doc gives for the section. "Nov 11 or earlier" means the doc gives none.\n'
            '- Rules already in this file were not added twice.\n'
            '- Where a backfilled line disagrees with an older line, both are kept. Neither is marked Superseded yet. That is for Jared and Jason to settle.\n'
            '- Open questions stay in the project docs.\n\n') % (total, INT, ONB, whys)
    anchor = '## Open questions and options'
    assert text.count(anchor) == 1
    text = text.replace(anchor, note + anchor).rstrip('\n') + '\n' + '\n'.join(out) + '\n'
    open(path, 'w', encoding='utf-8').write(text)
    print('Backup: %s. Added %d lines in %d sections, %d with a why.' % (os.path.relpath(bak, ROOT), total, len(SECTIONS), whys))

if __name__ == '__main__':
    main()
