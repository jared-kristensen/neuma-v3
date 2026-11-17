"""Builds integrations.html from this file and integrations_detail.py.
Edit the data or markup here, then run:  python3 tools/build_integrations.py
It saves a numbered backup with snapshot.py before writing."""
import os, sys, subprocess
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
import json
# (name, short, desc, group, state)  state: connected | built-in | available | soon
I = [
 ('Zoom','Zm','#2D8CFF','Transcripts from Zoom.','calls','connected','2 accounts'),
 ('Google Meet','GM','#00897B','Transcripts from Google Meet.','calls','connected',''),
 ('Microsoft Teams','MT','#5B5FC7','Transcripts from Teams.','calls','connected',''),
 ('Gong','Go','#8039DF','Transcripts from Gong.','calls','available',''),
 ('Chorus','Ch','#E5534B','Transcripts from Chorus.','calls','available',''),
 ('Otter','Ot','#1E6FD9','Transcripts from Otter.','calls','available',''),
 ('Fireflies','Ff','#7C3AED','Transcripts from Fireflies.','calls','available',''),
 ('Fathom','Fa','#3B3B98','Transcripts from Fathom.','calls','available',''),
 ('Granola','Gr','#5F7A3A','Transcripts from Granola.','calls','available',''),
 ('Salesforce','Sf','#00A1E0','Accounts from Salesforce.','crm','available',''),
 ('HubSpot','Hs','#FF7A59','Companies from HubSpot.','crm','available',''),
 ('Slack','Sl','#4A154B','Channels from Slack.','chat','available',''),
 ('Microsoft Teams','TC','#5B5FC7','Channels from Teams.','chat','connected',''),
 ('Claude','Cl','#D97757','Use Contexts in Claude.','agents','available',''),
 ('ChatGPT','GP','#10A37F','Use Contexts in ChatGPT.','agents','available',''),
 ('Custom MCP','MC','#111827','Any tool that supports MCP.','agents','available',''),
]
G = [('calls','Meetings','Transcripts from your meetings.'),('crm','CRM','Create Contexts from your accounts.'),('chat','Messaging','Bring in channels and ask Neuma in chat.'),('agents','AI tools','Neuma in Claude, ChatGPT and other AI tools.')]

# Not in V2: the row stays but reads Coming soon, in V2 and Everything.
LATER_GROUPS = {'crm','chat'}
LATER_NAMES = {'Fathom','Chorus','Gong'}
def is_later(it): return it[4] in LATER_GROUPS or it[0] in LATER_NAMES
def lat(flag): return ' data-later' if flag else ''

def tile(n,c,size=36,fs=13):
    return f'<span class="shrink-0 rounded-lg flex items-center justify-center text-white font-semibold" style="width:{size}px;height:{size}px;background:{c};font-size:{fs}px">{n}</span>'

DOM = {'Zoom':'zoom','Google Meet':'google-meet','Microsoft Teams':'microsoft-teams','Gong':'gong','Chorus':'chorus',
 'Fireflies':'fireflies','Otter':'otter','Granola':'granola','Fathom':'fathom','Google Calendar':'google-calendar',
 'Microsoft Teams calendar':'microsoft-outlook','Salesforce':'salesforce','HubSpot':'hubspot','Slack':'slack',
 'Microsoft Teams chat':'microsoft-teams','Claude':'claude','ChatGPT':'chatgpt','Custom MCP':'mcp'}
def logo(name,ab,col):
    d = DOM.get(name)
    mono = f'<span class="absolute inset-0 rounded-lg flex items-center justify-center text-white font-semibold text-[11px]" style="background:{col}">{ab}</span>'
    img = (f'<img src="assets/logos/{d}.svg" alt="{name}" class="relative w-5 h-5 object-contain" onerror="this.previousElementSibling.style.opacity=1;this.remove()">'
           f'') if d else ''
    bg = 'bg-white ring-1 ring-inset ring-slate-200' if d else ''
    return f'<span class="relative shrink-0 w-8 h-8 rounded-lg flex items-center justify-center {bg}">' + (mono.replace('absolute inset-0','absolute inset-0 -z-0 opacity-0') if d else mono) + img + '</span>'

def card(it):
    name,ab,col,desc,grp,st,meta=it
    issue = ''
    if st=='connected':
        TEAMS_TAB = {'calls':'#teams-transcripts','calendars':'#teams-calendar','chat':'#teams-messages'}
        GOOGLE_TAB = {'Google Meet':'#google-transcripts','Google Calendar':'#google-calendar','Google Chat':'#google-messages'}
        href = '#integration-detail' if name=='Zoom' else (TEAMS_TAB[grp] if name=='Microsoft Teams' else GOOGLE_TAB.get(name, '#integration-settings'))
        acct = f'<span class="text-[12.5px] text-slate-400">{meta}</span>' if meta else ''
        if name=='Zoom' or (name=='Microsoft Teams' and grp=='calls'):
            issue = ''
            right=f'{acct}<span class="flex items-center gap-1.5 text-[12.5px] text-amber-700"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>1 issue</span><a href="{href}" class="btn-out inline-flex items-center justify-center" style="padding:3px 12px;font-size:12.5px;min-width:78px">Manage</a>'
        else:
            right=f'{acct}<span class="flex items-center gap-1.5 text-[12.5px] text-emerald-700"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Connected</span><a href="{href}" class="btn-out inline-flex items-center justify-center" style="padding:3px 12px;font-size:12.5px;min-width:78px">Manage</a>'
    elif st=='built-in':
        right='<span class="flex items-center gap-1.5 text-[12.5px] text-emerald-700"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>On</span><span class="text-[12.5px] text-slate-400 w-[74px] text-center">Built in</span>'
    else:
        href = '#integrations-connect' if name=='Salesforce' else '#'
        right=f'<a href="{href}" class="btn-out inline-flex items-center justify-center" style="padding:3px 12px;font-size:12.5px;min-width:78px">Connect</a>'
    return (f'<div class="flex items-center gap-3 px-4 py-3 hover:bg-slate-50/70" data-int data-grp="{grp}" data-st="{st}" data-name="{name.lower()}">{logo(name,ab,col)}'
            f'<div class="flex-1 min-w-0"><div class="text-[13.5px] font-medium text-slate-900 truncate">{name}</div>'+(f'<div class="text-[12px] text-slate-500 mt-0.5 truncate">{desc}</div>' if desc else '')
            +(f'<div class="text-[12px] text-amber-700 mt-0.5 truncate">{issue}</div>' if issue else '')+'</div>'
            +(f'<div class="flex items-center shrink-0 justify-center" style="min-width:78px"><span class="px-1.5 py-px rounded bg-slate-100 text-[10.5px] font-medium text-slate-500 whitespace-nowrap">Coming soon</span></div></div>'
              if is_later(it) else f'<div class="flex items-center gap-3 shrink-0">{right}</div></div>'))

def soonrow(it):
    name,ab,col,desc,grp,st,meta=it
    return (f'<div class="flex items-center gap-3 px-4 py-3" data-int data-grp="{grp}" data-st="soon" data-name="{name.lower()}">{tile(ab,col,28,11)}'
            f'<div class="flex-1 min-w-0"><span class="text-[13.5px] font-medium text-slate-900">{name}</span><span class="text-[12.5px] text-slate-500"> · {desc}</span></div>'
            f'<button type="button" class="text-[12.5px] font-medium text-brand-600 hover:text-brand-700 shrink-0" data-req>Request</button></div>')

live=[i for i in I if i[5]!='soon']; soon=[i for i in I if i[5]=='soon']
conn=[i for i in I if i[5] in ('connected','built-in')]
groups=''
for g,label,sub in G:
    its=sorted([i for i in I if i[4]==g], key=is_later)  # Coming soon rows go last
    groups+=(f'<div class="mt-7" data-sec="{g}"><h3 class="text-[13px] font-semibold text-slate-900">{label}</h3><p class="mt-0.5 mb-2 text-[12.5px] text-slate-500">{sub}</p>'
             f'<div class="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">'+''.join(card(i) for i in its)+'</div></div>')
conn=[i for i in I if i[5] in ('connected','built-in')]
nav_items=[('all','All',len(I)),('connected','Connected',len(conn)),None]+[(g,label,len([i for i in I if i[4]==g])) for g,label,sub in G]
def navrow(it):
    if it is None: return '<div class="my-2 border-t border-slate-200"></div>'
    k,l,n=it
    on=' on' if k=='all' else ''
    return f'<a class="nav-link{on} items-center justify-between cursor-pointer" style="display:flex" data-int-nav="{k}"><span>{l}</span><span class="text-[12px] text-slate-400">{n}</span></a>'
subnav=''.join(navrow(x) for x in nav_items)

LOGO='<svg width="28" height="28" viewBox="0 0 64 64"><defs><linearGradient id="nm-int-g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF7A4D"/><stop offset="45%" stop-color="#F59DA6"/><stop offset="100%" stop-color="#C5A6E8"/></linearGradient></defs><path d="M 8 8 H 56 V 56 H 8 Z M 34 14 V 30 H 50 V 14 Z" fill="url(#nm-int-g)" fill-rule="evenodd"/></svg>'

def toggle(on): 
    return f'<button type="button" class="shrink-0 w-9 h-5 rounded-full relative transition-colors {"bg-slate-900" if on else "bg-slate-300"}" data-tg aria-pressed="{"true" if on else "false"}"><span class="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all" style="left:{"18px" if on else "2px"}"></span></button>'
def check(on,label,sub=''):
    return (f'<label class="flex items-start gap-3 py-2.5 cursor-pointer"><input type="checkbox" class="mt-0.5 w-4 h-4 accent-slate-900" {"checked" if on else ""}>'
            f'<span class="flex-1"><span class="text-[13.5px] text-slate-900">{label}</span>'+(f'<span class="block text-[12px] text-slate-500 mt-0.5">{sub}</span>' if sub else '')+'</span></label>')
def radio(on,label,sub):
    return (f'<label class="flex items-start gap-3 py-2 cursor-pointer"><input type="radio" name="sf-scope" class="mt-0.5 w-4 h-4 accent-slate-900" {"checked" if on else ""}>'
            f'<span class="flex-1"><span class="text-[13.5px] text-slate-900">{label}</span><span class="block text-[12px] text-slate-500 mt-0.5">{sub}</span></span></label>')


# ── Screen 7 · States ──
def srow(name, ab, col, sub, right, sub_cls='text-slate-500'):
    subd = f'<div class="text-[12px] {sub_cls} mt-0.5 truncate">{sub}</div>' if sub else ''
    return (f'<div class="flex items-center gap-3 px-4 py-3">{logo(name,ab,col)}'
            f'<div class="flex-1 min-w-0"><div class="text-[13.5px] font-medium text-slate-900">{name}</div>{subd}</div>'
            f'<div class="flex items-center gap-3 shrink-0">{right}</div></div>')
def stat(dotc, txtc, label, spin=False):
    d = ('<span class="inline-block w-2.5 h-2.5 rounded-full border-2 border-brand-500 border-t-transparent animate-spin"></span>' if spin
         else f'<span class="w-1.5 h-1.5 rounded-full {dotc}"></span>')
    return f'<span class="flex items-center gap-1.5 text-[12.5px] {txtc}">{d}{label}</span>'
BTN = '<a class="btn-out" style="padding:3px 12px;font-size:12.5px">{}</a>'
BTN_DARK = '<a class="btn-out" style="padding:3px 12px;font-size:12.5px;background:#0f172a;color:#fff;border-color:#0f172a">{}</a>'
acct = '<span class="text-[12.5px] text-slate-400">2 accounts</span>'
ZM = ('Zoom','Zm','#2D8CFF')
ROWS = [
 ('Connected', srow(*ZM, '', acct + stat('bg-emerald-500','text-emerald-700','Connected') + BTN.format('Manage'))),
 ('Needs attention', srow(*ZM, '', acct + stat('bg-amber-500','text-amber-700','1 issue') + BTN.format('Manage'))),
 ('Reconnect needed · Zoom admin', srow(*ZM, 'Sign-in stopped working on Nov 2. Nothing new is coming in.', stat('bg-rose-500','text-rose-700','Reconnect needed') + BTN_DARK.format('Reconnect'), 'text-rose-700')),
 ('Reconnect needed · not a Zoom admin', srow(*ZM, 'Sign-in stopped working on Nov 2. Only a Zoom admin can reconnect.', stat('bg-rose-500','text-rose-700','Reconnect needed') + BTN.format('Ask Sam Kim'), 'text-rose-700')),
 ('Request sent', srow(*ZM, 'Asked Sam Kim (Zoom admin) to reconnect · Nov 5', stat('bg-rose-500','text-rose-700','Reconnect needed') + '<span class="text-[12.5px] text-slate-400">Request sent</span>', 'text-rose-700')),
 ('First sync', srow(*ZM, 'Bringing in past meetings · 124 of 412', stat('', 'text-brand-700', 'Syncing', spin=True) + BTN.format('Manage'))),
 ('Waiting for a Zoom admin', srow(*ZM, 'Connect link sent to it@acmegtm.com on Nov 4', stat('bg-slate-300','text-slate-500','Waiting for admin') + '<a class="text-[12.5px] font-medium text-brand-600 hover:text-brand-700 cursor-pointer">Resend</a>')),
 ('Not connected', srow('Google Meet','GM','#00897B', '', BTN.format('Connect'))),
 ('Coming soon', srow('Webex','Wx','#00A0D1', '', '<span class="text-[12.5px] text-slate-400">Coming soon</span><a class="text-[12.5px] font-medium text-brand-600 hover:text-brand-700 cursor-pointer">Request</a>')),
]
row_list = ''.join(f'<div class="grid grid-cols-[200px_minmax(0,1fr)] items-center gap-4"><div class="text-[12.5px] font-medium text-slate-500">{lab}</div>'
                   f'<div class="rounded-xl border border-slate-200 bg-white">{html}</div></div>' for lab, html in ROWS)
banner = ('<div class="rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-3 flex items-center gap-3">'
          '<span class="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>'
          '<p class="flex-1 text-[13px] text-amber-900"><span class="font-medium">Zoom needs attention.</span> Participant list permission missing on Acme APAC.</p>'
          '<a href="#integration-detail" class="btn-out" style="padding:3px 12px;font-size:12.5px">Fix</a></div>')
banner2 = ('<div class="rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-3 flex items-start gap-3">'
           '<span class="mt-[7px] w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>'
           '<div class="flex-1 text-[13px] text-amber-900"><div class="font-medium">2 integrations need attention</div>'
           '<div class="mt-1 space-y-0.5 text-[12.5px]"><div>Zoom · Participant list permission missing on Acme APAC</div><div>Google Calendar · Sign-in stopped working on Nov 2</div></div></div>'
           '<a href="#integration-detail" class="btn-out shrink-0" style="padding:3px 12px;font-size:12.5px">Fix first</a></div>')
page_issue = ('<div class="rounded-xl border border-slate-200 bg-white p-6 shadow-card">'
              '<div class="flex items-center justify-between gap-4"><h1 class="text-[20px] font-semibold tracking-tight text-slate-900">Integrations</h1>'
              '<div class="search" style="width:220px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 shrink-0" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input class="flex-1 bg-transparent outline-none placeholder:text-slate-400" placeholder="Search integrations…" /></div></div>'
              '<div class="mt-2 border-b border-slate-200"></div>'
              '<div class="mt-6"><h3 class="text-[13px] font-semibold text-slate-900">Transcripts</h3><p class="mt-0.5 mb-2 text-[12.5px] text-slate-500">Transcripts for meetings and calls</p>'
              '<div class="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">'
              + ROWS[1][1] + srow('Google Meet','GM','#00897B','',BTN.format('Connect')) + srow('Microsoft Teams','MT','#5B5FC7','',BTN.format('Connect'))
              + '</div></div>'
              '<p class="mt-4 text-[12px] text-slate-400">The row says there’s an issue. Manage opens the detail page, which says what broke and how to fix it.</p></div>')
empty = ('<div class="rounded-xl border border-slate-200 bg-white p-6 shadow-card">'
         '<div class="text-[16px] font-semibold text-slate-900">Bring in your first conversations</div>'
         '<p class="mt-1 text-[13px] text-slate-500">Connect your meeting tool. Neuma turns what’s said into Contexts.</p>'
         '<div class="mt-5 rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">'
         + srow(*ZM, 'Recordings and transcripts', BTN_DARK.format('Connect'))
         + srow('Google Meet','GM','#00897B','Recordings and transcripts', BTN.format('Connect'))
         + srow('Microsoft Teams','MT','#5B5FC7','Recordings and transcripts', BTN.format('Connect'))
         + '</div><a class="mt-3 inline-block text-[12.5px] font-medium text-brand-600 hover:text-brand-700 cursor-pointer">See all integrations →</a>'
         '<p class="mt-4 text-[12px] text-slate-400">First visit, nothing connected. Meeting tools come first because they feed every Context.</p></div>')
S7_STATES = f'''
<!-- ═════════════════════  SCREEN 7.2 — INTEGRATIONS · ALL · STATES  ═════════════════════ -->
<section id="integrations-states" class="max-w-[1440px] mx-auto px-8 pt-12 pb-12">
  <div class="flex items-end justify-between mb-4 gap-8">
    <div class="shrink-0"><div class="eyebrow">Screen 7.2</div><h2 class="text-[22px] font-semibold tracking-tight mt-1">Integrations · All · States</h2></div>
    <div class="text-sm text-slate-500 max-w-[760px] text-right">How a row looks in each state, and the page when something breaks. The detail page says what broke and which account. First-time setup lives in onboarding.</div>
  </div>
  <div class="max-w-[1000px]"><div class="text-[13px] font-semibold text-slate-900 mb-2">Row states</div><div class="space-y-2.5">{row_list}</div></div>
  <div class="mt-10 max-w-[1000px]"><div class="text-[13px] font-semibold text-slate-900 mb-2">Page with an issue</div>{page_issue}</div>
</section>
'''

exec(open(os.path.join(HERE,'integrations_detail.py'),encoding='utf-8').read())
DETAIL=build(LOGO, logo, toggle)
_i=DETAIL.index('\n<!-- ═════════════════════  SCREEN 7.4')
D72, DREST = DETAIL[:_i], DETAIL[_i:]
page=f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=1440" />
<title>Neuma · Integrations</title>
<script src="https://cdn.tailwindcss.com"></script>
<script src="shared/tailwind-config.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Geist:wght@500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="shared/neuma.css">
<style>
  /* ── Screen 7 · Integrations ── */
  .nav-link.on {{ background:#fff; border:1px solid #e2e8f0; box-shadow:0 1px 2px rgb(0 0 0 / .04); font-weight:500; }}
  [data-int].is-hidden, [data-sec].is-hidden {{ display:none; }}
  section[id] {{ scroll-margin-top:64px; }}
</style>
</head>
<body class="antialiased">
<script>document.write('<scr'+'ipt src="shared/nav.js?t='+Date.now()+'"></scr'+'ipt>')</script>

<!-- ═════════════════════  SCREEN 7 — INTEGRATIONS  ═════════════════════ -->
<section id="integrations" class="max-w-[1440px] mx-auto px-8 pt-12 pb-12">
  <div class="flex items-end justify-between mb-4 gap-8">
    <div class="shrink-0"><div class="eyebrow">Screen 7</div><h2 class="text-[22px] font-semibold tracking-tight mt-1">Integrations · All</h2></div>
    <div class="text-sm text-slate-500 max-w-[760px] text-right">Connect where your conversations happen. Neuma brings them into Contexts. Pick a category on the left to narrow the list. When people have connected a tool for themselves, its row says how many, as on Granola. Click the count to see who and remove a connection.</div>
  </div>

  <div class="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-card">
    <div class="flex min-h-[820px]">
      <aside class="w-[240px] border-r border-slate-200 bg-slate-50/50 px-4 pt-8 pb-6 flex flex-col">
        <div class="flex items-center gap-2 mb-8 px-2">{LOGO}<div class="nm-wordmark text-[18px]">neuma</div></div>
        <nav class="flex flex-col gap-0.5">
          <a class="nav-link" href="contexts.html">Contexts</a>
          <a class="nav-link" href="settings.html">Settings</a>
        </nav>
        <div class="mt-auto pt-4 border-t border-slate-200">
          <div class="w-full flex items-center gap-2 text-xs px-2 py-1.5">
            <div class="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-pink-500 flex items-center justify-center text-white text-[11px] font-semibold shrink-0">JK</div>
            <div class="flex-1 min-w-0"><div class="font-medium text-slate-800 truncate">Jared K.</div><div class="text-slate-500 truncate">acmegtm.com</div></div>
          </div>
        </div>
      </aside>

      <main class="flex-1 min-w-0 flex">
        <nav class="w-[210px] shrink-0 border-r border-slate-200 px-3 pt-10 pb-6">
          <div class="px-2 mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">Categories</div>
          <div class="flex flex-col gap-0.5">{subnav}</div>
        </nav>
        <div class="flex-1 min-w-0 px-10 pt-10 pb-14"><div class="max-w-[760px]">
        <div class="flex items-center justify-between gap-4">
          <div><h1 class="text-[22px] font-semibold tracking-tight text-slate-900">Integrations</h1><p class="mt-1 text-[13px] text-slate-500">Connect tools for the whole company. For just you, use <a href="settings.html#settings" class="font-medium text-brand-600 hover:text-brand-700">Your connections</a>.</p></div>
          <div class="search" style="width:240px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 shrink-0" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input class="flex-1 bg-transparent outline-none placeholder:text-slate-400" placeholder="Search integrations…" data-int-search /></div>
        </div>
        <div class="mt-5 border-b border-slate-200"></div>
        {groups}
        </div></div>
      </main>
    </div>
  </div>
</section>

{D72}
{S7_STATES}
<!-- ═════════════════════  SCREEN 7.3 — INTEGRATIONS · CONNECT  ═════════════════════ -->
<section id="integrations-connect" data-later class="max-w-[1440px] mx-auto px-8 pt-12 pb-12">
  <div class="flex items-end justify-between mb-4 gap-8">
    <div class="shrink-0"><div class="eyebrow">Screen 7.3</div><h2 class="text-[22px] font-semibold tracking-tight mt-1">Integrations · Connect</h2></div>
    <div class="text-sm text-slate-500 max-w-[760px] text-right">Salesforce as the example. Sign in, choose which accounts become Contexts, and see the result before anything happens. Accounts, contacts and deals always come in together.</div>
  </div>
  <div class="grid grid-cols-[560px_1fr] gap-8 items-start">
    <div class="rounded-2xl border border-slate-200 bg-white shadow-card overflow-hidden">
      <div class="px-7 pt-6 pb-5 border-b border-slate-200 flex items-center gap-3">{logo('Salesforce','Sf','#00A1E0')}<div class="flex-1"><h2 class="text-[17px] font-semibold tracking-tight text-slate-900">Connect Salesforce</h2><p class="text-[12.5px] text-slate-500 mt-0.5">Create a Context for each account.</p></div><span class="text-slate-400 text-[18px]">×</span></div>
      <div class="px-7 py-6 space-y-7">
        <div>
          <div class="eyebrow mb-2">1 · Account</div>
          <div class="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13px]"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span class="text-slate-900">Signed in as jared@acmegtm.com</span><a class="ml-auto text-[12.5px] text-slate-500 hover:text-slate-900 cursor-pointer">Change</a></div>
        </div>
        <div>
          <div class="eyebrow mb-2">2 · What Neuma reads</div>
          <p class="text-[13.5px] text-slate-900">Accounts, contacts and open deals.</p>
          <p class="mt-1 text-[12.5px] text-slate-500">Read only. Neuma never changes anything in Salesforce.</p>
        </div>
        <div>
          <div class="eyebrow mb-1">3 · Which accounts become Contexts</div>
          {radio(True,'Accounts you’ve met with <span class="ml-1.5 align-middle text-[11px] font-medium text-brand-700 bg-brand-50 rounded px-1.5 py-px">Recommended</span>','A meeting in the last 90 days')}
          {radio(False,'Custom','Choose with filters')}
          <p class="mt-2 text-[12px] text-slate-500">New accounts that match get a Context automatically.</p>
        </div>
        <div>
          <div class="eyebrow mb-2">4 · Past meetings</div>
          <div class="flex items-center gap-3"><span class="flex-1 text-[13px] text-slate-700">Add matching meetings from the last</span><select class="text-[12.5px] text-slate-700 border border-slate-200 rounded-md pl-2.5 pr-7 py-1.5 bg-white"><option>90 days</option><option>30 days</option><option>180 days</option><option>None</option></select></div>
          <p class="mt-1.5 text-[12px] text-slate-500">Fetched from Zoom, Teams and Meet, then kept in each account’s Context.</p>
        </div>
        <div class="rounded-lg bg-brand-50/60 border border-brand-100 px-4 py-3 text-[13px] leading-[1.55] text-slate-700">Neuma will create <b>46 Contexts</b>, one per account. Each is private to its account owner until they share it.</div>
      </div>
      <div class="px-7 py-4 border-t border-slate-200 flex items-center justify-end gap-2"><button class="btn-out">Cancel</button><button class="btn-out" style="background:#0f172a;color:#fff;border-color:#0f172a">Connect Salesforce</button></div>
    </div>
    <div class="rounded-xl border border-slate-200 bg-white p-5 max-w-[380px]">
      <div class="eyebrow">How connecting works</div>
      <ul class="mt-3 space-y-3 text-[13px] leading-[1.55] text-slate-600">
        <li><span class="font-medium text-slate-900">Preview first.</span> Nothing is created until you connect.</li>
        <li><span class="font-medium text-slate-900">Private by default.</span> New Contexts follow the same sharing rules as any other.</li>
        <li><span class="font-medium text-slate-900">Read only.</span> Neuma never writes to Salesforce.</li>
      </ul>
    </div>
  </div>
</section>

'''+DREST+f'''<script>
// Screen 7 · Category nav, search, toggles
(function(){{
  var navs=document.querySelectorAll('[data-int-nav]'), search=document.querySelector('[data-int-search]'), cur='all';
  function apply(){{
    var q=(search.value||'').toLowerCase();
    document.querySelectorAll('#integrations [data-int]').forEach(function(el){{
      var ok = cur==='all' || (cur==='connected' ? el.dataset.st!=='available' : el.dataset.grp===cur);
      el.classList.toggle('is-hidden', !(ok && el.dataset.name.indexOf(q)>-1));
    }});
    document.querySelectorAll('#integrations [data-sec]').forEach(function(sec){{
      sec.classList.toggle('is-hidden', !sec.querySelector('[data-int]:not(.is-hidden)'));
    }});
  }}
  navs.forEach(function(t){{ t.addEventListener('click',function(){{ navs.forEach(function(x){{x.classList.remove('on');}}); t.classList.add('on'); cur=t.dataset.intNav; apply(); }}); }});
  search.addEventListener('input',apply);
  document.querySelectorAll('[data-tg]').forEach(function(b){{ b.addEventListener('click',function(){{
    var on=b.getAttribute('aria-pressed')!=='true'; b.setAttribute('aria-pressed',on);
    b.classList.toggle('bg-slate-900',on); b.classList.toggle('bg-slate-300',!on); b.firstElementChild.style.left=on?'18px':'2px'; }}); }});
}})();
</script>
</body>
</html>
'''
OUT = os.path.join(ROOT, 'integrations.html')
if os.path.exists(OUT) and '--no-backup' not in sys.argv:
    subprocess.run([sys.executable, os.path.join(HERE, 'snapshot.py'), 'integrations'], cwd=ROOT, check=True)
import os as _os, sys as _sys; _sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
import int_personal
page = int_personal.apply(page)
open(OUT, 'w', encoding='utf-8').write(page)
print('Built integrations.html')
print(len(page))
