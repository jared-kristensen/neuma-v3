# Personal connections on a company integration row (Granola example).
# Applied by build_integrations.py after the page is built, and directly to integrations.html.
# The row shows a count. The panel lists who connected, with Remove. Nothing else.
ROW_OLD = '<div class="text-[12px] text-slate-500 mt-0.5 truncate">Transcripts from Granola.</div></div><div class="flex items-center gap-3 shrink-0"><a href="#" class="btn-out inline-flex items-center justify-center" style="padding:3px 12px;font-size:12.5px;min-width:78px">Connect</a>'
ROW_NEW = '<div class="text-[12px] text-slate-500 mt-0.5 truncate">Transcripts from Granola.</div></div><div class="flex items-center gap-3 shrink-0"><button type="button" data-pc-open class="text-[12.5px] text-slate-500 hover:text-slate-900 hover:underline underline-offset-2 whitespace-nowrap">3 people connected their own</button><a href="#" class="btn-out inline-flex items-center justify-center" style="padding:3px 12px;font-size:12.5px;min-width:78px">Connect</a>'

def _p(ini, grad, name, first, date):
    return ('<div data-pc-row data-pc-first="%s"><div class="flex items-center gap-3 px-4 py-2.5"><div class="w-7 h-7 rounded-full bg-gradient-to-br %s flex items-center justify-center text-white text-[10.5px] font-semibold shrink-0">%s</div>'
            '<div class="flex-1 min-w-0"><div class="text-[13px] font-medium text-slate-900 truncate">%s</div><div class="text-[12px] text-slate-500 truncate">Connected %s</div></div>'
            '<button type="button" data-pc-rm class="btn-out shrink-0" style="padding:3px 12px;font-size:12.5px">Remove</button></div>'
            '<div data-pc-cf class="hidden px-4 pb-3"><div class="rounded-lg bg-amber-50 ring-1 ring-inset ring-amber-200 px-3.5 py-2.5 flex items-center gap-3"><div class="flex-1 text-[12.5px] text-amber-900">Remove %s’s Granola connection? Meetings already in Contexts stay.</div>'
            '<button type="button" data-pc-no class="btn-out shrink-0" style="padding:3px 12px;font-size:12.5px">Cancel</button><button type="button" data-pc-yes class="btn-out shrink-0" style="padding:3px 12px;font-size:12.5px;background:#0f172a;color:#fff;border-color:#0f172a">Remove</button></div></div></div>') % (first, grad, ini, name, date, first)

TAIL = ('''
<!-- Personal connections on a company integration (Granola example) -->
<div id="pc-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center" style="background:rgba(15,23,42,.35)">
 <div class="w-[480px] rounded-xl bg-white" style="box-shadow:0 24px 60px -12px rgba(15,23,42,.35)">
  <div class="px-6 pt-5 pb-4 flex items-start gap-3 border-b border-slate-200">
   <span class="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-white ring-1 ring-inset ring-slate-200"><img src="assets/logos/granola.svg" alt="" class="w-5 h-5 object-contain"></span>
   <div class="flex-1 min-w-0"><div class="text-[15px] font-semibold text-slate-900">Granola</div>
   <div class="mt-0.5 text-[12.5px] text-slate-500">People who connected their own Granola.</div></div>
   <button type="button" data-pc-close aria-label="Close" class="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700">✕</button>
  </div>
  <div class="px-6 py-4">
   <div class="rounded-lg border border-slate-200 divide-y divide-slate-100" data-pc-list>'''
 + _p('PS', 'from-violet-400 to-indigo-500', 'Priya S.', 'Priya', 'Oct 28')
 + _p('TH', 'from-sky-400 to-blue-500', 'Tom H.', 'Tom', 'Nov 2')
 + _p('AP', 'from-rose-400 to-orange-400', 'Ana P.', 'Ana', 'Nov 6') + '''</div>
   <div data-pc-none class="hidden text-[13px] text-slate-500 py-2">Nobody has connected their own Granola.</div>
  </div>
  <div class="px-6 py-3.5 border-t border-slate-200 bg-slate-50/60 rounded-b-xl flex items-center justify-end">
   <button type="button" data-pc-close class="btn-out" style="padding:4px 14px;font-size:12.5px;background:#0f172a;color:#fff;border-color:#0f172a">Done</button>
  </div>
 </div>
</div>
<script>
(function(){
  var m = document.getElementById('pc-modal'); if (!m) return;
  function count(){
    var n = m.querySelectorAll('[data-pc-row]').length;
    document.querySelectorAll('[data-pc-open]').forEach(function(b){ b.textContent = n === 1 ? '1 person connected their own' : n + ' people connected their own'; b.classList.toggle('hidden', !n); });
    m.querySelector('[data-pc-list]').classList.toggle('hidden', !n); m.querySelector('[data-pc-none]').classList.toggle('hidden', !!n);
  }
  function shut(){ m.querySelectorAll('[data-pc-cf]').forEach(function(c){ c.classList.add('hidden'); }); }
  document.addEventListener('click', function(e){
    if (e.target.closest('[data-pc-open]')) { m.classList.remove('hidden'); return; }
    if (e.target === m || e.target.closest('[data-pc-close]')) { shut(); m.classList.add('hidden'); return; }
    var row = e.target.closest('[data-pc-row]'); if (!row) return;
    if (e.target.closest('[data-pc-rm]')) { shut(); row.querySelector('[data-pc-cf]').classList.remove('hidden'); return; }
    if (e.target.closest('[data-pc-no]')) { shut(); return; }
    if (e.target.closest('[data-pc-yes]')) { row.remove(); count(); }
  });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') { shut(); m.classList.add('hidden'); } });
})();
</script>
''')

def apply(page):
    assert page.count(ROW_OLD) == 1, page.count(ROW_OLD)
    assert page.count('</body>') == 1
    return page.replace(ROW_OLD, ROW_NEW).replace('</body>', TAIL + '</body>')
