#!/usr/bin/env python3
"""Save the current version of a screen before editing it.

    python3 tools/snapshot.py feed        -> versions/feed/feed-v002.html
    python3 tools/snapshot.py all         -> one new version of every screen

Copies <screen>.html into versions/<screen>/ with the next number, and fixes
its links so the copy still opens correctly from inside the versions folder.
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCREENS = ['feed', 'contexts', 'context', 'rollup', 'meeting-brief', 'slack', 'claude', 'integrations', 'settings', 'onboarding', 'decisions', 'graveyard']

def snapshot(name):
    src = os.path.join(ROOT, name + '.html')
    if not os.path.exists(src):
        sys.exit('No such screen: %s.html' % name)
    folder = os.path.join(ROOT, 'versions', name)
    os.makedirs(folder, exist_ok=True)
    nums = [int(m.group(1)) for f in os.listdir(folder) for m in [re.match(name + r'-v(\d+)\.html$', f)] if m]
    n = max(nums, default=0) + 1
    html = open(src, encoding='utf-8').read()
    # the copy lives two folders down, so point shared files and screen links back up
    html = html.replace('src="shared/', 'src="../../shared/').replace('href="shared/', 'href="../../shared/')
    pages = '|'.join(re.escape(s) for s in SCREENS + ['index'])
    html = re.sub(r'href="((?:%s)\.html)' % pages, r'href="../../\1', html)
    dst = os.path.join(folder, '%s-v%03d.html' % (name, n))
    open(dst, 'w', encoding='utf-8').write(html)
    print('Saved', os.path.relpath(dst, ROOT))

if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    for s in (SCREENS if sys.argv[1] == 'all' else [sys.argv[1]]):
        snapshot(s)
