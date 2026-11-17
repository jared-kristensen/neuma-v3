// Neuma UI · shared top bar. Add a screen once here and it appears on every page.
(function(){
  var SCREENS = [
    ['onboarding.html',    'Onboarding'],
    ['contexts.html',      'Contexts'],
    ['context.html',       'Context'],
    ['rollup.html',        'Context Roll Up'],
    ['claude.html',        'AI Tools MCP'],
    ['integrations.html',  'Integrations'],
    ['settings.html',      'Settings'],
    ['settings.html#settings-people', 'Admin Settings', ['settings-people', 'settings-workspace']]
  ];
  var here = (location.pathname.split('/').pop() || 'index.html');
  // Old versions live two folders down, in versions/<screen>/, so links point back up
  var base = /\/versions\/[^\/]+\/[^\/]+$/.test(location.pathname) ? '../../' : '';
  var ver = base ? here.replace(/-v\d+\.html$/, '.html') : '';
  // An entry can point at part of a page (file#section, with the section ids it covers). It lights up only inside those sections.
  var ON = 'background:#0f172a;color:#fff;font-weight:600', OFF = 'color:#475569';
  var SUB = {}; SCREENS.forEach(function(s){ if (s[2]) SUB[s[0].split('#')[0]] = s[2]; });
  function isOn(s){
    var file = s[0].split('#')[0]; if (file !== (ver || here)) return false;
    var h = location.hash.replace('#', ''), sub = SUB[file]; if (!sub) return true;
    var inSub = sub.indexOf(h) > -1; return s[2] ? inSub : !inSub;
  }
  var links = SCREENS.map(function(s, i){
    return '<a data-nav-i="' + i + '" href="' + base + s[0] + '" style="padding:6px 10px;border-radius:6px;font-size:13px;white-space:nowrap;text-decoration:none;'
      + (isOn(s) ? ON : OFF) + '">' + s[1] + '</a>';
  }).join('');
  window.addEventListener('hashchange', function(){
    document.querySelectorAll('#neuma-nav [data-nav-i]').forEach(function(a){
      var on = isOn(SCREENS[+a.getAttribute('data-nav-i')]);
      a.style.background = on ? '#0f172a' : ''; a.style.color = on ? '#fff' : '#475569'; a.style.fontWeight = on ? '600' : '';
    });
  });
  var bar = '<header id="neuma-nav" style="position:sticky;top:0;z-index:60;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);border-bottom:1px solid #e2e8f0">'
    + '<div style="max-width:1440px;margin:0 auto;padding:10px 32px;display:flex;align-items:center;gap:16px">'
    + '<a href="' + base + 'index.html" style="display:flex;align-items:center;gap:8px;text-decoration:none;color:#0f172a;font-weight:600;font-size:15px;margin-right:8px"><svg width="20" height="20" viewBox="0 0 64 64"><path d="M 8 8 H 56 V 56 H 8 Z M 34 14 V 30 H 50 V 14 Z" fill="#F59DA6" fill-rule="evenodd"/></svg>neuma</a>'
    + '<nav style="display:flex;gap:2px;flex-wrap:wrap">' + links + '</nav>'
    + (base ? '<span style="font-size:12px;color:#b45309;background:#fffbeb;padding:3px 8px;border-radius:6px">Old version: ' + here + '</span>' : '')
    + '</div></header>';
  document.currentScript.insertAdjacentHTML('afterend', bar);
})();

/* Account menu: click the name block at the bottom-left of the product sidebar.
   Admins get Admin settings, Integrations and Sign out. Members get Sign out. */
(function () {
  var css = 'aside > .mt-auto.border-t [data-acct]{cursor:pointer;border-radius:6px}aside > .mt-auto.border-t [data-acct]:hover{background:#f1f5f9}'
    + '#nm-acct-menu{position:absolute;z-index:9999;width:200px;padding:4px 0;border-radius:8px;border:1px solid #e2e8f0;background:#fff;box-shadow:0 16px 40px -8px rgba(15,23,42,.2),0 2px 8px -2px rgba(15,23,42,.1);font-family:inherit}'
    + '#nm-acct-menu a{display:block;padding:6px 12px;font-size:13px;color:#334155;text-decoration:none;cursor:pointer}#nm-acct-menu a:hover{background:#f8fafc}#nm-acct-menu hr{border:0;border-top:1px solid #f1f5f9;margin:4px 0}#nm-acct-menu .nm-acct-h{padding:6px 12px 3px;font-size:10.5px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:#94a3b8}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var CHEV = '<svg data-acct-chev width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-left:auto"><polyline points="8 9 12 5 16 9"/><polyline points="8 15 12 19 16 15"/></svg>';
  function decorate() {
    document.querySelectorAll('aside > .mt-auto.border-t').forEach(function (w) {
      var av = w.querySelector('.rounded-full'); if (!av) return;
      var row = av.parentNode; if (row.hasAttribute('data-acct')) return;
      row.setAttribute('data-acct', '');
      if (row === w) { row.style.paddingBottom = '6px'; }
      row.insertAdjacentHTML('beforeend', CHEV);
    });
  }
  var menu = null;
  function close() { if (menu) { menu.remove(); menu = null; } }
  document.addEventListener('click', function (e) {
    var row = e.target.closest ? e.target.closest('[data-acct]') : null;
    if (!row) { if (!e.target.closest || !e.target.closest('#nm-acct-menu')) close(); return; }
    e.preventDefault(); e.stopPropagation();
    if (menu) { close(); return; }
    var member = /Sam K\./.test(row.textContent);
    var up = /\/versions\//.test(location.pathname) ? '../../' : '';
    menu = document.createElement('div'); menu.id = 'nm-acct-menu';
    var org = row.querySelector('.text-slate-500'); org = org ? org.textContent.trim() : 'Workspace';
    menu.innerHTML = (member ? '' : '<div class="nm-acct-h"></div><a href="' + up + 'settings.html#settings-people">Admin settings</a><a href="' + up + 'integrations.html#integrations">Integrations</a><hr>') + '<a>Sign out</a>';
    var h = menu.querySelector('.nm-acct-h'); if (h) h.textContent = org;
    document.body.appendChild(menu);
    var r = row.getBoundingClientRect();
    menu.style.left = (r.left + window.scrollX) + 'px'; menu.style.top = (r.top + window.scrollY - menu.offsetHeight - 6) + 'px';
    menu.addEventListener('click', close);
  }, true);
  document.addEventListener('DOMContentLoaded', function () { decorate(); setTimeout(decorate, 600); });
  if (document.readyState !== 'loading') { decorate(); setTimeout(decorate, 600); }
})();

/* Scope switch: V2 / Everything. Mockup only, never ships.
   Mark a deferred element with data-later. V2 hides it. Everything shows it as it will look, with no marking.
   Mark V2-only copy (what a screen says when the Later part is hidden) with data-v2-only.
   The choice is remembered across pages. Default is V2. */
(function () {
  var KEY = 'neuma-scope', scope = 'v2';
  try { scope = localStorage.getItem(KEY) || 'v2'; } catch (e) {}
  var root = document.documentElement; root.setAttribute('data-scope', scope);
  var css = 'html[data-scope="v2"] [data-later]{display:none!important}'
    + 'html[data-scope="all"] [data-v2-only]{display:none!important}'
    + '#nm-scope{margin-left:auto;display:inline-flex;align-items:center;gap:8px;font-size:12px;color:#94a3b8;white-space:nowrap}'
    + '#nm-scope .sw{display:inline-flex;border-radius:6px;background:#f1f5f9;padding:2px}'
    + '#nm-scope button{border:0;background:transparent;padding:3px 10px;border-radius:4px;font:500 12px Inter,system-ui,sans-serif;color:#64748b;cursor:pointer}'
    + '#nm-scope button.on{background:#fff;color:#0f172a;box-shadow:0 1px 2px rgba(15,23,42,.08)}'
    + '#nm-scope .n{margin-left:4px;color:#b45309}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function count() { return document.querySelectorAll('[data-later]').length; }
  function paint() {
    var box = document.getElementById('nm-scope'); if (!box) return;
    box.querySelectorAll('button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-scope-btn') === scope); });
    var n = count(), el = box.querySelector('.n'); el.textContent = n ? n + ' later' : ''; 
  }
  function set(s) {
    scope = s; root.setAttribute('data-scope', s);
    try { localStorage.setItem(KEY, s); } catch (e) {}
    paint();
  }
  function mount() {
    var row = document.querySelector('#neuma-nav > div'); if (!row || document.getElementById('nm-scope')) return;
    row.insertAdjacentHTML('beforeend', '<div id="nm-scope" title="Mockup only. V2 hides features marked Later.">Scope<div class="sw">'
      + '<button type="button" data-scope-btn="v2">V2</button><button type="button" data-scope-btn="all">Everything</button></div><span class="n"></span></div>');
    row.querySelector('#nm-scope').addEventListener('click', function (e) {
      var b = e.target.closest('[data-scope-btn]'); if (b) set(b.getAttribute('data-scope-btn'));
    });
    paint();
  }
  if (document.readyState !== 'loading') mount(); else document.addEventListener('DOMContentLoaded', mount);
  document.addEventListener('DOMContentLoaded', function () { setTimeout(paint, 600); });
})();
