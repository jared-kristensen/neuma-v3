// Neuma UI · shared behaviour for Context, Contexts and Roll up screens.

// Each block is isolated: if a screen lacks a block's elements, the rest still run.

try {
(function(){
  var box = document.getElementById('states-variations'), btn = document.getElementById('sv-toggle'); if (!box || !btn) return;
  function set(open){
    box.hidden = !open; btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.querySelector('[data-sv-label]').textContent = open ? 'Hide states and variations' : 'See states and variations';
    btn.querySelector('[data-sv-chev]').style.transform = open ? 'rotate(180deg)' : '';
  }
  btn.addEventListener('click', function(){ set(box.hidden); });
  function openFor(id){ var t = id && document.getElementById(id); if (t && box.contains(t)) { set(true); setTimeout(function(){ t.scrollIntoView(); }, 0); } }
  document.querySelectorAll('a[href^="#"]').forEach(function(a){ a.addEventListener('click', function(){ openFor(a.getAttribute('href').slice(1)); }); });
  window.addEventListener('hashchange', function(){ openFor(location.hash.slice(1)); });
  openFor(location.hash.slice(1));
})();
} catch (e) { console.warn("neuma.js block 0", e); }

try {
(function(){
  var root = document.getElementById('zoom-app'); if (!root) return;
  var W = 1440;
  var TRIM = 'main{padding:0!important} #zoom-app{max-width:none!important;padding:24px!important} #zoom-app > div.flex.items-end:first-child{display:none!important}';
  function trim(f){ try { var d = f.contentDocument; if (!d || d.getElementById('zv-trim') || !d.getElementById('zoom-app')) return; var st = d.createElement('style'); st.id = 'zv-trim'; st.textContent = TRIM; d.head.appendChild(st); } catch(e) {} }
  function fit(f){
    var box = f.parentNode; if (!box || box.offsetParent === null) return;
    var k = Math.min(1, box.clientWidth / W);
    var h = parseFloat(f.style.height) || 1180;
    if (!f.hasAttribute('data-fixed')) { try { var sh = f.contentDocument.body.scrollHeight; if (sh > 400) h = sh + 8; } catch(e) {} }
    f.style.height = h + 'px';
    f.style.transform = 'scale(' + k + ')';
    box.style.height = Math.ceil(h * k) + 'px';
  }
  function fitAll(){ root.querySelectorAll('[data-zv-fit] iframe').forEach(fit); }
  root.querySelectorAll('[data-zv-fit] iframe').forEach(function(f){
    f.addEventListener('load', function(){ trim(f); fit(f); setTimeout(function(){ fit(f); }, 300); setTimeout(function(){ fit(f); }, 1200); });
  });
  window.addEventListener('resize', fitAll);
  root.querySelectorAll('[data-zv]').forEach(function(b){
    b.addEventListener('click', function(){
      var id = b.getAttribute('data-zv');
      root.querySelectorAll('[data-zv]').forEach(function(x){ x.classList.toggle('on', x === b); });
      root.querySelectorAll('[data-zv-pane]').forEach(function(p){ p.hidden = p.getAttribute('data-zv-pane') !== id; });
      var f = root.querySelector('[data-zv-pane="'+id+'"] iframe'); if (f) { trim(f); fit(f); setTimeout(function(){ fit(f); }, 60); }
    });
  });
})();
} catch (e) { console.warn("neuma.js block 1", e); }

try {
window.CXROOT = (function(){
  var ids = ['context-summary','cx-graveyard'];
  function nodes(){ return ids.map(function(i){ return document.getElementById(i); }).filter(Boolean); }
  return {
    addEventListener: function(t,f,o){ nodes().forEach(function(n){ n.addEventListener(t,f,o); }); },
    querySelectorAll: function(q){ var out=[]; nodes().forEach(function(n){ out.push.apply(out, [].slice.call(n.querySelectorAll(q))); }); return out; },
    querySelector: function(q){ return this.querySelectorAll(q)[0] || null; },
    contains: function(x){ return nodes().some(function(n){ return n.contains(x); }); }
  };
})();
} catch (e) { console.warn("neuma.js block 2", e); }

try {
// ── Filter pill multi-toggle (skip the More trigger) ──
document.querySelectorAll('.filter-pill').forEach(p => {
  if (p.id === 'filter-more-btn') return;
  p.addEventListener('click', () => p.classList.toggle('on'));
});

// ── Starred items: show full name as tooltip when label is truncated ──
function updateStarredTitles() {
  document.querySelectorAll('a.starred-item').forEach(el => {
    const label = el.querySelector('.label');
    if (!label) return;
    if (label.scrollWidth > label.clientWidth + 1) {
      el.setAttribute('title', label.textContent);
    } else {
      el.removeAttribute('title');
    }
  });
}
window.addEventListener('load', updateStarredTitles);
window.addEventListener('resize', updateStarredTitles);

// ── Starred items: drag-to-reorder (within each sidebar's starred list) ──
(function () {
  let dragEl = null;
  document.querySelectorAll('a.starred-item').forEach(el => {
    el.setAttribute('draggable', 'true');
    el.addEventListener('dragstart', (e) => {
      dragEl = el;
      el.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      // Drag preview is the row itself (default behaviour)
    });
    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
      dragEl = null;
    });
    el.addEventListener('dragover', (e) => {
      if (!dragEl || dragEl === el) return;
      // Only reorder within the same parent <nav> — don't cross sidebars
      if (el.parentElement !== dragEl.parentElement) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const after = (e.clientY - rect.top) / rect.height > 0.5;
      el.parentElement.insertBefore(dragEl, after ? el.nextElementSibling : el);
    });
  });
})();

// ── More dropdown (Rejected / Ignored overflow) ──
(function () {
  const btn = document.getElementById('filter-more-btn');
  const menu = document.getElementById('filter-more-menu');
  const wrap = document.getElementById('filter-more-wrap');
  if (!btn || !menu) return;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('hidden');
    btn.classList.toggle('on', !menu.classList.contains('hidden'));
  });
  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) {
      menu.classList.add('hidden');
      btn.classList.remove('on');
    }
  });
  // Toggle the underlying pill state when clicked inside the dropdown
  menu.querySelectorAll('.filter-pill-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('bg-brand-50');
      item.classList.toggle('text-brand-700');
      // Keep menu open so the user can pick multiple
    });
  });
})();

// ── Detail page "⋯" more menu (Unverify / Archive / Delete) ──
(function () {
  const btn = document.getElementById('detail-more-btn');
  const menu = document.getElementById('detail-more-menu');
  const wrap = document.getElementById('detail-more-wrap');
  if (!btn || !menu) return;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('hidden');
  });
  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) menu.classList.add('hidden');
  });
})();

// ── Supporting evidence row expand/collapse ──
document.querySelectorAll('.ev-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.closest('.rounded-xl');
    const body = row && row.querySelector('.ev-body');
    const chev = btn.querySelector('.ev-chev');
    if (!body) return;
    const opening = body.classList.contains('hidden');
    body.classList.toggle('hidden');
    if (chev) chev.style.transform = opening ? 'rotate(90deg)' : '';
  });
});

// ── Detail page sub-tabs (Overview / Activity) ──
document.querySelectorAll('[data-detail-tab]').forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    const name = tab.dataset.detailTab;
    const parent = tab.parentElement;
    parent.querySelectorAll('[data-detail-tab]').forEach(t => t.classList.toggle('on', t === tab));
    const container = parent.parentElement;
    container.querySelectorAll('[data-detail-panel]').forEach(panel => {
      panel.classList.toggle('hidden', panel.dataset.detailPanel !== name);
    });
  });
});

// ── "View all" link jumps to a specific sub-tab ──
document.querySelectorAll('[data-jump-tab]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const name = link.dataset.jumpTab;
    const tab = document.querySelector(`[data-detail-tab="${name}"]`);
    if (tab) tab.click();
    window.scrollTo({ top: tab ? tab.getBoundingClientRect().top + window.scrollY - 80 : 0, behavior: 'smooth' });
  });
});

// ── Helper note dismiss ──
(function () {
  const note = document.getElementById('feed-helper-note');
  const btn = document.getElementById('feed-helper-dismiss');
  if (!note || !btn) return;
  try { if (sessionStorage.getItem('feed-helper-dismissed') === '1') note.style.display = 'none'; } catch (e) {}
  btn.addEventListener('click', () => {
    note.style.display = 'none';
    try { sessionStorage.setItem('feed-helper-dismissed', '1'); } catch (e) {}
  });
})();

// ── Per-member permissions expand/collapse ──
document.querySelectorAll('.toggle-perms').forEach(btn => {
  btn.addEventListener('click', () => {
    // Find the first .perms-panel that follows btn in document order, within an ancestor
    let panel = null;
    let parent = btn.parentElement;
    while (parent && !panel) {
      const candidates = parent.querySelectorAll('.perms-panel');
      for (const c of candidates) {
        if (btn.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING) { panel = c; break; }
      }
      parent = parent.parentElement;
    }
    if (!panel) return;
    const opening = panel.classList.contains('hidden');
    panel.classList.toggle('hidden');
    panel.dataset.expanded = opening ? 'true' : 'false';
    const chev = btn.querySelector('.chevron');
    if (chev) chev.style.transform = opening ? 'rotate(180deg)' : '';
    const collapsedLabel = btn.querySelector('[data-label-collapsed]');
    const expandedLabel = btn.querySelector('[data-label-expanded]');
    if (collapsedLabel) collapsedLabel.classList.toggle('hidden', opening);
    if (expandedLabel) expandedLabel.classList.toggle('hidden', !opening);
  });
});

// ── Source-config modal tabs (Prompt / Manual) ──
document.querySelectorAll('.source-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const name = tab.dataset.tab;
    const tablist = tab.parentElement;
    tablist.querySelectorAll('.source-tab').forEach(t => t.classList.toggle('on', t === tab));
    const panelRoot = tablist.parentElement;
    panelRoot.querySelectorAll('[data-tab-panel]').forEach(panel => {
      panel.classList.toggle('hidden', panel.dataset.tabPanel !== name);
    });
  });
});

// ── Card hover-reveal verify/reject actions (Feed v2 mockup) ──
// no-op placeholder; CSS handles visibility on .card-v2:hover .card-actions

// ── Draggable Importance sliders ──
document.querySelectorAll('.slider').forEach(el => {
  if (el.dataset.bound) return;
  el.dataset.bound = '1';
  el.style.touchAction = 'none';
  const fill = el.querySelector('span');
  if (!fill) return;
  const parent = el.parentElement;
  const numEl = parent ? parent.querySelector('.num.font-mono') : null;
  function setFromX(clientX) {
    const r = el.getBoundingClientRect();
    let pct = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    fill.style.width = (pct * 100).toFixed(1) + '%';
    if (numEl) numEl.textContent = pct.toFixed(2);
  }
  let dragging = false;
  el.addEventListener('pointerdown', (e) => { dragging = true; el.setPointerCapture(e.pointerId); setFromX(e.clientX); });
  el.addEventListener('pointermove', (e) => { if (dragging) setFromX(e.clientX); });
  el.addEventListener('pointerup', (e) => { dragging = false; try { el.releasePointerCapture(e.pointerId); } catch {} });
  el.addEventListener('pointercancel', () => { dragging = false; });
});

// ── Screen 03 · Updated card — inline "what changed" diff ──
document.querySelectorAll('.upd-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.v2-card');
    const diff = card && card.querySelector('.upd-diff');
    if (!diff) return;
    const opening = diff.classList.contains('hidden');
    diff.classList.toggle('hidden');
    const chev = btn.querySelector('.upd-chev');
    if (chev) chev.style.transform = opening ? 'rotate(90deg)' : '';
    const lbl = btn.querySelector('span');
    if (lbl) lbl.textContent = opening ? 'Hide previous version' : 'See previous version';
  });
});

// ── Screen 03 · New sources modal ──
(function () {
  const modal = document.getElementById('sources-modal');
  if (!modal) return;
  function openModal() {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.sources-open').forEach(b => b.addEventListener('click', openModal));
  modal.querySelectorAll('[data-sources-close]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });
})();

// ── Screen 03 · Inline Ask drawer ──
(function () {
  const modal = document.getElementById('s03-ask-modal');
  const btn = document.getElementById('s03-ask-btn');
  if (!modal || !btn) return;
  function open()  { modal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
  function close() { modal.classList.add('hidden');    document.body.style.overflow = ''; }
  btn.addEventListener('click', open);
  modal.querySelectorAll('[data-ask-close]').forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
    // ⌘J / Ctrl+J shortcut
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
      e.preventDefault();
      if (modal.classList.contains('hidden')) open(); else close();
    }
  });
})();

// ── Screen 03 · Feed card — inline edit (click question or answer to edit) ──
document.querySelectorAll('.v2-card').forEach(card => {
  const qView = card.querySelector('.card-q-view');
  const aView = card.querySelector('.card-a-view');
  if (!qView && !aView) return;
  const editors = card.querySelectorAll('.card-q-edit, .card-a-edit');
  function autosize(el) { el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'; }
  editors.forEach(el => el.addEventListener('input', () => autosize(el)));
  function setMode(editing) {
    card.querySelectorAll('.card-q-view, .card-a-view').forEach(el => el.classList.toggle('hidden', editing));
    editors.forEach(el => el.classList.toggle('hidden', !editing));
    const uz = card.querySelector('.card-update-zone');
    if (uz) uz.classList.toggle('hidden', editing);
    const diff = card.querySelector('.upd-diff');
    if (diff && editing) diff.classList.add('hidden');
    const av = card.querySelector('.card-actions');
    if (av) av.classList.toggle('hidden', editing);
    const ae = card.querySelector('.card-actions-edit');
    if (ae) ae.classList.toggle('hidden', !editing);
    if (editing) editors.forEach(autosize);
  }
  [qView, aView].forEach(el => el && el.addEventListener('click', () => setMode(true)));
  card.querySelectorAll('.card-edit-cancel, .card-edit-save').forEach(b => b.addEventListener('click', () => setMode(false)));
});

// ── Screen 03 · Updated card — Original / Tracked changes view switcher ──
document.querySelectorAll('.tc-seg').forEach(seg => {
  seg.querySelectorAll('.tc-seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = seg.closest('.upd-diff');
      if (!panel) return;
      seg.querySelectorAll('.tc-seg-btn').forEach(b => b.classList.toggle('on', b === btn));
      const tracked = btn.dataset.view === 'tracked';
      const plain = panel.querySelector('.tc-plain');
      const trackedEl = panel.querySelector('.tc-tracked');
      if (plain) plain.classList.toggle('hidden', tracked);
      if (trackedEl) trackedEl.classList.toggle('hidden', !tracked);
    });
  });
});

// ── Screen 03 · Conflict resolution modal ──
(function () {
  const modal = document.getElementById('conflict-modal');
  if (!modal) return;
  function openModal() {
    modal.classList.remove('hidden');
    modal.classList.add('conflict-modal-enter');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => growMerge());
  }
  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('conflict-modal-enter');
    document.body.style.overflow = '';
  }
  const mergeTa = modal.querySelector('.conf-merge-text');
  function growMerge() { if (mergeTa && mergeTa.offsetParent) { mergeTa.style.height = 'auto'; mergeTa.style.height = mergeTa.scrollHeight + 'px'; } }
  if (mergeTa) mergeTa.addEventListener('input', growMerge);

  document.querySelectorAll('.conflict-open').forEach(b => b.addEventListener('click', () => openModal()));
  modal.querySelectorAll('[data-conflict-close]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });

  // Resolution option select — enables Apply and updates its label
  const applyBtn = document.getElementById('conflict-apply');
  const applyLabel = { merge: 'Merge & resolve', keepA: 'Only Keep Statement A', keepB: 'Only Keep Statement B', both: 'Keep both' };
  const APPLY_ON = 'px-4 py-2 rounded-lg text-[13px] font-medium bg-slate-900 text-white hover:bg-slate-800';
  modal.querySelectorAll('.res-opt').forEach(opt => {
    opt.addEventListener('click', (e) => {
      if (e.target.closest('.conf-merge-text')) return;
      modal.querySelectorAll('.res-opt').forEach(o => o.classList.remove('sel'));
      opt.classList.add('sel');
      if (applyBtn) {
        applyBtn.disabled = false;
        applyBtn.className = APPLY_ON;
        applyBtn.textContent = applyLabel[opt.dataset.res] || 'Resolve';
      }
      growMerge();
    });
  });

  // Expandable evidence per pattern

  // Apply → transform the Conflict card into its resolved end-state
  if (applyBtn) applyBtn.addEventListener('click', () => {
    const opt = modal.querySelector('.res-opt.sel');
    if (!opt) return;
    let text = opt.dataset.resolvedText || '';
    if (opt.dataset.res === 'merge' && mergeTa) text = mergeTa.value.trim();
    const resolved = document.getElementById('conflict-resolved-03');
    if (resolved) {
      const t = resolved.querySelector('#conflict-resolved-text');
      const n = resolved.querySelector('#conflict-resolved-note');
      if (t) t.textContent = text;
      if (n) n.textContent = opt.dataset.resolvedNote || 'Resolved just now';
      resolved.classList.remove('hidden');
    }
    const card = document.getElementById('conflict-card-03');
    if (card) card.classList.add('hidden');
    closeModal();
  });

  // Undo — restore the conflict card
  const undo = document.querySelector('.conflict-undo');
  if (undo) undo.addEventListener('click', () => {
    const resolved = document.getElementById('conflict-resolved-03');
    const card = document.getElementById('conflict-card-03');
    if (resolved) resolved.classList.add('hidden');
    if (card) card.classList.remove('hidden');
  });
})();

// ── Screen 48 · Resolve conflict v2 (proposal) ──
(function () {
  const modal = document.getElementById('conflict-modal-v2');
  if (!modal) return;
  const applyBtn = modal.querySelector('.cv2-apply');
  const resolvedBanner = modal.querySelector('.cv2-resolved');
  const applyLabel = { merge: 'Merge & resolve', keepA: 'Only Keep Statement A', keepB: 'Only Keep Statement B', both: 'Keep both' };
  const APPLY_ON_V2 = 'cv2-apply px-4 py-2 rounded-lg text-[13px] font-medium bg-slate-900 text-white hover:bg-slate-800';
  const mergeTa = modal.querySelector('.cv2-merge');
  function growMerge() { if (mergeTa && mergeTa.offsetParent) { mergeTa.style.height = 'auto'; mergeTa.style.height = mergeTa.scrollHeight + 'px'; } }
  if (mergeTa) { mergeTa.addEventListener('input', growMerge); requestAnimationFrame(() => growMerge()); }

  modal.querySelectorAll('.cv2-opts .res-opt').forEach(opt => {
    opt.addEventListener('click', (e) => {
      if (e.target.closest('.cv2-merge')) return;
      modal.querySelectorAll('.cv2-opts .res-opt').forEach(o => o.classList.remove('sel'));
      opt.classList.add('sel');
      if (applyBtn) {
        applyBtn.disabled = false;
        applyBtn.className = APPLY_ON_V2;
        applyBtn.textContent = applyLabel[opt.dataset.res] || 'Resolve';
      }
      growMerge();
    });
  });

  if (applyBtn) applyBtn.addEventListener('click', () => {
    if (resolvedBanner) resolvedBanner.classList.remove('hidden');
  });
  const undoV2 = modal.querySelector('.cv2-undo');
  if (undoV2) undoV2.addEventListener('click', () => {
    if (resolvedBanner) resolvedBanner.classList.add('hidden');
  });
})();

// ── Screen 03 · Inline Filter popover ──
(function () {
  const btn = document.getElementById('s03-filter-btn');
  const pop = document.getElementById('s03-filter-popover');
  if (!btn || !pop) return;
  const status = pop.querySelector('.filter-status');
  const apply  = pop.querySelector('.filter-apply');
  const cancel = pop.querySelector('.filter-cancel');
  const reset  = pop.querySelector('.filter-reset');

  function open()  { pop.classList.remove('hidden'); btn.classList.add('bg-slate-50'); }
  function close() { pop.classList.add('hidden');    btn.classList.remove('bg-slate-50'); }
  function refresh() {
    const labels = pop.querySelectorAll('.lbl.sel');
    if (labels.length === 0) {
      status.textContent = 'No filters applied';
      apply.classList.remove('on'); apply.disabled = true;
    } else {
      status.textContent = `${labels.length} label${labels.length>1?'s':''}`;
      apply.classList.add('on'); apply.disabled = false;
    }
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (pop.classList.contains('hidden')) open(); else close();
  });
  pop.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('click', () => { if (!pop.classList.contains('hidden')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  pop.querySelectorAll('.lbl').forEach(b => {
    b.addEventListener('click', () => { b.classList.toggle('sel'); refresh(); });
  });
  reset.addEventListener('click', () => {
    pop.querySelectorAll('.lbl.sel').forEach(l => l.classList.remove('sel'));
    refresh();
  });
  cancel.addEventListener('click', close);
  apply.addEventListener('click', () => { if (!apply.disabled) close(); });
})();

// ── Screen 03 · Dismiss with reason ──
(function () {
  const REASONS = [
    { key: 'incorrect',    label: 'Incorrect',     sub: "The statement isn't accurate",
      icon: '<svg class="dm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' },
    { key: 'not-important', label: 'Not important', sub: "True, but not worth tracking",
      icon: '<svg class="dm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zM17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>' },
    { key: 'outdated',     label: 'Outdated',      sub: "Was true, no longer applies",
      icon: '<svg class="dm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
    { key: 'duplicate',    label: 'Duplicate',     sub: "Already covered by another card",
      icon: '<svg class="dm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' },
    { key: 'other',        label: 'Other…',        sub: "Something else. Leave a note.",
      icon: '<svg class="dm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' }
  ];

  // Build menu once
  const menu = document.createElement('div');
  menu.id = 'dismiss-menu';
  menu.className = 'hidden';
  menu.innerHTML = '<div class="dm-head">Why dismiss?</div>'
    + REASONS.slice(0, 4).map(r =>
        `<button type="button" class="dm-opt" data-reason="${r.key}" data-label="${r.label}">${r.icon}<span><span class="dm-label">${r.label}</span><span class="dm-sub">${r.sub}</span></span></button>`
      ).join('')
    + '<div class="dm-divider"></div>'
    + REASONS.slice(4).map(r =>
        `<button type="button" class="dm-opt" data-reason="${r.key}" data-label="${r.label}">${r.icon}<span><span class="dm-label">${r.label}</span><span class="dm-sub">${r.sub}</span></span></button>`
      ).join('');
  document.body.appendChild(menu);

  let activeBtn = null;
  let activeCard = null;

  function position(btn) {
    const r = btn.getBoundingClientRect();
    menu.classList.remove('hidden');
    const mw = menu.offsetWidth;
    const sx = window.scrollX, sy = window.scrollY;
    let left = r.right + sx - mw;
    if (left < 12) left = r.left + sx;
    menu.style.left = left + 'px';
    menu.style.top = (r.bottom + sy + 6) + 'px';
  }
  function close() {
    menu.classList.add('hidden');
    if (activeBtn) activeBtn.classList.remove('open');
    activeBtn = null; activeCard = null;
  }

  document.querySelectorAll('.dismiss-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeBtn === btn) { close(); return; }
      close();
      activeBtn = btn;
      activeCard = btn.closest('.v2-card');
      btn.classList.add('open');
      position(btn);
    });
  });

  menu.addEventListener('click', (e) => {
    const opt = e.target.closest('.dm-opt');
    if (!opt || !activeCard) return;
    const label = opt.dataset.label;
    const reasonEl = activeCard.querySelector('.dismissed-reason');
    if (reasonEl) reasonEl.textContent = label;
    activeCard.classList.add('dismissed');
    close();
  });

  document.addEventListener('click', (e) => {
    if (menu.classList.contains('hidden')) return;
    if (e.target.closest('#dismiss-menu') || e.target.closest('.dismiss-btn')) return;
    close();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  window.addEventListener('resize', close);
  window.addEventListener('scroll', () => { if (activeBtn) position(activeBtn); }, { passive: true });

  // Undo handler — re-show the card
  document.querySelectorAll('.dismiss-undo').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.v2-card');
      if (card) card.classList.remove('dismissed');
    });
  });
})();


// ── User chip menu (log out) ──
(function () {
  document.querySelectorAll('.user-chip').forEach(btn => {
    const menu = btn.parentElement.querySelector('.user-menu');
    if (!menu) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // close other menus first
      document.querySelectorAll('.user-menu').forEach(m => { if (m !== menu) m.classList.add('hidden'); });
      menu.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', menu.classList.contains('hidden') ? 'false' : 'true');
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu') && !e.target.closest('.user-chip')) {
      document.querySelectorAll('.user-menu').forEach(m => m.classList.add('hidden'));
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.user-menu').forEach(m => m.classList.add('hidden'));
  });
})();

// ── S04 card ⋯ menu ──
(function () {
  const wraps = document.querySelectorAll('.vw-more-wrap');
  if (!wraps.length) return;
  function closeAll() { document.querySelectorAll('.vw-more-menu').forEach(m => m.classList.add('hidden')); }
  wraps.forEach(wrap => {
    const btn = wrap.querySelector('.vw-more-btn');
    const menu = wrap.querySelector('.vw-more-menu');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = !menu.classList.contains('hidden');
      closeAll();
      if (!isOpen) menu.classList.remove('hidden');
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
    menu.addEventListener('click', (e) => e.stopPropagation());
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.vw-more-wrap')) closeAll();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
})();

// ── S04 sort dropdown ──
(function () {
  const btn = document.getElementById('s04-sort-btn');
  const menu = document.getElementById('s04-sort-menu');
  const label = document.getElementById('s04-sort-label');
  if (!btn || !menu) return;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('hidden');
  });
  menu.querySelectorAll('.s04-sort-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      const val = opt.dataset.sort;
      label.textContent = 'Sort: ' + val;
      menu.querySelectorAll('.s04-sort-check').forEach(c => c.classList.add('hidden'));
      opt.querySelector('.s04-sort-check').classList.remove('hidden');
      menu.classList.add('hidden');
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#s04-sort-wrap')) menu.classList.add('hidden');
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') menu.classList.add('hidden'); });
})();

// ── Historical range dropdown (all instances) ──
(function () {
  const wraps = document.querySelectorAll('.hist-wrap');
  if (!wraps.length) return;
  function closeAll() { document.querySelectorAll('.hist-menu').forEach(m => m.classList.add('hidden')); }
  function position(btn, menu) {
    const r = btn.getBoundingClientRect();
    const menuH = 190, menuW = 170;
    let top = r.bottom + 4;
    let left = r.left;
    if (top + menuH > window.innerHeight - 8) top = Math.max(8, r.top - menuH - 4);
    if (left + menuW > window.innerWidth - 8) left = window.innerWidth - menuW - 8;
    menu.style.top = top + 'px';
    menu.style.left = left + 'px';
  }
  wraps.forEach(wrap => {
    const btn = wrap.querySelector('.hist-btn');
    const menu = wrap.querySelector('.hist-menu');
    const label = wrap.querySelector('.hist-label');
    if (!btn || !menu) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const opening = menu.classList.contains('hidden');
      closeAll();
      if (opening) { position(btn, menu); menu.classList.remove('hidden'); }
      btn.setAttribute('aria-expanded', opening ? 'true' : 'false');
    });
    menu.addEventListener('click', (e) => e.stopPropagation());
    menu.querySelectorAll('.hist-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        const val = opt.dataset.val;
        if (label) label.textContent = val;
        menu.querySelectorAll('.hist-check').forEach(c => c.classList.add('hidden'));
        opt.querySelector('.hist-check').classList.remove('hidden');
        menu.classList.add('hidden');
      });
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.hist-wrap') && !e.target.closest('.hist-menu')) closeAll();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
  window.addEventListener('resize', closeAll);
  window.addEventListener('scroll', closeAll, true);
})();

// ── Rules: + Add host popover ──
(function () {
  const btn = document.getElementById('host-add-btn');
  const menu = document.getElementById('host-add-menu');
  if (!btn || !menu) return;
  function position() {
    const r = btn.getBoundingClientRect();
    // Position below the button, aligned to its left; clamp if off-viewport
    let top = r.bottom + 4;
    let left = r.left;
    const menuH = 340, menuW = 260;
    if (top + menuH > window.innerHeight - 8) top = Math.max(8, r.top - menuH - 4);
    if (left + menuW > window.innerWidth - 8) left = window.innerWidth - menuW - 8;
    menu.style.top = top + 'px';
    menu.style.left = left + 'px';
  }
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const opening = menu.classList.contains('hidden');
    if (opening) position();
    menu.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', opening ? 'true' : 'false');
  });
  menu.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#host-add-wrap') && !e.target.closest('#host-add-menu')) menu.classList.add('hidden');
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') menu.classList.add('hidden'); });
  window.addEventListener('resize', () => { if (!menu.classList.contains('hidden')) position(); });
  window.addEventListener('scroll', () => { if (!menu.classList.contains('hidden')) position(); }, true);
})();

// ── View-level ⋯ menu (Copy Link + Edit View / Delete View) ──
(function () {
  const wraps = document.querySelectorAll('.view-more-wrap');
  wraps.forEach(wrap => {
    const btn = wrap.querySelector('.view-more-btn');
    const menu = wrap.querySelector('.view-more-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.view-more-menu').forEach(m => { if (m !== menu) m.classList.add('hidden'); });
      menu.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', String(!menu.classList.contains('hidden')));
    });
  });
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.view-more-wrap').forEach(w => {
      if (!w.contains(e.target)) w.querySelector('.view-more-menu')?.classList.add('hidden');
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.view-more-menu').forEach(m => m.classList.add('hidden'));
  });
})();

// ── Show (Active/Archived/All) dropdown ──
(function () {
  const wraps = document.querySelectorAll('.show-wrap');
  wraps.forEach(wrap => {
    const btn = wrap.querySelector('.show-btn');
    const menu = wrap.querySelector('.show-menu');
    const label = wrap.querySelector('.show-label');
    if (!btn || !menu || !label) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // close other open show menus
      document.querySelectorAll('.show-menu').forEach(m => { if (m !== menu) m.classList.add('hidden'); });
      menu.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', String(!menu.classList.contains('hidden')));
    });
    menu.querySelectorAll('.show-opt').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        label.textContent = opt.getAttribute('data-show');
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  });
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.show-wrap').forEach(w => {
      if (!w.contains(e.target)) w.querySelector('.show-menu')?.classList.add('hidden');
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.show-menu').forEach(m => m.classList.add('hidden'));
  });
})();

// ── Rules modal ──
(function () {
  const modal = document.getElementById('rules-modal');
  if (!modal) return;
  const editState = document.getElementById('rules-edit-state');
  const confirmState = document.getElementById('rules-confirm-state');
  const saveBtn = document.getElementById('rules-save-btn');
  const backBtn = document.getElementById('rules-confirm-back');
  const confirmNew = document.getElementById('rules-confirm-new');
  const confirmRepro = document.getElementById('rules-confirm-repro');

  function showEdit()    { editState.classList.remove('hidden'); confirmState.classList.add('hidden'); }
  function showConfirm() { editState.classList.add('hidden');    confirmState.classList.remove('hidden'); }

  function open()  { showEdit(); modal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
  function close() { modal.classList.add('hidden'); document.body.style.overflow = ''; setTimeout(showEdit, 250); }

  ['open-rules-modal', 'open-rules-modal-edit'].forEach(id => {
    const t = document.getElementById(id);
    if (t) t.addEventListener('click', open);
  });
  if (saveBtn) saveBtn.addEventListener('click', showConfirm);
  if (backBtn) backBtn.addEventListener('click', showEdit);
  if (confirmNew) confirmNew.addEventListener('click', close);
  if (confirmRepro) confirmRepro.addEventListener('click', close);
  modal.querySelectorAll('[data-rules-close]').forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
  });
})();
} catch (e) { console.warn("neuma.js block 3", e); }

try {
// ── Screen 16.1 · Create workflow interactivity ──
(function(){
  if (!document.getElementById('s161-when-label')) return; // workflow screens not in this file
  const $ = id => document.getElementById(id);
  const ICONS = {
    'Slack message': '<svg width="13" height="13" viewBox="0 0 24 24"><path fill="#E01E5A" d="M5.1 15.2a2.1 2.1 0 1 1-2.1-2.1h2.1zM6.2 15.2a2.1 2.1 0 0 1 4.2 0v5.3a2.1 2.1 0 0 1-4.2 0z"/><path fill="#36C5F0" d="M8.8 5.1a2.1 2.1 0 1 1 2.1-2.1v2.1zM8.8 6.2a2.1 2.1 0 0 1 0 4.2H3.5a2.1 2.1 0 0 1 0-4.2z"/><path fill="#2EB67D" d="M18.9 8.8a2.1 2.1 0 1 1 2.1 2.1h-2.1zM17.8 8.8a2.1 2.1 0 0 1-4.2 0V3.5a2.1 2.1 0 0 1 4.2 0z"/><path fill="#ECB22E" d="M15.2 18.9a2.1 2.1 0 1 1-2.1 2.1v-2.1zM15.2 17.8a2.1 2.1 0 0 1 0-4.2h5.3a2.1 2.1 0 0 1 0 4.2z"/></svg>',
    'Email': '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    'Teams message': '<svg width="13" height="13" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="3" fill="#6264A7"/><text x="12" y="16.5" text-anchor="middle" fill="#fff" font-family="Inter, sans-serif" font-size="12" font-weight="700">T</text></svg>'
  };
  const hideAll = () => document.querySelectorAll('.s161-menu').forEach(m => m.classList.add('hidden'));
  document.addEventListener('click', e => { if (!e.target.closest('.s161-wrap')) hideAll(); });
  function toggleMenu(btn, menu){
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const was = menu.classList.contains('hidden');
      hideAll();
      if (was) menu.classList.remove('hidden');
    });
    menu.addEventListener('click', e => e.stopPropagation());
  }

  function setStep(item, text, done){
    if (!item) return;
    const sum = item.querySelector('.s161-acc-sum');
    sum.textContent = text;
    sum.classList.toggle('text-amber-600', !done);
    sum.classList.toggle('text-slate-500', done);
    const num = item.querySelector('.s161-acc-num');
    if (done) {
      num.classList.remove('bg-slate-100','text-slate-500');
      num.classList.add('bg-emerald-500','text-white');
      num.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    } else {
      num.classList.remove('bg-emerald-500','text-white');
      num.classList.add('bg-slate-100','text-slate-500');
      num.textContent = num.dataset.n;
    }
  }

  const outputBody = $('s161-output-body');
  const initialOutput = outputBody ? outputBody.innerHTML : '';

  function refresh(){
    const [trig, act, views, out] = document.querySelectorAll('.s161-acc');
    setStep(trig, $('s161-when-label').textContent + ' · 3 rules', true);
    const channels = [...$('s161-then-menu').querySelectorAll('input[type=checkbox]')].filter(c => c.checked).map(c => c.dataset.name);
    setStep(act, channels.length ? channels.join(', ') + ' → ' + $('s161-sendto-label').textContent : 'Choose at least one channel', channels.length > 0);
    const n = document.querySelectorAll('#s161-views .s161-chip').length;
    setStep(views, n ? n + ' View' + (n === 1 ? '' : 's') + ' selected' : 'Select at least one View', n > 0);
    setStep(out, outputBody && outputBody.innerHTML !== initialOutput ? 'Custom structure' : 'Default discovery prep structure', true);
  }

  // Single-select dropdowns (When, Meeting type, Send to)
  [['s161-when-btn','s161-when-menu','s161-when-label'],
   ['s161-sendto-btn','s161-sendto-menu','s161-sendto-label']].forEach(([b,m,l]) => {
    const btn = $(b), menu = $(m), label = $(l);
    if (!btn || !menu) return;
    toggleMenu(btn, menu);
    menu.querySelectorAll('[data-val]').forEach(opt => opt.addEventListener('click', () => {
      label.textContent = opt.dataset.val;
      menu.querySelectorAll('.s161-check').forEach(c => c.classList.add('hidden'));
      opt.querySelector('.s161-check').classList.remove('hidden');
      menu.classList.add('hidden');
      refresh();
    }));
  });

  // Send via multi-select
  const thenBtn = $('s161-then-btn'), thenMenu = $('s161-then-menu'), thenLabel = $('s161-then-label');
  function renderThen(){
    const checked = [...thenMenu.querySelectorAll('input[type=checkbox]')].filter(c => c.checked).map(c => c.dataset.name);
    thenLabel.innerHTML = checked.length
      ? checked.map(n => ICONS[n]).join('') + '<span>' + checked.join(', ') + '</span>'
      : '<span class="text-slate-400">Choose a channel…</span>';
    refresh();
  }
  if (thenBtn && thenMenu) {
    toggleMenu(thenBtn, thenMenu);
    thenMenu.querySelectorAll('input[type=checkbox]').forEach(c => c.addEventListener('change', renderThen));
    const connect = $('s161-teams-connect');
    if (connect) connect.addEventListener('click', () => {
      const row = $('s161-teams-row'), cb = row.querySelector('input');
      cb.disabled = false;
      cb.classList.remove('opacity-40','cursor-not-allowed');
      cb.classList.add('accent-brand-600');
      const name = row.querySelector('.s161-teams-name');
      name.classList.remove('text-slate-400'); name.classList.add('text-slate-700');
      row.querySelector('svg').style.opacity = '1';
      const done = document.createElement('span');
      done.className = 'text-[11px] text-emerald-600 font-medium shrink-0';
      done.textContent = '✓ Connected';
      connect.replaceWith(done);
    });
    renderThen();
  }

  // Views chips
  function wireChip(chip){
    const x = chip.querySelector('button');
    if (x) x.addEventListener('click', e => { e.stopPropagation(); chip.remove(); refresh(); });
  }
  document.querySelectorAll('#s161-views .s161-chip').forEach(wireChip);
  const addBtn = $('s161-addview-btn'), addMenu = $('s161-addview-menu'), addWrap = $('s161-addview-wrap');
  if (addBtn && addMenu) {
    toggleMenu(addBtn, addMenu);
    addMenu.querySelectorAll('.s161-addview-opt').forEach(opt => opt.addEventListener('click', () => {
      const chip = document.createElement('span');
      chip.className = 's161-chip inline-flex items-center gap-1 px-2 py-1 rounded-full bg-brand-50 border border-brand-200 text-[12px] text-brand-700';
      chip.innerHTML = opt.textContent.trim() + ' <button class="opacity-60 hover:opacity-100">×</button>';
      addWrap.before(chip);
      wireChip(chip);
      opt.remove();
      addMenu.classList.add('hidden');
      refresh();
    }));
  }

  // Output editor
  if (outputBody) {
    outputBody.addEventListener('input', refresh);
    const reset = $('s161-reset');
    if (reset) reset.addEventListener('click', () => { outputBody.innerHTML = initialOutput; refresh(); });
  }

  // Edit rules → shared Rules modal
  const editRules = $('s161-edit-rules'), rulesModal = $('rules-modal');
  if (editRules && rulesModal) editRules.addEventListener('click', () => rulesModal.classList.remove('hidden'));

  // Accordion
  document.querySelectorAll('.s161-acc-head').forEach(head => head.addEventListener('click', () => {
    const item = head.closest('.s161-acc');
    const body = item.querySelector('.s161-acc-body');
    const opening = body.classList.contains('hidden');
    document.querySelectorAll('.s161-acc').forEach(i => {
      i.querySelector('.s161-acc-body').classList.add('hidden');
      i.querySelector('.s161-acc-chev').classList.remove('rotate-180');
      i.querySelector('.s161-acc-sum').classList.remove('hidden');
    });
    if (opening) {
      body.classList.remove('hidden');
      head.querySelector('.s161-acc-chev').classList.add('rotate-180');
      head.querySelector('.s161-acc-sum').classList.add('hidden');
    }
  }));

  refresh();
})();
} catch (e) { console.warn("neuma.js block 4", e); }

try {
// ── Screens 16 & 16.2 · Workflows navigation + generated previews ──
(function(){
  const goto = id => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };
  document.querySelectorAll('.s16-row').forEach(r => r.addEventListener('click', e => { if (e.target.closest('.s16-edit')) return; goto('scr-16-2'); }));
  document.querySelectorAll('.s16-edit').forEach(b => b.addEventListener('click', () => goto('scr-16-1')));
  const nw = document.getElementById('s16-new'); if (nw) nw.addEventListener('click', () => goto('scr-16-1'));
  const ed = document.getElementById('s162-edit'); if (ed) ed.addEventListener('click', () => goto('scr-16-1'));

  const RUNS = {
    meridian: {
      title: "Discovery prep — Meridian Health",
      meta: "Sent via Slack · Today 1:15 PM · 👍",
      plan: [["Stack","which tools own reporting today — likely HubSpot plus spreadsheets."],["Pain","where deal context dies in the sales-to-CS handoff."],["Buying","who signs, and when budget planning starts."]],
      items: [
        { t: "Open with", q: "\"Walk me through what happens to a deal after it closes.\"", v: "✓ Verified · Sarah M.", r: "Top-rep discovery · 08:12" },
        { t: "Budget timing", q: "\"When does planning for next year actually start?\"", v: "✓ Verified · Rina P.", r: "Coastal discovery · 19:44" }
      ]
    },
    brightline: {
      title: "Discovery prep — Brightline",
      meta: "Sent via Slack · Today 10:02 AM",
      plan: [["Team","how RevOps is structured and who feels reporting pain first."],["Trigger","what made this a priority now."],["Risk","whether they see us as a Gong duplicate."]],
      items: [
        { t: "Now vs later", q: "\"What changed that made this worth a call this quarter?\"", v: "✓ Verified · Sarah M.", r: "Ridgeway discovery · 14:48" },
        { t: "Gong overlap", q: "\"How are you using Gong today — where does it stop for you?\"", v: "✓ Verified · Rina P.", r: "Halcyon call · 09:31" }
      ]
    },
    coastal: {
      title: "Discovery prep — Coastal Group",
      meta: "Sent via Slack · Yesterday 4:30 PM · 👍",
      plan: [["Handoff","how commitments travel from sales into onboarding."],["Churn","what they saw in the accounts they lost last year."],["Metric","which number their VP is judged on."]],
      items: [
        { t: "Churn probe", q: "\"Think of the last account you lost — when did you first know?\"", v: "✓ Verified · Sarah M.", r: "CS discovery · 11:05" },
        { t: "Metric anchor", q: "\"If time-to-live improved 20%, who notices first?\"", v: "✓ Verified · Rina P.", r: "Nordic call · 27:30" }
      ]
    },
    halcyon: {
      title: "Discovery prep — Halcyon Labs",
      meta: "Sent via Slack · Yesterday 11:00 AM · 👎 Too generic",
      plan: [["Learn","their goals for the year."],["Pain","their main problems."],["Next","agree a follow-up."]],
      items: [
        { t: "Opening", q: "\"Can you tell me about your priorities this year?\"", v: "✓ Verified · Rina P.", r: "Coastal discovery · 19:44" }
      ]
    }
  };

  function render(key){
    const d = RUNS[key];
    if (!d) return;
    document.getElementById('s162-prev-title').textContent = d.title;
    document.getElementById('s162-prev-meta').textContent = d.meta;
    let out = '<div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-5 mb-1.5">What to learn</div><div class="space-y-1 text-[13px] text-slate-800 leading-relaxed">';
    d.plan.forEach(pair => { out += '<div><span class="font-bold">' + pair[0] + '</span> ' + pair[1] + '</div>'; });
    out += '</div><div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-5 mb-1.5">Questions to ask</div>';
    d.items.forEach((it, i) => {
      out += '<div class="text-[13px] text-slate-900 font-bold' + (i ? ' mt-3' : '') + '">' + it.t + '</div>';
      out += '<div class="mt-1 pl-3 text-[13px] text-slate-700 leading-relaxed" style="border-left:3px solid #e2e8f0;">' + it.q + '</div>';
      out += '<div class="text-[11.5px] mt-1"><span class="text-emerald-700 font-medium">' + it.v + '</span> <span class="text-slate-400">·</span> <span class="text-slate-500">' + it.r + '</span></div>';
    });
    document.getElementById('s162-prev-body').innerHTML = out;
    document.querySelectorAll('.s162-run').forEach(r => {
      const on = r.dataset.run === key;
      r.classList.toggle('bg-brand-50/50', on);
      r.classList.toggle('border-l-2', on);
      r.classList.toggle('border-brand-500', on);
      r.classList.toggle('hover:bg-slate-50/60', !on);
      const t = r.querySelector('.s162-run-title');
      t.classList.toggle('font-semibold', on);
      t.classList.toggle('text-slate-900', on);
      t.classList.toggle('font-medium', !on);
      t.classList.toggle('text-slate-800', !on);
    });
  }
  document.querySelectorAll('.s162-run').forEach(r => r.addEventListener('click', () => render(r.dataset.run)));
  if (document.getElementById('s162-prev-title')) render('meridian');
})();
} catch (e) { console.warn("neuma.js block 5", e); }

try {
// ── Screen 16.1 · State (empty) · fully interactive empty form ──
(function(){
  const $ = id => document.getElementById(id);
  if (!$('s161e-when-btn')) return;
  const hideAll = () => document.querySelectorAll('.s161e-menu').forEach(m => m.classList.add('hidden'));
  document.addEventListener('click', e => { if (!e.target.closest('.s161e-wrap')) hideAll(); });
  function toggleMenu(btn, menu){
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const was = menu.classList.contains('hidden');
      hideAll();
      if (was) menu.classList.remove('hidden');
    });
    menu.addEventListener('click', e => e.stopPropagation());
  }
  const state = { trigger: '', channels: [], sendto: '', views: 0, cal: '' };

  function setStep(item, text, done, pending){
    const sum = item.querySelector('.s161e-acc-sum');
    sum.textContent = text;
    sum.classList.toggle('text-amber-600', !done && !pending);
    sum.classList.toggle('text-slate-500', !!done);
    sum.classList.toggle('text-slate-400', !done && !!pending);
    const num = item.querySelector('.s161e-acc-num');
    if (done) {
      num.classList.remove('bg-slate-100','text-slate-500');
      num.classList.add('bg-emerald-500','text-white');
      num.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    } else {
      num.classList.remove('bg-emerald-500','text-white');
      num.classList.add('bg-slate-100','text-slate-500');
      num.textContent = num.dataset.n;
    }
  }

  function refresh(){
    const [trig, act, views, out] = document.querySelectorAll('.s161e-acc');
    setStep(trig, !state.trigger ? 'Choose when this runs' : !state.cal ? state.trigger + ' · connect a calendar' : state.trigger + ' · watching ' + state.cal, !!state.trigger && !!state.cal);
    const chOk = state.channels.length > 0, toOk = !!state.sendto;
    setStep(act,
      chOk && toOk ? state.channels.join(', ') + ' → ' + state.sendto
        : chOk ? 'Choose a recipient'
        : 'Choose at least one channel',
      chOk && toOk);
    setStep(views, state.views ? state.views + ' View' + (state.views === 1 ? '' : 's') + ' selected' : 'Select at least one View', state.views > 0);
    setStep(out, state.trigger ? 'Default ' + (state.trigger === 'After a call' ? 'post-call' : 'pre-call') + ' structure' : 'The default structure loads once you choose a trigger.', !!state.trigger, !state.trigger);
    // output panel
    $('s161e-output-ph').classList.toggle('hidden', !!state.trigger);
    $('s161e-output').classList.toggle('hidden', !state.trigger);
    if (state.trigger) $('s161e-output-title').textContent = (state.trigger === 'After a call' ? 'Post-call coaching' : 'Pre-call brief') + ' · default structure';
    // create buttons
    const ready = !!state.trigger && !!state.cal && chOk && toOk && state.views > 0;
    document.querySelectorAll('.s161e-create').forEach(b => {
      b.disabled = !ready;
      b.style.background = ready ? '#4a5bff' : '#e2e8f0';
      b.style.color = ready ? '#fff' : '#94a3b8';
      b.style.borderColor = ready ? '#4a5bff' : '#e2e8f0';
      b.style.cursor = ready ? 'pointer' : 'not-allowed';
    });
  }

  // When + Send to selects
  [['s161e-when-btn','s161e-when-menu','s161e-when-label','trigger'], ['s161e-sendto-btn','s161e-sendto-menu','s161e-sendto-label','sendto']].forEach(([b,m,l,key]) => {
    toggleMenu($(b), $(m));
    $(m).querySelectorAll('[data-val]').forEach(opt => opt.addEventListener('click', () => {
      state[key] = opt.dataset.val;
      const label = $(l);
      label.textContent = opt.dataset.val;
      label.classList.remove('text-slate-400');
      $(m).querySelectorAll('.s161e-check').forEach(c => c.classList.add('hidden'));
      opt.querySelector('.s161e-check').classList.remove('hidden');
      $(m).classList.add('hidden');
      refresh();
    }));
  });

  // Send via multiselect
  const thenMenu = $('s161e-then-menu'), thenLabel = $('s161e-then-label');
  toggleMenu($('s161e-then-btn'), thenMenu);
  function renderThen(){
    state.channels = [...thenMenu.querySelectorAll('input[type=checkbox]')].filter(c => c.checked).map(c => c.dataset.name);
    if (state.channels.length) {
      thenLabel.classList.remove('text-slate-400');
      thenLabel.textContent = state.channels.join(', ');
    } else {
      thenLabel.classList.add('text-slate-400');
      thenLabel.textContent = 'Choose channels…';
    }
    refresh();
  }
  thenMenu.querySelectorAll('input[type=checkbox]').forEach(c => c.addEventListener('change', renderThen));
  const connect = $('s161e-teams-connect');
  if (connect) connect.addEventListener('click', () => {
    const row = $('s161e-teams-row'), cb = row.querySelector('input');
    cb.disabled = false;
    cb.classList.remove('opacity-40','cursor-not-allowed');
    cb.classList.add('accent-brand-600');
    const nm = row.querySelector('.s161e-teams-name');
    nm.classList.remove('text-slate-400'); nm.classList.add('text-slate-700');
    row.querySelector('svg').style.opacity = '1';
    const ok = document.createElement('span');
    ok.className = 'text-[11px] text-emerald-600 font-medium shrink-0';
    ok.textContent = '✓ Connected';
    connect.replaceWith(ok);
  });

  // Views: add / remove chips
  const addMenu = $('s161e-addview-menu'), addWrap = $('s161e-addview-wrap');
  toggleMenu($('s161e-addview-btn'), addMenu);
  addMenu.querySelectorAll('.s161e-addview-opt').forEach(opt => opt.addEventListener('click', () => {
    const chip = document.createElement('span');
    chip.className = 'inline-flex items-center gap-1 px-2 py-1 rounded-full bg-brand-50 border border-brand-200 text-[12px] text-brand-700';
    chip.innerHTML = opt.textContent.trim() + ' <button class="opacity-60 hover:opacity-100">×</button>';
    addWrap.before(chip);
    chip.querySelector('button').addEventListener('click', e => {
      e.stopPropagation();
      chip.remove();
      addMenu.appendChild(opt);
      state.views--;
      $('s161e-views-empty').classList.toggle('hidden', state.views > 0);
      refresh();
    });
    opt.remove();
    addMenu.classList.add('hidden');
    state.views++;
    $('s161e-views-empty').classList.add('hidden');
    refresh();
  }));

  // Calendar connect prompt
  document.querySelectorAll('.s161e-cal-connect').forEach(btn => btn.addEventListener('click', () => {
    state.cal = btn.dataset.cal;
    const icon = btn.querySelector('svg').outerHTML;
    $('s161e-cal').outerHTML = '<div class="mt-5 -mx-5 -mb-5 px-5 py-2.5 border-t border-slate-100 bg-slate-50/40 rounded-b-xl flex items-center gap-1.5 text-[12px] text-slate-500">Watches all connected calendars: ' + icon + ' <span class="text-slate-600 font-medium">' + state.cal + '</span> <span class="text-emerald-600">✓ Connected</span></div>';
    refresh();
  }));

  // Add rules → shared modal
  const ar = $('s161e-addrules'), rm = $('rules-modal');
  if (ar && rm) ar.addEventListener('click', () => rm.classList.remove('hidden'));

  // Accordion
  document.querySelectorAll('.s161e-acc-head').forEach(head => head.addEventListener('click', () => {
    const item = head.closest('.s161e-acc');
    const body = item.querySelector('.s161e-acc-body');
    const opening = body.classList.contains('hidden');
    document.querySelectorAll('.s161e-acc').forEach(i => {
      i.querySelector('.s161e-acc-body').classList.add('hidden');
      i.querySelector('.s161e-acc-chev').classList.remove('rotate-180');
      i.querySelector('.s161e-acc-sum').classList.remove('hidden');
    });
    if (opening) {
      body.classList.remove('hidden');
      head.querySelector('.s161e-acc-chev').classList.add('rotate-180');
      head.querySelector('.s161e-acc-sum').classList.add('hidden');
    }
  }));

  refresh();
})();
} catch (e) { console.warn("neuma.js block 6", e); }

try {
// ── Rules modal · add/remove rules ──
(function(){
  const list = document.getElementById('rules-list');
  const btn = document.getElementById('rules-add-btn');
  const menu = document.getElementById('rules-add-menu');
  if (!list || !btn) return;

  const DEL = '<button class="rules-row-del w-5 h-5 flex items-center justify-center rounded text-slate-300 hover:text-rose-500 hover:bg-rose-50 shrink-0" title="Remove rule">×</button>';
  const AND = '<span class="text-[10px] font-mono uppercase tracking-wider text-slate-400 w-8">And</span>';
  const pill = t => '<span class="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-[12px] text-slate-800 font-medium shrink-0">' + t + '</span>';
  const dd = t => '<button class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-slate-300 text-[12px] text-slate-700 hover:bg-slate-50">' + t + ' <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><polyline points="6 9 12 15 18 9"/></svg></button>';
  const row = inner => '<div class="flex items-center gap-3 px-3.5 py-2.5 hover:bg-slate-50/60">' + AND + inner + DEL + '</div>';

  const TEMPLATES = {
    host: () => row(pill('Host is') + '<div class="flex-1 flex flex-wrap gap-1 items-center"><button class="text-[12px] text-slate-500 hover:text-brand-700 font-medium ml-1">+ Add people or teams</button></div>'),
    attendees: () => row(pill('Attendees include') + '<div class="flex-1 flex flex-wrap gap-4 items-center text-[12px] text-slate-700">'
      + '<label class="inline-flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked class="accent-brand-600 w-3.5 h-3.5"> External</label>'
      + '<label class="has-tt inline-flex items-center gap-1.5" data-tt="Internal attendees can\'t be excluded"><input type="checkbox" checked disabled class="accent-brand-600 w-3.5 h-3.5 opacity-60"> Internal</label></div>'),
    contains: () => row(pill('Meeting name contains') + '<input type="text" placeholder=\'"demo", "discovery"\' class="flex-1 px-2 py-1 border-0 text-[13px] bg-transparent focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/15 focus:rounded-md">'),
    notcontains: () => row(pill('Name does not contain') + '<input type="text" placeholder=\'"demo", "pricing", "proposal"\' class="flex-1 px-2 py-1 border-0 text-[13px] bg-transparent focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/15 focus:rounded-md">'),
    priorcalls: () => row(pill('Prior calls with account') + '<div class="flex-1 flex flex-wrap items-center gap-2 text-[12px] text-slate-600">' + dd('None') + '<span>in the last</span>' + dd('90 days') + '</div>'),
    transcript: () => row(pill('Transcript mentions') + '<input type="text" placeholder=\'pricing, objection, ROI\' class="flex-1 px-2 py-1 border-0 text-[13px] bg-transparent focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/15 focus:rounded-md">')
  };

  function wireDel(r){
    const x = r.querySelector('.rules-row-del');
    if (x) x.addEventListener('click', () => r.remove());
  }
  [...list.children].forEach(wireDel);

  btn.addEventListener('click', e => { e.stopPropagation(); menu.classList.toggle('hidden'); });
  menu.addEventListener('click', e => e.stopPropagation());
  document.addEventListener('click', e => { if (!e.target.closest('#rules-add-wrap')) menu.classList.add('hidden'); });

  menu.querySelectorAll('.rules-add-opt').forEach(opt => opt.addEventListener('click', () => {
    const holder = document.createElement('div');
    holder.innerHTML = TEMPLATES[opt.dataset.rt]();
    const r = holder.firstElementChild;
    list.appendChild(r);
    wireDel(r);
    menu.classList.add('hidden');
  }));
})();
} catch (e) { console.warn("neuma.js block 7", e); }

try {
// ── Rules modal · host picks render as pills ──
(function(){
  const menu = document.getElementById('host-add-menu');
  const wrap = document.getElementById('host-add-wrap');
  if (!menu || !wrap) return;
  const chipsHost = wrap.parentElement;
  const GROUPS = ['AE team','CS team','All hosts'];
  const CHECK = '<svg class="text-brand-600" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  function chipFor(name){
    const isGroup = GROUPS.includes(name);
    const s = document.createElement('span');
    s.dataset.host = name;
    s.className = isGroup
      ? 'host-chip inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[12px] text-slate-700'
      : 'host-chip inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-[12px] text-brand-700';
    s.innerHTML = name + (isGroup ? ' <span class="text-[10px] text-slate-400 ml-0.5">group</span>' : '') + ' <button class="opacity-60 hover:opacity-100">×</button>';
    s.querySelector('button').addEventListener('click', e => { e.stopPropagation(); setPicked(name, false); });
    return s;
  }
  function optFor(name){
    return [...menu.querySelectorAll('button')].find(b => {
      const t = b.querySelector('.flex-1');
      return t && t.textContent.trim() === name;
    });
  }
  function setPicked(name, on){
    const opt = optFor(name);
    if (opt) {
      const svg = opt.querySelector('svg.text-brand-600');
      if (on && !svg) opt.insertAdjacentHTML('beforeend', CHECK);
      if (!on && svg) svg.remove();
    }
    const existing = chipsHost.querySelector('[data-host="' + name + '"]');
    if (on && !existing) chipsHost.insertBefore(chipFor(name), wrap);
    if (!on && existing) existing.remove();
  }
  [...menu.querySelectorAll('button')].forEach(b => {
    const t = b.querySelector('.flex-1');
    if (!t) return;
    b.addEventListener('click', e => {
      e.stopPropagation();
      const name = t.textContent.trim();
      setPicked(name, !chipsHost.querySelector('[data-host="' + name + '"]'));
    });
  });
  // seed pills from the pre-ticked entries
  [...menu.querySelectorAll('button')].forEach(b => {
    const t = b.querySelector('.flex-1');
    if (t && b.querySelector('svg.text-brand-600')) setPicked(t.textContent.trim(), true);
  });
})();
} catch (e) { console.warn("neuma.js block 8", e); }

try {
// ── Screen 2.1 · Create Context drawer — clickable sources flow ──
(function(){
  const d=document.querySelector('[data-cd-drawer]'); if(!d) return;
  const views=[...d.querySelectorAll('[data-cd-view]')];
  const show=n=>{views.forEach(v=>v.classList.toggle('hidden',v.dataset.cdView!==n)); d.querySelector('[data-cd-menu]').classList.add('hidden');};
  const ICONS={meet:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,manual:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,rule:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,series:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m22 8-6 4 6 4V8z"/></svg>`,meetings:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m22 8-6 4 6 4V8z"/></svg>`,channels:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>`,account:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01"/></svg>`};
  const RESULTS={
    meet:[['Acme <> Neuma weekly','series'],['Acme Corp · Procurement sync','series']],
    manual:[['Design partner office hours','series'],['Globex pilot kickoff · Nov 12','meeting'],['Neuma founders sync · Nov 3','meeting'],['Pricing follow-up · Oct 29','meeting']],
    channels:[['#founders, #design-partners','channels']],
    account:[['Acme Corp','account']],
    rule:[['Attendee domain is any of @acme.com, @acme-corp.co · +2 conditions','rule']]
  };
  const list=d.querySelector('[data-cd-list]'), empty=d.querySelector('[data-cd-empty]');
  const esc=s=>s.replace(/</g,'&lt;').replace(/>/g,'&gt;');
  function addRows(kind){
    (RESULTS[kind]||[]).forEach(([t,sub])=>{
      if([...list.children].some(r=>r.dataset.key===t)) return;
      const row=document.createElement('div'); row.dataset.key=t;
      row.className='flex items-center gap-2.5 px-3 py-2';
      row.innerHTML=`<span class="text-slate-500 shrink-0">${ICONS[kind]}</span><span class="flex-1 min-w-0 text-[13px] text-slate-800 truncate">${esc(t)}</span><span class="text-[11px] text-slate-400 font-mono uppercase tracking-wider shrink-0">${sub}</span><button class="text-slate-300 hover:text-slate-600 ml-1" title="Remove">×</button>`;
      row.querySelector('button').addEventListener('click',()=>{row.remove(); if(!list.children.length){list.classList.add('hidden');empty.classList.remove('hidden');}});
      list.appendChild(row);
    });
    if(list.children.length){list.classList.remove('hidden');empty.classList.add('hidden');}
  }
  d.querySelector('[data-cd-plus]').addEventListener('click',e=>{e.stopPropagation(); d.querySelector('[data-cd-menu]').classList.toggle('hidden');});
  d.querySelectorAll('[data-cd-go]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation(); show(b.dataset.cdGo);}));
  d.querySelectorAll('[data-cd-back]').forEach(b=>b.addEventListener('click',()=>show('main')));
  d.querySelectorAll('[data-cd-commit]').forEach(b=>b.addEventListener('click',()=>{ if(b.dataset.cdCommit) addRows(b.dataset.cdCommit); show('main'); }));
  const cb=d.querySelector('[data-cd-condbtn]'); if(cb) cb.addEventListener('click',e=>{e.stopPropagation(); d.querySelector('[data-cd-condmenu]').classList.toggle('hidden');});
  document.addEventListener('click',()=>{ d.querySelector('[data-cd-menu]').classList.add('hidden'); const cm=d.querySelector('[data-cd-condmenu]'); if(cm) cm.classList.add('hidden'); });
  // any / all toggle inside the live rules view
  const rv=d.querySelector('[data-cd-view="rules_cfg"]');
  if(rv){
    const btns=[...rv.querySelectorAll('.inline-flex.rounded-md.bg-slate-100.p-0\\.5 > button')];
    btns.forEach(b=>b.addEventListener('click',()=>{
      btns.forEach(x=>{x.className='px-3 py-0.5 rounded text-[12px] font-medium text-slate-500';});
      b.className='px-3 py-0.5 rounded text-[12px] font-medium bg-white text-slate-900 shadow-sm';
      const all=b.textContent.trim()==='all';
      rv.querySelectorAll('span.w-6').forEach(s=>s.textContent=all?'And':'Or');
      const f=rv.querySelector('.num'); if(f) f.textContent=all?'9':'38';
    }));
  }
  // Escape returns to main
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') show('main'); });
})();
} catch (e) { console.warn("neuma.js block 9", e); }

try {
// ── Screen 3.1 · Edit Context drawer — ⋯ menu ──
(function(){
  const w=document.querySelector('[data-ce-more-wrap]'); if(!w) return;
  const btn=w.querySelector('[data-ce-more]'), menu=w.querySelector('[data-ce-menu]');
  btn.addEventListener('click',e=>{e.stopPropagation(); menu.classList.toggle('hidden');});
  menu.addEventListener('click',e=>e.stopPropagation());
  document.addEventListener('click',()=>menu.classList.add('hidden'));
})();
} catch (e) { console.warn("neuma.js block 10", e); }

try {
// ── Screen 3 · Context detail — per-source ⋯ row menus ──
(function(){
  const wraps=document.querySelectorAll('#context-detail-v1-min [data-row-more-wrap]'); if(!wraps.length) return;
  const closeAll=()=>wraps.forEach(w=>w.querySelector('[data-row-menu]').classList.add('hidden'));
  wraps.forEach(w=>{
    const b=w.querySelector('[data-row-more]'), m=w.querySelector('[data-row-menu]');
    b.addEventListener('click',e=>{e.stopPropagation(); const open=m.classList.contains('hidden'); closeAll(); if(open) m.classList.remove('hidden');});
    m.addEventListener('click',e=>e.stopPropagation());
    m.querySelector('.text-rose-600').addEventListener('click',()=>{ const tr=w.closest('tr'); tr.style.transition='opacity .18s'; tr.style.opacity='0'; setTimeout(()=>tr.remove(),180); });
  });
  document.addEventListener('click',closeAll);
})();
} catch (e) { console.warn("neuma.js block 11", e); }

try {
// ── Screen 3 · Context detail — header "+ Add sources" and "⋯" menus ──
(function(){
  const wraps=document.querySelectorAll('#context-detail-v1-min [data-hdr-wrap]'); if(!wraps.length) return;
  const closeAll=()=>wraps.forEach(w=>w.querySelector('[data-hdr-menu]').classList.add('hidden'));
  wraps.forEach(w=>{
    const b=w.querySelector('[data-hdr-btn]'), m=w.querySelector('[data-hdr-menu]');
    b.addEventListener('click',e=>{e.stopPropagation(); const open=m.classList.contains('hidden'); closeAll(); if(open) m.classList.remove('hidden');});
    m.addEventListener('click',e=>{e.stopPropagation(); closeAll();});
  });
  document.addEventListener('click',closeAll);
})();
} catch (e) { console.warn("neuma.js block 12", e); }

try {
// ── Screen 3 · Context detail — what each menu item does ──
(function(){
  const root=document.getElementById('context-detail-v1-min'); if(!root) return;
  const ov=root.querySelector('[data-dd-overlay]'), dr=root.querySelector('[data-dd-drawer]');
  const views=[...dr.querySelectorAll('[data-dd-view]')];
  const toast=root.querySelector('[data-dd-toast]'), ttext=root.querySelector('[data-dd-toast-text]'), tundo=root.querySelector('[data-dd-toast-undo]');
  let tt=null, undoFn=null;
  function say(msg,undo){ ttext.textContent=msg; undoFn=undo||null; tundo.classList.toggle('hidden',!undo); toast.classList.remove('hidden'); clearTimeout(tt); tt=setTimeout(()=>toast.classList.add('hidden'),3200); }
  tundo.addEventListener('click',()=>{ if(undoFn) undoFn(); toast.classList.add('hidden'); });
  function closeAll(){ ov.classList.add('hidden'); dr.classList.add('hidden'); root.querySelectorAll('[data-dd-dialog]').forEach(d=>d.classList.add('hidden')); root.querySelectorAll('[data-dd-menu],[data-dd-condmenu],[data-hdr-menu],[data-row-menu]').forEach(m=>m.classList.add('hidden')); }
  function openView(n){ closeAll(); views.forEach(v=>v.classList.toggle('hidden',v.dataset.ddView!==n)); ov.classList.remove('hidden'); dr.classList.remove('hidden'); }
  function openDialog(n){ closeAll(); root.querySelector('[data-dd-dialog="'+n+'"]').classList.remove('hidden'); }
  root.querySelectorAll('[data-dd-open]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation(); openView(b.dataset.ddOpen);}));
  root.querySelectorAll('[data-dd-dialog-open]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation(); openDialog(b.dataset.ddDialogOpen);}));
  root.querySelectorAll('[data-dd-go]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation(); views.forEach(v=>v.classList.toggle('hidden',v.dataset.ddView!==b.dataset.ddGo));}));
  root.querySelectorAll('[data-dd-back]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation(); closeAll();}));
  root.querySelectorAll('[data-dd-zoom]').forEach(b=>b.addEventListener('click',()=>say('Opening transcript…')));
  ov.addEventListener('click',closeAll);
  const cb=dr.querySelector('[data-dd-condbtn]'); if(cb) cb.addEventListener('click',e=>{e.stopPropagation(); dr.querySelector('[data-dd-condmenu]').classList.toggle('hidden');});
  const mw=dr.querySelector('[data-dd-more-wrap]'); if(mw){ const mb=mw.querySelector('[data-dd-more]'), mm=mw.querySelector('[data-dd-menu]'); mb.addEventListener('click',e=>{e.stopPropagation(); mm.classList.toggle('hidden');}); mm.querySelectorAll('button').forEach(x=>x.addEventListener('click',e=>{e.stopPropagation(); openDialog(/Delete/.test(x.textContent)?'delete':'archive');})); }
  const chk=root.querySelector('[data-dd-confirmcheck]'), delBtn=root.querySelector('[data-dd-commit="delete"]');
  if(chk) chk.addEventListener('change',()=>{ delBtn.disabled=!chk.checked; delBtn.style.opacity=chk.checked?'1':'.5'; });
  const count=root.querySelector('h1')?.nextElementSibling;
  const MSG={manual:'4 transcripts added to Acme Corp',meet:'Recurring meetings saved',rule:'Rules saved · 38 transcripts matched',edit:'Changes saved',addctx:'Added to 1 other Context',archive:'Acme Corp archived',delete:'Acme Corp deleted'};
  root.querySelectorAll('[data-dd-commit]').forEach(b=>b.addEventListener('click',e=>{ e.stopPropagation(); const k=b.dataset.ddCommit; if(b.disabled) return; closeAll();
    if(k==='archive'||k==='delete'){ const main=root.querySelector('main'); main.style.transition='opacity .25s'; main.style.opacity='.35'; say(MSG[k],()=>{main.style.opacity='1';}); return; }
    say(MSG[k]||'Done'); }));
  // meet view: Available / Linked tabs
  const mtabs=[...dr.querySelectorAll('[data-dd-view="meet"] [data-dd-tab]')];
  mtabs.forEach(t=>t.addEventListener('click',()=>{ mtabs.forEach(x=>x.className='px-3 py-1 rounded font-medium text-slate-500'); t.className='px-3 py-1 rounded font-medium bg-white text-slate-900 shadow-sm'; dr.querySelectorAll('[data-dd-view="meet"] [data-dd-group]').forEach(g=>g.classList.toggle('hidden',g.dataset.ddGroup!==t.dataset.ddTab)); const ir=dr.querySelector('[data-dd-view="meet"] [data-dd-importrow]'); if(ir) ir.classList.toggle('hidden',t.dataset.ddTab==='linked'); }));
  // meet view: live summary of link/unlink changes
  const mvw=dr.querySelector('[data-dd-view="meet"]');
  if(mvw){ const boxes=[...mvw.querySelectorAll('input[type=checkbox]')].filter(c=>c.closest('label')&&c.closest('label').querySelector('.truncate')); const init=boxes.map(c=>c.checked); const sum=mvw.querySelector('[data-dd-meetsum]');
    boxes.forEach((c,i)=>c.addEventListener('change',()=>{ let add=0,rm=0; boxes.forEach((x,k)=>{ if(x.checked&&!init[k]) add++; if(!x.checked&&init[k]) rm++; }); const linked=init.filter(Boolean).length; let s='<span class="num font-mono font-semibold text-slate-700">'+linked+'</span> linked'; if(!add&&!rm) s+=' · no changes'; if(add) s+=' · <span class="text-emerald-700 font-medium">+'+add+' to link</span>'; if(rm) s+=' · <span class="text-rose-600 font-medium">−'+rm+' to unlink</span>'; sum.innerHTML=s; })); }
  // any/all toggle inside cloned rules view
  const rv=dr.querySelector('[data-dd-view="rules_cfg"]');
  if(rv){ const btns=[...rv.querySelectorAll('.inline-flex.rounded-md.bg-slate-100.p-0\\.5 > button')];
    btns.forEach(b=>b.addEventListener('click',()=>{ btns.forEach(x=>x.className='px-3 py-0.5 rounded text-[12px] font-medium text-slate-500'); b.className='px-3 py-0.5 rounded text-[12px] font-medium bg-white text-slate-900 shadow-sm'; const all=b.textContent.trim()==='all'; rv.querySelectorAll('span.w-6').forEach(s=>s.textContent=all?'And':'Or'); const f=rv.querySelector('.num'); if(f) f.textContent=all?'9':'38'; })); }
  // row remove -> toast with undo (hook into existing fade)
  root.querySelectorAll('[data-row-more-wrap] .text-rose-600').forEach(b=>b.addEventListener('click',()=>{ const tr=b.closest('tr'); const clone=tr.cloneNode(true); const parent=tr.parentNode, next=tr.nextSibling; setTimeout(()=>say('Removed from Acme Corp',()=>{ parent.insertBefore(tr,next); tr.style.opacity='1'; }),200); }));
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeAll(); });
})();
} catch (e) { console.warn("neuma.js block 13", e); }

try {
// ── Rules views · backfill checkbox drives the footer message ──
(function(){
  document.querySelectorAll('[data-cd-view="rules_cfg"],[data-dd-view="rules_cfg"]').forEach(v=>{
    const cb=v.querySelector('[data-backfill]'); const foot=v.querySelector('.border-t span.text-\\[12px\\]');
    if(!cb||!foot) return; const on=foot.innerHTML;
    cb.addEventListener('change',()=>{ foot.innerHTML=cb.checked?on:'Rules will apply to new transcripts only'; });
  });
})();
} catch (e) { console.warn("neuma.js block 14", e); }

try {
// ── Screen 05 · Create View → review brief modal ──
(function(){
  const m=document.querySelector('[data-brief-modal]'); if(!m) return;
  const lock=on=>{ document.body.style.overflow=on?'hidden':''; };
  document.querySelectorAll('[data-brief-open]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault(); m.classList.remove('hidden'); lock(true);}));
  m.querySelectorAll('[data-brief-close]').forEach(b=>b.addEventListener('click',()=>{m.classList.add('hidden'); lock(false);}));
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ m.classList.add('hidden'); lock(false);} });
})();
} catch (e) { console.warn("neuma.js block 15", e); }

try {
// ── Screen 06 · Edit View → brief modal (Advanced) ──
(function(){
  const m=document.querySelector('[data-brief-modal-edit]'); if(!m) return;
  const lock=on=>{ document.body.style.overflow=on?'hidden':''; };
  document.querySelectorAll('[data-brief-open-edit]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault(); m.classList.remove('hidden'); lock(true);}));
  m.querySelectorAll('[data-brief-close-edit]').forEach(b=>b.addEventListener('click',()=>{m.classList.add('hidden'); lock(false);}));
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ m.classList.add('hidden'); lock(false);} });
})();
} catch (e) { console.warn("neuma.js block 16", e); }

try {
// ── Brief modal · live atom preview. Example set comes from the Objective; any row edit regenerates. ──
(function(){
  const SETS=[
    {k:/objection|win rate|deal/i, name:'objection',
      q:"Why should we switch when Mailchimp is free?", s:"We're built to sell tickets, not T-shirts.", i:"Mailchimp is free: why prospects switch anyway",
      ext:"Because free sends emails and we sell tickets. We model the fan, the venue and the on-sale, so your campaigns know who bought last time and who didn't. Last quarter that was 2.1× attributed pipeline for a promoter your size, inside 60 days. Mailchimp can't see a ticket, so it can't tell you who to email next.",
      int:"Free sends emails; we sell tickets. We model the fan, the venue and the on-sale, so campaigns know who bought last time. Last quarter that was 2.1× attributed pipeline for a mid-size promoter inside 60 days. Mailchimp can't see a ticket, so it can't say who to email next.",
      alt:{q:"We already have a CRM. Why add another tool?", s:"You're not replacing your CRM. We sit beside it.", i:"CRM overlap: position as beside, not instead",
        ext:"You're not replacing anything. We sit beside your CRM and push attribution back into it, so your reports stay where they are and your team keeps the views they know. What changes is that every campaign now starts from who bought a ticket, which no CRM can see on its own.",
        int:"Position beside the CRM, never instead. Attribution flows back into HubSpot or Salesforce; reports and views stay put. The new thing is campaigns starting from ticket purchase data, which the CRM can't see."}},
    {k:/onboard|setup|set up|csm|new client/i, name:'onboarding',
      q:"Do we need a list for every show?", s:"One list per brand. Segment inside it, never spawn new lists.", i:"One list per brand, segments inside it",
      ext:"No. Keep one list per brand and segment inside it. A list is the unsubscribe preference, so a list per show means unsubscribing from one doesn't remove them from the others. That's the number one promoter mistake we see. Build segments and tags for the slicing instead.",
      int:"One list per brand, segments inside. A list is the unsubscribe preference; a list per show means an unsubscribe from one doesn't clear the others. Most-taught rule across onboarding calls. Segments and tags do the slicing.",
      alt:{q:"Can we send before the domain is verified?", s:"Domain authentication is step one. Nothing sends without it.", i:"Domain authentication blocks everything until done",
        ext:"No. Domain authentication is step one, and nothing sends until it's done. It takes ten minutes with whoever owns your DNS. Skip it and your first campaign lands in spam, which is the hardest first impression to recover from.",
        int:"Domain auth first, always. Ten minutes with the DNS owner. Teams that skip it land the first send in spam and blame deliverability. Blocks every other onboarding step."}},
    {k:/competit|versus|against|compare/i, name:'competitive',
      q:"How are you different from Hive?", s:"Hive sends email. We know who bought the ticket.", i:"Hive: email only, no ticket data",
      ext:"Hive is an email tool. We sit on the ticket sale itself, so every campaign starts from who bought what and when. That's why our customers see attribution back to the on-sale, not just an open rate. Hive can't do that without you exporting a spreadsheet every week.",
      int:"Hive is email only. We sit on the ticket sale, so campaigns start from purchase data and attribution runs back to the on-sale. Hive needs a weekly export to get close. Concede: Hive's editor is nicer."},
    {k:/demo|pitch|reason to buy|value/i, name:'demo',
      q:"What does it actually do for us?", s:"You find out who to email before the on-sale, not after.", i:"Pre-on-sale targeting is the core pitch",
      ext:"Before an on-sale you already know which fans bought last time, which lapsed and which are new. So the first email goes to the people most likely to buy, and the attribution report shows you what it returned. For one promoter that was 2.1× pipeline inside 60 days.",
      int:"Lead with pre-on-sale targeting: known buyers, lapsed, new. Then attribution back to the on-sale. Proof: 2.1× pipeline in 60 days for a mid-size promoter. Don't lead with the editor."},
  ];
  const DEFAULT=SETS[0];
  function pick(obj){ return SETS.find(s=>s.k.test(obj||''))||DEFAULT; }
  function trimWords(s,n){ const w=s.split(/\s+/); return w.length<=n? s : w.slice(0,n).join(' ').replace(/[,;:]$/,'')+'.'; }
  function bullets(s,n){ const parts=s.replace(/;/g,'.').split(/(?<=\.)\s+/).filter(Boolean); const per=Math.max(6,Math.floor(n/Math.min(4,parts.length))); return '<ul class="list-disc pl-4 space-y-1">'+parts.slice(0,4).map(p=>'<li>'+trimWords(p,per)+'</li>').join('')+'</ul>'; }
  document.querySelectorAll('[data-atom-preview]').forEach(pv=>{
    const grid=pv.closest('[data-brief-grid]'), modal=pv.closest('[data-brief-modal],[data-brief-modal-edit]')||grid.closest('.rounded-2xl');
    const hd=pv.querySelector('[data-atom-headline]'), bd=pv.querySelector('[data-atom-body]');
    const card=pv.querySelector('.rounded-xl');
    const segs=[...grid.querySelectorAll('.inline-flex.rounded-md.bg-slate-100.p-0\\.5')]; const aud=segs[0], fmt=segs[1];
    const nums=[...grid.querySelectorAll('input.num')]; const hn=nums[0], bn=nums[1];
    const texts=[...grid.querySelectorAll('textarea, input:not(.num)')];
    const objEl=modal?modal.querySelector('.text-\\[13px\\].text-slate-800.leading-relaxed'):null;
    const rows=label=>{ const l=[...grid.querySelectorAll('div.font-mono.uppercase')].find(d=>d.textContent.trim()===label); return l? l.parentElement.querySelector('textarea,input'):null; };
    function state(){ const on=el=>el?[...el.querySelectorAll('button')].find(b=>b.className.includes('bg-white'))?.textContent.trim():''; return {aud:on(aud), fmt:on(fmt), h:+(hn&&hn.value)||15, b:+(bn&&bn.value)||70}; }
    const rf=pv.querySelector('[data-atom-refresh]');
    let t=null, alt=0;
    function render(pulse){
      const s=state(); const internal=/Internal/.test(s.aud); let set=pick(objEl?objEl.textContent:''); if(alt&&set.alt) set=Object.assign({},set,set.alt);
      const form=(rows('Form')?.value||'').toLowerCase();
      let head = internal ? set.i : (/statement/.test(form)&&!/question/.test(form) ? set.s : set.q);
      const src=internal?set.int:set.ext;
      const go=()=>{ hd.textContent=trimWords(head,s.h); bd.innerHTML=/Bullets/.test(s.fmt)?bullets(src,s.b):trimWords(src,s.b);
        card.style.opacity='1'; };
      if(pulse){ card.style.transition='opacity .2s'; card.style.opacity='.45'; const cap=pv.querySelector('[data-atom-caption]'); if(cap) cap.style.visibility='hidden'; if(rf){ rf.dataset.label=rf.dataset.label||rf.textContent; rf.textContent='Regenerating…'; rf.disabled=true; } clearTimeout(t); t=setTimeout(()=>{ go(); if(cap) cap.style.visibility=''; if(rf){ rf.textContent=rf.dataset.label; rf.disabled=false; } },650); } else go();
    }
    [aud,fmt].forEach(seg=>{ if(!seg) return; seg.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{ seg.querySelectorAll('button').forEach(x=>x.className='px-3 py-1 rounded font-medium text-slate-500'); b.className='px-3 py-1 rounded font-medium bg-white text-slate-900 shadow-sm'; render(true); })); });
    nums.forEach(i=>i.addEventListener('input',()=>render(true)));
    const stale=pv.querySelector('[data-atom-stale]');
    const markStale=()=>{ if(stale) stale.classList.remove('hidden'); card.style.opacity='.6'; if(rf) rf.className='shrink-0 inline-flex items-center gap-1 whitespace-nowrap text-amber-800 font-semibold'; };
    texts.forEach(i=>i.addEventListener('input',markStale));

    if(rf) rf.addEventListener('click',()=>{ alt=(alt+1)%2; if(stale) stale.classList.add('hidden'); rf.className='shrink-0 inline-flex items-center gap-1 whitespace-nowrap text-slate-500 hover:text-brand-700 font-medium'; render(true); });
    render(false);
  });
  // Create: carry the typed Objective into the modal, so the example set follows it
  const ta=document.querySelector('#screen-05 textarea'); const cm=document.querySelector('[data-brief-modal]');
  if(ta&&cm){ document.querySelectorAll('#screen-05 [data-brief-open]').forEach(b=>b.addEventListener('click',()=>{ const o=cm.querySelector('.text-\\[13px\\].text-slate-800.leading-relaxed'); if(o&&ta.value.trim()) o.textContent=ta.value.trim(); const pv=cm.querySelector('[data-atom-preview] [data-atom-meta]'); if(pv){ pv.dispatchEvent(new Event('x')); } cm.querySelectorAll('input.num').forEach(i=>i.dispatchEvent(new Event('input'))); })); }
})();
} catch (e) { console.warn("neuma.js block 17", e); }

try {
// ── Brief modal · audience drives Voice and Tense; edited marks; regenerate count ──
(function(){
  const VOICE={cust:"The team's own words and phrases, as they said them on the call.", int:"The team's own words, kept as notes for colleagues. Can hold what a customer should not hear."};
  const TENSE={cust:"Present tense. We for our company, you for the listener.", int:"Present tense. We for our company. Third person for the other party."};
  document.querySelectorAll('[data-brief-grid]').forEach(grid=>{
    const rows=[...grid.querySelectorAll('.flex.items-start.gap-4.px-5.py-2')];
    const rowOf=label=>rows.find(r=>{const l=r.querySelector('div.font-mono.uppercase'); return l&&l.childNodes[0]&&l.childNodes[0].textContent.trim()===label;});
    const fieldOf=label=>rowOf(label)?.querySelector('textarea,input');
    const modal=grid.closest('[data-brief-modal],[data-brief-modal-edit]')||grid.parentElement;
    const regen=[...modal.querySelectorAll('button')].find(b=>/Regenerate brief/.test(b.textContent));
    // edited marks
    const tracked=[];
    rows.forEach(r=>{ const f=r.querySelector('textarea,input'); const lab=r.querySelector('div.font-mono.uppercase'); if(!f||!lab) return;
      const orig=f.value; const mark=document.createElement('div'); mark.className='hidden mt-1 flex items-center gap-2 text-[10px]';
      mark.innerHTML='<span class="inline-flex items-center px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 font-medium font-sans normal-case tracking-normal">Edited</span><button class="text-slate-400 hover:text-slate-700 font-sans normal-case tracking-normal">Reset</button>';
      lab.appendChild(mark); const t={f,orig,mark};
      const upd=()=>{ mark.classList.toggle('hidden',f.value===t.orig); count(); };
      f.addEventListener('input',upd); mark.querySelector('button').addEventListener('click',()=>{ f.value=t.orig; f.dispatchEvent(new Event('input')); });
      tracked.push(t); });
    function count(){ if(!regen) return; const n=tracked.filter(t=>t.f.value!==t.orig).length; regen.textContent=n?`✨ Regenerate brief (replaces ${n} edited)`:'✨ Regenerate brief'; }
    // audience -> voice & tense
    const segs=[...grid.querySelectorAll('.inline-flex.rounded-md.bg-slate-100.p-0\\.5')]; const aud=segs[0];
    if(aud) aud.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
      const internal=/Internal/.test(b.textContent); const v=fieldOf('Voice'), tn=fieldOf('Tense & person');
      [[v,internal?VOICE.int:VOICE.cust],[tn,internal?TENSE.int:TENSE.cust]].forEach(([f,val])=>{ if(!f) return; f.value=val; const t=tracked.find(x=>x.f===f); if(t){ t.orig=val; t.mark.classList.add('hidden'); }
        f.style.transition='background-color .2s'; f.style.backgroundColor='#eef2ff'; setTimeout(()=>f.style.backgroundColor='',700); });
      count();
    }));
  });
})();
} catch (e) { console.warn("neuma.js block 18", e); }

try {
// ── Screen 5.3 · Meeting brief (any platform) ──
(function(){
  document.querySelectorAll('section.mb').forEach(function(root){
    root.addEventListener('click', function(e){
      var t = e.target.closest('button, a'); if(!t || !root.contains(t)) return;
      if (t.hasAttribute('data-mb-plat')) {
        var k = t.getAttribute('data-mb-plat');
        root.querySelectorAll('[data-mb-plat]').forEach(function(b){ b.classList.toggle('on', b===t); });
        root.querySelectorAll('[data-mb-win]').forEach(function(w){ w.classList.toggle('hidden', w.getAttribute('data-mb-win')!==k); });
        var names = {meet:'Google Meet', teams:'Microsoft Teams', room:'In person'};
        var titles = {meet:'Neuma founders sync', teams:'Neuma founders sync', room:'Neuma founders sync'};
        return;
      }
      if (t.hasAttribute('data-mb-mode')) {
        var panel = t.closest('[data-mb-panel]'); if(!panel) return;
        var host = t.getAttribute('data-mb-mode')==='host';
        panel.classList.toggle('is-host', host);
        panel.querySelectorAll('[data-mb-mode]').forEach(function(b){ b.classList.toggle('on', b===t); });
        var dot = panel.querySelector('[data-mb-hostdot]'); if(dot && host) dot.remove();
        if(!host){ var cur = panel.querySelector('.mb-ptab.on'); if(cur && cur.hasAttribute('data-host-only')) { var s = panel.querySelector('[data-mb-tab="summary"]'); if(s) s.click(); } }
        return;
      }
      if (t.hasAttribute('data-mb-tab')) {
        var p = t.closest('[data-mb-panel]'); var k2 = t.getAttribute('data-mb-tab');
        p.querySelectorAll('[data-mb-tab]').forEach(function(b){ b.classList.toggle('on', b===t); });
        p.querySelectorAll('[data-mb-pane]').forEach(function(x){ x.classList.toggle('hidden', x.getAttribute('data-mb-pane')!==k2); });
        return;
      }
      if (t.hasAttribute('data-mb-more')) {
        var r = t.closest('[data-mb-more-wrap]'); var o = r.classList.toggle('open'); t.textContent = o ? 'Less' : 'More'; return;
      }
      if (t.hasAttribute('data-mb-tick')) { t.closest('[data-mb-row]').classList.toggle('done'); return; }
      if (t.hasAttribute('data-mb-showall')) {
        var c = t.closest('[data-mb-expandable]'); var a = c.classList.toggle('all'); t.textContent = a ? 'Show less' : 'Show 2 more'; return;
      }
      if (t.hasAttribute('data-mb-pin')) { t.classList.toggle('on'); return; }
    });
  });
})();
} catch (e) { console.warn("neuma.js block 19", e); }

try {
// ── Screen 3 · Context variant switcher ──
(function(){
  var root = document.getElementById('context-summary'); if(!root) return;
  root.querySelectorAll('[data-cx-var]').forEach(function(b){
    b.addEventListener('click', function(){
      var k = b.getAttribute('data-cx-var');
      root.querySelectorAll('[data-cx-var]').forEach(function(x){ x.classList.toggle('on', x===b); });
      root.querySelectorAll('[data-cx-variant]').forEach(function(p){ p.classList.toggle('hidden', p.getAttribute('data-cx-variant')!==k); });
    });
  });
})();
} catch (e) { console.warn("neuma.js block 20", e); }

try {
// ── 5.3 · Meeting brief component. Rendered into every [data-brief-mount]. ──
(function(){
  var AV = {JK:'from-amber-400 to-pink-500', JM:'from-sky-400 to-indigo-500'};
  function av(i,s){ s=s||6; return '<span class="w-'+s+' h-'+s+' rounded-full ring-2 ring-white bg-gradient-to-br '+AV[i]+' inline-flex items-center justify-center text-white text-[9px] font-semibold shrink-0">'+i+'</span>'; }
  var LOGO = function(id,s){ return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 64 64"><defs><linearGradient id="'+id+'" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF7A4D"/><stop offset="45%" stop-color="#F59DA6"/><stop offset="100%" stop-color="#C5A6E8"/></linearGradient></defs><path d="M 8 8 H 56 V 56 H 8 Z M 34 14 V 30 H 50 V 14 Z" fill="url(#'+id+')" fill-rule="evenodd"/></svg>'; };
  var TICK = '<button type="button" class="mb-tick" data-mb-tick title="Covered"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></button>';

  var DISCUSS = [
    ['Decide whether the Zoom app is free, and how that fits the “pay something” test.','Raised on Oct 28. It pulls against the Sep 23 agreement unless the free part (the app) and the paid part (the intelligence) are split explicitly.'],
    ['Agree who finds our first design partner, and what they should pay.','Open for 5 weeks. Paying customers came up in 4 of the 9 dated meetings and about $5K is spent, but no partner is signed and no company is named.'],
    ['Decide how Claude checks for duplicate atoms: one at a time or in batches.','Left as “try both” on Oct 21. Every customer upload goes through this step, so it sets both quality and cost per customer.'],
    ['Agree how long we keep customer data, before anyone uploads calls.','Raised on Oct 21 as a likely objection from security-minded buyers. Right now we keep a copy of everything, with no time limit.'],
    ['Settle the monthly budget and how we split costs.','Jason was going to send a short list of monthly costs on Sep 23. It hasn’t come up in the 7 meetings since.']
  ];
  var ISSUES = [
    ['Some atoms are only true for the call they came from','Examples from the Sales Objection Handling output: a claim true for an Australian buyer only, references to customers who have since left, and a price quoted to one prospect. Mixed into an Intelligence View, these read as general facts.','Critical'],
    ['No paying customer or design partner yet','About $5K spent on AI tokens and subscriptions over 4 to 5 months, with customer feedback limited to informal chats. On Sep 23 we agreed the test before spending more: a design partner who then pays something.','Critical'],
    ['Slack doesn’t allow us to keep raw messages','Slack lets an app read channels, but its terms don’t allow storing the messages. Options raised: keep summaries only, customer exports, or an enterprise-only API. Nothing decided.','High']
  ];
  var ACTIONS = [
    ['Sign up design partners who have call recordings ready','Shortlist everyone Jared has spoken to who has a backlog of recorded sales calls, time to give feedback, and willingness to pay something once it’s useful.','Critical'],
    ['Ship Contexts and use it on our own calls next week','Finish Contexts and start running founder calls through it. Every other idea from Oct 28 builds on it.','Critical'],
    ['Test two ways of checking new atoms for duplicates','Run per-atom and per-batch review on the same atoms and compare accuracy and cost. Pick one as the default.','High']
  ];
  var DECISIONS = [
    ['Neuma shows up inside Zoom, Slack and Gong, not as another app','People get Neuma in the tools they already use, rather than opening a separate app.'],
    ['Suggest action items, don’t manage them','Neuma recommends action items and raises forgotten ones. Tracking them like a project management tool is out of scope for now.'],
    ['Messages Neuma sends say they came from Neuma','If Neuma sends a Slack message or email for someone, a line at the bottom says so.']
  ];
  var PATTERNS = [
    ['Action items get raised, then forgotten.','4 of the 13 action items from before Oct 28 were never mentioned again after the meeting they came from.','Across 11 meetings'],
    ['Paying customers keep coming up without progress.','Discussed in 4 of the 9 dated meetings. No design partner has started.','Across 4 meetings'],
    ['Lots of decisions, little follow-through.','34 decisions across 12 meetings, but only 2 of 19 action items marked done.','Across 12 meetings']
  ];
  var SEV = {Critical:'text-rose-600', High:'text-slate-500'};

  function card(title, sec, body, opts){
    opts = opts||{};
    var head = '<div class="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100 '+(opts.ranked?'mb-wash':'')+'">'
      + (opts.ranked ? LOGO('bxg'+Math.random().toString(36).slice(2,7),14) : '')
      + '<span class="text-[13px] font-semibold text-slate-900">'+title+'</span>'
      + (opts.ranked ? '<span class="text-[11px] font-medium nm-rank-text">ranked by Neuma</span>' : '')
      + (opts.link ? '<a class="ml-auto text-[12px] text-brand-600 font-medium cursor-pointer">'+opts.link+'</a>' : '')
      + '</div>';
    return '<div data-sec="'+sec+'" class="rounded-xl border border-slate-200 bg-white overflow-hidden '+(opts.ranked?'mb-card':'')+'"'+(opts.host?' data-host-only':'')+'>'+head+body+'</div>';
  }
  function row(n, t, d, extra, opts){
    opts = opts||{};
    return '<div class="flex gap-3 px-4 py-3.5 '+(extra?'bx-extra':'')+'" data-mb-row data-mb-more-wrap>'
      + '<div class="mb-rkw w-4 shrink-0 pt-0.5"><span class="mb-rk nm-rank-text">'+n+'</span>'+(opts.tick?TICK:'')+'</div>'
      + '<div class="min-w-0 flex-1"><div class="mb-ttl bx-ttl text-[14px] font-medium text-slate-900 leading-snug">'+t+'</div>'
      + '<div class="mt-1 flex items-start gap-2 mb-descline"><p data-mb-desc class="bx-clamp flex-1 text-[12.5px] leading-[1.6] text-slate-500">'+d+'</p><button type="button" class="bx-n-inline shrink-0 text-[11.5px] text-brand-600 font-medium" data-mb-more>More</button></div>'
      + (opts.sev ? '<div class="bx-w mt-1.5 text-[11.5px] font-medium '+SEV[opts.sev]+'">'+opts.sev+'</div>' : '')
      + '</div></div>';
  }

  function brief(mode){
    var discuss = DISCUSS.map(function(x,i){ return row(i+1, x[0], 'Why: '+x[1], i>2, {tick:true}); }).join('');
    var showall = '<div class="border-t border-slate-100 bx-n px-4 py-2.5"><button type="button" class="text-[12px] text-brand-600 font-medium" data-mb-showall>Show 2 more</button></div>';
    var issues = ISSUES.map(function(x,i){ return row(i+1, x[0], x[1], false, {sev:x[2]}); }).join('');
    var actions = ACTIONS.map(function(x,i){ return row(i+1, x[0], x[1], false, {sev:x[2]}); }).join('');
    var decisions = DECISIONS.map(function(x){ return '<div class="flex gap-3 px-4 py-3" data-mb-more-wrap><div class="w-7 shrink-0 text-center"><div class="font-mono text-[9.5px] uppercase text-slate-400">Oct</div><div class="text-[14px] font-semibold text-slate-800 leading-none mt-0.5">28</div></div><div class="min-w-0 flex-1"><div class="text-[13px] font-medium text-slate-900 leading-snug">'+x[0]+'</div><div class="mt-0.5 flex items-start gap-2 mb-descline"><p data-mb-desc class="mb-clamp1 flex-1 text-[12px] text-slate-500">'+x[1]+'</p><button type="button" class="shrink-0 text-[11.5px] text-brand-600 font-medium" data-mb-more>More</button></div></div></div>'; }).join('');
    var patterns = PATTERNS.map(function(x){ return '<div class="px-4 py-3" data-mb-more-wrap><div class="text-[13px] font-medium text-slate-900">'+x[0]+'</div><p data-mb-desc class="mt-0.5 text-[12px] leading-[1.55] text-slate-500">'+x[1]+'</p><div class="mt-1 text-[11px] text-slate-400">'+x[2]+'</div></div>'; }).join('');
    var others = [['🏢','Acme Corp','Account · 2h ago','Procurement asked how long we keep call data. Same question as item 4 here.'],['📊','Sales team standup','Team · 10m ago','Two reps asked whether the Zoom app will be free for prospects.']]
      .map(function(x){ return '<div class="px-4 py-3"><div class="flex items-center gap-1.5 text-[12px]"><span>'+x[0]+'</span><span class="font-medium text-slate-800">'+x[1]+'</span><span class="text-slate-400">· '+x[2]+'</span></div><p class="mt-1 text-[12.5px] text-slate-600 leading-snug">'+x[3]+'</p></div>'; }).join('');
    var whosees = '<div class="px-4 py-3 flex items-center gap-2.5">'+av('JK',7)+'<div class="flex-1 min-w-0"><div class="text-[13px] text-slate-900">Jared K. <span class="text-slate-400">· you</span></div><div class="text-[11.5px] text-slate-500">Organiser of the calendar event</div></div><span class="text-[11.5px] text-slate-600">Host view</span></div>'
      + '<div class="border-t border-slate-100 px-4 py-3 flex items-center gap-2.5">'+av('JM',7)+'<div class="flex-1 min-w-0"><div class="text-[13px] text-slate-900">Jason M.</div><div class="text-[11.5px] text-slate-500">neumaos.com · has Neuma</div></div><span class="text-[11.5px] text-slate-600">Attendees view</span></div>'
      + '<div class="border-t border-slate-100 px-4 py-3 text-[11.5px] text-slate-500">No external guests. External guests never see a brief unless you share one.</div>';

    var status = '<span class="bx-before inline-flex items-center px-1.5 py-0.5 rounded font-mono text-[10px] font-semibold tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">IN 10 MIN</span>'
      + '<span class="bx-live inline-flex items-center gap-1.5 text-[11.5px] font-medium text-emerald-700"><span class="mb-live"></span>Live <span class="font-mono text-slate-500">00:03:12</span></span>';
    var plat = '<span class="mb-plat"><span class="mb-dot mb-dot-meet" data-mb-plat-dot></span><span data-mb-plat-name>Google Meet</span></span>';
    var seg = function(full){ return '<div class="'+(full?'flex':'inline-flex')+' items-center p-0.5 rounded-lg bg-slate-100 '+(full?'w-full':'')+'"><button type="button" class="mb-mode on '+(full?'flex-1':'')+'" data-mb-mode="att">Attendees</button><button type="button" class="mb-mode '+(full?'flex-1':'')+'" data-mb-mode="host">Host<span class="mb-badge" data-mb-hostdot></span></button></div>'; };
    var tabs = '<div class="bx-tabs items-end gap-4 border-b border-slate-200 mt-3 overflow-x-auto">'
      + [['summary','Summary',''],['issues','Issues','3'],['actions','Actions','3'],['decisions','Decisions','3']].map(function(t,i){ return '<button type="button" class="mb-ptab '+(i?'':'on')+'" data-bx-tab="'+t[0]+'">'+t[1]+(t[2]?'<span class="mb-cnt">'+t[2]+'</span>':'')+'</button>'; }).join('')
      + '<button type="button" class="mb-ptab" data-bx-tab="patterns" data-host-only>Patterns<span class="mb-cnt">3</span></button></div>';

    var side = '<aside class="bx-side w-[240px] shrink-0 border-r border-slate-200 bg-slate-50/50 px-4 pt-8 pb-6 flex-col">'
      + '<div class="flex items-center gap-2 mb-8 px-2">'+LOGO('bxs'+mode,26)+'<div class="nm-wordmark text-[18px]">neuma</div></div>'
      + '<nav class="flex flex-col gap-0.5"><a class="nav-link active">Contexts</a><a class="nav-link">Settings</a></nav>'
      + '<div class="mt-auto pt-4 border-t border-slate-200 flex items-center gap-2 px-2">'+av('JK',7)+'<div class="text-xs"><div class="font-medium text-slate-800">Jared K.</div><div class="text-slate-500">acmegtm.com</div></div></div></aside>';

    // Wide / medium header
    var hdrW = '<div class="bx-w flex-col">'
      + '<div class="text-[13px] text-slate-500">Contexts <span class="text-slate-300 mx-1">/</span> Founder conversations <span class="text-slate-300 mx-1">/</span> <span class="text-slate-900 font-medium">Neuma founders sync</span></div>'
      + '<div class="mt-3 flex items-start justify-between gap-4 flex-wrap"><div class="flex items-center gap-2.5 flex-wrap"><h1 class="text-[24px] font-semibold tracking-tight text-slate-900">Neuma founders sync</h1>'+status+'</div>'
      + '<div class="flex items-center gap-2"><button type="button" class="btn-out bx-before">Join Google Meet</button><button type="button" class="btn-out" data-bx-popout style="background:#0f172a;color:#fff;border-color:#0f172a;">Pop out <span class="text-[11px]">↗</span></button></div></div>'
      + '<div class="mt-2 flex items-center gap-x-3 gap-y-1 flex-wrap text-[12.5px] text-slate-500"><span>Tue, Nov 3 · 10:00 to 10:45am</span>'+plat+'<span class="inline-flex items-center gap-1.5"><span class="inline-flex -space-x-1">'+av('JK',5)+av('JM',5)+'</span>2 guests</span><span>12 earlier meetings in this series</span></div>'
      + '<div class="mt-4 rounded-lg border border-slate-200 bg-slate-50/60 px-4 py-2.5 flex items-center gap-2 flex-wrap text-[12.5px]"><span class="text-slate-500">Context</span><span class="font-medium text-slate-900">🧭 Founder conversations</span><span class="text-slate-400">· Matched by the recurring series “Neuma founders sync”</span><a class="ml-auto text-brand-600 font-medium cursor-pointer">Change Context</a></div>'
      + '<div class="mt-4 flex items-center justify-between gap-3 flex-wrap">'+seg(false)+'<span class="text-[12px] text-slate-400">Prepared from 12 meetings, Sep 22 to Oct 28, 2026</span></div>'
      + '</div>';
    // Narrow header (companion)
    var hdrN = '<div class="bx-n flex-col">'
      + '<div class="flex items-center gap-2 px-1 pb-2.5">'+LOGO('bxn'+mode,16)+'<span class="nm-wordmark text-[15px]">neuma</span><button type="button" class="ml-auto inline-flex items-center gap-1 text-[12px] font-medium text-slate-700 px-2 py-1 rounded-md hover:bg-slate-100">🧭 Founder conversations <span class="text-slate-400">▾</span></button><button type="button" class="w-7 h-7 rounded-md text-slate-500 hover:bg-slate-100 inline-flex items-center justify-center" data-bx-expand title="Widen to full page"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg></button></div>'
      + '<div class="mt-2.5">'+seg(true)+'</div>' + tabs
      + '</div>';

    var main = '<div class="bx-grid mt-5">'
      + '<div class="space-y-5 min-w-0">'
      +   card('To discuss','discuss','<div data-mb-expandable><div class="divide-y divide-slate-100">'+discuss+'</div>'+showall+'</div>',{ranked:true})
      +   card('Top issues','issues','<div class="divide-y divide-slate-100">'+issues+'</div>',{ranked:true, link:'All 13 →'})
      +   card('Top suggested actions','actions','<div class="divide-y divide-slate-100">'+actions+'</div>',{ranked:true, link:'All 19 →'})
      + '</div>'
      + '<div class="bx-rail">'
      +   card('Who sees this brief','whosees',whosees,{link:'Sharing'})
      +   card('Latest decisions','decisions','<div class="divide-y divide-slate-100">'+decisions+'</div>',{link:'All 34 →'})
      +   '<div data-host-only>'
      +     card('Patterns detected by Neuma','patterns','<div class="divide-y divide-slate-100">'+patterns+'</div>',{ranked:true})
      +     card('From other meetings','patterns','<div class="divide-y divide-slate-100">'+others+'</div>',{link:''})
      +   '</div>'
      + '</div></div>';

    return '<div class="bx-root"><div class="bx" data-mb-panel data-tab="summary"'+(mode==='live'?' data-live':'')+'>'+side
      + '<div class="bx-main"><div class="bx-pad">'+hdrW+hdrN+main+'<div class="bx-w mt-6 text-[11.5px] text-slate-400">Only you see the Host view.</div></div></div></div></div>';
  }

  document.querySelectorAll('[data-brief-mount]').forEach(function(el){ el.innerHTML = brief(el.getAttribute('data-brief-mount')); });
  document.querySelectorAll('[data-brief-mount][data-plat]').forEach(function(el){ var k = el.getAttribute('data-plat'); var nm = {meet:'Google Meet', teams:'Microsoft Teams'}[k]; el.querySelectorAll('[data-mb-plat-name]').forEach(function(n){ n.textContent = nm; }); el.querySelectorAll('[data-mb-plat-dot]').forEach(function(d){ d.className = 'mb-dot mb-dot-' + k; }); });

  // Tabs (narrow only), live toggle, width presets, pop out / expand
  var PRESETS = {full:1180, split:760, companion:384};
  function label(w){ return w>=980 ? 'Full page' : w>=600 ? 'Split screen' : 'Companion'; }
  document.querySelectorAll('[data-bx-frame]').forEach(function(f){
    var sec = f.closest('section'); var out = sec.querySelector('[data-bx-wlabel]');
    var sync = function(){ var w = Math.round(f.getBoundingClientRect().width); if(out) out.textContent = w+'px · '+label(w);
      sec.querySelectorAll('[data-bx-w]').forEach(function(b){ b.classList.toggle('on', label(PRESETS[b.getAttribute('data-bx-w')])===label(w)); }); };
    new ResizeObserver(sync).observe(f); sync();
  });
  document.addEventListener('click', function(e){
    var t = e.target.closest('button'); if(!t) return;
    var sec = t.closest('section');
    if (t.hasAttribute('data-mb-mode') && t.closest('.bx')) {
      var m = t.getAttribute('data-mb-mode');
      if (m==='host') t.closest('.bx').querySelectorAll('[data-mb-hostdot]').forEach(function(d){ d.remove(); });
      t.closest('.bx').querySelectorAll('[data-mb-mode]').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-mb-mode')===m); });
      if (m!=='host' && t.closest('.bx').getAttribute('data-tab')==='patterns') { var s0=t.closest('.bx').querySelector('[data-bx-tab="summary"]'); if(s0) s0.click(); }
      return;
    }
    if (t.hasAttribute('data-bx-tab')) {
      var bx = t.closest('.bx'); bx.setAttribute('data-tab', t.getAttribute('data-bx-tab'));
      bx.querySelectorAll('[data-bx-tab]').forEach(function(b){ b.classList.toggle('on', b===t); });
      return;
    }
    var frame = sec && sec.querySelector('[data-bx-frame]');
    if (t.hasAttribute('data-bx-w') && frame) { frame.style.width = PRESETS[t.getAttribute('data-bx-w')]+'px'; return; }
    if (t.hasAttribute('data-bx-popout') && frame) { frame.style.width = PRESETS.companion+'px'; return; }
    if (t.hasAttribute('data-bx-expand') && frame) { frame.style.width = PRESETS.full+'px'; return; }
    if (t.hasAttribute('data-bx-state') && sec) {
      var live = t.getAttribute('data-bx-state')==='live';
      sec.querySelectorAll('.bx').forEach(function(b){ live ? b.setAttribute('data-live','') : b.removeAttribute('data-live'); });
      sec.querySelectorAll('[data-bx-state]').forEach(function(b){ b.classList.toggle('on', b===t); });
    }
  });
})();
} catch (e) { console.warn("neuma.js block 21", e); }

try {
// ── 3 · Issues, Actions and Decisions: Zoom rows on the left, the selected item in full on the right ──
(function(){
  var DATA = {"v0-issue": {"items": [{"new": false, "t": "Some atoms are only true for the call they came from", "d": "Examples from the Sales Objection Handling output: “we integrate with every ticketing platform in Australia” (true for an Australian buyer, not everywhere), references to customers who have since left, and a price quoted to one prospect. Mixed into an Intelligence View, these read as general facts. No rule yet for limiting them to a region or expiring them.", "body": "", "tip": "Sep 30, 2026 · Filtering & out-of-date atoms", "age": "4 weeks ago", "pri": "Critical", "sig": ["Affects every Intelligence View", "No rule yet to limit or expire them"], "ev": [["Jason", "Neuma weekly", "Oct 21", "32:14", "That line about every ticketing platform in Australia is only true for that one buyer. If it lands in a View it reads like fact."]], "rel": [["action", 10], ["decision", 11], ["decision", 13]], "days": 28, "status": "open"}, {"new": false, "t": "No paying customer or design partner yet", "d": "About $5K spent on AI tokens and subscriptions over 4 to 5 months, with customer feedback limited to informal chats. On Sep 23 we agreed the test before spending more: a design partner (an early customer who gives feedback) who then pays something, even a small amount.", "body": "", "tip": "Sep 23, 2026 · Quality checklist & costs", "age": "5 weeks ago", "pri": "Critical", "sig": ["Came up in 4 of 9 calls", "Open 5 weeks"], "ev": [["Jared", "Budget and runway", "Sep 23", "18:40", "Before we spend more, we need one design partner who pays something. Even a small amount."], ["Jason", "Neuma weekly", "Oct 28", "07:12", "We still haven’t got anyone paying. That’s the thing."]], "rel": [["action", 1], ["decision", 28]], "days": 35, "status": "open"}, {"new": true, "t": "Slack doesn’t allow us to keep raw messages", "d": "Slack lets an app read channels, but its terms don’t allow storing the messages. Slack changed this last year. Options raised: keep summaries only, have customers upload a manual export, or use an enterprise-only API most companies don’t have. Nothing decided.", "body": "", "tip": "Oct 28, 2026 · Distribution & trust", "age": "Today", "pri": "High", "sig": ["Blocks the Slack integration", "Three options raised, none chosen"], "ev": [["Jason", "Integrations review", "Oct 14", "09:52", "Their terms changed last year. We can read the channel but we can’t store the messages."]], "rel": [["action", 2], ["action", 3], ["decision", 0]], "days": 0, "status": "open"}, {"new": true, "t": "Free entry point or paying design partners?", "d": "On Oct 28 the Zoom app came up as a possible free way in: start with call transcripts, earn trust, then extract atoms. On Sep 23 we agreed a design partner should pay something to prove the value. Both can work together (free app, paid intelligence), but we haven’t decided.", "body": "", "tip": "Oct 28, 2026 · Distribution & trust", "age": "Today", "pri": "High", "rel": [["action", 1], ["decision", 0], ["decision", 28]], "days": 0, "status": "open"}, {"new": false, "t": "No rule for combining two atoms that say the same thing", "d": "When a new atom matches one already in an Intelligence View, we haven’t decided what happens: keep whichever scores higher, combine the two texts, or write a fresh atom from the call quotes behind both. This runs on every transcript a customer uploads, so a wrong choice could overwrite good intelligence without anyone noticing.", "body": "", "tip": "Oct 21, 2026 · Duplicates & approvals", "age": "1 week ago", "pri": "High", "rel": [["action", 4], ["decision", 4], ["decision", 5], ["decision", 6]], "days": 7, "status": "open"}, {"new": false, "t": "No rules for what needs a person’s approval", "d": "The website describes three modes: fully automatic, partly automatic, and a person approves everything. None is built. Still open: what each mode automates, whether a company sets it once or per Intelligence View, and who (for example, a view’s owner) can approve new atoms. Needs input from customers, especially in regulated industries.", "body": "", "tip": "Oct 21, 2026 · Duplicates & approvals", "age": "1 week ago", "pri": "High", "rel": [["action", 5], ["decision", 7], ["decision", 8]], "days": 7, "status": "open"}, {"new": false, "t": "No answer on how long we keep customer data", "d": "Neuma stores a copy of every call recording and transcript a customer gives us, so atoms can be rebuilt and checked against the original. Security-minded buyers will ask why we hold a second copy of their data and for how long. We have no written policy or standard answer, and the question will come up before the first customer uploads their calls.", "body": "", "tip": "Oct 21, 2026 · Duplicates & approvals", "age": "1 week ago", "pri": "High", "rel": [["action", 6]], "days": 7, "status": "open"}, {"new": false, "t": "Sales Objection Handling still includes product questions", "d": "On Sep 28 about a third of the atoms were product questions (“does it do X?”) rather than objections (reasons a buyer hesitates). Jared’s updated set of example atoms was partly the cause. On Sep 30 Jason added a separate step that removes non-objections, but nobody has confirmed a clean result since.", "body": "", "tip": "Sep 28, 2026 · Fixing the product-question problem", "age": "4 weeks ago", "pri": "High", "rel": [["action", 17], ["decision", 14], ["decision", 19]], "days": 28, "status": "resolved"}, {"new": false, "t": "No shared definition of a good atom", "d": "An automated checker marks every atom pass or fail against our quality checklist, but only Jason reads its report, and he uses it to adjust prompts by hand. Phrases like “best intelligence” and “improve the atom” haven’t been pinned down well enough for both of us, or a future hire, to judge against.", "body": "", "tip": "Sep 24, 2026 · Quality checks", "age": "5 weeks ago", "pri": "High", "rel": [["decision", 18], ["decision", 22], ["decision", 26]], "days": 35, "status": "resolved"}, {"new": true, "t": "No line yet between suggesting actions and doing them", "d": "Jason wants to say “Hey Neuma, message the engineer who owns staging” mid-call and have it sent. Jared doesn’t want Neuma to turn into a project management tool. Undecided: does Neuma send messages, draft them, or only suggest them, and does a person approve each one first?", "body": "", "tip": "Oct 28, 2026 · Distribution & trust", "age": "Today", "pri": "Medium", "rel": [["action", 8], ["decision", 1]], "days": 0, "status": "open"}, {"new": false, "t": "Results change run to run, and missing atoms go unnoticed", "d": "Running the same prompt three times gives better or worse atoms. Our checker catches bad atoms but can’t tell when a good one is missing. “Trial before commitment”, one of the strongest objections in Jared’s example set, was missing from the latest output and nothing flagged it.", "body": "", "tip": "Sep 29, 2026 · Reviewing results live", "age": "4 weeks ago", "pri": "Medium", "rel": [["action", 11], ["decision", 15], ["decision", 20]], "days": 28, "status": "open"}, {"new": false, "t": "No agreed budget or cost split", "d": "Jason has paid most AI token and subscription costs so far. On Sep 23 we agreed to keep spend low, pay Jason back for past costs, and split future costs more evenly. We never agreed the monthly amount or the split.", "body": "", "tip": "Sep 23, 2026 · Quality checklist & costs", "age": "5 weeks ago", "pri": "Medium", "rel": [["action", 15], ["decision", 28]], "days": 35, "status": "open"}, {"new": false, "t": "No rule for when an atom becomes less trustworthy", "d": "Atoms backed by only a few, or old, calls should be trusted less over time. Atoms a person has approved should stay trusted longer. When an atom is weak, the AI could reread the original call quotes instead, but that makes live answers slower and more expensive. Neither rule is defined.", "body": "", "tip": "Tags, Contexts as the Brain, Custom LLMs", "age": "Date unknown", "pri": "Medium", "rel": [["action", 16], ["decision", 33]], "days": 999, "status": "open"}], "total": 13, "hidden": 0, "new": 3}, "v0-action": {"items": [{"new": true, "t": "Ship Contexts and use it on our own calls next week", "d": "Finish Contexts (Neuma’s folders for each meeting, customer or person) and start running founder calls through it.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>Every other idea from Oct 28 builds on it: the Zoom and Slack apps, raising forgotten action items, and sending follow-ups.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>Contexts is live and our founder calls flow into it.</p>", "tip": "Oct 28, 2026 · Distribution & trust", "age": "Today", "pri": "Critical", "rel": [], "sig": ["Agreed on Oct 28", "Unblocks testing on our own calls"], "ev": [["Jared", "Neuma weekly", "Oct 28", "44:18", "Let’s get Contexts done and run our own calls through it next week."]], "days": 0, "status": "open", "owner": "Jason M."}, {"new": false, "t": "Sign up design partners who have call recordings ready", "d": "Go back to everyone Jared has spoken to and shortlist those who fit: a backlog of recorded sales calls we can upload straight away, time to give feedback, and willingness to pay something once it’s useful.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>This is the test we agreed on Sep 23 before spending more. About $5K is spent with no customer feedback beyond informal chats. Paying customers came up in 4 of the 9 dated meetings and no partner is confirmed.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>A company has agreed to start, with recordings ready to upload. Related issue: no paying customer or design partner yet.</p>", "tip": "Sep 24, 2026 · Quality checks", "age": "5 weeks ago", "pri": "Critical", "rel": [["issue", 1], ["issue", 3]], "sig": ["Fixes the #2 issue", "Agreed as the test on Sep 23"], "ev": [["Jared", "Budget and runway", "Sep 23", "19:02", "So the next step is a shortlist of people with recordings ready. Then we ask them to pay."]], "days": 35, "status": "open", "owner": "Jared K."}, {"new": true, "t": "Connect Zoom and Slack straight after Contexts ships", "d": "Build the Zoom and Slack connections next. Gong is another candidate source of recorded calls.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>An app inside a tool people already use is an easy yes. Connecting a Zoom app feels like adding a plugin, not handing over company data, so Neuma earns trust before asking for more.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>A customer connects Zoom and Slack and their calls appear in a Context.</p>", "tip": "Oct 28, 2026 · Distribution & trust", "age": "Today", "pri": "High", "rel": [["issue", 2]], "days": 0, "status": "open", "owner": "Jason M.", "sug": true}, {"new": true, "t": "Find a way to use Slack within its terms", "d": "Work out what Neuma can keep from Slack: summaries only, a customer’s manual export, or the enterprise-only API.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>Slack’s terms block storing raw messages, and much of a company’s decision-making happens there.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>A chosen approach that Slack’s terms allow. Related issue: Slack doesn’t allow us to keep raw messages.</p>", "tip": "Oct 28, 2026 · Distribution & trust", "age": "Today", "pri": "High", "rel": [["issue", 2]], "days": 0, "status": "open", "owner": "Jason M.", "sug": true}, {"new": false, "t": "Test two ways of checking new atoms for duplicates", "d": "To find duplicates, Jason’s system narrows thousands of existing atoms to a shortlist using two fast, cheap checks, then asks Claude to make the final call. Claude can review each new atom on its own or the whole batch in one request. Run both on the same atoms and compare accuracy and cost.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>Every customer upload goes through this step. A customer with 3,000 recorded calls is processed 10 to 20 calls at a time, so this choice sets both quality and cost per customer. One request per batch is cheaper; one per atom may be more accurate.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>Both approaches tested on the same atoms, and one chosen as the default. Related issue: no rule for combining two atoms that say the same thing.</p>", "tip": "Oct 21, 2026 · Duplicates & approvals", "age": "1 week ago", "pri": "High", "rel": [["issue", 4]], "sig": ["Every upload runs through it", "Sets cost per customer"], "ev": [["Jason", "Neuma weekly", "Oct 21", "36:05", "Let’s just try both, one at a time and batched, and see what it costs."]], "days": 7, "status": "open", "owner": "Jason M."}, {"new": false, "t": "Build one approval system with on/off settings", "d": "Three situations need a decision: two atoms that contradict each other, a suggested improvement to an existing atom, and a new atom being added to a view. Build one system where each can happen automatically or wait for a person, set per company, per Intelligence View and per role.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>The three modes on the website (fully automatic, partly automatic, a person approves everything) then become settings, not three separate builds. Risk differs by view: an internal assistant can take everything, while a public website chatbot or an insurer needs sign-off. Human approvals also build data competitors can’t copy.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>The three modes work as settings, and a view’s owner can be given approval rights. Related issue: no rules for what needs a person’s approval.</p>", "tip": "Oct 21, 2026 · Duplicates & approvals", "age": "1 week ago", "pri": "High", "rel": [["issue", 5]], "days": 7, "status": "open", "owner": "Jason M.", "sug": true}, {"new": false, "t": "Decide how long we keep customer data, and write it down", "d": "Decide which customer files we keep (recordings, transcripts, extracted quotes), for how long, and how a customer deletes them. Write a short answer sales can paste into a security questionnaire.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>We keep the originals so atoms can be rebuilt and checked. Jared expects buyers to ask “are you copying all my data? Now I’m exposed twice.” A design partner will ask before uploading their calls.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>A written policy, a one-paragraph answer ready to send, and someone responsible for it.</p>", "tip": "Oct 21, 2026 · Duplicates & approvals", "age": "1 week ago", "pri": "High", "rel": [["issue", 6]], "days": 7, "status": "open", "owner": "Jared K.", "sug": true}, {"new": true, "t": "Test an email address for each Context that people can CC", "d": "Give each Context its own email address. CC it on a thread and the thread lands in that Context.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>A lot of company work still happens over email, and CC is a habit people already have. No terms-of-service hurdle like Slack.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>CC’ing a Context’s address adds the email to that Context.</p>", "tip": "Oct 28, 2026 · Distribution & trust", "age": "Today", "pri": "Medium", "rel": [], "days": 0, "status": "open", "owner": "Unassigned", "sug": true}, {"new": true, "t": "Prototype “Hey Neuma, send a message” during a call", "d": "Mid-meeting, someone says who to message and what about. Neuma writes it in their voice and sends it, labelled as sent by Neuma.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>Following up after a meeting is slow and sometimes awkward. Jason already uses an AI trained on his writing to send his messages; after approving the first 4 or 5, he stopped checking.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>A message requested mid-call reaches the right person before the call ends. Related issue: no line between suggesting actions and doing them.</p>", "tip": "Oct 28, 2026 · Distribution & trust", "age": "Today", "pri": "Medium", "rel": [["issue", 9]], "days": 0, "status": "open", "owner": "Unassigned", "sug": true}, {"new": true, "t": "Send our decisions into a shared Claude project", "d": "After each founder call, push the decisions and observations into a shared Claude project automatically.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>The AI tools we already use then know what’s been decided, without anyone copying it in.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>A shared Claude project that updates itself after each founder call.</p>", "tip": "Oct 28, 2026 · Distribution & trust", "age": "Today", "pri": "Medium", "rel": [], "days": 0, "status": "open", "owner": "Jared K.", "sug": true}, {"new": false, "t": "Reuse the Sales Objection prompts for the next Intelligence View", "d": "Start the next view (Product Demo or Customer Intelligence) with the prompts already tuned for Sales Objection Handling. Keep the prompts the same and slot in each view’s own goal and instructions.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>If prompts don’t change between views, new views are quick to create, and later customer success staff can set them up without touching prompts. Jason planned a first version to review together on Sep 30.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>A second view works on the same prompts with only its goal and instructions swapped, and quality holds up.</p>", "tip": "Sep 30, 2026 · Filtering & out-of-date atoms", "age": "4 weeks ago", "pri": "Medium", "rel": [["issue", 0]], "days": 28, "status": "open", "owner": "Unassigned"}, {"new": false, "t": "Bring back the missing “trial before commitment” objection", "d": "Jared’s example set includes buyers asking to trial the product before committing. The latest Sales Objection Handling output doesn’t include it. Try running it again, or define more precisely what counts as a sales objection.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>Jared called it one of the strongest objections. It shows the problem with variable results: each run produces different atoms, and nothing tells us when a good one goes missing. Jared asked not to spend much time on it.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>The objection appears in the output, or we agree a way to spot missing atoms. Related issue: results change run to run.</p>", "tip": "Sep 29, 2026 · Reviewing results live", "age": "4 weeks ago", "pri": "Medium", "rel": [["issue", 10]], "days": 28, "status": "open", "owner": "Unassigned"}, {"new": false, "t": "Use Neuma to send our own meeting action items", "d": "After each founder call, have Neuma pull out the action items and key points and send them, instead of copying transcripts around by hand.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>Jared’s view is that the value is in software that applies AI automatically, not in pasting text into a chat window. Using it on our own calls tests the Contexts feature (Neuma’s folders for each meeting, customer or person) on real meetings. Nobody took ownership on Sep 29.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>After a founder call, action items arrive without anyone copying a transcript.</p>", "tip": "Sep 29, 2026 · Reviewing results live", "age": "4 weeks ago", "pri": "Medium", "rel": [], "days": 28, "status": "open", "owner": "Jared K.", "sug": true}, {"new": false, "t": "Add a company profile template to setup", "d": "A form where a new customer describes their company: what it does, its products, its markets and its strategy.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>Audience Republic’s calls cover several plans, products, currencies and countries. Neuma needs this background to tell them apart, so a detail true in one country isn’t treated as true everywhere.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>The template is part of setup and Neuma uses it when reading calls.</p>", "tip": "Sep 29, 2026 · Reviewing results live", "age": "4 weeks ago", "pri": "Medium", "rel": [], "days": 28, "status": "open", "owner": "Unassigned", "sug": true}, {"new": false, "t": "Build the Slack notification", "d": "Jared listed this as his build task for the week of Sep 29, alongside finding design partners.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>The call didn’t cover what it notifies or who receives it, and it hasn’t come up since. It needs a one-line description before anyone builds it.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>Scope agreed and shipped, or the task removed.</p>", "tip": "Sep 24, 2026 · Quality checks", "age": "5 weeks ago", "pri": "Medium", "rel": [], "days": 35, "status": "open", "owner": "Jason M."}, {"new": false, "t": "Send a short list of monthly costs", "d": "Jason lists what he spends each month on AI subscriptions and tokens, and what’s needed to reach the next milestone. A few bullet points, not the full spreadsheet.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>Jason has covered most costs: about $5K over 4 to 5 months, more last month to move faster. We agreed to keep spend low, pay Jason back and split future costs more evenly, but can’t set numbers without this. It hasn’t come up in the 7 meetings since.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>We agree a monthly budget and how to split it. Related issue: no agreed budget or cost split.</p>", "tip": "Sep 23, 2026 · Quality checklist & costs", "age": "5 weeks ago", "pri": "Medium", "rel": [["issue", 11]], "days": 35, "status": "open", "owner": "Jason M."}, {"new": false, "t": "Define when atoms should be trusted less over time", "d": "Work out how much to trust an atom as it ages: less when no recent calls back it up, more when many calls support it or a person has approved it.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>Well-supported atoms can be used as written. Weak or old ones need a warning, or the AI needs to reread the original call quotes, which makes live answers slower and costlier. Jared took this on after the Product Expert test run.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>A written rule for losing trust over time, and a rule for when to reread the original quotes. Related issue: no rule for when an atom becomes less trustworthy.</p>", "tip": "Product Expert iteration", "age": "Date unknown", "pri": "Low", "rel": [["issue", 12]], "days": 999, "status": "open", "owner": "Jason M."}, {"new": false, "t": "Add one line telling the AI to leave out product questions, then rerun", "d": "Rather than rebuild the process, add one sentence to the final rewriting prompt: don’t include general product questions. Rerun and review the result together.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>About a third of the Sep 28 atoms were product questions. On Sep 30 Jason found one prompt doing both rewriting and filtering confused the AI, so he split them into two steps.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>Done, then replaced by the separate filtering step. A clean result still needs confirming.</p>", "tip": "Sep 28, 2026 · Fixing the product-question problem", "age": "4 weeks ago", "pri": "Medium", "rel": [["issue", 7]], "days": 28, "status": "done", "owner": "Unassigned"}, {"new": false, "t": "Rewrite the prompts in plain language", "d": "Rewrite the prompts with clear headings and simple wording, and insert each view’s goal exactly as the customer wrote it.", "body": "<p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Why it matters: </span>Jared couldn’t tell what phrases like “source boundary” meant. Plain prompts are easier to fix, behave more consistently across AI models, and let future staff create views.</p><p class=\"mt-1.5 text-[11.5px] leading-[1.45] text-slate-500\"><span class=\"font-medium text-slate-700\">Done when: </span>Done Sep 24. Jared reviewed it that afternoon and called it a big improvement.</p>", "tip": "Sep 24, 2026 · Prompt clean-up", "age": "5 weeks ago", "pri": "Medium", "rel": [], "days": 35, "status": "done", "owner": "Jason M."}], "total": 19, "hidden": 0, "new": 6}, "v1-issue": {"items": [{"t": "Two versions of the price list are in circulation", "d": "“Pricing model v3.xlsx” and the “Q4 pricing proposal” deck differ on 4 of 9 plans.", "body": "", "pri": "Critical", "age": "Today", "tip": "", "new": true, "days": 0, "status": "open"}, {"t": "No competitor data since August", "d": "The last competitor comparison was uploaded on Aug 14. Two competitors changed prices since.", "body": "", "pri": "High", "age": "3d ago", "tip": "", "new": false, "days": 3, "status": "open"}, {"t": "Discount approval rules aren’t written down", "d": "Reps have quoted 15%, 20% and 25% discounts this month with no stated limit.", "body": "", "pri": "Medium", "age": "1 week ago", "tip": "", "new": false, "days": 7, "status": "open"}], "total": 6, "hidden": 3, "new": 1}, "v1-action": {"items": [{"t": "Merge the two price lists into one", "d": "Pick the deck or the spreadsheet as the master and update the other to match.", "body": "", "pri": "Critical", "age": "Today", "tip": "", "new": true, "days": 0, "status": "open", "owner": "Rina P."}, {"t": "Send the existing-customer question to the CEO with a recommendation", "d": "Two weeks unanswered in #pricing. A named decision-maker unblocks the kickoff deck.", "body": "", "pri": "High", "age": "3d ago", "tip": "", "new": false, "days": 3, "status": "open", "owner": "Daniel K.", "sug": true}, {"t": "Refresh the competitor comparison", "d": "Update the August comparison with the two price changes since.", "body": "", "pri": "Medium", "age": "1 week ago", "tip": "", "new": false, "days": 7, "status": "open", "owner": "Sarah M."}], "total": 8, "hidden": 5, "new": 1}, "v2-issue": {"items": [{"t": "Prospects keep asking how long we keep their data", "d": "Raised in 3 of 4 open enterprise deals this month. No written answer exists.", "body": "", "pri": "Critical", "age": "Today", "tip": "", "new": true, "days": 0, "status": "open", "ctx": "Acme Corp"}, {"t": "Reps quote different discounts for the same plan", "d": "15%, 20% and 25% quoted this month. No approval rule.", "body": "", "pri": "High", "age": "3d ago", "tip": "", "new": false, "days": 3, "status": "open", "ctx": "Globex"}, {"t": "No owner for the Initech renewal", "d": "Sarah M. left the account in October. Nobody has picked it up.", "body": "", "pri": "High", "age": "1 week ago", "tip": "", "new": false, "days": 7, "status": "open", "ctx": "Initech"}], "total": 21, "hidden": 18, "new": 1}, "v2-action": {"items": [{"t": "Write one data retention answer every rep can send", "d": "Use it for Acme now and add it to the security pack.", "body": "", "pri": "Critical", "age": "Today", "tip": "", "new": true, "days": 0, "status": "open", "owner": "Sarah M.", "ctx": "Acme Corp", "sug": true}, {"t": "Lock the enterprise price before kickoff", "d": "Reconcile Sales’ $24K with Finance’s $30K.", "body": "", "pri": "Critical", "age": "3d ago", "tip": "", "new": false, "days": 3, "status": "open", "owner": "Daniel K.", "ctx": "Globex"}, {"t": "Assign an owner to Initech", "d": "Hand over from Sarah M. with the October call notes.", "body": "", "pri": "High", "age": "1 week ago", "tip": "", "new": false, "days": 7, "status": "open", "owner": "Unassigned", "ctx": "Initech"}], "total": 30, "hidden": 27, "new": 1}, "v0-decision": {"items": [{"new": true, "mon": "Oct", "day": "28", "t": "Neuma shows up inside Zoom, Slack and Gong, not as another app", "d": "People get Neuma in the tools they already use, rather than opening a separate app.", "tip": "Oct 28, 2026 · Distribution & trust", "age": "Decided today", "q": "“Everything that we’re doing just sits inside their existing workflows.”", "src": "Distribution & trust", "ts": "13:11", "rel": [["issue", 2], ["issue", 3]], "days": 0, "status": "active"}, {"new": true, "mon": "Oct", "day": "28", "t": "Suggest action items, don’t manage them", "d": "Neuma recommends action items and raises forgotten ones. Chasing and tracking them like a project management tool is out of scope for now.", "tip": "Oct 28, 2026 · Distribution & trust", "age": "Decided today", "q": "“I just don’t know if we want to become, like, a project … management tool.”", "src": "Distribution & trust", "ts": "13:17", "rel": [["issue", 9]], "days": 0, "status": "active"}, {"new": true, "mon": "Oct", "day": "28", "t": "Messages Neuma sends say they came from Neuma", "d": "If Neuma sends a Slack message or email for someone, a line at the bottom says so, rather than passing as the person.", "tip": "Oct 28, 2026 · Distribution & trust", "age": "Decided today", "q": "“So we could say posted by [Neuma] … sent by [Neuma] or something like that.”", "src": "Distribution & trust", "ts": "13:16", "rel": [], "days": 0, "status": "active"}, {"new": true, "mon": "Oct", "day": "28", "t": "The lasting asset is each customer’s history of decisions and feedback", "d": "Features can be copied. The decisions, observations, corrections and thumbs up a customer builds up can’t, and they become the context their AI works from.", "tip": "Oct 28, 2026 · Distribution & trust", "age": "Decided today", "q": "“What is the asset that can’t be replicated.”", "src": "Distribution & trust", "ts": "13:20", "rel": [], "days": 0, "status": "active"}, {"new": false, "mon": "Oct", "day": "21", "t": "Find duplicate atoms in three steps, cheapest first", "d": "A fast search for similar words and meaning first, then a small AI model to rank the closest matches, then Claude only for the final comparison.", "tip": "Oct 21, 2026 · Duplicates & approvals", "age": "Decided 1 week ago", "q": "“Use the crudest and fastest first, then narrow the search.”", "src": "Duplicates & approvals", "ts": "11:06", "rel": [["issue", 4]], "days": 7, "status": "active"}, {"new": false, "mon": "Oct", "day": "21", "t": "The first step only rules out atoms with nothing in common", "d": "The fast search passes on anything that might be a match. Only atoms with no shared meaning at all are ruled out.", "tip": "Oct 21, 2026 · Duplicates & approvals", "age": "Decided 1 week ago", "q": "“I err on the side of accepting.”", "src": "Duplicates & approvals", "ts": "11:05", "rel": [["issue", 4]], "days": 7, "status": "active"}, {"new": false, "mon": "Oct", "day": "21", "t": "Tags aren’t used to find duplicates", "d": "AI-generated tags vary too much between runs to rely on for matching. Tags can still be used to organize atoms.", "tip": "Oct 21, 2026 · Duplicates & approvals", "age": "Decided 1 week ago", "q": "“I’m not using tags at all.”", "src": "Duplicates & approvals", "ts": "11:18", "rel": [["issue", 4]], "days": 7, "status": "active"}, {"new": false, "mon": "Oct", "day": "21", "t": "A person decides when two atoms contradict each other", "d": "For now, when two atoms say opposite things, a person picks one. Atoms that agree are combined automatically.", "tip": "Oct 21, 2026 · Duplicates & approvals", "age": "Decided 1 week ago", "q": "“If it’s a conflict right now, the user resolved it.”", "src": "Duplicates & approvals", "ts": "11:10", "rel": [["issue", 5]], "days": 7, "status": "active"}, {"new": false, "mon": "Oct", "day": "21", "t": "A person’s approval counts for more than the AI’s", "d": "An atom a person has approved is trusted more than one the AI added on its own.", "tip": "Oct 21, 2026 · Duplicates & approvals", "age": "Decided 1 week ago", "q": "“Human verification should carry more weight than AI verification.”", "src": "Duplicates & approvals", "ts": "11:13", "rel": [["issue", 5]], "days": 7, "status": "active"}, {"new": false, "mon": "Oct", "day": "21", "t": "Tell the customer when something breaks", "d": "If a comparison fails or a server goes down, the customer sees a plain-language message and we get an error report. Nothing fails silently.", "tip": "Oct 21, 2026 · Duplicates & approvals", "age": "Decided 1 week ago", "q": "“The customer will also understand that the view … isn’t merging properly.”", "src": "Duplicates & approvals", "ts": "11:19", "rel": [], "days": 7, "status": "active"}, {"new": false, "mon": "Oct", "day": "21", "t": "The ranking model can be swapped with one setting", "d": "The small model that ranks likely duplicates runs on Jason’s Mac today. It can be replaced with a cloud model by changing a setting, with nothing else changing.", "tip": "Oct 21, 2026 · Duplicates & approvals", "age": "Decided 1 week ago", "q": "“It doesn’t change any of the semantics about how the system works.”", "src": "Duplicates & approvals", "ts": "11:24", "rel": [], "days": 7, "status": "active"}, {"new": false, "mon": "Sep", "day": "30", "t": "Reusable atoms don’t include exact prices", "d": "Prices change and often depend on the region or the deal. Atoms point to the current price list instead.", "tip": "Sep 30, 2026 · Filtering & out-of-date atoms", "age": "Decided 4 weeks ago", "q": "“The actual pricing, because obviously that’s going to change.”", "src": "Filtering & out-of-date atoms", "ts": "09:10", "rel": [["issue", 0]], "days": 28, "status": "active"}, {"new": false, "mon": "Sep", "day": "30", "t": "Rewriting and filtering are separate AI steps", "d": "One prompt was both rewriting atoms and deciding which to remove, which confused the AI. A separate step now removes atoms that don’t belong.", "tip": "Sep 30, 2026 · Filtering & out-of-date atoms", "age": "Decided 4 weeks ago", "q": "“I had to separate out the polishing from the gating.”", "src": "Filtering & out-of-date atoms", "ts": "09:15", "rel": [], "days": 28, "status": "active"}, {"new": false, "mon": "Sep", "day": "30", "t": "One set of prompts for every Intelligence View", "d": "Keep the Sales Objection prompts general and slot in each view’s own instructions, so new views need no prompt rewrites.", "tip": "Sep 30, 2026 · Filtering & out-of-date atoms", "age": "Decided 4 weeks ago", "q": "“Merge tag in the view specific instruction.”", "src": "Filtering & out-of-date atoms", "ts": "09:14", "rel": [["issue", 0]], "days": 28, "status": "active"}, {"new": false, "mon": "Sep", "day": "30", "t": "Keep a library of rejected product questions", "d": "Every product question removed is saved to train the AI. Each customer would also get their own list, since one company’s objection can be another’s product question.", "tip": "Sep 30, 2026 · Filtering & out-of-date atoms", "age": "Decided 4 weeks ago", "q": "“I’m just creating a corpus of flagged product questions.”", "src": "Filtering & out-of-date atoms", "ts": "09:12", "rel": [["issue", 7]], "days": 28, "status": "active"}, {"new": false, "mon": "Sep", "day": "29", "t": "Review AI output together, live", "d": "Work through results on a call together instead of async. Both of us keep Slack notifications on while iterating, to shorten each round.", "tip": "Sep 29, 2026 · Reviewing results live", "age": "Decided 4 weeks ago", "q": "“Do it live, I think, from now on.”", "src": "Reviewing results live", "ts": "12:37", "rel": [["issue", 10]], "days": 28, "status": "active"}, {"new": false, "mon": "Sep", "day": "29", "t": "Fewer, relevant atoms beat more atoms with noise", "d": "Keep obvious product questions out of Sales Objection Handling, even if that leaves fewer atoms.", "tip": "Sep 29, 2026 · Reviewing results live", "age": "Decided 4 weeks ago", "q": "“It’s better to have less atoms, but all sales objections.”", "src": "Reviewing results live", "ts": "12:40", "rel": [], "days": 28, "status": "active"}, {"new": false, "mon": "Sep", "day": "29", "t": "No “I think” or “I believe” in atom wording", "d": "Atoms shouldn’t sound unsure. Where a qualifier is needed, use “most likely” or “probably”.", "tip": "Sep 29, 2026 · Reviewing results live", "age": "Decided 4 weeks ago", "q": "“No, I think, no, I believe, none of those qualifiers.”", "src": "Reviewing results live", "ts": "12:42", "rel": [], "days": 28, "status": "active"}, {"new": false, "mon": "Sep", "day": "29", "t": "Each Intelligence View gets its own final checklist", "d": "A last check against the view’s goal removes anything off-topic. The same approach is reused for every view, to even out differences between runs.", "tip": "Sep 29, 2026 · Reviewing results live", "age": "Decided 4 weeks ago", "q": "“Just having a checklist to each view.”", "src": "Reviewing results live", "ts": "12:40", "rel": [["issue", 8]], "days": 28, "status": "active"}, {"new": false, "mon": "Sep", "day": "28", "t": "Capture broadly first, filter later", "d": "If a quote is left out when calls are first read, later steps can’t use it. So the first step keeps more, and later steps remove what doesn’t fit.", "tip": "Sep 28, 2026 · Fixing the product-question problem", "age": "Decided 4 weeks ago", "q": "“If it’s not in there at all, I can’t do anything with it.”", "src": "Fixing the product-question problem", "ts": "11:52", "rel": [["issue", 7]], "days": 28, "status": "active"}, {"new": false, "mon": "Sep", "day": "28", "t": "Save every run with its prompt and score", "d": "Every prompt, its quality score and the atoms it produced are kept, so an earlier prompt that worked better can be brought back.", "tip": "Sep 28, 2026 · Fixing the product-question problem", "age": "Decided 4 weeks ago", "q": "“Every single run that I’ve ever done, I’ve saved.”", "src": "Fixing the product-question problem", "ts": "11:35", "rel": [["issue", 10]], "days": 28, "status": "active"}, {"new": false, "mon": "Sep", "day": "24", "t": "Prompts stay fixed; each view supplies its own goal", "d": "Each view’s goal and instructions are inserted at the top of the same prompts.", "tip": "Sep 24, 2026 · Quality checks", "age": "Decided 4 weeks ago", "q": "“These prompts … shouldn’t change.”", "src": "Quality checks", "ts": "16:14", "rel": [], "days": 28, "status": "active"}, {"new": false, "mon": "Sep", "day": "24", "t": "Use the strongest evidence, not an average", "d": "When grouping call quotes into an atom, use the best-supported answer rather than blending everything together.", "tip": "Sep 24, 2026 · Quality checks", "age": "Decided 4 weeks ago", "q": "“Making sure it’s the best versus just … an average.”", "src": "Quality checks", "ts": "16:27", "rel": [["issue", 8]], "days": 28, "status": "active"}, {"new": false, "mon": "Sep", "day": "24", "t": "No self-improving prompts for now", "d": "The automated checker guides Jason’s manual prompt changes. Letting the AI rewrite its own prompts was unstable and expensive in the previous version.", "tip": "Sep 24, 2026 · Quality checks", "age": "Decided 4 weeks ago", "q": "“I don’t think we need this until later.”", "src": "Quality checks", "ts": "16:26", "rel": [], "days": 28, "status": "active"}, {"new": false, "mon": "Sep", "day": "24", "t": "Use the customer’s goal word for word", "d": "A view’s goal goes into the prompt exactly as the customer wrote it, not reworded by AI.", "tip": "Sep 24, 2026 · Prompt clean-up", "age": "Decided 4 weeks ago", "q": "“I’ll make sure the objective is just copied in verbatim into the prompt.”", "src": "Prompt clean-up", "ts": "14:35", "rel": [], "days": 28, "status": "active"}, {"new": false, "mon": "Sep", "day": "24", "t": "Strip prompts back to plain language", "d": "Clear headings and simple wording any person or AI model can follow. Remove lines nobody can explain.", "tip": "Sep 24, 2026 · Prompt clean-up", "age": "Decided 4 weeks ago", "q": "“I’m gonna strip it right back.”", "src": "Prompt clean-up", "ts": "14:39", "rel": [], "days": 28, "status": "active"}, {"new": false, "mon": "Sep", "day": "23", "t": "The quality checklist can’t be overridden", "d": "Customers can adjust the general writing guidelines for a view, but not the core checklist. An atom that fails the checklist is rejected.", "tip": "Sep 23, 2026 · Quality checklist & costs", "age": "Decided 5 weeks ago", "q": "“Nothing in the checklist can be overridden.”", "src": "Quality checklist & costs", "ts": "14:33", "rel": [["issue", 8]], "days": 35, "status": "active"}, {"new": false, "mon": "Sep", "day": "23", "t": "Customer instructions apply when calls are first read", "d": "A customer’s custom instructions change what gets captured from calls, not just the final wording.", "tip": "Sep 23, 2026 · Quality checklist & costs", "age": "Decided 5 weeks ago", "q": "“It should just be part of the extraction. So it’s just edit.”", "src": "Quality checklist & costs", "ts": "14:33", "rel": [], "days": 35, "status": "active"}, {"new": false, "mon": "Sep", "day": "23", "t": "Spend as little as possible until a customer commits to pay", "d": "Keep costs low until a design partner pays something. Then pay back past costs and split future costs fairly.", "tip": "Sep 23, 2026 · Quality checklist & costs", "age": "Decided 5 weeks ago", "q": "“Minimize everything until the next step.”", "src": "Quality checklist & costs", "ts": "14:36", "rel": [["issue", 1], ["issue", 3], ["issue", 11]], "days": 35, "status": "reopened", "note": "Reopened Oct 28. The free Zoom app pulls against it."}, {"new": false, "mon": "Sep", "day": "22", "t": "Three steps: capture, group, rewrite", "d": "Read calls and capture relevant quotes, group duplicates together, then rewrite each group as a clean atom. A final check step can come later.", "tip": "Sep 22, 2026 · Process reset & product model", "age": "Decided 5 weeks ago", "q": "“One, it’s extraction … aggregation and deduplication … and one is polish.”", "src": "Process reset & product model", "ts": "13:02", "rel": [], "days": 35, "status": "superseded", "note": "Superseded on Sep 30 by “Rewriting and filtering are separate AI steps”."}, {"new": false, "mon": "Sep", "day": "22", "t": "Intelligence Views, Contexts and Templates are separate things", "d": "Views hold reusable knowledge for the whole company. Contexts hold raw material about one customer, meeting or person. Templates are recurring documents like board packs and QBRs.", "tip": "Sep 22, 2026 · Process reset & product model", "age": "Decided 5 weeks ago", "q": "“It’s a completely different object.”", "src": "Process reset & product model", "ts": "13:03", "rel": [], "days": 35, "status": "active"}, {"new": false, "mon": "Sep", "day": "22", "t": "Jared reviews every prompt before it’s used", "d": "Prompts are shared early and often, rather than built alone and handed over.", "tip": "Sep 22, 2026 · Process reset & product model", "age": "Decided 5 weeks ago", "q": "“I should read all these prompts and basically approve everything that’s in it.”", "src": "Process reset & product model", "ts": "12:54", "rel": [], "days": 35, "status": "active"}, {"new": false, "mon": "", "day": "", "t": "Test answering with the atom plus its call quotes", "d": "When another company’s AI asks Neuma a question, try answering from the atom and the original quotes behind it, without passing the quotes on. No product change yet.", "tip": "Context brain", "age": "Decided, date unknown", "q": "“I don’t think we need to change anything.”", "src": "Context brain", "ts": "13:07", "rel": [], "days": 999, "status": "active"}, {"new": false, "mon": "", "day": "", "t": "Keep atoms accurate instead of rereading calls", "d": "Put effort into keeping atoms accurate so they can be used directly, rather than going back to the original calls during live conversations.", "tip": "Tags, Contexts as the Brain, Custom LLMs", "age": "Decided, date unknown", "q": "“Maintaining higher quality atoms and use them as much as possible.”", "src": "Tags, Contexts as the Brain, Custom LLMs", "ts": "12:53", "rel": [["issue", 12]], "days": 999, "status": "active"}], "total": 34, "hidden": 0, "new": 4}, "v1-decision": {"items": [{"mon": "Oct", "day": "30", "t": "Annual plans get two months free", "d": "Agreed by Daniel K. and Rina P. in the “Re: annual terms” thread.", "new": true, "age": "", "tip": "", "q": "", "src": "", "ts": "", "days": 999, "status": "active"}, {"mon": "Oct", "day": "24", "t": "Usage-based add-on stays out of Q4", "d": "Posted by Rina P. in #pricing.", "new": false, "age": "", "tip": "", "q": "", "src": "", "ts": "", "days": 999, "status": "active"}, {"mon": "Oct", "day": "17", "t": "Monthly prices end in 9, not 0", "d": "From a resolved comment in “Pricing model v3”.", "new": false, "age": "", "tip": "", "q": "", "src": "", "ts": "", "days": 999, "status": "active"}], "total": 11, "hidden": 8, "new": 1}, "v2-decision": {"items": [{"mon": "Oct", "day": "30", "t": "Annual plans get two months free", "d": "From Q4 Pricing Change.", "new": true, "age": "", "tip": "", "q": "", "src": "", "ts": "", "days": 999, "status": "active", "ctx": "Q4 Pricing Change"}, {"mon": "Oct", "day": "29", "t": "Acme pilot starts with 2 teams, not 5", "d": "Agreed on the procurement call.", "new": false, "age": "", "tip": "", "q": "", "src": "", "ts": "", "days": 999, "status": "active", "ctx": "Acme Corp"}, {"mon": "Oct", "day": "27", "t": "Standup moves to Tuesdays and Thursdays", "d": "From Sales team standup.", "new": false, "age": "", "tip": "", "q": "", "src": "", "ts": "", "days": 999, "status": "active", "ctx": "Sales team standup"}], "total": 47, "hidden": 44, "new": 1}};
  var PRI = {Critical:['bg-rose-50 text-rose-700','bg-rose-500'], High:['bg-amber-50 text-amber-700','bg-amber-400'], Medium:['bg-slate-100 text-slate-600','bg-slate-300'], Low:['bg-slate-50 text-slate-500','bg-slate-200']};
  var LABEL = {issue:['Detected issues','Issue'], action:['Detected actions','Action'], decision:['Detected decisions','Decision']};
  var PANE = {issue:'issues', action:'actions', decision:'decisions'};
  var I = {
    spark:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z"/></svg>',
    tick:'<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    up:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>',
    x:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    chev:'<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    play:'<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    cal:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'
  };
  function esc(t){ return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }
  function priBadge(p, big){ var c = PRI[p] || PRI.Medium; return '<button type="button" class="badge '+c[0]+' inline-flex items-center gap-0.5" style="padding:'+(big?'2px 6px 2px 8px;font-size:11.5px':'1px 4px 1px 6px;font-size:10.5px')+';" title="Change priority">'+p+I.chev+'</button>'; }

  function row(it, kind, i, drawer){
    var p = PRI[it.pri] || PRI.Medium, lead;
    if (kind==='issue') lead = '<span class="zl-rk w-[18px] shrink-0 flex justify-center pt-[6px]"><span class="zl-dot w-2 h-2 rounded-full '+p[1]+'"></span><button type="button" class="zl-tick" data-zltick title="Mark resolved">'+I.tick+'</button></span>';
    else if (kind==='action') lead = '<span class="w-[18px] shrink-0 flex justify-center pt-[2px]"><button type="button" class="zl-tick" data-zltick title="Mark complete">'+I.tick+'</button></span>';
    else lead = '<span class="w-[22px] shrink-0 text-center leading-none pt-[3px]"><span class="block font-mono text-[9px] uppercase tracking-wider text-slate-400">'+esc(it.mon)+'</span><span class="block mt-0.5 num text-[13px] font-semibold text-slate-700">'+esc(it.day)+'</span></span>';
    var meta = kind==='decision'
      ? (it.age ? '<span>'+esc(it.age)+'</span>' : '')
      : '<span'+(it.tip?' title="'+esc(it.tip)+'"':'')+'>'+esc(it.age)+'</span><span class="text-slate-300">·</span>'+priBadge(it.pri)+(it.sug?'<span class="text-slate-300">·</span><span class="badge inline-flex items-center gap-1 whitespace-nowrap" style="padding:1px 7px 1px 5px;font-size:10.5px;background:#eef1ff;color:#2a2fa6;" title="Suggested by Neuma from the discussion. Nobody committed to it in the meeting."><svg width="9" height="9" viewBox="0 0 64 64"><defs><linearGradient id="nm-sug-js" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF7A4D"/><stop offset="45%" stop-color="#F59DA6"/><stop offset="100%" stop-color="#C5A6E8"/></linearGradient></defs><path d="M 8 8 H 56 V 56 H 8 Z M 34 14 V 30 H 50 V 14 Z" fill="url(#nm-sug-js)" fill-rule="evenodd"/></svg>Suggested</span>':'');
    var closed = (it.status==='resolved'||it.status==='done'||it.status==='superseded');
    var attrs = drawer ? ' data-zlgo="'+kind+'" data-zlgoi="'+i+'"' : ' data-zlrow data-i="'+i+'" data-pri="'+esc(it.pri||'')+'" data-status="'+esc(it.status||'')+'" data-days="'+(it.days==null?999:it.days)+'" data-owner="'+esc(it.owner||'')+'" data-ctx="'+esc(it.ctx||'')+'" data-origin="'+(it.sug?'suggested':'detected')+'"';
    return '<div class="group '+(drawer?'px-4 py-2.5':'px-4 py-3')+' cursor-pointer hover:bg-slate-50 '+(closed?' zl-closed':'')+'"'+attrs+'>'
      + '<div class="flex items-start gap-2.5">'+lead+'<div class="flex-1 min-w-0">'
      + '<div class="zl-ttl text-[13.5px] font-medium text-slate-900 leading-snug">'+esc(it.t)+(it.status==='reopened'?' <span class="badge bg-amber-50 text-amber-700 ml-1">Reopened</span>':'')+(it.status==='superseded'?' <span class="badge bg-slate-100 text-slate-500 ml-1">Superseded</span>':'')+(it.status==='resolved'?' <span class="badge bg-emerald-50 text-emerald-700 ml-1">Resolved</span>':'')+(it.status==='done'?' <span class="badge bg-emerald-50 text-emerald-700 ml-1">Done</span>':'')+''+'</div>'
      + '<p class="zl-clamp1 mt-0.5 text-[12.5px] leading-[1.5] text-slate-500">'+esc(it.note||it.d)+'</p>'
      + (meta ? '<div class="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-400">'+meta : '<div class="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">')
      + (drawer ? '' : '<span class="ml-auto flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><button type="button" class="inline-flex items-center justify-center rounded-md text-slate-400 hover:text-brand-600 hover:bg-brand-50 w-6 h-6" title="Useful">'+I.up+'</button><button type="button" class="inline-flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 w-6 h-6" data-zlx title="Dismiss">'+I.x+'</button></span>')
      + '</div></div></div>'
      + (drawer ? '' : '<div class="hidden items-center gap-2 text-[12px] text-slate-400" data-zlgone><span class="flex-1">Dismissed</span><button type="button" class="underline hover:text-slate-700" data-zlundo>Undo</button></div>')
      + '</div>';
  }

  function sourceRow(name, date, quote, who, ts){
    date = String(date||'').replace(/ 20\d\d$/,'');
    return '<div class="py-3">'
      + '<div class="flex items-center gap-2 text-[12px] whitespace-nowrap"><span class="text-slate-400">'+I.cal+'</span><span class="font-medium text-slate-800">'+esc(name)+'</span><span class="text-slate-400">· '+esc(date)+'</span>'
      + (ts ? '<a class="ml-auto inline-flex items-center gap-1 text-[11.5px] text-brand-600 font-medium cursor-pointer hover:underline">'+I.play+'Jump to '+esc(ts)+'</a>' : '')+'</div>'
      + (quote ? '<div class="mt-2 pl-3 border-l-2 border-brand-200 text-[12.5px] leading-[1.55] italic text-slate-600">'+esc(quote)+'</div>'+(who?'<div class="mt-1 pl-3 text-[11px] text-slate-400">'+esc(who)+'</div>':'') : '')
      + '</div>';
  }

  function detail(k, i, hasMeetings){
    var kind = k.split('-')[1], it = DATA[k].items[i]; if(!it) return '';
    var v = k.split('-')[0];
    var h = '<div class="bg-white flex flex-col" data-zldetail>'
      + '<div class="px-6 pt-5 pb-4 border-b border-slate-100">'
      +   '<div class="flex items-center gap-2"><span class="eyebrow">'+LABEL[kind][1]+'</span>'+'<button type="button" class="ml-auto w-8 h-8 -mr-2 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700" data-zlclose aria-label="Close">'+I.x+'</button></div>'
      +   '<h3 class="mt-2 text-[17px] font-semibold tracking-tight text-slate-900 leading-snug">'+esc(it.t)+'</h3>'
      +   '<div class="mt-2.5 flex items-center gap-2 flex-wrap text-[12px] text-slate-500">'
      +     (kind==='decision' ? '<span>Decided '+esc(it.day)+' '+esc(it.mon)+'</span>' : priBadge(it.pri,true)+'<span class="text-slate-300">·</span><span>'+esc(it.age)+'</span>')
      +   '</div>'
      +   (it.sug ? '<div class="mt-3 flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2 text-[12px] text-slate-600"><span class="mt-[3px]"><svg width="10" height="10" viewBox="0 0 64 64"><defs><linearGradient id="nm-sug-dr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF7A4D"/><stop offset="45%" stop-color="#F59DA6"/><stop offset="100%" stop-color="#C5A6E8"/></linearGradient></defs><path d="M 8 8 H 56 V 56 H 8 Z M 34 14 V 30 H 50 V 14 Z" fill="url(#nm-sug-dr)" fill-rule="evenodd"/></svg></span><span class="flex-1"><span class="font-medium text-slate-800">Suggested by Neuma</span> from the discussion. Nobody committed to it in the meeting.</span><button type="button" class="text-brand-600 font-medium whitespace-nowrap">Accept</button></div>' : '')
      + '</div>'
      + '<div class="px-6 py-5 space-y-5 overflow-y-auto" style="max-height:calc(100vh - 300px)">'
      +   '<p class="text-[13.5px] leading-[1.6] text-slate-700">'+esc(it.d)+'</p>'
      +   (it.body ? '<div class="[&_p]:!text-[13px] [&_p]:!leading-[1.6] [&_p]:!mt-2 -mt-2">'+it.body+'</div>' : '');
    // sources
    var src = '';
    if (it.ev && it.ev.length) src = it.ev.map(function(e){ return sourceRow(e[1], e[2], '“'+e[4]+'”', e[0], e[3]); }).join('');
    else if (kind==='decision' && (it.q || it.src)) src = sourceRow(it.src || 'Meeting', it.tip ? it.tip.split(' · ')[0] : '', it.q, '', it.ts);
    else if (it.tip) { var tp = it.tip.split(' · '); src = sourceRow(tp[1] || tp[0], tp[1] ? tp[0] : '', '', '', ''); }
    if (src) h += '<div><div class="eyebrow">'+(kind==='decision'?'Where it was decided':'Where it came from')+'</div><div class="divide-y divide-slate-100">'+src+'</div></div>';
    // related
    if (it.rel && it.rel.length) h += '<div><div class="eyebrow mb-1">Related</div><div class="divide-y divide-slate-100">'+it.rel.map(function(r){ var o = DATA[v+'-'+r[0]].items[r[1]]; return '<button type="button" class="w-full text-left py-2.5 flex items-start gap-2.5 hover:bg-slate-50 -mx-2 px-2 rounded-md" data-zlgo="'+r[0]+'" data-zlgoi="'+r[1]+'"><span class="badge bg-slate-100 text-slate-600 shrink-0 mt-px">'+LABEL[r[0]][1]+'</span><span class="text-[12.5px] text-slate-800 leading-snug">'+esc(o.t)+'</span></button>'; }).join('')+'</div></div>';
    h += '</div>';
    // footer
    if (kind!=='decision') {
      h += '<div class="px-6 py-3 border-t border-slate-100 bg-slate-50/60 flex items-center gap-3">'
        + '<button type="button" class="ml-auto btn-out" style="padding:4px 10px;font-size:12px;" data-zldone>'+(kind==='issue'?'Mark resolved':'Mark complete')+'</button></div>';
    }
    return h + '</div>';
  }

  var root = CXROOT;
  function select(listEl, i){
    var k = listEl.getAttribute('data-zl');
    listEl.querySelectorAll('[data-zlrow]').forEach(function(r){ r.classList.toggle('zl-sel', +r.getAttribute('data-i')===i); });
    var variant = listEl.closest('[data-cx-variant]');
    var drawer = variant.querySelector('[data-zldrawer]'), rail = drawer.querySelector('[data-zlrail]');
    drawer.classList.remove('hidden'); drawer.setAttribute('data-list', k);
    var hasMeetings = !!(variant && variant.querySelector('[data-mb-pane="summary"] a[href^="https://meet"]')) || k.indexOf('v2')===0;
    rail.innerHTML = detail(k, i, hasMeetings);
    var aside = drawer.querySelector('aside'); rail.style.marginTop = '0px';
    var off = Math.max(0, 80 - aside.getBoundingClientRect().top);
    rail.style.marginTop = Math.min(off, Math.max(0, aside.offsetHeight - rail.offsetHeight)) + 'px';
  }
  document.querySelectorAll(':is(#context-summary,#cx-graveyard) [data-zl]').forEach(function(el){
    var k = el.getAttribute('data-zl'), d = DATA[k], kind = k.split('-')[1];
    el.innerHTML = '<div class="rounded-xl border border-slate-200 bg-white overflow-hidden" data-zlcard>'
      + '<div class="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100"><span class="text-brand-500">'+I.spark+'</span><span class="text-[13px] font-semibold text-slate-900">'+LABEL[kind][0]+'</span>'
      + '<span class="ml-1 num font-mono text-[11px] text-slate-400">'+d.total+'</span>'
      + '<div class="ml-auto flex items-center gap-1.5" data-zlfilt><span class="flex items-center gap-1" data-zlchips></span>'
      + '<div class="relative flex items-center" data-csearch><input type="text" class="hidden w-[170px] h-[26px] px-2.5 mr-1 border border-slate-300 rounded-md text-[12px] bg-white outline-none focus:border-brand-400" placeholder="Search…" data-csinput><button type="button" class="btn-out inline-flex items-center justify-center bg-slate-50" style="width:28px;height:26px;padding:0;" title="Search" data-csbtn><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg></button></div>'
      + '<div class="relative"><button type="button" class="btn-out flex items-center gap-1 bg-slate-50" style="padding:3px 9px;font-size:12px;" data-zlsbtn><span class="text-slate-400">Sort:</span><span data-zlslabel>Default</span><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><polyline points="6 9 12 15 18 9"/></svg></button>'
      + '<div class="hidden absolute right-0 top-full mt-1 w-[180px] rounded-lg border border-slate-200 bg-white py-1.5 z-40 text-left" data-zlsmenu style="box-shadow:0 16px 40px -8px rgba(15,23,42,.2)">'+sortMenu(k, kind)+'</div></div>'
      + '<div class="relative"><button type="button" class="btn-out flex items-center gap-1.5 bg-slate-50" style="padding:3px 9px;font-size:12px;" data-zlfbtn><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>Filter</button>'
      + '<div class="hidden absolute right-0 top-full mt-1 w-[236px] rounded-lg border border-slate-200 bg-white py-1.5 z-40 text-left max-h-[440px] overflow-y-auto" data-zlfmenu style="box-shadow:0 16px 40px -8px rgba(15,23,42,.2)">'+filterMenu(k, kind, d)+'</div></div></div></div>'
      + '<div class="divide-y divide-slate-100">'+d.items.map(function(it,i){ return row(it, kind, i); }).join('')+'</div>'
      + (d.hidden ? '<div class="border-t border-slate-100 px-4 py-2.5"><a class="text-[12px] text-brand-600 font-medium cursor-pointer">Show '+d.hidden+' more</a></div>' : '')
      + '</div>';
    applyFilter(el.querySelector('[data-zlcard]'));
  });

  // Right column: Neuma observations about this list. "Show" narrows the list to the rows behind it.
  var OBS = {"v0-issue": [["Trust and data handling keep coming up", "3 open issues are about what Neuma keeps, or does on a customer’s behalf. None has an owner.", "Across 3 meetings", [2, 6, 9]], ["Both Critical issues are over 4 weeks old", "Neither has had a decision since it was raised. Both block paying customers.", "Since Sep 23", [0, 1]], ["Oct 21 left 3 issues open", "The duplicates and approvals session made 7 decisions, but these three are still unresolved.", "1 meeting", [4, 5, 6]]], "v0-action": [["Action items get raised, then forgotten", "4 of the 13 action items from before Oct 28 were never mentioned again after the meeting they came from.", "Across 11 meetings", [10, 11, 12, 13, 14, 15, 17, 18]], ["6 new actions from Oct 28, none assigned", "All came from the distribution and trust discussion. Nobody owns them yet.", "1 meeting", [0, 2, 3, 7, 8, 9]], ["Only 2 of 19 marked done", "Most open actions are over 4 weeks old.", "Across 12 meetings", []]], "v0-decision": [["Lots of decisions, little follow-through", "34 decisions across 12 meetings, but only 2 of 19 action items marked done.", "Across 12 meetings", []], ["Oct 21 settled how duplicates work", "7 decisions in one session, from the first search step to who resolves a conflict.", "1 meeting", [4, 5, 6, 7, 8, 9, 10]], ["Oct 28 changed how Neuma reaches people", "Show up inside Zoom, Slack and Gong. Suggest actions, don’t manage them. Label what Neuma sends.", "1 meeting", [0, 1, 2, 3]]], "v1-issue": [["Pricing confusion sits behind 2 of the top 3 issues", "Two price lists and unwritten discount rules mean reps quote different numbers.", "Across 4 sources", [0, 2]], ["Competitor data is 3 months old", "Nothing new since August. Two decisions relied on it.", "Since Aug", [1]]], "v1-action": [["Merging the price lists closes 2 issues", "It removes the second list and gives discount rules one place to live.", "Across 4 sources", [0]]], "v1-decision": [["Decisions aren’t reaching reps", "Annual pricing was decided, but two price lists are still in use.", "Across 3 sources", [0]]], "v2-issue": [["Prospects in 3 accounts asked how long we keep data", "Same question in Acme, Globex and Initech this month. There’s no standard answer.", "Across 3 Contexts", [0]], ["Discounts vary by rep", "Acme and Globex were quoted different discounts for the same plan.", "Across 2 Contexts", [1]]], "v2-action": [["Initech renews in January with no owner", "The renewal action has sat unassigned for 2 weeks.", "1 Context", [2]]], "v2-decision": [["Q4 Pricing’s annual discount is now used here", "Decided in Q4 Pricing Change and picked up across sales calls.", "From 1 Context", [0]]]};
  var APER = '<svg width="14" height="14" viewBox="0 0 64 64"><defs><linearGradient id="zl-ap" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF7A4D"/><stop offset="45%" stop-color="#F59DA6"/><stop offset="100%" stop-color="#C5A6E8"/></linearGradient></defs><path d="M 8 8 H 56 V 56 H 8 Z M 34 14 V 30 H 50 V 14 Z" fill="url(#zl-ap)" fill-rule="evenodd"/></svg>';
  document.querySelectorAll(':is(#context-summary,#cx-graveyard) [data-zlobs]').forEach(function(el){
    var k = el.getAttribute('data-zlobs'), list = OBS[k] || [];
    el.setAttribute('data-host-only','');
    el.innerHTML = ''
      + '<div class="rounded-xl border border-slate-200 bg-white overflow-hidden mb-card">'
      + '<div class="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100 mb-wash">'+APER+'<span class="text-[13px] font-semibold text-slate-900">Patterns</span><span class="text-[11px] font-semibold nm-rank-text">detected by Neuma</span><span class="ml-auto inline-flex items-center gap-1 text-[11px] text-slate-400" title="Only you see this"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>Only you</span></div>'
      + '<div class="divide-y divide-slate-100">' + list.map(function(o,n){
          return '<div class="group zl-obs px-4 py-3" data-obs="'+n+'">'
            + '<div class="text-[13px] font-medium text-slate-900 leading-snug">'+esc(o[0])+'</div>'
            + '<p class="mt-1 text-[12px] leading-[1.5] text-slate-500">'+esc(o[1])+'</p>'
            + '<div class="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-400"><span>Detected '+(['3d ago','5d ago','Oct 26','yesterday'][n%4])+'</span>'
            + '<span class="ml-auto flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><button type="button" class="inline-flex items-center justify-center rounded-md text-slate-400 hover:text-brand-600 hover:bg-brand-50 w-6 h-6" title="Useful">'+I.up+'</button><button type="button" class="inline-flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 w-6 h-6" data-obsx title="Dismiss">'+I.x+'</button></span></div>'
            + '</div>';
        }).join('') + '</div>'
      + ''
      + '</div>';
  });
  root && root.addEventListener('click', function(e){
    var t = e.target.closest('[data-obsshow],[data-obsx],[data-obsclear]'); if(!t) return;
    var grid = t.closest('.grid') || t.closest('[data-zlcard]').closest('.grid'), card = grid.querySelector('[data-zlcard]'), k = grid.querySelector('[data-zlobs]').getAttribute('data-zlobs');
    function clear(){ card.classList.remove('obs-on'); card.querySelectorAll('.obs-hit').forEach(function(r){ r.classList.remove('obs-hit'); }); grid.querySelectorAll('.zl-obs').forEach(function(x){ x.classList.remove('on'); }); grid.querySelectorAll('[data-obsshow]').forEach(function(b){ b.textContent = 'Show '+OBS[k][+b.getAttribute('data-obsshow')][3].length; }); var bar = card.querySelector('[data-obsbar]'); if (bar) bar.remove(); }
    if (t.hasAttribute('data-obsx')) { t.closest('.zl-obs').remove(); return; }
    if (t.hasAttribute('data-obsclear')) { clear(); return; }
    var n = +t.getAttribute('data-obsshow'), on = t.closest('.zl-obs').classList.contains('on');
    clear(); if (on) return;
    OBS[k][n][3].forEach(function(i){ var r = card.querySelector('[data-zlrow][data-i="'+i+'"]'); if (r) r.classList.add('obs-hit'); });
    card.classList.add('obs-on'); t.closest('.zl-obs').classList.add('on'); t.textContent = 'Showing';
    card.firstChild.insertAdjacentHTML('afterend', '<div class="flex items-center gap-2 px-4 py-2 bg-[#f8f7ff] border-b border-slate-100 text-[12px] text-slate-600" data-obsbar><span class="text-brand-500">'+I.spark+'</span>'+esc(OBS[k][n][0])+'<button type="button" class="ml-auto text-brand-600 font-medium" data-obsclear>Clear</button></div>');
  });

  // People tab: who is in the meetings and what is on their plate. Work only, never behaviour. Everyone sees the same thing.
  var PEOPLE = {"v0": {"team": [["JK", "Jared K.", "Neuma", "Founder", "from-amber-400 to-pink-500", {"action": [1, 6, 9, 12], "issue": [1, 3]}], ["JM", "Jason M.", "Neuma", "CTO", "from-sky-400 to-indigo-500", {"action": [0, 2, 3, 4, 5, 14, 15, 16, 18], "issue": [0, 2, 10]}]], "their": [], "dec": "all"}, "v1": {"team": [["DK", "Daniel K.", "Acme GTM", "Sales", "from-sky-400 to-indigo-500", {"action": [1], "issue": [1]}], ["RP", "Rina P.", "Acme GTM", "Finance", "from-teal-400 to-cyan-500", {"action": [0], "issue": [2]}], ["SM", "Sarah M.", "Acme GTM", "Sales", "from-emerald-400 to-teal-500", {"action": [2], "issue": [0]}], ["JK", "Jared K.", "Acme GTM", "CEO", "from-amber-400 to-pink-500", {}]], "their": [], "dec": "all"}, "v2": {"team": [["JK", "Jared K.", "Acme GTM", "CEO", "from-amber-400 to-pink-500", {"action": [2], "issue": [2]}], ["SM", "Sarah M.", "Acme GTM", "Sales", "from-emerald-400 to-teal-500", {"action": [0], "issue": [0]}], ["DK", "Daniel K.", "Acme GTM", "Sales", "from-sky-400 to-indigo-500", {"action": [1], "issue": [1]}]], "their": [["MR", "Mia R.", "Acme Corp", "Security", "from-pink-400 to-rose-500", ["How long do you keep our call recordings?", "Can we see the SOC 2 report before signing?"]], ["TW", "Tom W.", "Acme Corp", "Procurement", "from-cyan-400 to-blue-500", ["Redlined MSA back by Oct 29"]], ["KO", "Ken O.", "Globex", "CTO", "from-violet-400 to-fuchsia-500", ["A security review before the next step"]]], "dec": "all"}}, ACCESS = {"v0": [["JK", "Jared K.", "you", "Owner", "from-amber-400 to-pink-500"], ["JM", "Jason M.", "neumaos.com", "Can edit", "from-sky-400 to-indigo-500"]], "v1": [["DK", "Daniel K.", "", "Owner", "from-sky-400 to-indigo-500"], ["RP", "Rina P.", "", "Can edit", "from-teal-400 to-cyan-500"], ["SM", "Sarah M.", "", "Can edit", "from-emerald-400 to-teal-500"], ["JK", "Jared K.", "you", "Can edit", "from-amber-400 to-pink-500"]], "v2": [["JK", "Jared K.", "you", "Owner", "from-amber-400 to-pink-500"], ["SM", "Sarah M.", "", "Can view", "from-emerald-400 to-teal-500"], ["DK", "Daniel K.", "", "Can view", "from-sky-400 to-indigo-500"], ["RP", "Rina P.", "", "Can view", "from-teal-400 to-cyan-500"]]};
  function av(p, sz){ sz = sz||8; return '<span class="w-'+sz+' h-'+sz+' rounded-full bg-gradient-to-br '+p[4]+' inline-flex items-center justify-center text-white text-[10px] font-semibold shrink-0">'+p[0]+'</span>'; }
  function openCount(v, p){ var n = 0; ['action','issue'].forEach(function(k){ n += (p[5][k]||[]).length; }); return n; }
  function personRow(v, p, g, i){
    var right = g==='their'
      ? '<span class="text-[12px] text-slate-500">'+p[5].length+' request'+(p[5].length>1?'s':'')+'</span>'
      : (openCount(v,p) ? '<span class="text-[12px] text-slate-600">'+openCount(v,p)+' open item'+(openCount(v,p)>1?'s':'')+'</span>' : '<span class="text-[12px] text-slate-400">Nothing open</span>');
    return '<div class="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50" data-person="'+v+'|'+g+'|'+i+'">'+av(p)
      + '<div class="flex-1 min-w-0"><div class="text-[13.5px] font-medium text-slate-900">'+esc(p[1])+'</div><div class="text-[12px] text-slate-500">'+esc(p[3])+' · '+esc(p[2])+'</div></div>'+right
      + '<span class="text-slate-300 ml-2"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span></div>';
  }
  document.querySelectorAll(':is(#context-summary,#cx-graveyard) [data-people]').forEach(function(el){
    var v = el.getAttribute('data-people'), P = PEOPLE[v];
    var group = function(title, sub, list, g){ return '<div class="rounded-xl border border-slate-200 bg-white overflow-hidden"><div class="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100"><span class="text-[13px] font-semibold text-slate-900">'+title+'</span><span class="text-[11.5px] text-slate-400">'+sub+'</span></div><div class="divide-y divide-slate-100">'+list.map(function(p,i){ return personRow(v,p,g,i); }).join('')+'</div></div>'; };
    el.innerHTML = '<div class="max-w-[880px] space-y-5">'
      + group('Your team', P.team.length+' people', P.team, 'team')
      + (P.their.length ? group('Their side', 'Only what they asked for', P.their, 'their') : '')
      + '<p class="text-[12px] text-slate-400 px-1">Everyone in this Context sees the same thing here. Anyone can mark an item “Not mine”.</p>'
      + '</div>';
  });
  function itemLine(v, kind, i, owner){
    var it = DATA[v+'-'+kind].items[i]; if(!it) return '';
    return '<div class="group flex items-start gap-2.5 py-2.5" data-pitem>'
      + '<span class="badge bg-slate-100 text-slate-600 shrink-0 mt-px">'+LABEL[kind][1]+'</span>'
      + '<button type="button" class="flex-1 text-left text-[13px] text-slate-800 leading-snug hover:text-brand-700" data-zlgo="'+kind+'" data-zlgoi="'+i+'">'+esc(it.t)+'</button>'
      + (owner ? '<span class="shrink-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity text-[11.5px]"><button type="button" class="text-slate-500 hover:text-slate-800" data-notmine>Not mine</button></span>' : '')
      + '</div>'
      + '<div class="hidden items-center gap-2 py-2.5 text-[12px] text-slate-400" data-pgone><span class="flex-1">Removed from '+esc(owner||'')+'</span><button type="button" class="underline hover:text-slate-700" data-pundo>Undo</button></div>';
  }
  function personDetail(v, g, i){
    var p = PEOPLE[v][g][i], first = p[1].split(' ')[0];
    var h = '<div class="bg-white"><div class="px-6 pt-5 pb-4 border-b border-slate-100"><div class="flex items-center gap-3">'+av(p,10)
      + '<div class="flex-1 min-w-0"><div class="text-[16px] font-semibold text-slate-900">'+esc(p[1])+'</div><div class="text-[12.5px] text-slate-500">'+esc(p[3])+' · '+esc(p[2])+'</div></div>'
      + '<button type="button" class="w-8 h-8 -mr-2 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700" data-zlclose aria-label="Close">'+I.x+'</button></div></div>'
      + '<div class="px-6 py-5 space-y-6 overflow-y-auto" style="max-height:calc(100vh - 260px)">';
    if (g==='their') {
      h += '<div><div class="eyebrow mb-1">What '+esc(first)+' asked for</div><div class="divide-y divide-slate-100">'+p[5].map(function(q){ return '<div class="py-2.5 text-[13px] text-slate-800">'+esc(q)+'</div>'; }).join('')+'</div></div>'
        + '<p class="text-[12px] text-slate-400">Neuma keeps only what people outside your company asked for.</p>';
    } else {
      var open = ['action','issue'].map(function(k){ return (p[5][k]||[]).map(function(x){ return itemLine(v,k,x,p[1]); }).join(''); }).join('');
      h += '<div><div class="eyebrow mb-1">Open with '+esc(first)+'</div>'+(open ? '<div class="divide-y divide-slate-100">'+open+'</div>' : '<p class="py-2 text-[13px] text-slate-500">Nothing open.</p>')+'</div>';
      var decs = DATA[v+'-decision'].items.slice(0,3);
      h += '<div><div class="eyebrow mb-1">Decisions '+esc(first)+' was part of</div><div class="divide-y divide-slate-100">'+decs.map(function(d,j){ return itemLine(v,'decision',j,''); }).join('')+'</div>'
        + '<button type="button" class="mt-1 text-[12px] text-brand-600 font-medium" data-zlgo="decision" data-zlgoi="0">All decisions →</button></div>';
    }
    return h + '</div></div>';
  }
  function openDrawer(variant, html){
    var drawer = variant.querySelector('[data-zldrawer]'), rail = drawer.querySelector('[data-zlrail]'), aside = drawer.querySelector('aside');
    drawer.classList.remove('hidden'); drawer.removeAttribute('data-list'); rail.innerHTML = html; rail.style.marginTop = '0px';
    var off = Math.max(0, 80 - aside.getBoundingClientRect().top);
    rail.style.marginTop = Math.min(off, Math.max(0, aside.offsetHeight - rail.offsetHeight)) + 'px';
  }
  root && root.addEventListener('click', function(e){
    var pr = e.target.closest('[data-person]');
    if (pr) { var a = pr.getAttribute('data-person').split('|'); openDrawer(pr.closest('[data-cx-variant]'), personDetail(a[0], a[1], +a[2])); return; }
    var t = e.target.closest('button'); if(!t) return;
    if (t.hasAttribute('data-notmine')) { var it = t.closest('[data-pitem]'); it.classList.add('hidden'); it.nextElementSibling.classList.remove('hidden'); it.nextElementSibling.classList.add('flex'); return; }
    if (t.hasAttribute('data-pundo')) { var g = t.closest('[data-pgone]'); g.classList.add('hidden'); g.classList.remove('flex'); g.previousElementSibling.classList.remove('hidden'); return; }
    if (t.hasAttribute('data-access')) {
      var variant = t.closest('[data-cx-variant]'), v = 'v'+['a','b','c'].indexOf(variant.getAttribute('data-cx-variant'));
      t.closest('[data-sharemenu]').classList.add('hidden');
      var list = (ACCESS[v]||[]).map(function(m){ return '<div class="flex items-center gap-3 py-2.5">'+av(m)+'<div class="flex-1 min-w-0"><div class="text-[13px] text-slate-900">'+esc(m[1])+(m[2]==='you'?' <span class="text-slate-400">· you</span>':'')+'</div>'+(m[2]&&m[2]!=='you'?'<div class="text-[11.5px] text-slate-500">'+esc(m[2])+'</div>':'')+'</div>'
        + (m[3]==='Owner' ? '<span class="text-[12px] text-slate-500 px-2">Owner</span>' : '<button type="button" class="btn-out" style="padding:3px 8px;font-size:12px;">'+m[3]+I.chev+'</button>')+'</div>'; }).join('');
      openDrawer(variant, '<div class="bg-white"><div class="px-6 pt-5 pb-4 border-b border-slate-100 flex items-center"><div class="flex-1"><div class="text-[16px] font-semibold text-slate-900">Members and access</div><div class="text-[12.5px] text-slate-500 mt-0.5">Members see its summaries and quotes.</div></div><button type="button" class="w-8 h-8 -mr-2 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700" data-zlclose aria-label="Close">'+I.x+'</button></div>'
        + '<div class="px-6 py-3 divide-y divide-slate-100">'+list+'</div><div class="px-6 py-3 border-t border-slate-100"><button type="button" class="btn-out w-full justify-center">Invite members</button></div></div>');
      return;
    }
  }, true);

  function cnt(items, fn){ return items.filter(fn).length; }
  function radio(name, val, label, n, checked){ return '<label class="flex items-center gap-2.5 px-3 py-1.5 text-[13px] text-slate-700 hover:bg-slate-50 cursor-pointer"><input type="radio" class="accent-brand-600" name="'+name+'" data-zlfk="'+name.split('-')[0]+'" value="'+val+'"'+(checked?' checked':'')+'><span class="flex-1">'+label+'</span>'+(n!=null?'<span class="num font-mono text-[11px] text-slate-400">'+n+'</span>':'')+'</label>'; }
  function check(key, val, label, n, dot){ return '<label class="flex items-center gap-2.5 px-3 py-1.5 text-[13px] text-slate-700 hover:bg-slate-50 cursor-pointer"><input type="checkbox" class="accent-brand-600" data-zlfk="'+key+'" value="'+val+'">'+(dot?'<span class="w-2 h-2 rounded-full '+dot+'"></span>':'')+'<span class="flex-1">'+label+'</span><span class="num font-mono text-[11px] text-slate-400">'+n+'</span></label>'; }
  function hdr(t){ return '<div class="px-3 pt-1.5 pb-1 eyebrow">'+t+'</div>'; }
  function sepRow(){ return '<div class="my-1 h-px bg-slate-100"></div>'; }
  function filterMenu(k, kind, d){
    var it = d.items, h = '';
    if (kind==='issue') h += hdr('Status') + radio('status-'+k,'open','Open',cnt(it,function(x){return x.status==='open';}),true) + radio('status-'+k,'resolved','Resolved',cnt(it,function(x){return x.status==='resolved';})) + radio('status-'+k,'all','All',it.length);
    if (kind==='action') h += hdr('Status') + radio('status-'+k,'open','Open',cnt(it,function(x){return x.status==='open';}),true) + radio('status-'+k,'done','Done',cnt(it,function(x){return x.status==='done';})) + radio('status-'+k,'all','All',it.length);
    if (kind==='decision') h += hdr('Status') + radio('status-'+k,'active','Active',cnt(it,function(x){return x.status!=='superseded';}),true) + radio('status-'+k,'reopened','Reopened',cnt(it,function(x){return x.status==='reopened';})) + radio('status-'+k,'superseded','Superseded',cnt(it,function(x){return x.status==='superseded';})) + radio('status-'+k,'all','All',it.length);
    var lbl = kind==='decision' ? 'Decided' : 'Added';
    h += sepRow() + hdr(lbl) + radio('added-'+k,'any','Any time',null,true) + radio('added-'+k,'7','Last 7 days',cnt(it,function(x){return x.days<=7;})) + radio('added-'+k,'30','Last 30 days',cnt(it,function(x){return x.days<=30;}));
    if (kind!=='decision') { var pr = ['Critical','High','Medium','Low'].map(function(p){ var n = cnt(it,function(x){return x.pri===p;}); return n ? check('pri',p,p,n,PRI[p][1]) : ''; }).join(''); if (pr) h += sepRow() + hdr('Priority') + pr; }
    if (kind==='action' && cnt(it,function(x){return x.sug;})) h += sepRow() + hdr('Origin') + check('origin','detected','Agreed in a meeting',cnt(it,function(x){return !x.sug;})) + check('origin','suggested','Suggested by Neuma',cnt(it,function(x){return x.sug;}));
    if (false) { var os = {}; it.forEach(function(x){ var o = x.owner||'Unassigned'; os[o]=(os[o]||0)+1; }); var keys = Object.keys(os).sort(function(a,b){ return a==='Unassigned'?1:b==='Unassigned'?-1:a.localeCompare(b); }); if (keys.length>1) h += sepRow() + hdr('Owner') + keys.map(function(o){ return check('owner',o,o,os[o]); }).join(''); }
    var cs = {}; it.forEach(function(x){ if (x.ctx) cs[x.ctx]=(cs[x.ctx]||0)+1; });
    if (Object.keys(cs).length>1) h += sepRow() + hdr('Context') + Object.keys(cs).map(function(c){ return check('ctx',c,c,cs[c]); }).join('');
    return h;
  }
  function sortMenu(k, kind){
    var opts = kind==='decision' ? [['default','Default'],['newest','Newest decided'],['oldest','Oldest decided']] : [['default','Default'],['priority','Priority'],['newest','Newest added'],['oldest','Oldest added']];
    return opts.map(function(o,i){ return radio('sort-'+k, o[0], o[1], null, i===0); }).join('');
  }
  var PRANK = {Critical:0, High:1, Medium:2, Low:3};
  function applySort(card){
    var menu = card.querySelector('[data-zlsmenu]'); if(!menu) return;
    var mode = (menu.querySelector('input:checked')||{}).value || 'default';
    var list = card.querySelector('.divide-y'), rows = Array.prototype.slice.call(list.querySelectorAll('[data-zlrow]'));
    rows.forEach(function(r,i){ if (r.dataset.o==null) r.dataset.o = i; });
    rows.sort(function(a,b){
      var da = +a.getAttribute('data-days'), db = +b.getAttribute('data-days');
      if (mode==='priority') { var pa = PRANK[a.getAttribute('data-pri')] ?? 9, pb = PRANK[b.getAttribute('data-pri')] ?? 9; return pa-pb || da-db || a.dataset.o-b.dataset.o; }
      if (mode==='newest') return da-db || a.dataset.o-b.dataset.o;
      if (mode==='oldest') return db-da || a.dataset.o-b.dataset.o;
      return a.dataset.o-b.dataset.o;
    });
    rows.forEach(function(r){ list.appendChild(r); });
    var lab = menu.querySelector('input:checked').parentNode.querySelector('.flex-1').textContent.split(' ')[0];
    card.querySelector('[data-zlslabel]').textContent = lab;
  }
  function srcFilterMenu(v, items){
    var h = '', c = function(key){ var o={}; items.forEach(function(x){ var k=x[key]; o[k]=(o[k]||0)+1; }); return o; };
    var ty = c('type'), TN = {meeting:'Meetings',email:'Emails',file:'Files',slack:'Slack'};
    if (Object.keys(ty).length>1) h += hdr('Type') + Object.keys(ty).map(function(k){ return check('stype',k,TN[k]||k,ty[k]); }).join('') + sepRow();
    h += hdr('Date') + radio('sadded-'+v,'any','Any time',null,true) + radio('sadded-'+v,'7','Last 7 days',items.filter(function(x){return x.days<=7;}).length) + radio('sadded-'+v,'30','Last 30 days',items.filter(function(x){return x.days<=30;}).length);
    var via = c('via'); h += sepRow() + hdr('Via') + Object.keys(via).map(function(k){ return check('svia',k,k,via[k]); }).join('');
    var ad = c('added'); h += sepRow() + hdr('Added by') + Object.keys(ad).map(function(k){ return check('sadded_by',k,k,ad[k]); }).join('');
    return h;
  }
  function applySrcFilter(pane){
    var menu = pane.querySelector('[data-zlfmenu]'), chips = pane.querySelector('[data-zlchips]'); if(!menu) return;
    var ad = (menu.querySelector('input[data-zlfk="sadded"]:checked')||{}).value || 'any';
    var vals = function(key){ return Array.prototype.map.call(menu.querySelectorAll('input[data-zlfk="'+key+'"]:checked'), function(i){ return i.value; }); };
    var vias = vals('svia'), bys = vals('sadded_by'), types = vals('stype');
    var q = (pane.querySelector('[data-csinput]')||{}).value || ''; q = q.toLowerCase();
    pane.querySelectorAll('tr[data-src]').forEach(function(r){
      var ok = !types.length || types.indexOf(r.getAttribute('data-type'))>=0;
      if (ok && ad!=='any') ok = +r.getAttribute('data-days') <= +ad;
      if (ok && vias.length) ok = vias.indexOf(r.getAttribute('data-via'))>=0;
      if (ok && bys.length) ok = bys.indexOf(r.getAttribute('data-added'))>=0;
      if (ok && q) ok = r.textContent.toLowerCase().indexOf(q)>=0;
      r.classList.toggle('hidden', !ok);
    });
    var cc = ''; types.forEach(function(x){ cc += chip('stype', x, ({meeting:'Meetings',email:'Emails',file:'Files',slack:'Slack'})[x]); }); if (ad!=='any') cc += chip('sadded', ad, 'Last '+ad+' days'); vias.forEach(function(x){ cc += chip('svia', x, x); }); bys.forEach(function(x){ cc += chip('sadded_by', x, x); });
    chips.innerHTML = cc; var n = chips.children.length, btn = pane.querySelector('[data-zlfbtn]');
    btn.style.background = n ? '#eef1ff' : ''; btn.style.borderColor = n ? '#8e9eff' : ''; btn.style.color = n ? '#2a2fa6' : '';
  }
  function applySrcSort(pane){
    var menu = pane.querySelector('[data-zlsmenu]'), mode = (menu.querySelector('input:checked')||{}).value || 'newest';
    var tb = pane.querySelector('tbody'), rows = Array.prototype.slice.call(tb.querySelectorAll('tr[data-src]'));
    rows.sort(function(a,b){ var d = (+a.getAttribute('data-days')) - (+b.getAttribute('data-days')); return mode==='oldest' ? -d || a.getAttribute('data-src')-b.getAttribute('data-src') : d || a.getAttribute('data-src')-b.getAttribute('data-src'); });
    rows.forEach(function(r){ tb.appendChild(r); });
    pane.querySelector('[data-zlslabel]').textContent = mode==='oldest' ? 'Oldest' : 'Newest';
  }
  function chip(key, val, label, cls){ return '<button type="button" class="badge '+(cls||'bg-brand-50 text-brand-700')+' inline-flex items-center gap-1" data-zlchip="'+key+'" data-zlv="'+esc(val)+'">'+esc(label)+' <span class="opacity-60">×</span></button>'; }
  function applyFilter(card){
    var menu = card.querySelector('[data-zlfmenu]'), chips = card.querySelector('[data-zlchips]');
    var st = (menu.querySelector('input[data-zlfk="status"]:checked')||{}).value || 'all';
    var ad = (menu.querySelector('input[data-zlfk="added"]:checked')||{}).value || 'any';
    var vals = function(key){ return Array.prototype.map.call(menu.querySelectorAll('input[data-zlfk="'+key+'"]:checked'), function(i){ return i.value; }); };
    var pris = vals('pri'), owners = vals('owner'), ctxs = vals('ctx'), origins = vals('origin');
    card.querySelectorAll('[data-zlrow]').forEach(function(r){
      var s = r.getAttribute('data-status'), dd = +r.getAttribute('data-days'), ok = true;
      if (st==='active') ok = s!=='superseded'; else if (st!=='all') ok = s===st;
      if (ok && ad!=='any') ok = dd <= +ad;
      if (ok && pris.length) ok = pris.indexOf(r.getAttribute('data-pri'))>=0;
      if (ok && owners.length) ok = owners.indexOf(r.getAttribute('data-owner')||'Unassigned')>=0;
      if (ok && ctxs.length) ok = ctxs.indexOf(r.getAttribute('data-ctx'))>=0;
      if (ok && origins.length) ok = origins.indexOf(r.getAttribute('data-origin'))>=0;
      r.classList.toggle('zl-fhide', !ok);
    });
    var dflt = (menu.querySelector('input[data-zlfk="status"]')||{}).value, c = '';
    if (st!=='all' && st!==dflt) c += chip('status', st, st.charAt(0).toUpperCase()+st.slice(1));
    if (st==='all') c += chip('status', 'all', 'All statuses');
    if (ad!=='any') c += chip('added', ad, 'Last '+ad+' days');
    pris.forEach(function(p){ c += chip('pri', p, p, PRI[p][0]); });
    owners.forEach(function(o){ c += chip('owner', o, o); });
    ctxs.forEach(function(o){ c += chip('ctx', o, o); });
    origins.forEach(function(o){ c += chip('origin', o, o==='suggested'?'Suggested by Neuma':'Agreed in a meeting'); });
    chips.innerHTML = c;
    var n = chips.children.length, btn = card.querySelector('[data-zlfbtn]');
    btn.style.background = n ? '#eef1ff' : ''; btn.style.borderColor = n ? '#8e9eff' : ''; btn.style.color = n ? '#2a2fa6' : '';
    var foot = card.querySelector('[data-zlclosedhint]'); if (foot) foot.remove();
    if (st===dflt) { var closedN = card.querySelectorAll('[data-zlrow].zl-closed').length; if (closedN) { var kind = card.closest('[data-zl]').getAttribute('data-zl').split('-')[1]; var word = kind==='issue'?'resolved':kind==='action'?'done':'superseded'; card.insertAdjacentHTML('beforeend','<button type="button" class="w-full flex items-center gap-1 px-4 py-1.5 border-t border-slate-100 text-[11.5px] font-medium text-slate-500 hover:bg-slate-50" data-zlclosedhint>'+closedN+' '+word+' hidden <span class="text-brand-600 ml-1">Show</span></button>'); } }
  }
  root && root.addEventListener('change', function(e){
    var sp = e.target.closest('[data-sources]');
    if (sp) { if (e.target.closest('[data-zlfmenu]')) applySrcFilter(sp); if (e.target.closest('[data-zlsmenu]')) { applySrcSort(sp); e.target.closest('[data-zlsmenu]').classList.add('hidden'); } return; }
    var i = e.target.closest('[data-zlfmenu] input'); if (i) applyFilter(i.closest('[data-zlcard]')); var j = e.target.closest('[data-zlsmenu] input'); if (j) { applySort(j.closest('[data-zlcard]')); j.closest('[data-zlsmenu]').classList.add('hidden'); } });
  root && root.addEventListener('click', function(e){
    var b = e.target.closest('[data-csbtn]'); if (b) { var inp = b.parentNode.querySelector('[data-csinput]'); inp.classList.toggle('hidden'); if (!inp.classList.contains('hidden')) inp.focus(); else { inp.value=''; inp.dispatchEvent(new Event('input',{bubbles:true})); } return; }
    var ch = e.target.closest('[data-sources] [data-zlchip]'); if (ch) { var sp2 = ch.closest('[data-sources]'), key = ch.getAttribute('data-zlchip'), inp2 = sp2.querySelector('[data-zlfmenu] input[data-zlfk="'+key+'"][value="'+ch.getAttribute('data-zlv')+'"]'); if (inp2 && inp2.type==='radio') sp2.querySelector('[data-zlfmenu] input[data-zlfk="'+key+'"]').checked = true; else if (inp2) inp2.checked = false; applySrcFilter(sp2); e.stopImmediatePropagation(); return; }
  }, true);
  root && root.addEventListener('input', function(e){
    var inp = e.target.closest('[data-csinput]'); if (!inp) return;
    var sp = inp.closest('[data-sources]'); if (sp) { applySrcFilter(sp); return; }
    var card = inp.closest('[data-zlcard]'), q = inp.value.toLowerCase();
    card.querySelectorAll('[data-zlrow]').forEach(function(r){ r.classList.toggle('zl-qhide', q && r.textContent.toLowerCase().indexOf(q)<0); });
  });
  root && root.addEventListener('focusout', function(e){ var inp = e.target.closest && e.target.closest('[data-csinput]'); if (inp && !inp.value) inp.classList.add('hidden'); });
  document.addEventListener('click', function(e){ if (!e.target.closest('[data-zlfilt]')) document.querySelectorAll(':is(#context-summary,#cx-graveyard) [data-zlfmenu], :is(#context-summary,#cx-graveyard) [data-zlsmenu]').forEach(function(m){ m.classList.add('hidden'); }); });

  // Sources tab: grouped by type, email threads collapsed, click to open the source.
  var SRC = {"v0": [{"type": "meeting", "t": "Neuma weekly", "when": "Today", "days": 0, "via": "Zoom", "ppl": ["JK", "JM"], "added": "Series", "topics": [], "sum": "The transcript hasn’t arrived from Zoom yet. Neuma reads it as soon as it does.", "items": {}, "ctx": "", "status": "Reading"}, {"type": "meeting", "t": "Neuma weekly", "when": "Oct 28", "days": 5, "via": "Zoom", "ppl": ["JK", "JM"], "added": "Series", "topics": ["Distribution & trust"], "sum": "Where Neuma shows up (Zoom, Slack, Gong), whether the Zoom app is free, and who the first paying design partner is.", "items": {"decision": [0, 1, 2, 3], "issue": [2, 3, 9], "action": [0, 2, 3, 7, 8, 9]}, "ctx": ""}, {"type": "meeting", "t": "Board prep", "when": "Oct 25", "days": 8, "via": "Zoom", "ppl": ["JK", "DR"], "added": "Series", "topics": [], "sum": "Dana R. hosts this series and isn’t on Neuma yet. The transcript comes in when she joins and connects Zoom.", "items": {}, "ctx": "", "status": "Invite", "host": "Dana R.", "later": true}, {"type": "meeting", "t": "Neuma weekly", "when": "Oct 21", "days": 12, "via": "Zoom", "ppl": ["JK", "JM"], "added": "Series", "topics": ["Duplicates & approvals"], "sum": "How duplicate atoms get found and who resolves a conflict. Seven decisions in one session, three issues left open.", "items": {"decision": [4, 5, 6, 7, 8, 9, 10], "issue": [4, 5, 6], "action": [4, 5, 6]}, "ctx": ""}, {"type": "meeting", "t": "Integrations review", "when": "Oct 14", "days": 19, "via": "Google Meet", "ppl": ["JK", "JM"], "added": "Series", "topics": [], "sum": "Slack’s terms don’t allow storing messages. Options raised: summaries only, customer exports, or an enterprise-only API. Nothing decided.", "items": {"issue": [2], "action": [3]}, "ctx": ""}, {"type": "meeting", "t": "Investor update prep", "when": "Oct 4", "days": 29, "via": "Google Meet", "ppl": ["JK", "JM"], "added": "Series", "topics": [], "sum": "Google Meet didn’t record a transcript. Transcription is off by default in Meet.", "items": {}, "ctx": "", "status": "No transcript"}, {"type": "meeting", "t": "Neuma weekly", "when": "Sep 30", "days": 33, "via": "Zoom", "ppl": ["JK", "JM"], "added": "Series", "topics": ["Filtering & out-of-date atoms"], "sum": "Atoms that are only true for one call. Rewriting and filtering become separate steps.", "items": {"decision": [11, 12, 13, 14], "issue": [0], "action": [10]}, "ctx": ""}, {"type": "meeting", "t": "Neuma weekly", "when": "Sep 29", "days": 34, "via": "Google Meet", "ppl": ["JK", "JM"], "added": "Series", "topics": ["Reviewing results live"], "sum": "Reviewed AI output together. Fewer, relevant atoms beat more atoms with noise.", "items": {"decision": [15, 16, 17, 18], "issue": [10], "action": [11, 12, 13]}, "ctx": ""}, {"type": "meeting", "t": "Neuma weekly", "when": "Sep 28", "days": 35, "via": "Zoom", "ppl": ["JK", "JM"], "added": "Series", "topics": ["Fixing the product-question problem"], "sum": "A third of the atoms were product questions. Capture broadly first, filter later.", "items": {"decision": [19, 20], "issue": [7], "action": [17]}, "ctx": ""}, {"type": "meeting", "t": "Neuma weekly", "when": "Sep 24", "days": 39, "via": "Zoom", "ppl": ["JK", "JM"], "added": "Series", "topics": ["Quality checks", "Prompt clean-up"], "sum": "What a good atom is, the quality checklist, and stripping the prompts back to plain language.", "items": {"decision": [21, 22, 23, 24, 25], "issue": [8], "action": [1, 14, 18]}, "ctx": ""}, {"type": "email", "t": "Re: monthly costs", "when": "Sep 24", "days": 39, "via": "Email", "ppl": ["JM", "JK"], "added": "cc founders@", "x": [0, 1, 1], "msgs": [["Jason M.", "Jared K.", "Sep 23, 4:12pm", "Quick list of what we’re paying for each month, as promised on the call. Claude API is the big one. I’ll send the breakdown by Friday."], ["Jared K.", "Jason M.", "Sep 23, 5:40pm", "Thanks. Let’s settle the split once the list is in. Can you add the Zoom and Slack dev accounts too?"], ["Jason M.", "Jared K.", "Sep 24, 9:02am", "Will do. The dev accounts are small but I’ll include them."]], "ctx": "", "items": {"issue": [11], "action": [15]}}, {"type": "meeting", "t": "Budget and runway", "when": "Sep 23", "days": 40, "via": "Google Meet", "ppl": ["JK", "JM"], "added": "Series", "topics": ["Quality checklist & costs"], "sum": "Spend as little as possible until a customer commits to pay. A paying design partner is the test. The quality checklist can’t be overridden.", "items": {"decision": [26, 27, 28], "issue": [1, 11], "action": [15]}, "ctx": ""}, {"type": "meeting", "t": "Neuma weekly", "when": "Sep 22", "days": 41, "via": "Zoom", "ppl": ["JK", "JM"], "added": "Series", "topics": ["Process reset & product model"], "sum": "Three steps: capture, group, rewrite. Views, Contexts and Templates are separate things.", "items": {"decision": [29, 30, 31]}, "ctx": ""}, {"type": "meeting", "t": "Neuma weekly", "when": "Sep 15", "days": 48, "via": "Zoom", "ppl": ["JK", "JM"], "added": "Jared K.", "topics": [], "sum": "", "items": {}, "ctx": "", "extracted": false}], "v1": [{"type": "email", "t": "Re: Q4 price list v3", "when": "2h ago", "days": 0, "via": "Email", "ppl": ["DK", "RP", "SM"], "added": "cc pricing@", "x": [1, 1, 1], "msgs": [["Rina P.", "Daniel K., Sarah M.", "Today, 8:14am", "v3 attached. Annual at two months free, monthly ending in 9. Flagging that v2 is still on the shared drive and two reps quoted from it last week."], ["Daniel K.", "Rina P., Sarah M.", "Today, 8:40am", "Can we delete v2 today? Enterprise floor price is still open, I’ll take that to Jared before kickoff."], ["Sarah M.", "Daniel K., Rina P.", "Today, 9:05am", "Deleting v2 now. Reps will get v3 in the Thursday pipeline review."]], "ctx": "", "items": {"decision": [0], "issue": [0], "action": [0]}}, {"type": "email", "t": "Enterprise floor price", "when": "Yesterday", "days": 1, "via": "Email", "ppl": ["DK", "JK"], "added": "cc pricing@", "x": [0, 1, 1], "msgs": [["Daniel K.", "Jared K.", "Yesterday, 3:22pm", "We need a floor for enterprise before the Nov 15 kickoff. Acme is at $42k, Globex asked for $38k. I’d set $40k and hold."], ["Jared K.", "Daniel K.", "Yesterday, 6:10pm", "Agree on a floor. Let’s decide Thursday with the margin numbers in front of us."]], "ctx": "", "items": {"issue": [2], "action": [1]}}, {"type": "file", "t": "Q4 price list v3.xlsx", "when": "Today", "days": 0, "via": "Google Drive", "ppl": ["RP"], "added": "Rina P.", "x": [0, 0, 0], "desc": "Three tiers, annual and monthly. Enterprise row blank pending the floor decision.", "ctx": "", "items": {}}, {"type": "file", "t": "Competitor comparison (Aug).pdf", "when": "Aug 3", "days": 91, "via": "Google Drive", "ppl": ["SM"], "added": "Sarah M.", "x": [0, 1, 1], "desc": "Price and feature comparison across four competitors. Last updated August.", "ctx": "", "items": {"issue": [1], "action": [2]}}, {"type": "email", "t": "Re: discount approvals", "when": "4d ago", "days": 4, "via": "Email", "ppl": ["SM", "RP"], "added": "cc pricing@", "x": [0, 1, 0], "msgs": [["Sarah M.", "Rina P.", "4d ago", "Who signs off a 20% discount? Two reps asked this week and I gave different answers."], ["Rina P.", "Sarah M.", "4d ago", "Nothing written down. Anything over 15% should come to me until we fix that."]], "ctx": "", "items": {"issue": [2]}}, {"type": "email", "t": "Fwd: Initech asking about usage pricing", "when": "6d ago", "days": 6, "via": "Email", "ppl": ["DK"], "added": "cc pricing@", "x": [1, 0, 0], "msgs": [["Daniel K.", "pricing@", "6d ago", "Initech want usage-based pricing. Forwarding so it’s on record. My view is no for Q4."]], "ctx": "", "items": {"decision": [1]}}, {"type": "slack", "t": "#pricing", "when": "Today", "days": 0, "via": "Slack", "ppl": ["DK", "RP", "SM", "JK"], "added": "Channel", "x": [0, 0, 1], "msgs": [["Sarah M.", "Today, 9:08am", "v2 deleted from the drive. If anyone has it downloaded, bin it."], ["Daniel K.", "Today, 9:11am", "👍 Floor price on Thursday’s agenda."]], "ctx": "", "items": {"action": [0]}}, {"type": "file", "t": "Pricing exceptions log.xlsx", "when": "2w ago", "days": 14, "via": "Upload", "ppl": ["RP"], "added": "Rina P.", "x": [0, 0, 0], "desc": "Every discount over 10% this year, with who approved it.", "ctx": "", "items": {}}, {"type": "email", "t": "Re: annual plan wording", "when": "9d ago", "days": 9, "via": "Email", "ppl": ["SM", "JK"], "added": "cc pricing@", "x": [1, 0, 0], "msgs": [["Sarah M.", "Jared K.", "9d ago", "Proposed wording for the annual offer on the site: “Pay yearly, get two months free.”"], ["Jared K.", "Sarah M.", "9d ago", "Good. Ship it once v3 is final."]], "ctx": "", "items": {"decision": [0]}}], "v2": [{"type": "meeting", "t": "Acme Corp · Procurement sync", "when": "Today", "days": 0, "via": "Microsoft Teams", "ppl": ["SM", "TW"], "added": "Series", "dur": "34 min", "x": [1, 1, 2], "sum": "MSA redlines and the SOC 2 timeline. Acme asked how long we keep call data.", "ctx": "Acme Corp", "items": {"decision": [1], "issue": [0], "action": [0]}}, {"type": "meeting", "t": "Globex · Technical deep dive", "when": "Yesterday", "days": 1, "via": "Zoom", "ppl": ["DK", "KO"], "added": "Series", "dur": "58 min", "x": [1, 1, 1], "sum": "Security review before the next step. Ken wants SSO and a data retention answer.", "ctx": "Globex", "items": {"issue": [0], "action": [0]}}, {"type": "email", "t": "Re: Initech renewal", "when": "2d ago", "days": 2, "via": "Email", "ppl": ["SM"], "added": "cc sales@", "x": [0, 1, 1], "msgs": [["Sarah M.", "sales@", "2d ago", "Initech renews in January. Nobody owns it since Priya left. Flagging."]], "ctx": "Initech", "items": {"issue": [2], "action": [2]}}, {"type": "meeting", "t": "Sales team weekly", "when": "3d ago", "days": 3, "via": "Google Meet", "ppl": ["SM", "DK", "AL"], "added": "Series", "dur": "30 min", "x": [1, 0, 1], "sum": "Pipeline review moves to Thursdays. Discount quotes vary by rep.", "ctx": "Sales team weekly", "items": {"decision": [2], "action": [1]}}, {"type": "meeting", "t": "Acme Corp · Discovery call", "when": "Oct 17", "days": 16, "via": "Zoom", "ppl": ["SM", "DK"], "added": "Series", "dur": "45 min", "x": [1, 0, 1], "sum": "Roll out to CS first. Sales follows in Q1.", "ctx": "Acme Corp", "items": {"decision": [1], "action": [1]}}, {"type": "file", "t": "Acme Corp · security questionnaire.pdf", "when": "Oct 26", "days": 7, "via": "Upload", "ppl": ["JK"], "added": "Jared K.", "x": [0, 0, 0], "desc": "Completed questionnaire sent to Mia R.", "ctx": "Acme Corp", "items": {}}]};
  var SAV = {JK:'from-amber-400 to-pink-500',JM:'from-sky-400 to-indigo-500',SM:'from-emerald-400 to-teal-500',DK:'from-sky-400 to-indigo-500',RP:'from-teal-400 to-cyan-500',AL:'from-rose-400 to-orange-400',TW:'from-cyan-400 to-blue-500',KO:'from-violet-400 to-fuchsia-500',MR:'from-pink-400 to-rose-500'};
  function sav(i){ return '<span class="w-5 h-5 text-[9px] rounded-full bg-gradient-to-br '+(SAV[i]||'from-slate-400 to-slate-500')+' inline-flex items-center justify-center text-white font-semibold ring-2 ring-white shrink-0">'+i+'</span>'; }
  var DOT = {Zoom:'mb-dot-zoom','Google Meet':'mb-dot-meet','Microsoft Teams':'mb-dot-teams',Email:'mb-dot-email',Slack:'mb-dot-slack',Upload:'mb-dot-upload','Google Drive':'mb-dot-doc'};
  var TYPES = [['all','All'],['meeting','Meetings'],['email','Emails'],['file','Files'],['slack','Slack']];
  function srcItems(v, it){
    if (it.items) return it.items;
    var name = it.t.indexOf(' · ')>0 ? it.t.split(' · ')[1] : it.t, out = {};
    ['decision','issue','action'].forEach(function(k){ var d = DATA[v+'-'+k]; if(!d) return; var ix = []; d.items.forEach(function(x,i){ if ((x.tip||'').indexOf(name)>=0) ix.push(i); }); if (ix.length) out[k]=ix; });
    it.items = out; return out;
  }
  function xOf(v, it){ var o = srcItems(v, it); return [(o.decision||[]).length,(o.issue||[]).length,(o.action||[]).length]; }
  function xshort(x){ var p=[]; if(x[0]) p.push(x[0]+' decision'+(x[0]>1?'s':'')); if(x[1]) p.push(x[1]+' issue'+(x[1]>1?'s':'')); if(x[2]) p.push(x[2]+' action'+(x[2]>1?'s':'')); return p.join(', '); }
  function xcount(x){ var p=[]; if(x[0]) p.push(x[0]+' decision'+(x[0]>1?'s':'')); if(x[1]) p.push(x[1]+' issue'+(x[1]>1?'s':'')); if(x[2]) p.push(x[2]+' action'+(x[2]>1?'s':'')); return p.length ? p.join(' · ') : '<span class="text-slate-400">Nothing yet</span>'; }
  // Dates: relative under 7 days, otherwise the date (house convention).
  function relDate(it){
    var d = it.days; if (d>=999) return '—';
    if (d===0) return /ago$/.test(it.when) ? it.when : 'Today';
    if (d===1) return 'Yesterday';
    if (d<7) return d+'d ago';
    var dt = new Date(2026,10,2); dt.setDate(dt.getDate()-d);
    var M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return M[dt.getMonth()]+' '+dt.getDate()+(dt.getFullYear()<2026?', '+dt.getFullYear():'');
  }
  function fullDate(it){ if (it.days>=999) return 'No date in the transcript'; var dt = new Date(2026,10,2); dt.setDate(dt.getDate()-it.days); return dt.toLocaleDateString('en-US',{weekday:'short',day:'numeric',month:'short',year:'numeric'}); }
  // Status says only whether the transcript is there, with the same labels and dots as the Integrations meeting lists. Neuma extracts the latest 10 as they come in. A meeting added past the 10 stays in the Context with nothing extracted, and its drawer says so.
  var TOOL = {'Zoom':'Zoom','Google Meet':'Meet','Microsoft Teams':'Teams'};
  function stLabel(it){
    var st = it.status || '';
    if (st==='Reading') return ['Waiting on '+(TOOL[it.via]||it.via), 'bg-brand-500', 'text-slate-600'];
    if (st==='No transcript') return ['No transcript', 'bg-slate-300', 'text-slate-400'];
    return ['Ready', 'bg-emerald-500', 'text-slate-600'];
  }
  function srcStatus(it){ return it.status || ''; }

  function statusCell(it){
    var st = srcStatus(it);
    // Host not on Neuma: a state like the others. The Invite action lives in the drawer.
    if (st==='Invite') return '<td class="px-2 py-3"><span class="flex items-center gap-1.5 text-[12.5px] whitespace-nowrap text-slate-600"><span class="w-1.5 h-1.5 rounded-full shrink-0 bg-amber-500"></span>Host not on Neuma</span></td>';
    var L = stLabel(it);
    return '<td class="px-2 py-3"><span class="flex items-center gap-1.5 text-[12.5px] whitespace-nowrap '+L[2]+'"><span class="w-1.5 h-1.5 rounded-full shrink-0 '+L[1]+'"></span>'+esc(L[0])+'</span></td>';
  }
  function srcRow(it, i, v, oneSeries){
    // No topic text on rows: the title, status and date identify a source. Topics stay in the drawer.
    var sub = (it.type==='email' ? it.msgs.length+' message'+(it.msgs.length>1?'s':'') : it.type==='slack' ? it.msgs.length+' messages' : '');
    return '<tr class="hover:bg-slate-50 cursor-pointer"'+(it.later?' data-later':'')+' data-src="'+i+'" data-type="'+it.type+'" data-via="'+esc(it.via)+'" data-added="'+esc(it.added)+'" data-days="'+it.days+'">'
      + '<td class="pl-5 pr-3 py-3"><div class="font-medium text-slate-900 leading-snug">'+(oneSeries && it.type==='meeting' ? esc(fullDate(it).replace(/, \d{4}$/,'')) : esc(it.t))+(it.ctx?' <span class="font-normal text-slate-400">· '+esc(it.ctx)+'</span>':'')+(sub?' <span class="font-normal text-[12px] text-slate-400 ml-1">'+sub+'</span>':'')+'</div></td>'
      + statusCell(it)
      + '<td class="px-2 py-3"><span class="mb-plat"><span class="mb-dot '+(DOT[it.via]||'mb-dot-upload')+'"></span>'+esc(it.via)+'</span></td>'
      + '<td class="px-2 py-3"><div class="flex -space-x-1">'+it.ppl.map(sav).join('')+'</div></td>'
      + (it.nodate ? '<td class="pl-2 pr-3 py-3 text-[12.5px] whitespace-nowrap text-right"><button type="button" class="text-brand-600 hover:text-brand-700 font-medium" data-adddate title="The transcript file has no meeting date">Add date</button></td>' : '<td class="pl-2 pr-3 py-3 text-[12.5px] text-slate-500 whitespace-nowrap text-right" title="'+(it.type==='email'||it.type==='slack'?'Last message ':it.uploaded?'Uploaded ':'')+fullDate(it)+(it.uploaded?' · meeting date not in the transcript':'')+'">'+esc(relDate(it))+'</td>')
      + '<td class="pl-1 pr-3 py-3 text-right text-slate-300"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></td></tr>';
  }
  document.querySelectorAll(':is(#context-summary,#cx-graveyard) [data-sources]').forEach(function(el){
    var v = el.getAttribute('data-sources'), items = SRC[v]||[];
    // One series: every row has the same title, so rows lead with the date and the title moves to the header.
    var mt = items.filter(function(x){ return x.type==='meeting'; }).map(function(x){ return x.t; }), oneSeries = mt.length>1 && mt.every(function(t){ return t===mt[0]; });
    // Email and Slack are later, so the live Context (Screen 3) lists meetings and files only.
    var live = !!el.closest('#context-summary'), keep = function(x){ return !(live && (x.type==='email' || x.type==='slack')); }, shown = items.filter(keep);
    var counts = {all:shown.length}; shown.forEach(function(x){ counts[x.type]=(counts[x.type]||0)+1; });
    var msgs = items.filter(function(x){return x.type==='email';}).reduce(function(n,x){ return n+x.msgs.length; },0);
    var TN2 = {meeting:'meeting',email:'email thread',file:'file',slack:'channel'}, parts = ['meeting','email','file','slack'].filter(function(k){ return counts[k]; }).map(function(k){ return counts[k]+' '+TN2[k]+(counts[k]>1?'s':''); });
    el.innerHTML = '<div class="flex items-center justify-between mb-3"><div class="text-[12.5px] text-slate-500">'+(function(){ var nl = shown.filter(function(x){ return !x.later; }).length; return nl===shown.length ? '<span class="num font-mono text-slate-800 font-medium">'+shown.length+'</span>' : '<span class="num font-mono text-slate-800 font-medium" data-v2-only>'+nl+'</span><span class="num font-mono text-slate-800 font-medium" data-later>'+shown.length+'</span>'; })()+' sources</div>'
      + '<div class="ml-auto flex items-center gap-1.5" data-zlfilt><span class="flex items-center gap-1" data-zlchips></span>'
      + '<div class="relative flex items-center" data-csearch><input type="text" class="hidden w-[170px] h-[26px] px-2.5 mr-1 border border-slate-300 rounded-md text-[12px] bg-white outline-none focus:border-brand-400" placeholder="Search…" data-csinput><button type="button" class="btn-out inline-flex items-center justify-center bg-slate-50" style="width:28px;height:26px;padding:0;" title="Search" data-csbtn><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg></button></div>'
      + '<div class="relative"><button type="button" class="btn-out flex items-center gap-1 bg-slate-50" style="padding:3px 9px;font-size:12px;" data-zlsbtn><span class="text-slate-400">Sort:</span><span data-zlslabel>Newest</span><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><polyline points="6 9 12 15 18 9"/></svg></button>'
      + '<div class="hidden absolute right-0 top-full mt-1 w-[180px] rounded-lg border border-slate-200 bg-white py-1.5 z-40 text-left" data-zlsmenu style="box-shadow:0 16px 40px -8px rgba(15,23,42,.2)">'+[['newest','Newest first'],['oldest','Oldest first']].map(function(o,i){ return radio('sort-src-'+v, o[0], o[1], null, i===0); }).join('')+'</div></div>'
      + '<div class="relative"><button type="button" class="btn-out flex items-center gap-1.5 bg-slate-50" style="padding:3px 9px;font-size:12px;" data-zlfbtn><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>Filter</button>'
      + '<div class="hidden absolute right-0 top-full mt-1 w-[236px] rounded-lg border border-slate-200 bg-white py-1.5 z-40 text-left" data-zlfmenu style="box-shadow:0 16px 40px -8px rgba(15,23,42,.2)">'+srcFilterMenu(v, shown)+'</div></div>'
      + '</div></div>'
      + '<div class="rounded-xl border border-slate-200 bg-white overflow-hidden"><table class="w-full text-sm"><thead class="bg-brand-50/60 text-brand-700"><tr class="text-[11px] uppercase tracking-wider"><th class="text-left font-medium pl-5 pr-3 py-3">Source</th><th class="text-left font-medium px-2 py-3 w-[136px]">Status</th><th class="text-left font-medium px-2 py-3 w-[128px]">Via</th><th class="text-left font-medium px-2 py-3 w-[84px]">People</th><th class="text-right font-medium pl-2 pr-3 py-3 w-[76px]">Date</th><th class="w-[32px]"></th></tr></thead><tbody class="divide-y divide-slate-100">'+items.map(function(it,i){ return keep(it) ? srcRow(it,i,v,oneSeries) : ''; }).join('')+'</tbody></table>'+'</div>';
  });
  function srcDetail(v, i){
    var it = SRC[v][i], who = '<div class="flex -space-x-1">'+it.ppl.map(sav).join('')+'</div>', o = srcItems(v, it);
    var sect = function(kind, title){ var ix = o[kind]||[]; if (!ix.length) return ''; return '<div class="rounded-xl border border-slate-200 bg-white overflow-hidden"><div class="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100"><span class="text-brand-500">'+I.spark+'</span><span class="text-[13px] font-semibold text-slate-900">'+LABEL[kind][0]+'</span><span class="ml-1 num font-mono text-[11px] text-slate-400">'+ix.length+'</span></div><div class="divide-y divide-slate-100">'+ix.map(function(j){ return row(DATA[v+'-'+kind].items[j], kind, j, true); }).join('')+'</div></div>'; };
    var found = sect('decision','Decisions') + sect('issue','Issues') + sect('action','Actions');
    if (!found) found = '<p class="text-[12.5px] text-slate-400">Neuma found nothing to record from this source.</p>';
    var head = '<div class="px-6 pt-5 pb-4 border-b border-slate-100"><div class="flex items-center gap-2"><span class="mb-plat"><span class="mb-dot '+(DOT[it.via]||'mb-dot-upload')+'"></span>'+esc(it.via)+'</span><span class="text-[11.5px] text-slate-400">· '+(it.nodate?'Uploaded '+esc(it.when)+', meeting date unknown':esc(relDate(it)))+(it.dur?' · '+it.dur:'')+'</span><button type="button" class="ml-auto w-8 h-8 -mr-2 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700" data-zlclose aria-label="Close">'+I.x+'</button></div>'
      + '<h3 class="mt-2 text-[17px] font-semibold tracking-tight text-slate-900 leading-snug">'+esc(it.t)+'</h3>'
      + '<div class="mt-2 flex items-center gap-2 text-[12.5px] text-slate-500">'+who+'<span>Added by '+esc(it.added)+'</span></div></div>';
    var body = '';
    var stn = srcStatus(it), stNote = stn==='Invite' ? esc(it.host)+' hosts this meeting and isn’t on Neuma. The transcript comes in when they join.' : stn ? stLabel(it)[0]+'.' : '';
    // A meeting with nothing to show gets one panel: what happened and what comes next. No "found nothing" line.
    var panel = function(t, d){ return '<div class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5"><div class="text-[13px] font-medium text-slate-900">'+esc(t)+'</div><p class="mt-1 text-[12.5px] leading-[1.55] text-slate-600">'+esc(d)+'</p></div>'; };
    var tool = ({'Zoom':'Zoom','Google Meet':'Meet','Microsoft Teams':'Teams'})[it.via] || it.via;
    if (it.type==='meeting' && it.extracted===false) body = panel('Nothing extracted', 'Neuma only extracts from the 10 latest meetings in this Context.');
    else if (it.type==='meeting' && it.status==='Reading') body = panel('Waiting on '+tool, 'The transcript hasn’t arrived yet. Neuma extracts it as soon as it does, usually within a few minutes of the meeting ending.');
    else if (it.type==='meeting' && it.status==='No transcript') body = panel('No transcript', tool+' didn’t record a transcript for this meeting. Turn on transcription in '+tool+' to capture future meetings.');
    else if (it.type==='meeting' && it.status==='Invite') body = panel('Host not on Neuma', it.host+' hosts this meeting and isn’t on Neuma. The transcript comes in when they join.').replace('</p></div>', '</p><div class="mt-3" data-src-inv><button type="button" class="btn-out" style="padding:3px 12px;font-size:12.5px" onclick="this.parentNode.innerHTML=\'<span class=&quot;text-[12.5px] text-slate-500&quot;>Invited · <button type=&quot;button&quot; class=&quot;font-medium text-slate-700 hover:text-slate-900&quot; onclick=&quot;this.textContent=\\\'Sent again\\\';this.disabled=true&quot;>Resend</button></span>\'">Invite '+esc(it.host)+'</button></div></div>');
    else if (it.type==='meeting') body = (stNote ? '<div class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[12.5px] text-slate-600">'+esc(stNote)+'</div>' : '') + (it.nodate ? '<div class="rounded-lg border border-amber-200 bg-amber-50/60 px-3 py-2.5 flex items-center gap-2"><span class="flex-1 text-[12.5px] text-amber-800">No meeting date in <span class="font-mono text-[11.5px]">'+esc(it.file)+'</span>. Add it so this meeting sorts and filters correctly.</span><input type="date" class="border border-amber-200 rounded-md px-2 py-1 text-[12px] bg-white"></div>' : '') + ''/* no per-meeting summary or topics in the drawer */+found;
    else if (it.type==='email') body = found + '<div class="pt-4 border-t border-slate-100 divide-y divide-slate-100">'+it.msgs.map(function(m){ return '<div class="py-3"><div class="flex items-baseline gap-2 text-[12.5px]"><span class="font-medium text-slate-900">'+esc(m[0])+'</span><span class="text-slate-400">to '+esc(m[1])+'</span><span class="ml-auto text-slate-400 whitespace-nowrap">'+esc(m[2])+'</span></div><p class="mt-1 text-[13px] leading-[1.6] text-slate-700">'+esc(m[3])+'</p></div>'; }).join('')+'</div>';
    else if (it.type==='slack') body = found + '<div class="pt-4 border-t border-slate-100 divide-y divide-slate-100">'+it.msgs.map(function(m){ return '<div class="py-2.5"><div class="flex items-baseline gap-2 text-[12.5px]"><span class="font-medium text-slate-900">'+esc(m[0])+'</span><span class="ml-auto text-slate-400">'+esc(m[1])+'</span></div><p class="mt-0.5 text-[13px] text-slate-700">'+esc(m[2])+'</p></div>'; }).join('')+'</div>';
    else body = '<p class="text-[13.5px] leading-[1.6] text-slate-700">'+esc(it.desc)+'</p>'+found;
    var open = it.type==='meeting' ? (it.via==='Upload' ? '<a class="text-brand-600 font-medium cursor-pointer">Open file ↗</a>' : '<a class="text-brand-600 font-medium cursor-pointer">Open in '+esc(it.via)+' ↗</a>') : it.type==='email' ? '<a class="text-brand-600 font-medium cursor-pointer">Open in Gmail ↗</a>' : it.type==='slack' ? '<a class="text-brand-600 font-medium cursor-pointer">Open in Slack ↗</a>' : '<a class="text-brand-600 font-medium cursor-pointer">Open file ↗</a>';
    // Viewer with Full sources off: what Neuma pulled stays, the source itself is locked.
    var viewer = !!window.__srcViewer, locked = viewer && !window.__srcOn;
    if (locked) {
      var LK = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
      var what = it.type==='meeting' ? 'read the full transcript' : it.type==='email' ? 'read the full thread' : it.type==='slack' ? 'read the messages' : 'open the file';
      if (it.type==='email' || it.type==='slack') body = found;
      // A meeting from Zoom, Meet or Teams opens in that tool, which decides who can read it. Everything else is locked here.
      if (!(it.type==='meeting' && it.via!=='Upload')) open = '<span class="inline-flex items-center gap-1.5 text-slate-500">'+LK+'Only the Owner can '+(it.type==='meeting' ? 'open the file' : what)+'</span>';
    }
    return '<div class="bg-white">'+head+'<div class="px-6 py-5 space-y-5 overflow-y-auto" style="max-height:calc(100vh - 260px)">'+body+'</div><div class="px-6 py-3 border-t border-slate-100 flex items-center gap-2 text-[12px]">'+open+(viewer?'':'<button type="button" data-src-remove="'+v+'|'+i+'" class="ml-auto text-slate-500 hover:text-rose-600">Remove from Context</button>')+'</div></div>';
  }

  // Remove from Context: confirm with the effect, then remove with Undo
  function xs(n,w){ return n+' '+w+(n===1?'':'s'); }
  document.addEventListener('click', function(e){
    var b = e.target.closest('[data-src-remove]');
    if (b) { e.stopPropagation();
      var p = b.getAttribute('data-src-remove').split('|'), v = p[0], i = +p[1], it = SRC[v][i], o = srcItems(v, it);
      var nI = (o.issue||[]).length, nA = (o.action||[]).length, nD = (o.decision||[]).length, parts = [];
      if (nI) parts.push(xs(nI,'issue')); if (nA) parts.push(xs(nA,'action')); if (nD) parts.push(xs(nD,'decision'));
      var list = parts.length>1 ? parts.slice(0,-1).join(', ')+' and '+parts[parts.length-1] : parts[0];
      var what = parts.length ? list+' came from this meeting. Any also raised in another meeting stay. The rest are removed.' : 'Nothing was extracted from this meeting, so no issues, actions or decisions change.';
      var aside = b.closest('aside'), old = aside.querySelector('[data-src-confirm]'); if (old) old.remove();
      aside.insertAdjacentHTML('beforeend', '<div data-src-confirm class="absolute inset-0 z-40 flex items-center justify-center px-6" style="background:rgba(15,23,42,.25)"><div class="w-full max-w-[400px] rounded-xl bg-white border border-slate-200 shadow-card p-5 text-left"><div class="text-[15px] font-semibold text-slate-900">Remove '+esc(it.t)+' ('+esc(relDate(it))+') from this Context?</div><p class="mt-2 text-[13px] leading-[1.55] text-slate-600">'+what+' Everyone with access is told. The meeting stays in '+esc(it.via)+'.</p><div class="mt-5 flex justify-end gap-2"><button type="button" data-src-rcancel class="btn-out">Cancel</button><button type="button" data-src-rok="'+v+'|'+i+'" class="btn-out" style="background:#e11d48;color:#fff;border-color:#e11d48">Remove</button></div></div></div>');
      return; }
    if (e.target.closest('[data-src-rcancel]')) { e.stopPropagation(); e.target.closest('[data-src-confirm]').remove(); return; }
    var ok = e.target.closest('[data-src-rok]');
    if (ok) { e.stopPropagation();
      var q = ok.getAttribute('data-src-rok').split('|'), dr = ok.closest('[data-zldrawer]');
      ok.closest('[data-src-confirm]').remove();
      if (typeof closeDrawer === 'function') closeDrawer(dr); else dr.classList.add('hidden');
      var pane = dr.closest('[data-cx-variant]').querySelector('[data-sources="'+q[0]+'"]'), tr = pane && pane.querySelector('tr[data-src="'+q[1]+'"]');
      if (tr) tr.style.display = 'none';
      var t = document.createElement('div');
      t.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-900 text-white text-[12.5px] shadow-lg';
      t.innerHTML = '<span>Removed from this Context. Summary and patterns are updating.</span><button type="button" class="font-semibold underline">Undo</button>';
      document.body.appendChild(t);
      t.querySelector('button').addEventListener('click', function(){ if (tr) tr.style.display = ''; t.remove(); });
      setTimeout(function(){ if (t.parentNode) t.remove(); }, 6000);
      return; }
  }, true);
  window.__srcRefresh = function(){
    var locked = !!window.__srcViewer && !window.__srcOn;
    document.querySelectorAll('#context-summary [data-sources]').forEach(function(el){
      var n = el.querySelector('[data-src-lock]');
      if (!n) { el.insertAdjacentHTML('afterbegin', '<div data-src-lock class="hidden mb-3 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 flex items-center gap-2 text-[12.5px] text-slate-600"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 shrink-0"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg><span>Full sources are off for this Context. Ask Jared K. to turn them on.</span></div>'); n = el.querySelector('[data-src-lock]'); }
      n.classList.toggle('hidden', !locked);
    });
    document.querySelectorAll('#context-summary [data-zldrawer]:not(.hidden)').forEach(function(d){ if (!d.querySelector('[data-sh-box]')) closeDrawer(d); });
  };
  document.addEventListener('change', function(e){ if (e.target.matches && e.target.matches('[data-demo-viewer]')) { window.__srcViewer = e.target.checked; var pn = document.querySelector('#context-summary [data-mb-panel]'); if (pn) pn.classList.toggle('is-viewer', e.target.checked); window.__srcRefresh(); } });
  root && root.addEventListener('click', function(e){
    var tr = e.target.closest('tr[data-src]');
    if (tr) { var pane = tr.closest('[data-sources]'); openDrawer(tr.closest('[data-cx-variant]'), srcDetail(pane.getAttribute('data-sources'), +tr.getAttribute('data-src'))); return; }

  });
  function closeDrawer(d){ d.classList.add('hidden'); var v = d.closest('[data-cx-variant]'); v.querySelectorAll('.zl-sel').forEach(function(r){ r.classList.remove('zl-sel'); }); }
  document.addEventListener('keydown', function(e){ if (e.key==='Escape') document.querySelectorAll(':is(#context-summary,#cx-graveyard) [data-zldrawer]:not(.hidden)').forEach(closeDrawer); });
  root && root.addEventListener('click', function(e){ var c = e.target.closest('[data-zlclose]'); if (c) closeDrawer(c.closest('[data-zldrawer]')); });
  root && root.addEventListener('click', function(e){ var t = e.target.closest('[data-mb-tab]'); if (t) { var v = t.closest('[data-cx-variant]'); var d = v && v.querySelector('[data-zldrawer]'); if (d && !d.classList.contains('hidden') && !t.hasAttribute('data-zlkeep')) closeDrawer(d); } }, true);

  root && root.addEventListener('click', function(e){
    var t = e.target.closest('button, [data-zlrow], label, input'); if(!t) return;
    if (t.tagName==='LABEL' || t.tagName==='INPUT') return;
    var r = t.closest('[data-zlrow]');
    if (t.hasAttribute('data-zlfbtn')) { e.stopPropagation(); t.closest('[data-zlfilt]').querySelector('[data-zlsmenu]').classList.add('hidden'); t.parentNode.querySelector('[data-zlfmenu]').classList.toggle('hidden'); return; }
    if (t.hasAttribute('data-zlsbtn')) { e.stopPropagation(); t.closest('[data-zlfilt]').querySelector('[data-zlfmenu]').classList.add('hidden'); t.parentNode.querySelector('[data-zlsmenu]').classList.toggle('hidden'); return; }
    if (t.hasAttribute('data-zlchip')) { var cd = t.closest('[data-zlcard]'), key = t.getAttribute('data-zlchip'), inp = cd.querySelector('[data-zlfmenu] input[data-zlfk="'+key+'"][value="'+t.getAttribute('data-zlv')+'"]'); if (inp && inp.type==='radio') cd.querySelector('[data-zlfmenu] input[data-zlfk="'+key+'"]').checked = true; else if (inp) inp.checked = false; applyFilter(cd); return; }
    if (t.hasAttribute('data-zlclosedhint')) { var cd2 = t.closest('[data-zlcard]'); cd2.querySelector('[data-zlfmenu] input[data-zlfk="status"][value="all"]').checked = true; applyFilter(cd2); return; }
    if (t.hasAttribute('data-zltick')) { if (r) r.classList.toggle('is-done'); return; }
    if (t.hasAttribute('data-zlx')) { r.classList.add('is-gone'); return; }
    if (t.hasAttribute('data-zlundo')) { r.classList.remove('is-gone'); return; }
    if (t.hasAttribute('data-zldone')) { var dr = t.closest('[data-zldrawer]'), list = dr.closest('[data-cx-variant]').querySelector('[data-zl="'+dr.getAttribute('data-list')+'"]'), sel = list.querySelector('.zl-sel'); if (sel) { var d = sel.classList.toggle('is-done'); t.textContent = d ? 'Undo' : (list.getAttribute('data-zl').indexOf('issue')>0 ? 'Mark resolved' : 'Mark complete'); } return; }
    if (t.hasAttribute('data-zlgo')) {
      var variant = t.closest('[data-cx-variant]'), kind = t.getAttribute('data-zlgo'), gi = +t.getAttribute('data-zlgoi');
      var tab = variant.querySelector('[data-mb-tab="'+PANE[kind]+'"]'); if (tab) { tab.setAttribute('data-zlkeep',''); tab.click(); tab.removeAttribute('data-zlkeep'); }
      var list = variant.querySelector('[data-mb-pane="'+PANE[kind]+'"] [data-zl]'); select(list, gi);
      var row = list.querySelector('[data-zlrow][data-i="'+gi+'"]'); if (row) row.scrollIntoView({block:'nearest'});
      return;
    }
    if (t.hasAttribute('data-zlrow') && !e.target.closest('button')) { select(t.closest('[data-zl]'), +t.getAttribute('data-i')); }
  });
})();
} catch (e) { console.warn("neuma.js block 22", e); }

try {
CXROOT.addEventListener('click', function(e){
  if (e.target.closest('button, a')) return;
  var r = e.target.closest('[data-mb-pane="summary"] [data-mb-row]'); if (r) r.classList.toggle('open');
});
} catch (e) { console.warn("neuma.js block 23", e); }

try {
// 3 · Owner card replaces the Viewing as toggle. Share › Preview what members see.
(function(){
  var root = CXROOT; if(!root) return;
  root.addEventListener('click', function(e){
    var t = e.target.closest('button'); if(!t) return;
    if (t.hasAttribute('data-share')) { e.stopPropagation(); root.querySelectorAll('[data-moremenu]').forEach(function(m){ m.classList.add('hidden'); }); t.parentNode.querySelector('[data-sharemenu]').classList.toggle('hidden'); return; }
    if (t.hasAttribute('data-ownx')) { t.closest('.group').remove(); return; }
    var v = t.closest('[data-cx-variant]');
    if (t.hasAttribute('data-preview')) {
      t.closest('[data-sharemenu]').classList.add('hidden');
      v.classList.remove('is-host');
      if (!v.querySelector('[data-previewbar]')) v.insertAdjacentHTML('afterbegin','<div data-previewbar class="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0b0e2e] text-white text-[12px] shadow-lg">Previewing what members see<button type="button" class="font-semibold underline" data-exitpreview>Exit</button></div>');
      return;
    }
    if (t.hasAttribute('data-exitpreview')) { v.classList.add('is-host'); t.closest('[data-previewbar]').remove(); return; }
  });
  document.addEventListener('click', function(e){ if (!e.target.closest('[data-sharewrap]')) root.querySelectorAll('[data-sharemenu]').forEach(function(m){ m.classList.add('hidden'); }); });
})();
} catch (e) { console.warn("neuma.js block 24", e); }

try {
CXROOT.addEventListener('click', function(e){
  var b = e.target.closest('[data-showmore]'); if(!b) return;
  var card = b.closest('.rounded-xl'); var open = card.classList.toggle('show-all');
  card.querySelectorAll('[data-extra]').forEach(function(r){ r.classList.toggle('hidden', !open); if (r.hasAttribute('data-mb-row')) r.classList.toggle('flex', open); });
  if (!b.dataset.n) b.dataset.n = b.textContent; b.textContent = open ? 'Show less' : b.dataset.n;
});
} catch (e) { console.warn("neuma.js block 25", e); }

try {
(function(){ var root=CXROOT; if(!root) return;
  root.addEventListener('click', function(e){ var t=e.target.closest('[data-more]'); if(t){ e.stopPropagation(); root.querySelectorAll('[data-sharemenu]').forEach(function(m){ m.classList.add('hidden'); }); t.parentNode.querySelector('[data-moremenu]').classList.toggle('hidden'); } else if (e.target.closest('[data-moremenu] [data-mb-tab]')) { e.target.closest('[data-moremenu]').classList.add('hidden'); } });
  document.addEventListener('click', function(e){ if(!e.target.closest('[data-morewrap]')) root.querySelectorAll('[data-moremenu]').forEach(function(m){ m.classList.add('hidden'); }); });
})();
} catch (e) { console.warn("neuma.js block 26", e); }

try {
(function(){
  var root = CXROOT; if (!root) return;
  var UNDO_MS = 5000;
  var REASONS = {completed:'Completed', outdated:'No longer relevant', irrelevant:'Not relevant', wrong:'Wrong', obvious:'Obvious', untrue:'No longer true', minor:'Not important', nokind:'Don\u2019t show patterns like this'};
  var BYKIND = {issue:['irrelevant','wrong'], action:['completed','irrelevant','outdated','wrong'], decision:['irrelevant','wrong'], pattern:['obvious','untrue','minor','wrong','nokind']};
  function rowFor(btn){
    if (btn.hasAttribute('data-zlx')) { var r = btn.closest('[data-zlrow]'); var k = (r.closest('[data-zl]')||{getAttribute:function(){return 'v0-issue';}}).getAttribute('data-zl').split('-')[1]; return [r, k]; }
    if (btn.hasAttribute('data-obsx')) return [btn.closest('.zl-obs'), 'pattern'];
    return [btn.closest('.group'), 'pattern'];
  }
  function closeMenus(){ document.querySelectorAll('.dz-menu').forEach(function(m){ m.remove(); }); }
  function arm(it, ms){ clearTimeout(it._dzT); it._dzS = Date.now(); it._dzL = ms; it._dzT = setTimeout(function(){ it.classList.add('dz-gone'); }, ms); }
  function dismiss(it, reason){
    if (it.classList.contains('dz-dismissing')) return;
    it.classList.add('dz-dismissing');
    var strip = document.createElement('div'); strip.className = 'dz-undo';
    strip.innerHTML = '<span>Dismissed · <span class="text-slate-500">'+REASONS[reason]+'</span></span><button type="button" class="dz-undo-btn" data-dzundo>Undo</button><i class="dz-undo-bar" style="animation-duration:'+UNDO_MS+'ms"></i>';
    strip.addEventListener('mouseenter', function(){ clearTimeout(it._dzT); it._dzL = Math.max(600, it._dzL-(Date.now()-it._dzS)); strip.classList.add('paused'); });
    strip.addEventListener('mouseleave', function(){ strip.classList.remove('paused'); arm(it, it._dzL); });
    it.appendChild(strip); arm(it, UNDO_MS);
  }
  function undo(it){ clearTimeout(it._dzT); it.classList.remove('dz-dismissing'); var s = it.querySelector(':scope > .dz-undo'); if (s) s.remove(); }
  function openMenu(btn){
    closeMenus();
    var rk = rowFor(btn), it = rk[0], kind = rk[1]; if (!it) return;
    var m = document.createElement('div'); m.className = 'dz-menu';
    m.innerHTML = '<div class="dz-menu-h">Why dismiss this?</div>' + (BYKIND[kind]||BYKIND.issue).map(function(id){ return '<button type="button" data-dzreason="'+id+'">'+REASONS[id]+'</button>'; }).join('');
    m._row = it; document.body.appendChild(m);
    var br = btn.getBoundingClientRect(), mh = m.offsetHeight, mw = m.offsetWidth;
    var top = br.bottom + 4; if (top + mh > window.innerHeight) top = br.top - mh - 4;
    m.style.top = Math.max(4, top)+'px'; m.style.left = Math.max(4, br.right - mw)+'px';
  }
  root.addEventListener('click', function(e){
    var x = e.target.closest('[data-zlx],[data-obsx],[data-ownx]');
    if (x) { e.preventDefault(); e.stopImmediatePropagation(); openMenu(x); return; }
    var u = e.target.closest('[data-dzundo]');
    if (u) { e.stopImmediatePropagation(); undo(u.closest('.dz-dismissing')); return; }
  }, true);
  document.addEventListener('click', function(e){
    var r = e.target.closest('.dz-menu [data-dzreason]');
    if (r) { var m = r.closest('.dz-menu'); dismiss(m._row, r.getAttribute('data-dzreason')); closeMenus(); return; }
    if (!e.target.closest('.dz-menu')) closeMenus();
  });
  document.addEventListener('keydown', function(e){ if (e.key==='Escape') closeMenus(); });
  window.addEventListener('scroll', closeMenus, {passive:true});
})();
} catch (e) { console.warn("neuma.js block 27", e); }

try {
// 3 · Add source menu and drawers (from the original 3.1)
(function(){
  var root = document.querySelector('#context-summary [data-cx-variant="a"]'); if (!root) return;
  var wrap = root.querySelector('[data-as-wrap]'), btn = wrap.querySelector('[data-as-btn]'), menu = wrap.querySelector('[data-as-menu]');
  var ov = root.querySelector('[data-dd-overlay]'), dr = root.querySelector('[data-dd-drawer]');
  var views = [].slice.call(dr.querySelectorAll('[data-dd-view]'));
  var toast = root.querySelector('[data-dd-toast]'), ttext = root.querySelector('[data-dd-toast-text]'), tundo = root.querySelector('[data-dd-toast-undo]'), tt = null;
  function say(msg){ ttext.textContent = msg; tundo.classList.add('hidden'); toast.classList.remove('hidden'); clearTimeout(tt); tt = setTimeout(function(){ toast.classList.add('hidden'); }, 3200); }
  function closeMenu(){ menu.classList.add('hidden'); btn.setAttribute('aria-expanded','false'); }
  function closeAll(){ closeMenu(); ov.classList.add('hidden'); dr.classList.add('hidden'); }
  function openView(n){ closeAll(); views.forEach(function(v){ v.classList.toggle('hidden', v.getAttribute('data-dd-view') !== n); }); ov.classList.remove('hidden'); dr.classList.remove('hidden'); }
  btn.addEventListener('click', function(e){ e.stopPropagation(); var open = menu.classList.contains('hidden'); closeMenu(); if (open) { menu.classList.remove('hidden'); btn.setAttribute('aria-expanded','true'); } });
  document.addEventListener('click', function(e){ if (!wrap.contains(e.target)) closeMenu(); });
  menu.querySelectorAll('[data-dd-open]').forEach(function(b){ b.addEventListener('click', function(e){ e.stopPropagation(); openView(b.getAttribute('data-dd-open')); }); });
  dr.querySelectorAll('[data-dd-go]').forEach(function(b){ b.addEventListener('click', function(e){ e.stopPropagation(); var g = b.getAttribute('data-dd-go'); views.forEach(function(v){ v.classList.toggle('hidden', v.getAttribute('data-dd-view') !== g); }); }); });
  dr.querySelectorAll('[data-dd-back]').forEach(function(b){ b.addEventListener('click', function(e){ e.stopPropagation(); closeAll(); }); });
  ov.addEventListener('click', closeAll);
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeAll(); });
  var MSG = {manual:'Added to Founder conversations', channels:'2 channels added to Founder conversations', account:'Linked to the Salesforce account', meet:'Recurring meetings saved', rule:'Rules saved · 11 sources matched', upload:'Added to Founder conversations'};
  dr.querySelectorAll('[data-dd-commit]').forEach(function(b){ b.addEventListener('click', function(e){ e.stopPropagation(); if (b.disabled) return; closeAll(); say(MSG[b.getAttribute('data-dd-commit')] || 'Saved'); }); });
  var mtabs = [].slice.call(dr.querySelectorAll('[data-dd-view="meet"] [data-dd-tab]'));
  mtabs.forEach(function(t){ t.addEventListener('click', function(){ mtabs.forEach(function(x){ x.className = 'px-3 py-1 rounded font-medium text-slate-500'; }); t.className = 'px-3 py-1 rounded font-medium bg-white text-slate-900 shadow-sm'; dr.querySelectorAll('[data-dd-view="meet"] [data-dd-group]').forEach(function(g){ g.classList.toggle('hidden', g.getAttribute('data-dd-group') !== t.getAttribute('data-dd-tab')); }); var ir = dr.querySelector('[data-dd-view="meet"] [data-dd-importrow]'); if (ir) ir.classList.toggle('hidden', t.getAttribute('data-dd-tab') === 'linked'); }); });
  var mvw = dr.querySelector('[data-dd-view="meet"]');
  if (mvw) { var boxes = [].slice.call(mvw.querySelectorAll('input[type=checkbox]')).filter(function(c){ return c.closest('label') && c.closest('label').querySelector('.truncate'); }); var init = boxes.map(function(c){ return c.checked; }); var sum = mvw.querySelector('[data-dd-meetsum]');
    boxes.forEach(function(c){ c.addEventListener('change', function(){ var add = 0, rm = 0; boxes.forEach(function(x,k){ if (x.checked && !init[k]) add++; if (!x.checked && init[k]) rm++; }); var linked = init.filter(Boolean).length; var h = '<span class="num font-mono font-semibold text-slate-700">'+linked+'</span> linked'; if (!add && !rm) h += ' · no changes'; if (add) h += ' · <span class="text-emerald-700 font-medium">+'+add+' to link</span>'; if (rm) h += ' · <span class="text-rose-600 font-medium">−'+rm+' to unlink</span>'; if (sum) sum.innerHTML = h; }); }); }
  var rv = dr.querySelector('[data-dd-view="rules_cfg"]');
  if (rv) { var rb = [].slice.call(rv.querySelectorAll('.inline-flex.rounded-md.bg-slate-100.p-0\\.5 > button'));
    rb.forEach(function(b){ b.addEventListener('click', function(){ rb.forEach(function(x){ x.className = 'px-3 py-0.5 rounded text-[12px] font-medium text-slate-500'; }); b.className = 'px-3 py-0.5 rounded text-[12px] font-medium bg-white text-slate-900 shadow-sm'; var all = b.textContent.trim() === 'all'; rv.querySelectorAll('span.w-6').forEach(function(x){ x.textContent = all ? 'And' : 'Or'; }); var f = rv.querySelector('.num'); if (f) f.textContent = all ? '6' : '11'; }); }); }
})();
} catch (e) { console.warn("neuma.js block 28", e); }

try {
// 3 · Email in + Upload file drawers
(function(){
  var root = document.querySelector('#context-summary [data-cx-variant="a"]'); if (!root) return;
  var dr = root.querySelector('[data-dd-drawer]'); if (!dr) return;
  var cp = dr.querySelector('[data-em-copy]');
  if (cp) cp.addEventListener('click', function(){ var t = dr.querySelector('[data-em-addr]').textContent; try { navigator.clipboard.writeText(t); } catch(e) {} var l = cp.querySelector('span'); l.textContent = 'Copied'; setTimeout(function(){ l.textContent = 'Copy'; }, 1600); });
  var v = dr.querySelector('[data-dd-view="upload"]');
  var list = v.querySelector('[data-up-list]'), need = v.querySelector('[data-up-need]'), go = v.querySelector('[data-up-go]'), commit = v.querySelector('[data-up-commit]'), sum = v.querySelector('[data-up-sum]'), inp = v.querySelector('[data-up-input]');
  var back = v.querySelector('[data-up-backstep]'), title = v.querySelector('[data-up-title]'), sub = v.querySelector('[data-up-sub]');
  var MON = {jan:'01',feb:'02',mar:'03',apr:'04',may:'05',jun:'06',jul:'07',aug:'08',sep:'09',oct:'10',nov:'11',dec:'12'};
  function sniff(name){ var m = name.match(/(20\d\d)[-_.](\d\d)[-_.](\d\d)/); if (m) return m[1]+'-'+m[2]+'-'+m[3]; m = name.match(/(\d{1,2})[ _-]?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[ _-]?(20\d\d)?/i); if (m) return (m[3]||'2026')+'-'+MON[m[2].toLowerCase()]+'-'+('0'+m[1]).slice(-2); return ''; }
  function nice(d){ if (!d) return ''; var p = d.split('-'); return (+p[2]) + ' ' + ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+p[1]-1] + (p[0] !== '2026' ? ' ' + p[0] : ''); }
  var files = [{n:'Founders sync Oct 29.vtt', s:'46 KB', d:sniff('Founders sync Oct 29.vtt'), auto:true}, {n:'Pricing call notes.docx', s:'84 KB', d:'', auto:false}];
  var step = 1;
  function esc(x){ return String(x).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  var ICON = '<div class="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center text-slate-500 shrink-0"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>';
  function render(){
    var missing = files.filter(function(f){ return !f.auto; });
    list.innerHTML = files.length ? files.map(function(f,i){ return '<div class="flex items-center gap-3 px-3.5 py-2.5">'+ICON+'<div class="flex-1 min-w-0"><div class="text-[13px] text-slate-900 truncate">'+esc(f.n)+'</div><div class="text-[11.5px] text-slate-400">'+esc(f.s)+'</div></div><span class="text-[12px] '+(f.auto?'text-slate-600':'text-amber-700')+' whitespace-nowrap">'+(f.auto?nice(f.d)+' <span class="text-slate-400">· from file</span>':'No date found')+'</span><button type="button" data-up-rm="'+i+'" class="w-6 h-6 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100" aria-label="Remove">×</button></div>'; }).join('') : '<div class="px-3.5 py-3 text-[12.5px] text-slate-400">No files yet.</div>';
    need.innerHTML = missing.map(function(f){ var i = files.indexOf(f); return '<div class="flex items-center gap-3 px-3.5 py-2.5">'+ICON+'<div class="flex-1 min-w-0"><div class="text-[13px] text-slate-900 truncate">'+esc(f.n)+'</div><div class="text-[11.5px] text-slate-400">'+esc(f.s)+'</div></div><input type="date" data-up-date="'+i+'" value="'+f.d+'" max="2026-11-02" class="px-2 py-1 rounded-md border text-[12.5px] '+(f.d?'border-slate-300 text-slate-800':'border-amber-300 text-slate-500')+'"></div>'; }).join('');
    v.querySelector('[data-up-step="1"]').classList.toggle('hidden', step !== 1);
    v.querySelector('[data-up-step="2"]').classList.toggle('hidden', step !== 2);
    back.classList.toggle('hidden', step !== 2);
    title.textContent = step === 2 ? 'Add dates' : 'Upload files';
    sub.textContent = step === 2 ? 'Step 2 of 2 · ' + missing.length + (missing.length === 1 ? ' file needs' : ' files need') + ' a date.' : 'Transcripts, notes and docs. Neuma reads the date from each file.';
    var label = files.length > 1 ? 'Add ' + files.length + ' sources' : 'Add source';
    var undated = missing.filter(function(f){ return !f.d; }).length;
    if (step === 1) {
      var needNext = missing.length > 0;
      go.classList.toggle('hidden', !needNext); commit.classList.toggle('hidden', needNext);
      go.textContent = 'Next'; commit.textContent = label;
      var ok = files.length > 0; [go, commit].forEach(function(b){ b.disabled = !ok; b.style.opacity = ok ? '1' : '.45'; b.style.cursor = ok ? '' : 'not-allowed'; });
      sum.textContent = !files.length ? '' : missing.length ? missing.length + ' without a date · add next' : files.length + ' dated';
    } else {
      go.classList.add('hidden'); commit.classList.remove('hidden'); commit.textContent = label;
      var ok2 = !undated; commit.disabled = !ok2; commit.style.opacity = ok2 ? '1' : '.45'; commit.style.cursor = ok2 ? '' : 'not-allowed';
      sum.textContent = undated ? undated + ' still missing a date' : 'All dated';
    }
  }
  need.addEventListener('change', function(e){ var t = e.target.closest('[data-up-date]'); if (!t) return; files[+t.getAttribute('data-up-date')].d = t.value; render(); });
  need.addEventListener('input', function(e){ var t = e.target.closest('[data-up-date]'); if (!t) return; files[+t.getAttribute('data-up-date')].d = t.value; var u = files.filter(function(f){ return !f.auto && !f.d; }).length; commit.disabled = !!u; commit.style.opacity = u ? '.45' : '1'; sum.textContent = u ? u + ' still missing a date' : 'All dated'; });
  list.addEventListener('click', function(e){ var t = e.target.closest('[data-up-rm]'); if (!t) return; e.stopPropagation(); files.splice(+t.getAttribute('data-up-rm'), 1); render(); });
  if (inp) inp.addEventListener('change', function(){ [].forEach.call(inp.files, function(f){ if (!/\.(vtt|txt|pdf|docx)$/i.test(f.name)) return; var d = sniff(f.name); files.push({n:f.name, s:Math.max(1, Math.round(f.size/1024)) + ' KB', d:d, auto:!!d}); }); inp.value = ''; render(); });
  go.addEventListener('click', function(e){ e.stopPropagation(); if (go.disabled) return; step = 2; render(); });
  back.addEventListener('click', function(e){ e.stopPropagation(); step = 1; render(); });
  commit.addEventListener('click', function(){ setTimeout(function(){ step = 1; render(); }, 0); });
  root.querySelectorAll('[data-dd-open="upload"]').forEach(function(b){ b.addEventListener('click', function(){ step = 1; render(); }); });
  render();
})();
} catch (e) { console.warn("neuma.js block 29", e); }

try {
// 5.3 · Meet, Teams and Standalone load the 5.2 Zoom panel itself
(function(){
  var src = document.querySelector('#zoom-app [data-zv-pane="founders"] iframe'); if (!src) return;
  var doc = src.getAttribute('srcdoc'); if (!doc) return;
  var BASE = 'html,body{height:100%!important;margin:0;overflow:hidden!important;background:#f6f7f9!important}'
    + 'main{padding:0!important;height:100%}'
    + '#zoom-app{padding:0!important;margin:0!important;max-width:none!important;height:100%}'
    + '#zoom-app > *{display:none!important}'
    + '#zoom-app > .shadow-card{display:block!important;height:100%;border:0!important;border-radius:0!important;box-shadow:none!important;background:#f6f7f9!important}'
    + '#zoom-app > .shadow-card > .h-9{display:none!important}'
    + '#zoom-app > .shadow-card > .flex{height:100%!important}'
    + '#zoom-app > .shadow-card > .flex > :not(aside){display:none!important}'
    + '#zoom-app > .shadow-card > .flex > aside{width:100%!important;border-left:0!important}'
    + '#zoom-app aside [data-zp-appbar]{display:none!important}';
  var HOST = '#zoom-app aside .nm-wordmark{display:none!important}'
    + '#zoom-app aside [data-zp-appbar]{display:none!important}'
    + '#zoom-app aside .nm-wordmark + button{margin-left:-6px!important;margin-right:auto!important}';
  document.querySelectorAll('#meeting-brief [data-zp-embed]').forEach(function(f){
    var css = BASE + (f.getAttribute('data-zp-embed') === 'host' ? HOST : '');
    f.srcdoc = doc.replace('</head>', '<style>' + css + '</style></head>');
  });
})();
} catch (e) { console.warn("neuma.js block 30", e); }

try {
// 5.2 · open the Live variation from a link: #zoom-live
(function(){
  function go(){ if (location.hash !== '#zoom-live') return; var b = document.querySelector('#zoom-app [data-zv="live"]'); if (!b) return; b.click(); document.getElementById('zoom-app').scrollIntoView(); }
  window.addEventListener('hashchange', go); go();
})();
} catch (e) { console.warn("neuma.js block 31", e); }
