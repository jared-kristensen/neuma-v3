def build(LOGO, logo, toggle):
    def btn(t, primary=False, small=True):
        st = 'padding:3px 12px;font-size:12.5px' if small else ''
        if primary:
            st += ';background:#0f172a;color:#fff;border-color:#0f172a'
        return f'<button class="btn-out shrink-0" style="{st}">{t}</button>'

    def dot(c):
        return f'<span class="w-1.5 h-1.5 rounded-full {c} shrink-0"></span>'

    def check(on, label, sub=''):
        return (f'<label class="flex items-start gap-3 py-2.5 cursor-pointer"><input type="checkbox" class="mt-0.5 w-4 h-4 accent-slate-900" {"checked" if on else ""}>'
                f'<span class="flex-1"><span class="text-[13.5px] text-slate-900">{label}</span>' + (f'<span class="block text-[12px] text-slate-500 mt-0.5">{sub}</span>' if sub else '') + '</span></label>')

    def radio(on, label, sub, name):
        return (f'<label class="flex items-start gap-3 py-2 cursor-pointer"><input type="radio" name="{name}" class="mt-0.5 w-4 h-4 accent-slate-900" {"checked" if on else ""}>'
                f'<span class="flex-1"><span class="text-[13.5px] text-slate-900">{label}</span><span class="block text-[12px] text-slate-500 mt-0.5">{sub}</span></span></label>')

    def swrow(label, sub, on):
        return f'<div class="flex items-center gap-3 py-3"><div class="flex-1"><div class="text-[13.5px] text-slate-900">{label}</div><div class="text-[12px] text-slate-500 mt-0.5">{sub}</div></div>{toggle(on)}</div>'

    def hdr(n, t, d, id_):
        return (f'<section id="{id_}" class="max-w-[1440px] mx-auto px-8 pt-12 pb-12"><div class="flex items-end justify-between mb-4 gap-8">'
                f'<div class="shrink-0"><div class="eyebrow">Screen {n}</div><h2 class="text-[22px] font-semibold tracking-tight mt-1">{t}</h2></div>'
                f'<div class="text-sm text-slate-500 max-w-[760px] text-right">{d}</div></div>')

    def frame(inner, overlay=''):
        return ('<div class="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-card"><div class="flex min-h-[760px]">'
                '<aside class="w-[240px] border-r border-slate-200 bg-slate-50/50 px-4 pt-8 pb-6 flex flex-col">'
                f'<div class="flex items-center gap-2 mb-8 px-2">{LOGO}<div class="nm-wordmark text-[18px]">neuma</div></div>'
                '<nav class="flex flex-col gap-0.5"><a class="nav-link" href="contexts.html">Contexts</a><a class="nav-link" href="settings.html">Settings</a></nav><div class="mt-auto pt-4 border-t border-slate-200"><div class="w-full flex items-center gap-2 text-xs px-2 py-1.5"><div class="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-pink-500 flex items-center justify-center text-white text-[11px] font-semibold shrink-0">JK</div><div class="flex-1 min-w-0"><div class="font-medium text-slate-800 truncate">Jared K.</div><div class="text-slate-500 truncate">acmegtm.com</div></div></div></div></aside>'
                f'<main class="flex-1 min-w-0 px-12 pt-10 pb-14"><div class="max-w-[760px] mx-auto">{inner}</div></main></div>{overlay}</div>')

    def h3(t, right=''):
        return f'<div class="mt-9 flex items-end justify-between"><h3 class="text-[13px] font-semibold text-slate-900">{t}</h3>{right}</div>'

    zoom = logo('Zoom', 'Zm', '#2D8CFF')

    # ── 7.2 Detail ──
    GRID = 'grid grid-cols-[minmax(0,1fr)_190px_150px] gap-4 items-center'
    def tlink(t, c='text-slate-400 hover:text-slate-700'):
        return f'<button class="shrink-0 text-[12.5px] {c}">{t}</button>'

    def acc_tag(email):
        return f'<span class="text-[11.5px] text-slate-500 bg-slate-100 rounded px-1.5 py-px whitespace-nowrap">{email}</span>'

    V2 = False
    GRID = 'grid grid-cols-[minmax(0,1fr)_128px_80px_176px_24px] gap-4 items-center'
    TSTAT = {'READY': ('Ready', 'bg-emerald-500', 'text-slate-600'),
             'WAIT': ('Waiting on Zoom', 'bg-brand-500', 'text-slate-600'),
             'NOTREC': ('No transcript', 'bg-slate-300', 'text-slate-400')}
    CTX_ICON = {'Founder conversations': '🧭', 'Acme': '🏢', 'Design partners': '🤝', 'Q4 pipeline': '📈', 'Adelaide Festival Centre': '🎭'}
    EXT = '<svg class="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .41.34.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.19 12.75a.75.75 0 001.06.06l7.25-6.6v1.54a.75.75 0 001.5 0v-3.5a.75.75 0 00-.75-.75h-3.5a.75.75 0 000 1.5h1.54l-7.04 6.4a.75.75 0 00-.06 1.06z" clip-rule="evenodd"/></svg>'
    import html as _html
    def rm_copy(t, status, ctxs):
        where = f' from {ctxs[0]}' + (f' and {len(ctxs)-1} more' if len(ctxs) > 1 else '') if ctxs else ''
        if status == 'READY':
            a_, i_ = (len(t) % 4) + 1, len(t) % 2
            got = f'{a_} action{"s" if a_ != 1 else ""}' + (f' and {i_} issue' if i_ else '')
            out = f'Its transcript and the {got} from it are deleted{where}.' if ctxs else 'Its transcript is deleted.'
        elif status == 'WAIT':
            out = 'Its details are deleted, and Neuma won’t fetch its transcript.'
        else:
            out = 'Its details are deleted. There was no transcript.'
        series = any(w in t.lower() for w in ('weekly', 'sync', 'stand-up', 'check-in'))
        return out + ' It stays in Zoom.', series
    MORE_SVG = '<svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><circle cx="4" cy="10" r="1.5"/><circle cx="10" cy="10" r="1.5"/><circle cx="16" cy="10" r="1.5"/></svg>'
    def mrow(t, host, when, length, status, ctxs, acct=''):
        lab, dcls, tcls = TSTAT[status]
        st = f'<span class="flex items-center gap-1.5 text-[12.5px] {tcls} whitespace-nowrap">{dot(dcls)}{lab}</span>'
        st = f'<div class="flex items-center">{st}</div>'
        if ctxs:
            more = f'<span class="text-[11.5px] font-medium text-slate-500 bg-slate-100 rounded px-1.5 py-px shrink-0">+{len(ctxs)-1}</span>' if len(ctxs) > 1 else ''
            ic = CTX_ICON.get(ctxs[0], '')
            ctx = (f'<div class="flex items-center gap-1.5 min-w-0"><a href="context.html" onclick="event.stopPropagation()" class="text-[13px] text-slate-700 hover:text-slate-900 hover:underline truncate">{ic} {ctxs[0]}</a>{more}</div>')
        else:
            ctx = '<div class="whitespace-nowrap"><a data-add-ctx onclick="event.stopPropagation()" class="text-[12.5px] font-medium text-brand-600 hover:text-brand-700 cursor-pointer">+ Add to Context</a></div>'
        tip = (f'<span class="pointer-events-none absolute left-0 bottom-full z-30 mb-1.5 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-[opacity,visibility] duration-150 group-hover:delay-500 w-max max-w-[320px] rounded-md bg-slate-900 px-2.5 py-1.5 text-[11.5px] leading-[1.45] text-white shadow-lg">'
               f'<span class="block font-medium">{t}</span><span class="block text-white/70">Host {host} · {length}</span></span>')
        ready = True
        rowcls = ' group/row hover:bg-slate-50 transition-colors'
        click = ''
        rmtext, series = rm_copy(t, status, ctxs)
        arrow = ('<span class="relative flex items-center justify-end gap-1.5">'
                 ''
                 '<button data-row-more onclick="event.stopPropagation()" class="w-6 h-6 -mr-1 rounded-md flex items-center justify-center text-slate-400 opacity-0 group-hover/row:opacity-100 hover:bg-slate-200/70 hover:text-slate-700 transition-opacity" aria-label="More">' + MORE_SVG + '</button>'
                 '<span data-row-menu class="hidden absolute right-0 top-full mt-1 z-30 w-max rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">'
                 '<a href="https://zoom.us/meeting" target="_blank" rel="noopener" onclick="event.stopPropagation()" class="block w-full text-left whitespace-nowrap px-3 py-2 rounded-md text-[13px] text-slate-900 hover:bg-slate-50">View in Zoom</a>'
                 '<div class="my-1 border-t border-slate-100"></div>'
                 '<button data-row-remove onclick="event.stopPropagation()" class="block w-full text-left whitespace-nowrap px-3 py-2 rounded-md text-[13px] font-medium text-rose-600 hover:bg-rose-50">Remove from Neuma</button></span></span>') if ready else '<span></span>'
        dattr = f' data-m-title="{_html.escape(t)}" data-m-out="{_html.escape(rmtext)}" data-m-series="{1 if series else 0}"'
        return (f'<div class="{GRID} relative px-4 py-3{rowcls}"{dattr}{click}><div class="min-w-0 flex items-center"><div class="group relative max-w-full">'
                f'<div class="text-[13.5px] leading-[1.35] font-medium text-slate-900 line-clamp-2">{t}</div>{tip}</div></div>'
                f'{st}'
                f'<div class="text-[12.5px] leading-[1.35] whitespace-nowrap"><div class="text-slate-700">{when.split(" · ")[0]}</div><div class="text-slate-500">{when.split(" · ")[1]}</div></div>'
                f'{ctx}{arrow}</div>')
    meet_head = (f'<div class="{GRID} px-4 py-2 text-[11.5px] font-medium text-slate-400 bg-slate-50/70 rounded-t-xl">'
                 '<div>Meeting</div><div>Transcript</div><div>When</div><div>Context</div><div></div></div>')


    ACC = [
        dict(name='Acme GTM', domain='acmegtm.com', by='Connected by Sam K. (Zoom admin) on Sep 12', covered=14, ext=True, blocked=3, n=38, past=412, last='5 mins ago',
             meet=[(0, 'Neuma founders sync', 'Jared Kristensen', 'Nov 5 · 10:00am', '45 min', 'WAIT', ['Founder conversations']),
                   (2, 'Design partner shortlist and pricing review for Q1 pilots', 'Jared Kristensen', 'Nov 3 · 4:00pm', '30 min', 'READY', ['Design partners', 'Acme']),
                   (3, 'Weekly pipeline review', 'Sam Kim', 'Nov 3 · 9:00am', '30 min', 'NOTREC', ['Q4 pipeline']),
                   (5, 'AFC × AREP check-in', 'Jared Kristensen', 'Oct 30 · 10:00am', '1 hr', 'READY', ['Adelaide Festival Centre'])],
             other=True, words=['Personal', 'Interview', 'Reference check'], series=['Board prep · Weekly'],
             just_added=('Reference check', 3)),
        dict(name='Acme APAC', domain='acme-apac.com', by='Connected by Priya R. (Zoom admin) on Oct 20', covered=5, ext=False, blocked=0, n=22, past=240, last='12 mins ago',
             meet=[(1, 'Acme × Neuma weekly check-in · onboarding and data import', 'Priya Rao', 'Nov 4 · 2:30pm', '30 min', 'READY', ['Acme']),
                   (4, 'Intro call with Brightline', 'Priya Rao', 'Oct 31 · 11:00am', '25 min', 'READY', []),
                   (6, 'Acme pricing follow-up', 'Priya Rao', 'Oct 28 · 3:00pm', '40 min', 'READY', ['Acme', 'Founder conversations'])],
             other=False, words=['Personal', 'Interview'], series=[], just_added=None),
    ]
    TOT = dict(n=60, read=58, nctx=9, last='5 mins ago', acts=67, decs=17, iss=16)
    ATT = [
        dict(t='Permission missing: Participant list', acc=1,
             d='Without it, meetings come in without attendee names, so people aren’t matched to Contexts.',
             acts=btn('Reconnect'), fix='', fixlink=''),
    ]

    def tilebox(label, val, sub, href=''):
        if href:
            return (f'<a href="{href}" class="group block rounded-xl border border-slate-200 px-4 py-3.5 hover:border-slate-300 hover:bg-slate-50/60 transition-colors">'
                    f'<div class="flex items-center justify-between text-[12px] text-slate-500">{label}<span class="text-slate-400 group-hover:text-slate-700">→</span></div>'
                    f'<div class="mt-1 text-[20px] font-semibold text-slate-900 whitespace-nowrap">{val}</div><div class="text-[12px] text-slate-400">{sub}</div></a>')
        return (f'<div class="rounded-xl border border-slate-200 px-4 py-3.5"><div class="text-[12px] text-slate-500">{label}</div>'
                f'<div class="mt-1 text-[20px] font-semibold text-slate-900 whitespace-nowrap">{val}</div><div class="text-[12px] text-slate-400">{sub}</div></div>')

    def chip(t):
        return f'<span class="inline-flex items-center gap-1 text-[12.5px] text-slate-700 bg-slate-100 rounded-md px-2 py-0.5">{t}<span class="text-slate-400 cursor-pointer">×</span></span>'

    def chiprow(label, sub, items, add, just=None):
        chips = ''.join(chip(x) for x in items)
        note = ''
        if just:
            note = (f'<div class="mt-2.5 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2.5">'
                    f'<p class="text-[12.5px] leading-[1.5] text-slate-700">“{just[0]}” added. {just[1]} meetings already brought in match it. Remove them and what came out of them?</p>'
                    f'<div class="mt-2 flex items-center gap-3">{btn(f"Remove {just[1]}")}{tlink("Keep them")}</div></div>')
        addl = f'<a class="text-[12.5px] font-medium text-brand-600 hover:text-brand-700 cursor-pointer">+ {add}</a>'
        return (f'<div class="py-3"><div class="text-[13.5px] text-slate-900">{label}</div><div class="text-[12px] text-slate-500 mt-0.5">{sub}</div>'
                f'<div class="mt-2 flex flex-wrap items-center gap-1.5">{chips}{addl}</div>{note}</div>')

    def grouplabel(t):
        return f'<div class="pt-3 pb-1 text-[11.5px] font-medium uppercase tracking-wider text-slate-400">{t}</div>'

    def att_row(x):
        fix = ''
        if x['fix']:
            fix = (f'<div class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-slate-500">{x["fix"]}'
                   f'<a class="font-medium text-brand-600 hover:text-brand-700 cursor-pointer whitespace-nowrap">{x["fixlink"]} →</a></div>')
        return (f'<div class="px-4 py-3.5"><div class="flex items-center gap-4"><div class="flex-1 min-w-0">'
                f'<div class="flex items-center gap-2 min-w-0"><span class="text-[13.5px] font-medium text-slate-900 truncate">{x["t"]}</span>{acc_tag(ACC[x["acc"]]["name"])}</div>'
                f'<div class="mt-0.5 text-[12.5px] text-slate-500">{x["d"]}</div></div><div class="flex items-center gap-3 shrink-0">{x["acts"]}</div></div>{fix}</div>')

    # Recent meetings, filtered by account
    def meet_panel(key, rows, n, hidden):
        hide = ' style="display:none"' if hidden else ''
        body = ''.join(rows)
        foot = f'<a href="#integration-meetings" class="block px-4 py-2.5 text-[12.5px] font-medium text-brand-600 hover:text-brand-700 cursor-pointer">Show all meetings →</a>'
        return f'<div data-meet-panel="{key}"{hide} class="mt-2 rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">{meet_head}{body}{foot}</div>'
    def make_meet_panels():
        all_rows = sorted([(m[0], mrow(*m[1:], acct=a['name'])) for a in ACC for m in a['meet']])[:5]
        return (meet_panel('all', [r for _, r in all_rows], TOT['n'], False)
                + ''.join(meet_panel(str(i), [mrow(*m[1:]) for m in a['meet']], a['n'], True) for i, a in enumerate(ACC)))
    meet_panels = make_meet_panels()

    chev = '<svg class="w-4 h-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/></svg>'
    tick = '<svg data-acc-tick class="w-4 h-4 text-slate-900" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.58l7.3-7.3a1 1 0 011.4 0z" clip-rule="evenodd"/></svg>'
    opts = [('all', 'All accounts', f'{TOT["n"]} meetings in 30 days', '')] + [(str(i), a['name'], f'{a["n"]} meetings in 30 days', dot('bg-emerald-500')) for i, a in enumerate(ACC)]
    menu_items = ''.join(
        f'<button data-acc-pick="{k}" class="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-50 text-left">'
        f'<span class="flex-1 min-w-0"><span data-acc-email class="block text-[13px] text-slate-900">{lbl}</span></span>'
        f'<span data-acc-tickslot class="w-4 h-4 flex">{tick if k == "all" else ""}</span></button>'
        for k, lbl, sub, d in opts)
    dropdown = ('<div class="relative inline-block" data-acc-dd>'
                f'<button data-acc-toggle class="btn-out inline-flex items-center gap-1" style="padding:3px 6px 3px 10px;font-size:12.5px"><span data-acc-label class="text-slate-700">All accounts</span>{chev}</button>'
                f'<div data-acc-menu class="hidden absolute right-0 top-full mt-1.5 w-max min-w-full whitespace-nowrap rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg z-20">{menu_items}</div></div>')

    acc_btn = '<button data-open-disc class="btn-out shrink-0 inline-flex items-center justify-center" style="padding-left:9px;padding-right:9px" aria-label="Zoom settings" title="Zoom settings"><svg class="w-[18px] h-[18px] text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 3.94c.09-.54.56-.94 1.11-.94h2.6c.55 0 1.02.4 1.11.94l.21 1.28c.06.37.31.68.65.87.08.04.15.09.23.13.33.2.74.26 1.09.13l1.22-.46c.51-.19 1.09.02 1.37.5l1.3 2.25c.27.48.16 1.08-.26 1.43l-1 .83c-.29.24-.43.6-.42.97a6.8 6.8 0 010 .26c-.01.37.13.73.42.97l1 .83c.42.35.53.95.26 1.43l-1.3 2.25c-.28.48-.86.69-1.37.5l-1.22-.46c-.35-.13-.75-.07-1.09.13l-.23.13c-.34.19-.59.5-.65.87l-.21 1.28c-.09.54-.56.94-1.11.94h-2.6c-.55 0-1.02-.4-1.11-.94l-.21-1.28c-.06-.37-.31-.68-.65-.87l-.23-.13c-.33-.2-.74-.26-1.09-.13l-1.22.46c-.51.19-1.09-.02-1.37-.5l-1.3-2.25c-.27-.48-.16-1.08.26-1.43l1-.83c.29-.24.43-.6.42-.97a6.8 6.8 0 010-.26c.01-.37-.13-.73-.42-.97l-1-.83a1.13 1.13 0 01-.26-1.43l1.3-2.25c.28-.48.86-.69 1.37-.5l1.22.46c.35.13.75.07 1.09-.13l.23-.13c.34-.19.59-.5.65-.87l.21-1.28z"/><circle cx="12" cy="12" r="3"/></svg></button>'
    STAYS = dict(company=['HR', 'Legal', 'Board', 'Reference check'], company_series=['Board prep · Weekly'],
                 just_added=('Reference check', 3), mine=['Personal'])
    BTN_SM = 'padding:3px 12px;font-size:12.5px'
    LOCK = '<svg class="w-3 h-3 text-slate-400 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z" clip-rule="evenodd"/></svg>'
    CHEV_R = '<svg class="w-4 h-4 text-slate-300 group-hover:text-slate-500 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.17 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"/></svg>'
    CLOSE_LIVE = '<button data-set-close class="w-8 h-8 -mr-2 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-50 text-[18px] leading-none" aria-label="Close">×</button>'
    CLOSE_STATIC = '<span class="w-8 h-8 -mr-2 flex items-center justify-center text-[18px] leading-none text-slate-400">×</span>'
    def SECTION(t):
        return f'<div class="mt-6 mb-2 text-[11.5px] font-medium uppercase tracking-wider text-slate-400">{t}</div>'

    def label_row(t, right=''):
        return f'<div class="pt-3 pb-1 flex items-center gap-1.5 text-[11.5px] font-medium uppercase tracking-wider text-slate-400">{t}{right}</div>'

    def lchip(t):
        return f'<span class="inline-flex items-center gap-1 text-[12.5px] text-slate-600 bg-slate-100 rounded-md px-2 py-0.5">{t}</span>'

    def lockedrow(label, sub, items):
        chips = ''.join(lchip(x) for x in items)
        return (f'<div class="py-3"><div class="text-[13.5px] text-slate-900">{label}</div><div class="text-[12px] text-slate-500 mt-0.5">{sub}</div>'
                f'<div class="mt-2 flex flex-wrap items-center gap-1.5">{chips}</div></div>')

    def role_pill(member):
        t = 'Member · view only' if member else 'Neuma admin'
        return f'<span class="ml-2 align-middle text-[11px] font-medium text-slate-600 bg-slate-100 rounded px-1.5 py-0.5">{t}</span>'

    def vhead(title, sub, live, back=True, pill=''):
        close = CLOSE_LIVE if live else CLOSE_STATIC
        if back:
            b = ('<button data-go="main" class="inline-flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-900">← Zoom settings</button>' if live
                 else '<span class="inline-flex items-center gap-1 text-[13px] text-slate-500">← Zoom settings</span>')
            return (f'<div class="flex items-center justify-between gap-4">{b}{close}</div>'
                    f'<div class="mt-3 mb-5"><div class="text-[16px] font-semibold text-slate-900">{title}</div><div class="text-[12.5px] text-slate-500 mt-0.5">{sub}</div></div>')
        subd = f'<div class="text-[12.5px] text-slate-500 mt-0.5">{sub}</div>' if sub else ''
        al = 'items-start' if sub else 'items-center'
        return (f'<div class="flex {al} justify-between gap-4 mb-1"><div><div class="text-[16px] font-semibold text-slate-900">{title}{pill}</div>'
                f'{subd}</div>{close}</div>')

    def navrow(title, sub, go, live, clickable=True, extra=''):
        subd = f'<div class="text-[12px] text-slate-500 mt-0.5">{sub}</div>' if sub else ''
        inner = (f'{extra}<div class="flex-1 min-w-0"><div class="text-[13.5px] text-slate-900">{title}</div>'
                 f'{subd}</div>')
        if clickable:
            attr = f' data-go="{go}"' if live else ''
            return f'<button{attr} class="group w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-slate-50">{inner}{CHEV_R}</button>'
        return f'<div class="flex items-center gap-3 px-4 py-3">{inner}</div>'

    # ── main view ──
    def acc_row(i, a, live, confirm=False):
        miss = ''
        hid = ' style="display:none"'
        o_attr = ' data-rm-open' if live else ''
        c_attr = ' data-rm-cancel' if live else ''
        return (f'<div data-rm class="px-4 py-3{" bg-rose-50/40" if confirm else ""}">'
                f'<div class="flex items-center gap-3"><span class="flex shrink-0">{dot("bg-amber-500" if i == 1 else "bg-emerald-500")}</span>'
                f'<div class="flex-1 min-w-0"><div class="text-[13.5px] text-slate-900">{a["name"]} <span class="text-slate-400">· {a["domain"]}</span></div>'
                f'<div class="text-[12px] text-slate-500 mt-0.5"><span data-acc-last="{i}">Synced {a["last"]}</span>{miss}</div></div>'
                f'<button{o_attr} class="shrink-0 text-[12.5px] font-medium text-rose-600 hover:text-rose-700"{hid if confirm else ""}>Disconnect</button></div>'
                f'<div data-rm-box class="mt-3"{"" if confirm else hid}>'
                f'<div class="text-[13px] font-medium text-slate-900">Disconnect {a["name"]}?</div>'
                '<p class="mt-1 text-[12.5px] leading-[1.55] text-slate-600">Neuma stops bringing in its meetings for everyone. What already came in stays in its Contexts.</p>'
                f'<div class="mt-2.5 flex items-center justify-end gap-2"><button{c_attr} class="btn-out shrink-0" style="{BTN_SM}">Cancel</button>'
                f'<button class="btn-out shrink-0" style="{BTN_SM};background:#e11d48;color:#fff;border-color:#e11d48">Disconnect</button></div></div></div>')

    def main_view(live=True, member=False, confirm=None):
        acc_rows = ''.join(acc_row(i, a, live, confirm == i) for i, a in enumerate(ACC))
        plus = '<span class="flex shrink-0 w-1.5 justify-center text-[15px] leading-none font-medium text-brand-600">+</span>'
        add = '' if member else navrow('<span class="font-medium text-brand-600">Add Zoom account</span>',
                                       '', 'add', False, extra=plus)
        n_co = len(STAYS['company']) + len(STAYS['company_series'])
        stays_sub = 'Exclude meetings by title, series or attendee'
        ret = (navrow('Data retention', 'Transcripts not in a Context are deleted after 30 days. Set by your Neuma admin.', 'retention', live, clickable=False) if member
               else navrow('Data retention', 'Transcripts not in a Context are deleted after 30 days', 'retention', live))
        log = '' if member else ' <a class="font-medium text-brand-600 hover:text-brand-700 cursor-pointer whitespace-nowrap">Access log →</a>'
        sub = 'Your Neuma admin manages these.' if member else ''
        return (vhead('Zoom settings', sub, live, back=False)
                + SECTION('Accounts')
                + f'<div class="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">{acc_rows}{add}</div>'
                + (('<div class="mt-3 rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">'
                    + navrow('Permissions', '<span class="text-amber-700">1 missing on Acme APAC</span>', 'perms', live,
                             extra=f'<span class="flex shrink-0">{dot("bg-amber-500")}</span>') + '</div>') if V2 else '')
                + SECTION('Privacy')
                + '<div class="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">'
                + navrow('What stays out', stays_sub, 'stays', live) + ret + '</div>'
                + f'<p class="mt-6 text-[12px] leading-[1.55] text-slate-500">Transcripts stay in Zoom, and Zoom decides who can open them. What Neuma pulls out follows each Context’s sharing. Neuma admins who are also Zoom admins see every meeting.</p>')

    # ── account view ──
    def acc_view(i, a, live=True, confirm=False):
        ext_sub = 'Captured live when the host’s Zoom allows it. Some hosts block it.'
        if a['ext'] and a['blocked']:
            ext_sub += f' {a["blocked"]} blocked in the last 30 days.'
        sync_attr = f' data-acc-sync="{i}"' if live else ''
        rm_attr = ' data-rm-open' if live else ''
        box_hide = '' if confirm else ' style="display:none"'
        link_hide = ' style="display:none"' if confirm else ''
        cancel_attr = ' data-rm-cancel' if live else ''
        return (vhead(a['name'], a['domain'], live)
                + '<div class="rounded-xl border border-slate-200 bg-white px-4 py-3 flex items-center gap-3">'
                f'<div class="flex-1 text-[13px] text-slate-700"><span data-acc-last="{i}">Synced {a["last"]}</span></div>'
                f'<button{sync_attr} class="btn-out shrink-0 inline-flex items-center gap-2" style="{BTN_SM}">Sync</button></div>'
                + '<div class="mt-3 rounded-xl border border-slate-200 bg-white divide-y divide-slate-100 px-4">'
                + grouplabel('What comes in')
                + swrow("Match meetings to Contexts", "Uses the title, series and attendees. Anything unmatched waits for you.", True)
                + swrow(f"Meetings hosted outside {a['name']}", ext_sub, a['ext'])
                + '</div>'
                + f'<p class="mt-4 text-[12px] leading-[1.55] text-slate-500">{a["by"]}. Covers {a["covered"]} Neuma members. Only meetings with a member are downloaded.</p>'
                + f'<div data-rm class="mt-8 pt-4 border-t border-slate-100">'
                f'<button{rm_attr} class="text-[13px] font-medium text-rose-600 hover:text-rose-700"{link_hide}>Remove this account</button>'
                f'<div data-rm-box class="rounded-xl border border-rose-200 bg-rose-50/40 px-4 py-3"{box_hide}>'
                f'<div class="text-[13.5px] font-medium text-slate-900">Remove {a["name"]}?</div>'
                '<p class="mt-1 text-[12.5px] leading-[1.55] text-slate-600">Neuma stops bringing in its meetings for everyone. What already came in stays in its Contexts.</p>'
                f'<div class="mt-2.5 flex items-center justify-end gap-2"><button{cancel_attr} class="btn-out shrink-0" style="{BTN_SM}">Cancel</button>'
                f'<button class="btn-out shrink-0" style="{BTN_SM};background:#e11d48;color:#fff;border-color:#e11d48">Remove</button></div></div></div>')

    # ── what stays out view ──
    def stays_view(live=True, member=False):
        def group(label, items, add, prompt=''):
            chips = ''.join(chip(x) for x in items)
            addl = f'<a class="text-[12.5px] font-medium text-brand-600 hover:text-brand-700 cursor-pointer">+ {add}</a>'
            return (f'<div class="py-4"><div class="text-[13.5px] font-medium text-slate-900">{label}</div>'
                    f'<div class="mt-2 flex flex-wrap items-center gap-1.5">{chips}{addl}</div>{prompt}</div>')
        w, n = STAYS['just_added']
        prompt = (f'<div class="mt-3 flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2">'
                  f'<p class="flex-1 text-[12.5px] text-slate-700">{n} meetings already in Neuma match “{w}”.</p>'
                  f'{btn("Remove them")}{tlink("Keep")}</div>')
        body = ('<div class="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100 px-4">'
                + group('Meeting titles containing', STAYS['company'], 'Add')
                + group('Meeting series', STAYS['company_series'], 'Add')
                + group('Attendee emails or domains', ['counsel@smithlegal.com', '@talentpartners.com'], 'Add')
                + '</div>')
        note = '<p class="mt-4 text-[12px] leading-[1.55] text-slate-500">Checked against the calendar invite and the meeting itself. Applies to new meetings only.</p>'
        return vhead('What stays out', 'Matching meetings never come into Neuma.', live) + body + note

    # ── retention view ──
    def retention_view(live=True):
        DEF = '<span class="text-[12px] text-slate-400">Default</span>'
        nm = 'ret' if live else 'ret-s'
        opts = ''.join(
            f'<label class="flex items-center gap-3 px-4 py-2.5 cursor-pointer"><input type="radio" name="{nm}" class="w-4 h-4 accent-slate-900" {"checked" if d == 30 else ""}>'
            f'<span class="text-[13.5px] text-slate-900">{d} days</span>{DEF if d == 30 else ""}</label>'
            for d in (7, 30, 60, 90))
        return (vhead('Data retention', 'Delete anything not in a Context after:', live)
                + f'<div class="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">{opts}</div>')

    PERMS = [('Cloud recordings', 'Audio and video of recorded meetings.'),
             ('Transcripts', 'Zoom’s transcripts. This is what Neuma reads.'),
             ('Meeting details', 'Titles, times and hosts.'),
             ('Participant list', 'Who was in each meeting. Neuma uses it to skip meetings with no Neuma member.')]
    OK = '<svg class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.58l7.3-7.3a1 1 0 011.4 0z" clip-rule="evenodd"/></svg>'
    WARN = '<svg class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.49 2.76a1.75 1.75 0 013.02 0l6.28 10.92A1.75 1.75 0 0116.28 16H3.72a1.75 1.75 0 01-1.51-2.32L8.49 2.76zM10 7a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 0110 7zm0 7a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/></svg>'
    def perms_view(live=True):
        out = vhead('Permissions', 'What Neuma can read from each Zoom account.', live)
        for i, a in enumerate(ACC):
            rows = ''
            for name, desc in PERMS:
                missing = (i == 1 and name == 'Participant list')
                if missing:
                    rows += (f'<div class="flex items-start gap-3 py-3">{WARN}<div class="flex-1"><div class="text-[13.5px] text-slate-900">{name}</div>'
                             f'<div class="text-[12px] text-slate-500 mt-0.5">{desc}</div>'
                             '<div class="mt-1.5 text-[12px] text-amber-800">Missing. New meetings from this account are on hold until it’s allowed.</div>'
                             '<a class="mt-1.5 inline-block text-[12.5px] font-medium text-brand-600 hover:text-brand-700 cursor-pointer">Ask Priya R. (Zoom admin) to allow it →</a></div></div>')
                else:
                    rows += (f'<div class="flex items-start gap-3 py-3">{OK}<div class="flex-1"><div class="text-[13.5px] text-slate-900">{name}</div>'
                             f'<div class="text-[12px] text-slate-500 mt-0.5">{desc}</div></div></div>')
            out += (f'<div class="{"mt-6" if i else ""} mb-2 text-[11.5px] font-medium uppercase tracking-wider text-slate-400">{a["name"]}</div>'
                    f'<div class="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100 px-4">{rows}</div>')
        return out


    def readers_view(tool, live=True, nm='rd'):
        opts = [(f'Same as {tool}', f'People can read the transcripts {tool} lets them open.', True),
                ('Everyone in the meeting', 'Anyone who joined can read the transcript.', False),
                ('Host only', 'Only the host can read the transcript.', False)]
        DEFT = '<span class="ml-2 text-[12px] text-slate-400">Default</span>'
        rows = ''.join(
            f'<label class="flex items-start gap-3 px-4 py-3 cursor-pointer"><input type="radio" name="{nm}" class="mt-0.5 w-4 h-4 accent-slate-900"{" checked" if on else ""}>'
            f'<span class="flex-1"><span class="text-[13.5px] text-slate-900">{t}</span>{DEFT if on else ""}'
            f'<span class="block text-[12px] text-slate-500 mt-0.5">{sub}</span></span></label>' for t, sub, on in opts)
        back = 'Google' if tool == 'Meet' else tool
        return (vhead('Who can read transcripts', 'What Neuma pulls out follows each Context’s sharing.', live).replace('← Zoom settings', f'← {back} settings')
                + f'<div class="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">{rows}</div>')

    def views(live=True):
        out = f'<div data-view="main">{main_view(live)}</div>'
        if V2:
            out += f'<div data-view="perms" style="display:none">{perms_view(live)}</div>'
        out += f'<div data-view="stays" style="display:none">{stays_view(live)}</div>'
        out += f'<div data-view="retention" style="display:none">{retention_view(live)}</div>'
        return out

    def rm_modal(live=True, title='', out='', series=False):
        cancel = 'data-rmm-close ' if live else ''
        ok = 'data-rmm-ok ' if live else ''
        hide_box = '' if (series or live) else ' style="display:none"'
        box = (f'<label data-rmm-series class="mt-3 flex items-center gap-2 text-[12.5px] text-slate-700 cursor-pointer"{hide_box}>'
               '<input type="checkbox" class="w-4 h-4 accent-slate-900">Also leave out future meetings in this series</label>')
        return ('<div class="relative w-[420px] rounded-xl border border-slate-200 bg-white p-5 shadow-xl">'
                '<div class="text-[15px] font-semibold text-slate-900">Remove from Neuma?</div>'
                f'<div data-rmm-title class="mt-2 text-[13.5px] font-medium text-slate-900">{title}</div>'
                f'<p data-rmm-out class="mt-1 text-[12.5px] leading-[1.55] text-slate-600">{out}</p>'
                + box +
                f'<div class="mt-4 flex items-center justify-end gap-2"><button {cancel}class="btn-out shrink-0" style="{BTN_SM}">Cancel</button>'
                f'<button {ok}class="btn-out shrink-0" style="{BTN_SM};background:#e11d48;color:#fff;border-color:#e11d48">Remove</button></div></div>')
    def rm_overlay():
        return ('<div data-rmm class="hidden absolute inset-0 z-40 flex items-start justify-center pt-40">'
                '<div data-rmm-close class="absolute inset-0 bg-slate-900/20"></div>' + rm_modal() + '</div>')
    def rm_js(sid):
        return ('<script>(function(){var r=document.getElementById("' + sid + '");if(!r)return;var m=r.querySelector("[data-rmm]"),cur=null;'
                'function closeMenus(){r.querySelectorAll("[data-row-menu]").forEach(function(x){x.classList.add("hidden");});}'
                'r.querySelectorAll("[data-row-more]").forEach(function(b){b.addEventListener("click",function(e){e.stopPropagation();var mm=b.parentNode.querySelector("[data-row-menu]");var was=mm.classList.contains("hidden");closeMenus();if(was)mm.classList.remove("hidden");});});'
                'document.addEventListener("click",closeMenus);'
                'r.querySelectorAll("[data-row-remove]").forEach(function(b){b.addEventListener("click",function(e){e.stopPropagation();closeMenus();cur=b.closest("[data-m-title]");'
                'm.querySelector("[data-rmm-title]").textContent=cur.getAttribute("data-m-title");m.querySelector("[data-rmm-out]").textContent=cur.getAttribute("data-m-out");'
                'var sb=m.querySelector("[data-rmm-series]");sb.style.display=cur.getAttribute("data-m-series")==="1"?"":"none";sb.querySelector("input").checked=false;m.classList.remove("hidden");});});'
                'r.querySelectorAll("[data-rmm-close]").forEach(function(c){c.addEventListener("click",function(){m.classList.add("hidden");});});'
                'm.querySelector("[data-rmm-ok]").addEventListener("click",function(){if(cur)cur.remove();m.classList.add("hidden");});'
                'document.addEventListener("keydown",function(e){if(e.key==="Escape"){m.classList.add("hidden");closeMenus();}});})();</script>')
    # ── Add to Context + Add past meeting ──
    def ctx_modal(prov, nm, live=True, title='', series=True):
        close = 'data-ctx-close ' if live else ''
        ok = 'data-ctx-ok ' if live else ''
        opts = ''
        for i, c in enumerate(['Acme', 'Q4 pipeline', 'Design partners', 'Founder conversations']):
            chk = ' checked' if i == 1 else ''
            ic = CTX_ICON.get(c, '')
            opts += (f'<label class="flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-slate-50"><input type="radio" name="{nm}" class="w-4 h-4 accent-slate-900"{chk}>'
                     f'<span class="text-[13.5px] text-slate-900">{ic} {c}</span></label>')
        hide = '' if series else ' style="display:none"'
        ser = (f'<div data-ctx-series class="mt-4 rounded-lg bg-slate-50 px-3 py-3 space-y-2.5"{hide}>'
               '<label class="flex items-start gap-2.5 cursor-pointer"><input type="checkbox" checked class="mt-0.5 w-4 h-4 accent-slate-900"><span class="text-[13px] text-slate-900">Future meetings in this series go here too</span></label>'
               '<label class="flex items-start gap-2.5 cursor-pointer"><input type="checkbox" checked class="mt-0.5 w-4 h-4 accent-slate-900">'
               f'<span><span class="block text-[13px] text-slate-900">Also bring in past meetings from this series</span><span class="block text-[12px] text-slate-500 mt-0.5">Neuma fetches the 6 that {prov} still has.</span></span></label></div>')
        return ('<div class="relative w-[440px] rounded-xl border border-slate-200 bg-white p-5 shadow-xl">'
                '<div class="text-[15px] font-semibold text-slate-900">Add to Context</div>'
                f'<div data-ctx-title class="mt-1 text-[12.5px] text-slate-500">{title}</div>'
                '<div class="mt-4 rounded-lg border border-slate-200"><div class="px-3 py-2 border-b border-slate-100"><input type="text" placeholder="Search Contexts" class="w-full text-[13px] bg-transparent outline-none placeholder:text-slate-400"></div>'
                f'<div class="py-1">{opts}</div>'
                '<a class="block px-3 py-2 border-t border-slate-100 text-[12.5px] font-medium text-brand-600 hover:text-brand-700 cursor-pointer">+ New Context</a></div>'
                + ser +
                f'<div class="mt-4 flex items-center justify-end gap-2"><button {close}class="btn-out shrink-0" style="{BTN_SM}">Cancel</button>'
                f'<button {ok}class="btn-out shrink-0" style="{BTN_SM};background:#0f172a;color:#fff;border-color:#0f172a">Add</button></div></div>')
    def ctx_overlay(prov, nm):
        return ('<div data-ctxm class="hidden absolute inset-0 z-40 flex items-start justify-center pt-32">'
                '<div data-ctx-close class="absolute inset-0 bg-slate-900/20"></div>' + ctx_modal(prov, nm) + '</div>')
    def ctx_js(sid):
        return ('<script>(function(){var r=document.getElementById("' + sid + '");if(!r)return;var m=r.querySelector("[data-ctxm]");if(!m)return;var cur=null;'
                'r.querySelectorAll("[data-add-ctx]").forEach(function(a){a.addEventListener("click",function(e){e.stopPropagation();cur=a.closest("[data-m-title]");'
                'm.querySelector("[data-ctx-title]").textContent=cur?cur.getAttribute("data-m-title"):"";'
                'm.querySelector("[data-ctx-series]").style.display=(cur&&cur.getAttribute("data-m-series")==="1")?"":"none";m.classList.remove("hidden");});});'
                'r.querySelectorAll("[data-ctx-close]").forEach(function(c){c.addEventListener("click",function(){m.classList.add("hidden");});});'
                'm.querySelector("[data-ctx-ok]").addEventListener("click",function(){var lab=m.querySelector("input[type=radio]:checked");'
                'if(cur&&lab){var a=cur.querySelector("[data-add-ctx]");if(a){a.parentNode.innerHTML=\'<span class="text-[13px] text-slate-700">\'+lab.parentNode.querySelector("span").textContent+\'</span>\';}}m.classList.add("hidden");});'
                'document.addEventListener("keydown",function(e){if(e.key==="Escape")m.classList.add("hidden");});})();</script>')

    PAST = [('Acme × Neuma weekly check-in', 'Oct 7 · 2:30pm', 'Priya Rao', 'in'),
            ('Acme renewal kickoff', 'Oct 2 · 2:00pm', 'Sam Kim', 'add'),
            ('Acme × Neuma weekly check-in', 'Sep 30 · 2:30pm', 'Priya Rao', 'add'),
            ('Acme security questionnaire walkthrough', 'Sep 18 · 11:00am', 'Jared Kristensen', 'none')]
    def past_modal(live=True):
        close = 'data-past-close ' if live else ''
        add_attr = 'data-past-add ' if live else ''
        rows = ''
        for t, w, h, st in PAST:
            if st == 'add':
                right = f'<button {add_attr}class="btn-out shrink-0" style="{BTN_SM}">Add</button>'
            elif st == 'in':
                right = '<span class="text-[12.5px] text-slate-400 whitespace-nowrap">In Neuma</span>'
            else:
                right = '<span class="text-[12.5px] text-slate-400 whitespace-nowrap">No transcript in Zoom</span>'
            d, tm_ = w.split(' · ')
            rows += (f'<div class="flex items-center gap-4 px-4 py-3"><div class="flex-1 min-w-0"><div class="text-[13.5px] font-medium text-slate-900 truncate">{t}</div>'
                     f'<div class="text-[12.5px] text-slate-500">{d} · {tm_} · {h}</div></div>{right}</div>')
        return ('<div class="relative w-[520px] rounded-xl border border-slate-200 bg-white p-5 shadow-xl">'
                '<div class="text-[15px] font-semibold text-slate-900">Add past meeting</div>'
                '<div class="mt-1 text-[12.5px] text-slate-500">Searches Zoom directly. Nothing comes into Neuma until you add it.</div>'
                '<div class="mt-4 flex items-center gap-2"><input type="text" value="Acme" class="flex-1 text-[13px] border border-slate-200 rounded-md px-2.5 py-1.5 bg-white">'
                '<select class="text-[12.5px] text-slate-700 border border-slate-200 rounded-md pl-2.5 pr-7 py-1.5 bg-white"><option>Last 90 days</option><option>Last 30 days</option><option>Last year</option></select></div>'
                f'<div class="mt-3 rounded-lg border border-slate-200 divide-y divide-slate-100">{rows}</div>'
                '<div class="mt-4 flex items-center justify-between gap-4"><p class="text-[12px] text-slate-500">Only meetings Zoom still has can come back.</p>'
                f'<button {close}class="btn-out shrink-0" style="{BTN_SM}">Done</button></div></div>')
    def past_overlay():
        return ('<div data-pastm class="hidden absolute inset-0 z-40 flex items-start justify-center pt-28">'
                '<div data-past-close class="absolute inset-0 bg-slate-900/20"></div>' + past_modal() + '</div>')
    def past_js(sid):
        return ('<script>(function(){var r=document.getElementById("' + sid + '");if(!r)return;var m=r.querySelector("[data-pastm]");if(!m)return;'
                'r.querySelectorAll("[data-past-open]").forEach(function(b){b.addEventListener("click",function(){m.classList.remove("hidden");});});'
                'm.querySelectorAll("[data-past-close]").forEach(function(c){c.addEventListener("click",function(){m.classList.add("hidden");});});'
                'm.querySelectorAll("[data-past-add]").forEach(function(b){b.addEventListener("click",function(){b.outerHTML=\'<span class="text-[12.5px] font-medium text-emerald-700 whitespace-nowrap">Added</span>\';});});'
                'document.addEventListener("keydown",function(e){if(e.key==="Escape")m.classList.add("hidden");});})();</script>')
    def make_drawer():
        return ('<div data-set-drawer class="hidden absolute inset-0 z-30">'
                '<div data-set-close class="absolute inset-0 bg-slate-900/20"></div>'
                '<aside class="absolute right-0 top-0 bottom-0 w-[460px] bg-white border-l border-slate-200 shadow-xl overflow-y-auto px-6 pt-5 pb-8">'
                + views() + '</aside></div>' + rm_overlay() + ctx_overlay('Zoom', 'ctx-z'))
    drawer = make_drawer()

    dd_js = ('<script>(function(){var r=document.getElementById("integration-detail");if(!r)return;'
             'var dd=r.querySelector("[data-acc-dd]"),m=dd.querySelector("[data-acc-menu]"),lab=dd.querySelector("[data-acc-label]"),tk=dd.querySelector("[data-acc-tick]");'
             'dd.querySelector("[data-acc-toggle]").addEventListener("click",function(e){e.stopPropagation();m.classList.toggle("hidden");});'
             'dd.querySelectorAll("[data-acc-pick]").forEach(function(b){b.addEventListener("click",function(){var k=b.getAttribute("data-acc-pick");'
             'r.querySelectorAll("[data-meet-panel]").forEach(function(p){p.style.display=p.getAttribute("data-meet-panel")===k?"":"none";});'
             'lab.textContent=b.querySelector("[data-acc-email]").textContent;b.querySelector("[data-acc-tickslot]").appendChild(tk);m.classList.add("hidden");});});'
             'document.addEventListener("click",function(e){if(!dd.contains(e.target))m.classList.add("hidden");});'
             'var dr=r.querySelector("[data-set-drawer]");'
             'function view(v){r.querySelectorAll("[data-view]").forEach(function(x){x.style.display=x.getAttribute("data-view")===v?"":"none";});dr.querySelector("aside").scrollTop=0;}'
             'r.querySelector("[data-open-disc]").addEventListener("click",function(){view("main");dr.classList.remove("hidden");});'
             'r.querySelectorAll("[data-go]").forEach(function(b){b.addEventListener("click",function(){view(b.getAttribute("data-go"));});});'
             'r.querySelectorAll("[data-set-close]").forEach(function(c){c.addEventListener("click",function(){dr.classList.add("hidden");});});'
             'document.addEventListener("keydown",function(e){if(e.key==="Escape")dr.classList.add("hidden");});'
             'r.querySelectorAll("[data-rm]").forEach(function(w){var o=w.querySelector("[data-rm-open]"),bx=w.querySelector("[data-rm-box]");'
             'o.addEventListener("click",function(){o.style.display="none";bx.style.display="";w.classList.add("bg-rose-50/40");});'
             'w.querySelector("[data-rm-cancel]").addEventListener("click",function(){bx.style.display="none";o.style.display="";w.classList.remove("bg-rose-50/40");});});'
             'var SP=\'<span class="inline-block w-3 h-3 rounded-full border-2 border-slate-400 border-t-transparent animate-spin"></span>\';'
             'function done(sel){r.querySelectorAll(sel).forEach(function(e){e.textContent="Synced just now";});}'
             'var sb=r.querySelector("[data-sync-all]");sb.addEventListener("click",function(){if(sb.disabled)return;sb.disabled=true;'
             'sb.innerHTML=SP+"Syncing ' + str(len(ACC)) + ' accounts…";'
             'setTimeout(function(){sb.disabled=false;sb.textContent="Sync now";r.querySelector("[data-last-sync]").textContent="Just now";done("[data-acc-last]");},1800);});'
             'r.querySelectorAll("[data-acc-sync]").forEach(function(b){b.addEventListener("click",function(){if(b.disabled)return;var i=b.getAttribute("data-acc-sync");'
             'b.disabled=true;b.innerHTML=SP+"Syncing";setTimeout(function(){b.disabled=false;b.textContent="Sync";done("[data-acc-last=\\""+i+"\\"]");},1500);});});})();</script>')


    SYNC_OK = ('<span class="group relative inline-flex items-center text-emerald-700 cursor-default">'
               'Successful'
               '<span class="pointer-events-none absolute left-0 top-full z-20 mt-1.5 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-[opacity,visibility] duration-150 group-hover:delay-500 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[11.5px] text-white shadow-lg">3 meetings synced</span></span>')
    def make_inner(meet_panels):
        n_iss = len(ATT)
        issue_html = f'<span class="text-[12.5px] text-amber-700">· {n_iss} issue{"s" if n_iss != 1 else ""}</span>' if n_iss else ''
        count = f'<span class="ml-2 text-[11.5px] font-medium text-amber-800 bg-amber-100 rounded px-1.5 py-px">{len(ATT)}</span>' if ATT else ''
        detail_inner = ('<a href="#integrations" class="inline-flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-900">← Integrations</a>'
                        '<div class="mt-4 flex items-center justify-between gap-6">'
                        f'<div class="flex items-center gap-4">{zoom}<div><div class="flex items-center gap-3"><h1 class="text-[22px] font-semibold tracking-tight text-slate-900">Zoom</h1><span class="flex items-center gap-1.5 text-[12.5px] text-slate-600">{dot("bg-amber-500" if ATT else "bg-emerald-500")}Connected</span><span class="text-[12.5px] text-slate-400">· {len(ACC)} accounts</span>{issue_html}</div></div></div>'
                        f'<div class="flex items-center gap-2 shrink-0"><button data-sync-all class="btn-out shrink-0 inline-flex items-center gap-2 disabled:opacity-70 disabled:cursor-default">Sync now</button>{acc_btn}</div></div>'
                        '<div class="mt-8 grid grid-cols-3 gap-3">'
                        + tilebox('Last sync', f'<span data-last-sync>{TOT["last"]}</span>', SYNC_OK)
                        + tilebox('Next sync', '10 mins', 'Syncs every 15 mins')
                        + tilebox('Meetings synced', str(TOT['n']), 'Last 30 days')
                        + '</div>'
                        + f'<div class="mt-9 flex items-center"><h3 class="text-[13px] font-semibold text-slate-900">Needs attention</h3>{count}</div>'
                        + '<div class="mt-2 rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">' + ''.join(att_row(x) for x in ATT) + '</div>'
                        + h3('Recent meetings', dropdown)
                        + meet_panels)
        return detail_inner
    detail_inner = make_inner(meet_panels)

    s72 = hdr('7.1', 'Integrations · Detail', 'Zoom as the example. Totals and problems cover every account, and each problem names its account. The account menu filters Recent meetings only. The cog opens Zoom settings. Only Neuma admins see Integrations. A Zoom admin connects each company account. Transcripts stay in Zoom, and Zoom decides who can open them. People see what’s in Contexts shared with them. Neuma admins who are also Zoom admins see every meeting. Admins remove a meeting from ⋯ on its row. Hosts remove their own from the Context screens.', 'integration-detail') + frame(detail_inner, drawer) + dd_js + rm_js('integration-detail') + ctx_js('integration-detail') + '</section>'

    # ── 7.5 All meetings ──
    ALLM = [
        ('Neuma founders sync', 'Jared Kristensen', 'Nov 5 · 10:00am', '45 min', 'WAIT', ['Founder conversations'], 0),
        ('Acme × Neuma weekly check-in · onboarding and data import', 'Priya Rao', 'Nov 4 · 2:30pm', '30 min', 'READY', ['Acme'], 1),
        ('Board prep follow-up', 'Jared Kristensen', 'Nov 4 · 11:00am', '20 min', 'WAIT', ['Founder conversations'], 0),
        ('Design partner shortlist and pricing review for Q1 pilots', 'Jared Kristensen', 'Nov 3 · 4:00pm', '30 min', 'READY', ['Design partners', 'Acme'], 0),
        ('Weekly pipeline review', 'Sam Kim', 'Nov 3 · 9:00am', '30 min', 'NOTREC', ['Q4 pipeline'], 0),
        ('APAC sales stand-up', 'Priya Rao', 'Nov 3 · 8:30am', '15 min', 'READY', ['Q4 pipeline'], 1),
        ('Intro call with Brightline', 'Priya Rao', 'Oct 31 · 11:00am', '25 min', 'READY', [], 1),
        ('Northwind Traders · annual renewal, expansion and security questionnaire follow-up', 'Sam Kim', 'Oct 31 · 9:00am', '40 min', 'READY', ['Q4 pipeline'], 0),
        ('AFC × AREP check-in', 'Jared Kristensen', 'Oct 30 · 10:00am', '1 hr', 'READY', ['Adelaide Festival Centre'], 0),
        ('Investor update prep', 'Jared Kristensen', 'Oct 29 · 3:00pm', '35 min', 'NOTREC', ['Founder conversations'], 0),
        ('Acme pricing follow-up', 'Priya Rao', 'Oct 28 · 3:00pm', '40 min', 'READY', ['Acme', 'Founder conversations'], 1),
        ('Design partner call · Globex', 'Jared Kristensen', 'Oct 28 · 10:00am', '50 min', 'READY', ['Design partners'], 0),
    ]
    def allrow(r):
        t, host, when, length, st, ctxs, ai = r
        html = mrow(t, host, when, length, st, ctxs)
        tag = 'none' if not ctxs else 'has'
        return html.replace(f'<div class="{GRID}', f'<div data-mrow-st="{st}" data-mrow-ctx="{tag}" data-mrow-acc="{ai}" class="{GRID}', 1)
    def fchip(key, label, n, on=False):
        cls = 'bg-slate-900 text-white border-slate-900' if on else 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
        return (f'<button data-f="{key}" class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12.5px] font-medium {cls}">'
                f'{label}<span data-f-n class="{"text-white/70" if on else "text-slate-400"}">{n}</span></button>')
    chips = (fchip('all', 'All', 60, True) + fchip('READY', 'Ready', 55) + fchip('WAIT', 'Waiting on Zoom', 2)
             + fchip('NOTREC', 'No transcript', 2) + fchip('none', 'Not in a Context', 1))
    acc_sel = ('<select data-f-acc class="text-[12.5px] text-slate-700 border border-slate-200 rounded-md pl-2.5 pr-7 py-1.5 bg-white">'
               '<option value="all">All accounts</option>' + ''.join(f'<option value="{i}">{a["name"]}</option>' for i, a in enumerate(ACC)) + '</select>')
    search = ('<div class="relative flex-1 max-w-[260px]"><svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.45 4.39l3.08 3.08a.75.75 0 11-1.06 1.06l-3.08-3.08A7 7 0 012 9z" clip-rule="evenodd"/></svg>'
              '<input type="text" placeholder="Search meetings or hosts" class="w-full text-[12.5px] border border-slate-200 rounded-md pl-8 pr-2.5 py-1.5 bg-white placeholder:text-slate-400"></div>')
    range_sel = ('<select class="text-[12.5px] text-slate-700 border border-slate-200 rounded-md pl-2.5 pr-7 py-1.5 bg-white">'
                 '<option>Last 30 days</option><option>Last 7 days</option><option>Last 90 days</option><option>All time</option></select>')
    rows75 = ''.join(allrow(r) for r in ALLM)
    empty75 = '<div data-mrow-empty class="px-4 py-8 text-center text-[13px] text-slate-500" style="display:none">No meetings match these filters.</div>'
    pager = ('<div class="flex items-center justify-between px-4 py-2.5 text-[12.5px] text-slate-500">'
             '<span data-f-count>Showing 1–12 of 60</span>'
             '<div class="flex items-center gap-2">' + btn('Previous') + btn('Next') + '</div></div>')
    inner75 = ('<a href="#integration-detail" class="inline-flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-900">← Zoom</a>'
               f'<div class="mt-4 flex items-center gap-4">{zoom}<div><h1 class="text-[22px] font-semibold tracking-tight text-slate-900">Zoom meetings</h1>'
               '<div class="text-[12.5px] text-slate-500 mt-0.5">Every meeting Zoom sent to Neuma.</div></div><button data-past-open class="btn-out shrink-0 ml-auto">Add past meeting</button></div>'
               f'<div class="mt-8 flex items-center gap-2">{search}{acc_sel}{range_sel}</div>'
               f'<div class="mt-3 flex flex-wrap items-center gap-2">{chips}</div>'
               f'<div class="mt-4 rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">{meet_head}{rows75}{empty75}{pager}</div>')
    js75 = ('<script>(function(){var r=document.getElementById("integration-meetings");if(!r)return;'
            'var st="all",acc="all";function apply(){var n=0;r.querySelectorAll("[data-mrow-st]").forEach(function(x){'
            'var ok=(st==="all"||(st==="none"?x.getAttribute("data-mrow-ctx")==="none":x.getAttribute("data-mrow-st")===st))&&(acc==="all"||x.getAttribute("data-mrow-acc")===acc);'
            'x.style.display=ok?"":"none";if(ok)n++;});r.querySelector("[data-mrow-empty]").style.display=n?"none":"";'
            'r.querySelector("[data-f-count]").textContent=(st==="all"&&acc==="all")?"Showing 1–12 of 60":"Showing "+n+" in this sample";}'
            'r.querySelectorAll("[data-f]").forEach(function(b){b.addEventListener("click",function(){st=b.getAttribute("data-f");'
            'r.querySelectorAll("[data-f]").forEach(function(o){var on=o===b;o.classList.toggle("bg-slate-900",on);o.classList.toggle("text-white",on);o.classList.toggle("border-slate-900",on);'
            'o.classList.toggle("bg-white",!on);o.classList.toggle("text-slate-700",!on);o.classList.toggle("border-slate-200",!on);'
            'var c=o.querySelector("[data-f-n]");c.classList.toggle("text-white/70",on);c.classList.toggle("text-slate-400",!on);});apply();});});'
            'r.querySelector("[data-f-acc]").addEventListener("change",function(e){acc=e.target.value;apply();});})();</script>')
    s75 = (hdr('7.6', 'Integrations · All meetings', 'Opens from Show all meetings on the Detail page. Same columns as Recent meetings. Filter by account, date and status. Not in a Context finds meetings to add. Add past meeting searches Zoom for one Neuma no longer has.', 'integration-meetings')
           + frame(inner75, rm_overlay() + ctx_overlay('Zoom', 'ctx-m') + past_overlay()) + js75 + rm_js('integration-meetings') + ctx_js('integration-meetings') + past_js('integration-meetings') + '</section>')

    # ── 7.3 Settings by provider ──
    def card(title, logo_html, body, sub):
        return (f'<div><div class="text-[13px] font-semibold text-slate-900 mb-2">{title}</div>'
                f'<div class="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden"><div class="flex items-center gap-3 px-5 py-4 border-b border-slate-100">{logo_html}<div><div class="text-[14px] font-semibold text-slate-900">Settings</div><div class="text-[12px] text-slate-500">{sub}</div></div></div>'
                f'<div class="px-5 py-2 divide-y divide-slate-100">{body}</div></div></div>')
    gcal = (swrow('Suggest Contexts from recurring meetings', 'You approve each one first.', True)
            + swrow('Match transcripts to Contexts', 'Uses the meeting title, series and attendees.', True)
            + '<div class="py-2"><div class="text-[12px] font-medium text-slate-500 pt-1">Calendars</div>' + check(True, 'Jared K.', 'Primary') + check(True, 'Neuma team', 'Shared') + check(True, 'Customer calls', 'Shared') + check(False, 'Holidays in Australia') + '</div>')
    sf = ('<div class="py-3"><div class="text-[12px] font-medium text-slate-500">What Neuma reads</div>'
          '<div class="mt-1 text-[13.5px] text-slate-900">Accounts, contacts and open deals</div><div class="text-[12px] text-slate-500 mt-0.5">Read only. Neuma never changes anything in Salesforce.</div></div>'
          + '<div class="py-2"><div class="text-[12px] font-medium text-slate-500 pt-1">Which accounts become Contexts</div>' + radio(True, 'Accounts you’ve met with', 'A meeting in the last 90 days', 'sf2') + radio(False, 'Custom', 'Choose with filters', 'sf2') + '</div>')
    s73 = (hdr('7.4', 'Integrations · Settings by provider', 'Settings opens from the cog on the Detail page. It is the only part that changes by provider. Everything else stays the same.', 'integration-settings')
           + '<div class="grid grid-cols-2 gap-6 items-start">'
           + card('Google Calendar', logo('Google Calendar', 'GC', '#1A73E8'), gcal, 'Which calendars Neuma reads')
           + card('Salesforce', logo('Salesforce', 'Sf', '#00A1E0'), sf, 'Which accounts become Contexts').replace('<div>', '<div data-later>', 1)  # Salesforce is coming soon
           + '</div></section>')

    # ── 7.4 States ──
    states = [
        ('First sync running', 'brand', 'Connected a minute ago. Neuma is bringing in your meetings. They’ll appear here as they arrive.', ''),
        ('Bringing in past meetings', 'brand', '124 of 412 past meetings brought in. New meetings come in as normal.', ''),
        ('Missing permission', 'amber', 'Neuma can’t read cloud recordings for Acme APAC. Its meetings come in without transcripts. Priya R. (Zoom admin) needs to grant access.', 'Send to Priya'),
        ('Reconnect needed', 'rose', 'Acme GTM’s Zoom connection stopped working on Nov 2. Nothing new is coming in. Sam K. (Zoom admin) needs to reconnect it.', 'Send to Sam'),
        ('Waiting for your Zoom admin', 'brand', 'Only a Zoom admin can connect Zoom for Acme GTM. Connect link sent to it@acmegtm.com on Nov 4. Nothing comes in until they connect.', 'Resend link'),
    ]
    def scard(title, c, msg, b):
        col = {'rose': ('border-rose-200 bg-rose-50/60', 'text-rose-800', 'bg-rose-500'), 'amber': ('border-amber-200 bg-amber-50/60', 'text-amber-900', 'bg-amber-500'), 'brand': ('border-brand-100 bg-brand-50/60', 'text-brand-800', 'bg-brand-500')}[c]
        bb = btn(b, True) if b else ''
        spin = '<span class="inline-block w-3 h-3 rounded-full border-2 border-brand-500 border-t-transparent animate-spin shrink-0"></span>' if title == 'First sync running' else ''
        return (f'<div><div class="text-[13px] font-semibold text-slate-900 mb-2">{title}</div><div class="rounded-xl border border-slate-200 bg-white p-4 shadow-card">'
                f'<div class="flex items-center gap-3">{zoom}<div class="text-[15px] font-semibold text-slate-900">Zoom</div><span class="flex items-center gap-1.5 text-[12px] {col[1]}">{dot(col[2])}{title}</span></div>'
                f'<div class="mt-3 rounded-lg border {col[0]} px-3 py-2.5 flex items-center gap-3">{spin}<p class="flex-1 text-[12.5px] leading-[1.5] {col[1]}">{msg}</p>{bb}</div></div></div>')

    def frame_card(title, body, span=False):
        sp = ' col-span-2' if span else ''
        return f'<div class="{sp.strip()}"><div class="text-[13px] font-semibold text-slate-900 mb-2">{title}</div>{body}</div>'
    calm = ('<div class="rounded-xl border border-slate-200 bg-white p-4 shadow-card">'
            '<h3 class="text-[13px] font-semibold text-slate-900">Needs attention</h3>'
            f'<div class="mt-2 rounded-xl border border-slate-200 bg-white px-4 py-3 flex items-center gap-2 text-[13px] text-slate-600">{dot("bg-emerald-500")}Nothing needs you. Every meeting came in and was read.</div>'
            '<p class="mt-2 text-[12px] text-slate-400">No count badge. This covers every account, so one calm line means all of them are fine.</p></div>')
    def static_drawer(note, inner):
        return ('<div class="rounded-xl border border-slate-200 bg-slate-900/[.06] shadow-card flex justify-end overflow-hidden">'
                f'<div class="flex-1 p-6 text-[12.5px] text-slate-400">{note}</div>'
                f'<aside class="w-[460px] bg-white border-l border-slate-200 px-6 pt-5 pb-8">{inner}</aside></div>')
    admin_main = static_drawer('Opens from the cog. A short list. Each row opens its own view in the same drawer.', main_view(live=False))
    stays_static = static_drawer('From What stays out. Company rules first, then your own.', stays_view(live=False))
    confirm = static_drawer('Disconnect sits on each account row and confirms in place.', main_view(live=False, confirm=1))
    syncing = ('<div class="rounded-xl border border-slate-200 bg-white p-4 shadow-card">'
               f'<div class="flex items-center justify-between gap-4"><div class="flex items-center gap-3">{zoom}<div class="text-[15px] font-semibold text-slate-900">Zoom</div>'
               f'<span class="flex items-center gap-1.5 text-[12px] text-slate-600">{dot("bg-emerald-500")}Connected</span><span class="text-[12px] text-slate-400">· 2 accounts</span></div>'
               '<button class="btn-out shrink-0 inline-flex items-center gap-2" style="opacity:.7;cursor:default"><span class="inline-block w-3 h-3 rounded-full border-2 border-slate-400 border-t-transparent animate-spin"></span>Syncing 2 accounts…</button></div>'
               '<p class="mt-3 text-[12px] text-slate-400">Sync now covers every account. When it ends, the Last sync tile reads “Just now”. One account syncs alone from its Sync link in Zoom settings.</p></div>')
    failed = ('<div class="rounded-xl border border-slate-200 bg-white p-4 shadow-card">'
              '<div class="flex items-center"><h3 class="text-[13px] font-semibold text-slate-900">Needs attention</h3><span class="ml-2 text-[11.5px] font-medium text-amber-800 bg-amber-100 rounded px-1.5 py-px">1</span></div>'
              '<div class="mt-2 rounded-xl border border-slate-200 bg-white">'
              + att_row(dict(t='Sync failed', acc=1, d='Zoom didn’t respond. Last good sync 2 hours ago. Other accounts synced fine.', acts=btn('Try again'), fix='', fixlink=''))
              + '</div></div>')
    member_view = static_drawer('What a member sees. Accounts and retention are read-only. They can still open What stays out to add their own words.', main_view(live=False, member=True))
    extra = (frame_card('Nothing needs attention', calm) + frame_card('Sync failed on one account', failed)
             + frame_card('Sync running', syncing)
             + frame_card('Zoom settings', admin_main, span=True)
             + frame_card('Zoom settings · What stays out', stays_static, span=True)
             + frame_card('Zoom settings · disconnecting an account', confirm, span=True)
             + frame_card('Removing a meeting', '<div class="rounded-xl border border-slate-200 bg-slate-900/[.06] p-8 shadow-card flex justify-center">'
                          + rm_modal(live=False, title='Weekly pipeline review', out=rm_copy('Weekly pipeline review', 'NOTREC', ['Q4 pipeline'])[0], series=True) + '</div>', span=True)
             + frame_card('Adding a series meeting to a Context', '<div class="rounded-xl border border-slate-200 bg-slate-900/[.06] p-8 shadow-card flex justify-center">'
                          + ctx_modal('Zoom', 'ctx-s', live=False, title='Weekly pipeline review', series=True) + '</div>')
             + frame_card('Add past meeting', '<div class="rounded-xl border border-slate-200 bg-slate-900/[.06] p-8 shadow-card flex justify-center">'
                          + past_modal(live=False) + '</div>'))
    s74 = (hdr('7.5', 'Integrations · Detail states', 'Header states first, then the page states. A problem names the account it affects. Counts come from what has actually arrived.', 'integration-detail-states')
           + '<div class="grid grid-cols-2 gap-5">' + ''.join(scard(*x) for x in states) + extra + '</div></section>')

    # ── 7.1b Teams detail ──
    teams = logo('Microsoft Teams', 'MT', '#5B5FC7')
    def tm(h):
        return (h.replace('Waiting on Zoom', 'Waiting on Teams').replace('View in Zoom', 'View in Teams')
                 .replace('https://zoom.us/meeting', 'https://teams.microsoft.com').replace('It stays in Zoom.', 'It stays in Teams.'))
    T_MEET = [
        ('Northwind onboarding kickoff and data import plan', 'Sam Kim', 'Nov 5 · 9:30am', '50 min', 'WAIT', ['Q4 pipeline']),
        ('Sales stand-up', 'Sam Kim', 'Nov 5 · 8:30am', '15 min', 'READY', ['Q4 pipeline']),
        ('Globex security review', 'Jared Kristensen', 'Nov 4 · 1:00pm', '45 min', 'READY', ['Design partners', 'Acme']),
        ('Marketing weekly', 'Lena Ortiz', 'Nov 4 · 10:00am', '30 min', 'READY', []),
        ('Product roadmap review', 'Jared Kristensen', 'Nov 3 · 3:00pm', '1 hr', 'NOTREC', ['Founder conversations']),
    ]
    T_SERIES = [
        ('Marketing weekly', 'Weekly on Fridays', 'Fri, Nov 6', '11:00am', '9', []),
        ('Weekly pipeline review', 'Weekly on Mondays', 'Mon, Nov 9', '9:00am', '8', ['Q4 pipeline']),
        ('Acme × Neuma weekly check-in', 'Weekly on Tuesdays', 'Tue, Nov 10', '2:30pm', '6', ['Acme']),
        ('Design partner office hours', 'Every 2 weeks on Wednesdays', 'Wed, Nov 11', '4:00pm', '5', ['Design partners']),
        ('Neuma founders sync', 'Weekly on Thursdays', 'Thu, Nov 12', '10:00am', '3', ['Acme', 'Founder conversations']),
    ]
    T_CHAN = [
        ('#acme-onboarding', 'Customers', 'Today', '9:42am', '312', ['Acme']),
        ('#pipeline', 'Sales', 'Today', '8:15am', '204', ['Q4 pipeline']),
        ('#design-partners', 'Product', 'Yesterday', '4:51pm', '98', ['Design partners']),
        ('#launch-planning', 'Marketing', 'Nov 3', '11:05am', '143', []),
        ('#founders', 'Leadership', 'Nov 2', '6:20pm', '61', ['Founder conversations']),
    ]
    MENU_ITEM = 'block w-full text-left whitespace-nowrap px-3 py-2 rounded-md text-[13px]'
    def t_ctx(ctxs):
        if ctxs:
            more = f'<span class="text-[11.5px] font-medium text-slate-500 bg-slate-100 rounded px-1.5 py-px shrink-0">+{len(ctxs)-1}</span>' if len(ctxs) > 1 else ''
            ic = CTX_ICON.get(ctxs[0], '')
            return (f'<div class="flex items-center gap-1.5 min-w-0"><a href="context.html" class="text-[13px] text-slate-700 hover:text-slate-900 hover:underline truncate">{ic} {ctxs[0]}</a>{more}</div>')
        return '<div class="whitespace-nowrap"><a class="text-[12.5px] font-medium text-brand-600 hover:text-brand-700 cursor-pointer">+ Add to Context</a></div>'
    def t_menu(view, href, leave):
        return ('<span class="relative flex items-center justify-end">'
                '<button data-row-more class="w-6 h-6 -mr-1 rounded-md flex items-center justify-center text-slate-400 opacity-0 group-hover/row:opacity-100 hover:bg-slate-200/70 hover:text-slate-700 transition-opacity" aria-label="More">' + MORE_SVG + '</button>'
                '<span data-row-menu class="hidden absolute right-0 top-full mt-1 z-30 w-max rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">'
                f'<a href="{href}" target="_blank" rel="noopener" class="{MENU_ITEM} text-slate-900 hover:bg-slate-50">{view}</a>'
                '<div class="my-1 border-t border-slate-100"></div>'
                f'<button class="{MENU_ITEM} font-medium text-rose-600 hover:bg-rose-50">{leave}</button></span></span>')
    def t_stack(a, b):
        return f'<div class="text-[12.5px] leading-[1.35] whitespace-nowrap"><div class="text-slate-700">{a}</div><div class="text-slate-500">{b}</div></div>'
    def t_row(title, sub, c2, c3, ctxs, menu):
        return (f'<div class="{GRID} relative px-4 py-3 group/row hover:bg-slate-50 transition-colors"><div class="min-w-0">'
                f'<div class="text-[13.5px] leading-[1.35] font-medium text-slate-900 truncate">{title}</div>'
                f'<div class="text-[12.5px] leading-[1.35] text-slate-500 truncate">{sub}</div></div>'
                f'{c2}<div class="text-[12.5px] text-slate-700">{c3}</div>{t_ctx(ctxs)}{menu}</div>')
    def t_head(cols):
        return (f'<div class="{GRID} px-4 py-2 text-[11.5px] font-medium text-slate-400 bg-slate-50/70 rounded-t-xl">'
                + ''.join(f'<div>{c}</div>' for c in cols) + '<div></div></div>')
    def t_list(head, rows, foot):
        f = f'<a class="block px-4 py-2.5 text-[12.5px] font-medium text-brand-600 hover:text-brand-700 cursor-pointer">{foot}</a>'
        return f'<div class="mt-2 rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">{head}{rows}{f}</div>'
    def tiles3(a, b, c):
        return '<div class="grid grid-cols-3 gap-3">' + a + b + c + '</div>'

    T_SYNC_OK = SYNC_OK.replace('3 meetings synced', '2 meetings and 46 messages synced')
    p_trans = (tiles3(tilebox('Last sync', '<span data-t-last>4 mins ago</span>', T_SYNC_OK),
                      tilebox('Next sync', '11 mins', 'Syncs every 15 mins'),
                      tilebox('Meetings synced', '41', 'Last 30 days'))
               + h3('Recent meetings')
               + f'<div class="mt-2 rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">{meet_head}'
               + ''.join(tm(mrow(*m)) for m in T_MEET)
               + '<a class="block px-4 py-2.5 text-[12.5px] font-medium text-brand-600 hover:text-brand-700 cursor-pointer">Show all meetings →</a></div>')
    NO_SVG = '<svg class="w-4 h-4 text-slate-300 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clip-rule="evenodd"/></svg>'
    def c_yes(t, sub):
        return (f'<div class="flex items-start gap-3 px-4 py-3">{OK}<div><div class="text-[13.5px] text-slate-900">{t}</div>'
                f'<div class="text-[12.5px] text-slate-500 mt-0.5">{sub}</div></div></div>')
    def c_no(t):
        return f'<div class="flex items-center gap-3 px-4 py-2.5">{NO_SVG}<div class="text-[13.5px] text-slate-600">{t}</div></div>'
    def c_label(t):
        return f'<div class="px-4 pt-3.5 pb-1 text-[11.5px] font-medium uppercase tracking-wider text-slate-400">{t}</div>'
    p_cal = ('<div class="rounded-xl border border-slate-200 bg-white">'
             + '<div class="px-4 py-3.5 border-b border-slate-100"><div class="text-[13.5px] font-medium text-slate-900">Each person connects their own calendar</div>'
               '<div class="text-[12.5px] text-slate-500 mt-0.5">From Settings › Your connections. No admin needed.</div></div>'
             + c_label('What Neuma reads')
             + c_yes('Meetings in the next 14 days', 'One-off and recurring. Briefs are ready before each one, and transcripts go to the right Context.')
             + c_yes('Recurring series', 'Kept beyond 14 days, so a series keeps feeding the same Context.')
             + c_yes('Title, time, attendees and meeting link', 'Nothing else from each event.')
             + '<div class="border-t border-slate-100"></div>'
             + c_label('What Neuma never reads')
             + '<div class="pb-1.5">' + c_no('Descriptions and attachments') + c_no('Private events') + '</div>'
             + '</div>')
    p_msg = (h3('Channels', btn('Add channels')).replace('mt-9 flex', 'flex', 1)
             + t_list(t_head(['Channel', 'Last message', 'Messages', 'Context']),
                      ''.join(t_row(t, f'{tmn} team', t_stack(d, h), n, c, t_menu('View in Teams', 'https://teams.microsoft.com', 'Stop bringing in')) for t, tmn, d, h, n, c in T_CHAN),
                      'Show all channels →')
             + '<p class="mt-3 text-[12px] text-slate-500">Only the channels you chose come in. Chats never do. '
               '<button data-open-set class="font-medium text-brand-600 hover:text-brand-700">Teams settings</button></p>')

    def t_tab(key, label, on=False, flag=False):
        d = '<span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>' if flag else ''
        cls = 'border-slate-900 text-slate-900' if on else 'border-transparent text-slate-500 hover:text-slate-900'
        return f'<button data-tt="{key}" class="-mb-px inline-flex items-center gap-1.5 border-b-2 px-0.5 pb-2.5 text-[13.5px] font-medium {cls}">{label}{d}</button>'
    t_tabs = ('<div class="mt-9 flex items-center gap-6 border-b border-slate-200">'
              + t_tab('transcripts', 'Transcripts', on=True, flag=True) + t_tab('messages', 'Messages') + '</div>')
    t_att = ('<div class="px-4 py-3.5"><div class="flex items-center gap-4"><div class="flex-1 min-w-0">'
             '<div class="flex items-center gap-2 min-w-0"><span class="text-[13.5px] font-medium text-slate-900 truncate">Transcripts are off by default</span>'
             '<button data-tgo="transcripts" class="text-[11.5px] text-slate-500 bg-slate-100 hover:bg-slate-200 rounded px-1.5 py-px whitespace-nowrap">Transcripts</button></div>'
             '<div class="mt-0.5 text-[12.5px] text-slate-500">Teams only makes a transcript when someone turns it on. 5 meetings last week had none. Turn transcription on by default in the Teams admin center.</div></div>'
             f'<div class="flex items-center gap-3 shrink-0">{btn("Show steps")}</div></div></div>')
    t_cog = acc_btn.replace('Zoom settings', 'Teams settings')
    t_inner = ('<a href="#integrations" class="inline-flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-900">← Integrations</a>'
               '<div class="mt-4 flex items-center justify-between gap-6">'
               f'<div class="flex items-center gap-4">{teams}<div class="flex items-center gap-3"><h1 class="text-[22px] font-semibold tracking-tight text-slate-900">Microsoft Teams</h1>'
               f'<span class="flex items-center gap-1.5 text-[12.5px] text-slate-600">{dot("bg-amber-500")}Connected</span>'
               '<span class="text-[12.5px] text-amber-700">· 1 issue</span></div></div>'
               f'<div class="flex items-center gap-2 shrink-0"><button data-sync-all class="btn-out shrink-0 inline-flex items-center gap-2 disabled:opacity-70 disabled:cursor-default">Sync now</button>{t_cog}</div></div>'
               '<div class="mt-8 flex items-center"><h3 class="text-[13px] font-semibold text-slate-900">Needs attention</h3>'
               '<span class="ml-2 text-[11.5px] font-medium text-amber-800 bg-amber-100 rounded px-1.5 py-px">1</span></div>'
               f'<div class="mt-2 rounded-xl border border-slate-200 bg-white">{t_att}</div>'
               + t_tabs
               + f'<div class="mt-6" data-tp="transcripts">{p_trans}</div>'
               + f'<div class="mt-6" data-tp="messages" style="display:none">{p_msg}</div>')

    t_acc = acc_row(0, dict(name='Acme GTM', domain='acmegtm.com', last='4 mins ago'), True).replace(
        'Neuma stops bringing in its meetings for everyone.', 'Neuma stops bringing in its meetings and messages for everyone.').replace(
        'data-acc-last="0">Synced 4 mins ago', 'data-acc-last="0">Connected by Dana Lee')
    t_settings = (vhead('Teams settings', '', True, back=False)
                  + SECTION('Account')
                  + f'<div class="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">{t_acc}</div>'
                  + SECTION('What comes in')
                  + '<div class="rounded-xl border border-slate-200 divide-y divide-slate-100 px-4">'
                  + swrow('Meeting transcripts', 'Teams meetings with a transcript', True)
                  + ('<div class="py-3"><div class="flex items-center gap-3"><div class="flex-1"><div class="text-[13.5px] text-slate-900">Channel messages</div>'
                     '<div class="text-[12px] text-slate-500 mt-0.5">Private channels stay out.</div></div>' + toggle(True) + '</div>'
                     '<div class="mt-2 flex flex-col gap-1.5">'
                     '<label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="tch" class="w-4 h-4 accent-slate-900"><span class="text-[13px] text-slate-900">All channels</span><span class="text-[12px] text-slate-400">Includes new ones</span></label>'
                     '<label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="tch" class="w-4 h-4 accent-slate-900" checked><span class="text-[13px] text-slate-900">Channels you choose</span><span class="text-[12px] text-slate-400">12</span></label>'
                     '</div></div>')
                  + '</div>'
                  + SECTION('Privacy')
                  + '<div class="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">'
                  + navrow('What stays out', 'Exclude meetings by title, series or attendee', 'stays', True)
                  + navrow('Data retention', 'Transcripts and messages not in a Context are deleted after 30 days', 'retention', True) + '</div>'
                  + '<p class="mt-6 text-[12px] leading-[1.55] text-slate-500">Transcripts stay in Teams, and Teams decides who can open them. People see the channels they’re in. What Neuma pulls out follows each Context’s sharing. Neuma admins who are also Microsoft admins see everything.</p>')
    t_drawer = ('<div data-set-drawer class="hidden absolute inset-0 z-30"><div data-set-close class="absolute inset-0 bg-slate-900/20"></div>'
                '<aside class="absolute right-0 top-0 bottom-0 w-[460px] bg-white border-l border-slate-200 shadow-xl overflow-y-auto px-6 pt-5 pb-8">'
                + '<div data-view="main">' + t_settings + '</div>'
                + '<div data-view="stays" style="display:none">' + stays_view(True).replace('← Zoom settings', '← Teams settings') + '</div>'
                + '<div data-view="retention" style="display:none">' + retention_view(True).replace('← Zoom settings', '← Teams settings').replace('name="ret"', 'name="ret-t"') + '</div>'
                + '</aside></div>' + rm_overlay() + ctx_overlay('Teams', 'ctx-t'))
    t_js = ('<script>(function(){var r=document.getElementById("integration-detail-teams");if(!r)return;'
            'function show(k){r.querySelectorAll("[data-tt]").forEach(function(b){var on=b.getAttribute("data-tt")===k;'
            'b.classList.toggle("border-slate-900",on);b.classList.toggle("text-slate-900",on);b.classList.toggle("border-transparent",!on);b.classList.toggle("text-slate-500",!on);});'
            'r.querySelectorAll("[data-tp]").forEach(function(p){p.style.display=p.getAttribute("data-tp")===k?"":"none";});}'
            'r.querySelectorAll("[data-tt],[data-tgo]").forEach(function(b){b.addEventListener("click",function(){show(b.getAttribute("data-tt")||b.getAttribute("data-tgo"));});});'
            'function fromHash(){var m=location.hash.match(/^#teams-(transcripts|calendar|messages)$/);if(m)show(m[1]);}'
            'window.addEventListener("hashchange",fromHash);fromHash();'
            'var dr=r.querySelector("[data-set-drawer]");'
            'function view(v){r.querySelectorAll("[data-view]").forEach(function(x){x.style.display=x.getAttribute("data-view")===v?"":"none";});dr.querySelector("aside").scrollTop=0;}'
            'r.querySelectorAll("[data-go]").forEach(function(b){b.addEventListener("click",function(){view(b.getAttribute("data-go"));});});'
            'r.querySelectorAll("[data-open-disc],[data-open-set]").forEach(function(b){b.addEventListener("click",function(){view("main");dr.classList.remove("hidden");});});'
            'r.querySelectorAll("[data-set-close]").forEach(function(c){c.addEventListener("click",function(){dr.classList.add("hidden");});});'
            'document.addEventListener("keydown",function(e){if(e.key==="Escape")dr.classList.add("hidden");});'
            'r.querySelectorAll("[data-rm]").forEach(function(w){var o=w.querySelector("[data-rm-open]"),bx=w.querySelector("[data-rm-box]");'
            'o.addEventListener("click",function(){o.style.display="none";bx.style.display="";w.classList.add("bg-rose-50/40");});'
            'w.querySelector("[data-rm-cancel]").addEventListener("click",function(){bx.style.display="none";o.style.display="";w.classList.remove("bg-rose-50/40");});});'
            'var SP=\'<span class="inline-block w-3 h-3 rounded-full border-2 border-slate-400 border-t-transparent animate-spin"></span>\';'
            'var sb=r.querySelector("[data-sync-all]");sb.addEventListener("click",function(){if(sb.disabled)return;sb.disabled=true;sb.innerHTML=SP+"Syncing…";'
            'setTimeout(function(){sb.disabled=false;sb.textContent="Sync now";r.querySelector("[data-t-last]").textContent="Just now";},1800);});})();</script>')
    anchors = ''.join(f'<span id="teams-{k}" style="display:block;scroll-margin-top:64px"></span>' for k in ('transcripts', 'messages'))
    s72t = (hdr('7.1b', 'Integrations · Detail · Teams', 'One Microsoft connection with two products, so one page with tabs. A Microsoft admin approves it once. The header, Sync now, settings and Needs attention cover every tab. Each issue names its tab, and that tab shows an amber dot. The Teams rows in the directory open this page on their tab. Admins pick all channels or chosen ones when they connect, and can add channels on the Messages tab. Each person connects their own calendar from Your connections, so there is no Calendar tab.', 'integration-detail-teams')
            .replace('<section id="integration-detail-teams" class="max-w-[1440px] mx-auto px-8 pt-12 pb-12">', '<section id="integration-detail-teams" class="max-w-[1440px] mx-auto px-8 pt-12 pb-12">' + anchors)
            + frame(t_inner, t_drawer) + t_js + rm_js('integration-detail-teams') + ctx_js('integration-detail-teams') + '</section>')

    # ── 7.1c Google detail ──
    gws = ('<span class="relative shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-white ring-1 ring-inset ring-slate-200">'
           '<svg class="w-5 h-5" viewBox="0 0 48 48"><path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.7-2.1 5-4.4 6.6v5.5h7.1c4.2-3.8 6.6-9.5 6.6-16.1z"/>'
           '<path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.2 15.5 46 24 46z"/>'
           '<path fill="#FBBC05" d="M11.8 28.3c-.4-1.3-.7-2.7-.7-4.3s.3-3 .7-4.3V14H4.5C3 17 2 20.4 2 24s1 7 2.5 10l7.3-5.7z"/>'
           '<path fill="#EA4335" d="M24 10.7c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.5 2 8.1 6.8 4.5 14l7.3 5.7c1.7-5.2 6.5-9 12.2-9z"/></svg></span>')
    def gm(h):
        return (h.replace('Waiting on Zoom', 'Waiting on Meet').replace('View in Zoom', 'Open in Google Docs')
                 .replace('https://zoom.us/meeting', 'https://docs.google.com').replace('It stays in Zoom.', 'It stays in Google Drive.'))
    G_MEET = [
        ('Globex pilot kickoff and success criteria', 'Jared Kristensen', 'Nov 5 · 11:00am', '45 min', 'WAIT', ['Design partners']),
        ('Acme QBR prep', 'Priya Rao', 'Nov 4 · 2:00pm', '30 min', 'READY', ['Acme']),
        ('Weekly pipeline review', 'Sam Kim', 'Nov 4 · 9:00am', '30 min', 'READY', ['Q4 pipeline']),
        ('Hiring sync', 'Lena Ortiz', 'Nov 3 · 4:00pm', '25 min', 'NOTREC', []),
        ('Marketing weekly', 'Lena Ortiz', 'Nov 3 · 10:00am', '30 min', 'READY', []),
    ]
    G_SYNC_OK = SYNC_OK.replace('3 meetings synced', '2 meetings synced')
    g_trans = (tiles3(tilebox('Last sync', '<span data-t-last>6 mins ago</span>', G_SYNC_OK),
                      tilebox('Next sync', '9 mins', 'Syncs every 15 mins'),
                      tilebox('Meetings synced', '33', 'Last 30 days'))
               + h3('Recent meetings')
               + f'<div class="mt-2 rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">{meet_head}'
               + ''.join(gm(mrow(*m)) for m in G_MEET)
               + '<a class="block px-4 py-2.5 text-[12.5px] font-medium text-brand-600 hover:text-brand-700 cursor-pointer">Show all meetings →</a></div>')
    g_cal = (p_cal.replace('Last sync 4 mins ago', 'Last sync 6 mins ago')
             + '<p class="mt-3 text-[12px] text-slate-500">Meet has no titles or series of its own. They come from the calendars people connect.</p>')
    g_tabs = ('<div class="mt-9 flex items-center gap-6 border-b border-slate-200">'
              + t_tab('transcripts', 'Transcripts', on=True) + t_tab('calendar', 'Calendar') + '</div>')
    meet_l = logo('Google Meet', 'GM', '#00897B')
    g_cog = acc_btn.replace('Zoom settings', 'Google Meet settings')
    g_inner = ('<a href="#integrations" class="inline-flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-900">← Integrations</a>'
               '<div class="mt-4 flex items-center justify-between gap-6">'
               f'<div class="flex items-center gap-4">{meet_l}<div class="flex items-center gap-3"><h1 class="text-[22px] font-semibold tracking-tight text-slate-900">Google Meet</h1>'
               f'<span class="flex items-center gap-1.5 text-[12.5px] text-slate-600">{dot("bg-emerald-500")}Connected</span></div></div>'
               f'<div class="flex items-center gap-2 shrink-0"><button data-sync-all class="btn-out shrink-0 inline-flex items-center gap-2 disabled:opacity-70 disabled:cursor-default">Sync now</button>{g_cog}</div></div>'
               + f'<div class="mt-8" data-tp="transcripts">{g_trans}</div>'
               )
    g_acc = t_acc.replace('its meetings and messages for everyone', 'its meetings for everyone')
    g_settings = (vhead('Google Meet settings', '', True, back=False)
                  + SECTION('Account')
                  + f'<div class="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">{g_acc}</div>'
                  + SECTION('What comes in')
                  + '<div class="rounded-xl border border-slate-200 divide-y divide-slate-100 px-4">'
                  + swrow('Meeting transcripts', 'Meet transcripts saved to Google Drive', True)
                  + '</div>'
                  + SECTION('Privacy')
                  + '<div class="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">'
                  + navrow('What stays out', 'Exclude meetings by title, series or attendee', 'stays', True)
                  + navrow('Data retention', 'Transcripts not in a Context are deleted after 30 days', 'retention', True) + '</div>'
                  + '<p class="mt-6 text-[12px] leading-[1.55] text-slate-500">Transcripts stay in Google Drive, and Google decides who can open them. What Neuma pulls out follows each Context’s sharing. Neuma admins who are also Google Workspace admins see everything.</p>')
    g_drawer = ('<div data-set-drawer class="hidden absolute inset-0 z-30"><div data-set-close class="absolute inset-0 bg-slate-900/20"></div>'
                '<aside class="absolute right-0 top-0 bottom-0 w-[460px] bg-white border-l border-slate-200 shadow-xl overflow-y-auto px-6 pt-5 pb-8">'
                + '<div data-view="main">' + g_settings + '</div>'
                + '<div data-view="stays" style="display:none">' + stays_view(True).replace('← Zoom settings', '← Google Meet settings') + '</div>'
                + '<div data-view="retention" style="display:none">' + retention_view(True).replace('← Zoom settings', '← Google Meet settings').replace('name="ret"', 'name="ret-g"') + '</div>'
                + '</aside></div>' + rm_overlay() + ctx_overlay('Google Drive', 'ctx-g'))
    g_js = t_js.replace('integration-detail-teams', 'integration-detail-google').replace('#teams-', '#google-')
    g_anchors = ''.join(f'<span id="google-{k}" style="display:block;scroll-margin-top:64px"></span>' for k in ('transcripts',))
    s72g = (hdr('7.1c', 'Integrations · Detail · Google Meet', 'One Google Workspace connection covers Meet, so no tabs. A Google Workspace admin approves it once. Each person connects their own calendar from Your connections. Meet has no titles or series of its own, so calendars supply them. Shown with nothing needing attention.', 'integration-detail-google')
            .replace('<section id="integration-detail-google" class="max-w-[1440px] mx-auto px-8 pt-12 pb-12">', '<section id="integration-detail-google" class="max-w-[1440px] mx-auto px-8 pt-12 pb-12">' + g_anchors)
            + frame(g_inner, g_drawer) + g_js + rm_js('integration-detail-google') + ctx_js('integration-detail-google') + '</section>')

    return '\n<!-- ═════════════════════  SCREEN 7.1 — INTEGRATIONS · DETAIL  ═════════════════════ -->\n' + s72 + '\n<!-- ═════════════════════  SCREEN 7.1b — INTEGRATIONS · DETAIL · TEAMS  ═════════════════════ -->\n' + s72t + '\n<!-- ═════════════════════  SCREEN 7.1c — INTEGRATIONS · DETAIL · GOOGLE  ═════════════════════ -->\n' + s72g + '\n<!-- ═════════════════════  SCREEN 7.4 — INTEGRATIONS · SETTINGS BY PROVIDER  ═════════════════════ -->\n' + s73 + '\n<!-- ═════════════════════  SCREEN 7.5 — INTEGRATIONS · DETAIL STATES  ═════════════════════ -->\n' + s74 + '\n<!-- ═════════════════════  SCREEN 7.6 — INTEGRATIONS · ALL MEETINGS  ═════════════════════ -->\n' + s75 + '\n'
