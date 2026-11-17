
// ── Screen 2 + 4 · Roll ups (v153) ──
(function(){
  var OWN = { JK:['Jared K.','from-amber-400 to-pink-500'], SM:['Sarah M.','from-emerald-400 to-teal-500'], DK:['Daniel K.','from-sky-400 to-indigo-500'] };
  function I(k,t,d,c,p,w,na){ return {k:k,t:t,d:d,c:c,p:p,w:w,na:!!na}; }
  var R = {
    top10: { name:'Top 10 accounts', e:'🏆', me:'🏢', n:10, unit:'accounts', own:'JK', sources:412, upd:'2h ago', cnt:{issue:34,action:52,decision:41}, all:true,
      ctx:[['Globex','🏢',4,3,'1d ago'],['Acme Corp','🏢',3,4,'2h ago'],['Hooli','🏢',4,2,'2h ago'],['Umbrella','🏢',2,3,'1w ago'],['Wayne Enterprises','🏢',3,1,'4d ago'],['Initech','🏢',2,2,'3d ago'],['Stark Industries','🏢',1,3,'5d ago'],['Vandelay','🏢',1,2,'3w ago'],['Soylent','🏢',1,1,'6d ago'],['Cyberdyne','🏢',0,1,'2w ago']],
      pats:[
        ['Renewals stall at procurement, not with the champion.','In 6 accounts the champion agreed, then procurement added a security review. Each one added about 5 weeks.',['Globex','Acme Corp','Hooli','Umbrella','Initech','Wayne Enterprises'],'Detected 2d ago'],
        ['Custom reporting is the most common ask.','Asked for in 7 accounts. Each was told it is on the roadmap, with no date.',['Acme Corp','Vandelay','Hooli','Stark Industries','Soylent','Globex','Initech'],'Detected 5d ago'],
        ['Usage drops when the champion changes role.','It happened in 4 accounts this quarter. Logins fell by about half within a month each time.',['Hooli','Stark Industries','Umbrella','Cyberdyne'],'Detected yesterday'],
        ['Exec sponsors go quiet after the first QBR.','In 5 accounts no one above director has joined a call since.',['Umbrella','Wayne Enterprises','Vandelay','Initech','Cyberdyne'],'Detected Oct 26']],
      items:[
        I('issue','Globex security review is blocking the renewal','Renewal is due Nov 30. Their security team has not started.',['Globex'],'Critical','4 days',1),
        I('action','Send Acme Corp a date for custom reports','Promised on Oct 21. They asked again on Oct 29.',['Acme Corp'],'Critical','2 weeks',1),
        I('issue','Hooli has no main user since Priya left','Logins are down 48% since Oct 12. No new owner is named.',['Hooli'],'Critical','3 weeks',1),
        I('action','Book a QBR with Umbrella’s VP Ops','Last exec contact was Aug 14. Renewal is in January.',['Umbrella'],'High','1 week',1),
        I('issue','Wayne Enterprises asked for SSO again','Third time since September. Their IT team wants a date.',['Wayne Enterprises'],'High','5 days'),
        I('issue','Initech invoices are 60 days overdue','Finance has emailed twice with no reply.',['Initech'],'High','2 weeks'),
        I('action','Find a new champion at Stark Industries','Their main contact moved to the hardware team on Oct 20.',['Stark Industries'],'High','2 weeks'),
        I('action','Share the reporting workaround with Vandelay and Soylent','Both asked for the same export last week.',['Vandelay','Soylent'],'Medium','6 days'),
        I('decision','Acme Corp renews for 2 years at the current price','Agreed on the call with their CFO.',['Acme Corp'],'','Oct 28'),
        I('decision','Globex will run the security review in-house','They declined our third-party report.',['Globex'],'','Oct 24'),
        I('decision','Soylent moves to the enterprise plan in January','Pending their legal sign-off.',['Soylent'],'','Oct 17')]},

    depts: { name:'All department meetings', e:'🗂️', me:'📊', n:6, unit:'meeting series', own:'JK', sources:203, upd:'10m ago', cnt:{issue:19,action:47,decision:28}, all:true,
      next:['Sales team standup','Tomorrow','Wed, Nov 4 · 9:00 to 9:15am'],
      ctx:[['Eng weekly','🛠️',5,11,'1d ago'],['Sales team standup','📊',3,9,'10m ago'],['Marketing sync','📣',4,8,'2d ago'],['CS weekly','💬',3,7,'3d ago'],['Design review','🎨',2,6,'1w ago'],['Finance review','🧾',2,6,'5d ago']],
      pats:[
        ['The Q4 launch date means something different to each team.','Sales tells customers Dec 1. Eng has code freeze on Dec 1. Marketing plans the announcement for Dec 8.',['Sales team standup','Eng weekly','Marketing sync'],'Detected yesterday'],
        ['Asks to other teams have no owner on that team.','11 actions this month name another team. 7 have no owner there.',['Sales team standup','Eng weekly','Marketing sync','CS weekly','Design review'],'Detected 3d ago'],
        ['At-risk accounts are raised in CS, never in Sales.','CS flagged 4 accounts as at risk in October. None came up in Sales standup.',['CS weekly','Sales team standup'],'Detected 4d ago'],
        ['Hiring is the reason given for most delays.','Open roles were named as a blocker in 4 of 6 series.',['Eng weekly','Design review','CS weekly','Marketing sync'],'Detected Oct 27']],
      items:[
        I('action','Agree one Q4 launch date across Sales, Eng and Marketing','Three dates are in use. Customers have been told Dec 1.',['Sales team standup','Eng weekly','Marketing sync'],'Critical','5 days',1),
        I('issue','SSO is 2 sprints behind','Sales has 3 deals waiting on it.',['Eng weekly'],'Critical','2 weeks',1),
        I('action','Share the at-risk account list with Sales','Raised in CS weekly on Oct 27. Not done.',['CS weekly'],'High','1 week',1),
        I('issue','Pricing page update has no owner','Marketing thinks Design has it. Design thinks Marketing does.',['Marketing sync','Design review'],'High','1 week',1),
        I('issue','Support backlog is up 40% since the release','Most tickets are about the new export.',['CS weekly'],'High','2 weeks'),
        I('action','Send the Q1 hiring plan to Finance','Needed before the board meeting on Nov 18.',['Eng weekly'],'High','4 days'),
        I('action','Review the new onboarding emails','Copy is ready. Waiting on layout.',['Design review'],'Medium','1 week'),
        I('action','Draft the launch announcement','Blocked until the launch date is agreed.',['Marketing sync'],'Medium','6 days'),
        I('decision','No new features after Dec 1','Bug fixes only until the launch.',['Eng weekly'],'','Oct 29'),
        I('decision','Hold Q1 hiring until the board meeting','Backfills are still allowed.',['Finance review'],'','Oct 27'),
        I('decision','Sales targets move to monthly from November','Quarterly targets stay for reporting.',['Sales team standup'],'','Oct 20')]},

    prospects: { name:'Top 10 prospects', e:'🎯', me:'🎯', n:10, unit:'prospects', own:'DK', sources:164, upd:'Yesterday', cnt:{issue:21,action:26,decision:18},
      next:['Contoso · demo 2','Thu','Thu, Nov 5 · 2:00 to 2:45pm'],
      ctx:[['Northwind','🎯',3,2,'Yesterday'],['Contoso','🎯',3,1,'2d ago'],['Fabrikam','🎯',2,2,'4d ago'],['Proseware','🎯',2,1,'1w ago'],['Litware','🎯',1,2,'5d ago'],['Tailspin','🎯',1,2,'1w ago'],['Lucerne','🎯',1,1,'3d ago'],['Adatum','🎯',1,1,'2w ago'],['Wingtip','🎯',0,1,'2w ago'],['Coho Vineyard','🎯',1,0,'3w ago']],
      pats:[
        ['Security comes up before price.','In 7 of 10, the first objection was data retention, not cost.',['Northwind','Contoso','Adatum','Proseware','Lucerne','Fabrikam','Wingtip'],'Detected 3d ago'],
        ['Deals that add a second stakeholder by call 2 move faster.','4 deals did. All 4 reached proposal within 3 weeks. The rest are still in discovery.',['Adatum','Tailspin','Litware','Northwind'],'Detected 5d ago'],
        ['Gong is the comparison in most deals.','Named in 6 deals, usually right after the price slide.',['Fabrikam','Tailspin','Litware','Contoso','Proseware','Coho Vineyard'],'Detected Oct 29'],
        ['Pricing is promised on the call, then sent late.','Promised in 5 deals. It took 9 days on average to send.',['Fabrikam','Tailspin','Litware','Northwind','Lucerne'],'Detected yesterday']],
      items:[
        I('action','Send Northwind the security doc','Promised on Oct 28. Their security lead is the blocker.',['Northwind'],'Critical','6 days',1),
        I('action','Send pricing to Fabrikam, Tailspin and Litware','All three were told it would follow the demo. Use one price sheet.',['Fabrikam','Tailspin','Litware'],'Critical','1 week',1),
        I('issue','Contoso’s sandbox request is unanswered','Asked twice. Their evaluation ends Nov 20.',['Contoso'],'High','2 weeks',1),
        I('issue','Proseware IT won’t approve a pilot without SSO','Their champion asked for a date in writing.',['Proseware'],'High','1 week',1),
        I('issue','No budget owner named at Lucerne','Two calls in. Only the team lead has joined.',['Lucerne'],'Medium','3 days'),
        I('action','Book a security deep dive with Adatum','Their CISO asked to join the next call.',['Adatum'],'High','2 weeks'),
        I('action','Follow up with Wingtip on the SSO date','They will sign after the release.',['Wingtip'],'Medium','2 weeks'),
        I('decision','Fabrikam is quoted annual only','Pulls against the monthly offer made to Tailspin.',['Fabrikam'],'','Oct 30'),
        I('decision','Tailspin can pay monthly for the first 6 months','Offered on the call to close before quarter end.',['Tailspin'],'','Oct 24'),
        I('decision','Adatum’s second demo includes their security team','Booked for Nov 6.',['Adatum'],'','Oct 19')]},

    csm: { name:'CSM Book of Business · Sarah', e:'📚', me:'⭐', n:14, unit:'clients', own:'SM', sources:388, upd:'2h ago', cnt:{issue:27,action:38,decision:22}, all:true, rule:'owned by Sarah M. and tagged Client',
      ctx:[['Hooli','⭐',3,2,'2h ago'],['Umbrella','⭐',2,3,'1d ago'],['Initech','⭐',3,1,'3d ago'],['Soylent','⭐',1,3,'Yesterday'],['Vandelay','⭐',2,1,'1w ago'],['Oscorp','⭐',1,2,'4d ago'],['Tyrell','⭐',1,1,'6d ago'],['Wonka','⭐',0,2,'2w ago']],
      pats:[
        ['Onboarding takes twice as long when IT joins late.','IT joined after week 2 in 6 of 14 clients. Their go-live took 9 weeks, not 4.',['Hooli','Initech','Vandelay','Oscorp','Tyrell','Umbrella'],'Detected 4d ago'],
        ['Tickets spike the week after a release.','9 clients raised tickets within 7 days of the Oct 14 release.',['Hooli','Umbrella','Initech','Soylent','Vandelay','Oscorp','Tyrell','Wonka','Monarch'],'Detected Oct 21'],
        ['Renewal talks start too late.','5 of the 8 renewals this quarter were first raised under 30 days out.',['Umbrella','Initech','Wonka','Tyrell','Monarch'],'Detected yesterday']],
      items:[
        I('issue','Hooli has no main user since Priya left','Logins are down 48% since Oct 12. No new owner is named.',['Hooli'],'Critical','3 weeks',1),
        I('action','Start Umbrella’s renewal conversation','Renewal is in 34 days. It hasn’t been raised.',['Umbrella'],'Critical','1 week',1),
        I('issue','Initech invoices are 60 days overdue','Finance has emailed twice with no reply.',['Initech'],'High','2 weeks',1),
        I('action','Price 20 extra seats for Soylent','Asked on Oct 30 for the support team.',['Soylent'],'High','4 days',1),
        I('issue','Vandelay can’t export to their BI tool','Blocking their monthly board report.',['Vandelay'],'High','1 week'),
        I('action','Bring Oscorp’s IT lead into week 3','Their go-live depends on SSO.',['Oscorp'],'Medium','4 days'),
        I('action','Send Tyrell the Oct 14 release notes','They asked what changed in exports.',['Tyrell'],'Medium','6 days'),
        I('decision','Hooli gets a free month while they replace their admin','Approved by Jared K.',['Hooli'],'','Oct 30'),
        I('decision','Initech moves to quarterly invoicing','Starts with the January invoice.',['Initech'],'','Oct 22'),
        I('decision','Wonka’s renewal goes through their procurement team','Their champion no longer signs.',['Wonka'],'','Oct 15')]},

    ae: { name:'AE Named Account List · Daniel', e:'📇', me:'🏢', n:12, unit:'accounts', own:'DK', sources:296, upd:'2h ago', cnt:{issue:18,action:29,decision:16},
      ctx:[['Acme Corp','🏢',3,4,'2h ago'],['Wayne Enterprises','🏢',3,1,'4d ago'],['Cyberdyne','🏢',2,2,'1w ago'],['Massive Dynamic','🏢',2,1,'3d ago'],['Stark Industries','🏢',1,3,'5d ago'],['Gekko & Co','🏢',1,2,'6d ago'],['Bluth Co','🏢',1,1,'2w ago'],['Monarch','🏢',0,2,'3w ago']],
      pats:[
        ['Budget is set in Q1 for most of the list.','8 of 12 said budget is decided in January or February.',['Acme Corp','Cyberdyne','Massive Dynamic','Stark Industries','Gekko & Co','Bluth Co','Monarch','Wayne Enterprises'],'Detected 3d ago'],
        ['Half the list has no contact above VP.','6 of 12 accounts. Together they hold 15% of open pipeline.',['Cyberdyne','Gekko & Co','Bluth Co','Monarch','Massive Dynamic','Oscorp'],'Detected 6d ago'],
        ['A champion on 2 or more calls means most of the pipeline.','5 accounts have one. They hold 80% of open pipeline.',['Acme Corp','Wayne Enterprises','Stark Industries','Massive Dynamic','Tyrell'],'Detected Oct 28']],
      items:[
        I('action','Send Acme Corp a date for custom reports','Promised on Oct 21. They asked again on Oct 29.',['Acme Corp'],'Critical','2 weeks',1),
        I('issue','Wayne Enterprises asked for SSO again','Third time since September. Their IT team wants a date.',['Wayne Enterprises'],'High','5 days',1),
        I('action','Get an exec intro at Cyberdyne','No contact above VP. Budget is set in January.',['Cyberdyne'],'High','1 week',1),
        I('action','Find a new champion at Stark Industries','Their main contact moved to the hardware team on Oct 20.',['Stark Industries'],'High','2 weeks',1),
        I('issue','Massive Dynamic is trialling a competitor','Mentioned on the Oct 30 call. Trial ends Dec 15.',['Massive Dynamic'],'High','4 days'),
        I('issue','Gekko & Co wants net 90 terms','Finance has not approved anything past net 60.',['Gekko & Co'],'Medium','6 days'),
        I('action','Send Bluth Co the Q1 proposal','They want it before their planning offsite.',['Bluth Co'],'Medium','2 weeks'),
        I('decision','Acme Corp renews for 2 years at the current price','Agreed on the call with their CFO.',['Acme Corp'],'','Oct 28'),
        I('decision','Massive Dynamic pilot extended to Dec 15','Matches the competitor trial.',['Massive Dynamic'],'','Oct 26'),
        I('decision','Monarch moves to next year’s plan','No budget left this year.',['Monarch'],'','Oct 12')]},

    demos: { name:'Sales demos', e:'🖥️', me:'🎯', n:23, unit:'deals', own:'SM', sources:164, upd:'40m ago', cnt:{issue:27,action:44,decision:31}, all:true, rule:'tagged Demo',
      next:['Contoso · demo 2','Thu','Thu, Nov 5 · 2:00 to 2:45pm'],
      ctx:[['Contoso','🎯',3,1,'2d ago'],['Northwind','🎯',2,2,'Yesterday'],['Fabrikam','🎯',2,2,'4d ago'],['Trey Research','🎯',2,1,'40m ago'],['Tailspin','🎯',1,2,'1w ago'],['Litware','🎯',1,1,'5d ago'],['Proseware','🎯',1,1,'1w ago'],['Adatum','🎯',0,2,'2w ago']],
      pats:[
        ['Gong comes up right after pricing.','Named in 14 deals. In 11 it came up within 2 minutes of the price slide.',['Fabrikam','Tailspin','Litware','Contoso','Northwind','Proseware','Trey Research','Lucerne','Coho Vineyard','Relecloud','Fourth Coffee','Woodgrove Bank','Alpine Ski House','Bellows College'],'Detected 2d ago'],
        ['Won deals saw their own data in the first 15 minutes.','5 of 6 won deals did. 1 of 5 lost deals did.',['Wingtip','Adatum','Trey Research','Relecloud','Fourth Coffee','Coho Vineyard','Lucerne','Bellows College','Woodgrove Bank','Alpine Ski House','Litware'],'Detected Oct 30'],
        ['Data retention is the first security question.','Asked in 11 deals, usually in the first 10 minutes.',['Northwind','Contoso','Adatum','Proseware','Woodgrove Bank','Trey Research','Lucerne','Fabrikam','Relecloud','Bellows College','Wingtip'],'Detected yesterday'],
        ['Demos without an agenda run 15 minutes over.','It happened in 9 deals. None of them booked a next step on the call.',['Litware','Tailspin','Coho Vineyard','Fourth Coffee','Alpine Ski House','Relecloud','Fabrikam','Bellows College','Proseware'],'Detected Oct 24']],
      items:[
        I('action','Send Northwind the security doc','Promised on Oct 28. Their security lead is the blocker.',['Northwind'],'Critical','6 days',1),
        I('action','Send pricing to Fabrikam, Tailspin and Litware','All three were told it would follow the demo. Use one price sheet.',['Fabrikam','Tailspin','Litware'],'Critical','1 week',1),
        I('issue','Contoso’s sandbox request is unanswered','Asked twice. Their evaluation ends Nov 20.',['Contoso'],'High','2 weeks',1),
        I('issue','Trey Research wants a demo for their exec team','Asked at the end of today’s demo. No date offered.',['Trey Research'],'High','40 mins',1),
        I('issue','Demo environment was down for Litware','Lost the first 10 minutes. They asked for a rerun.',['Litware'],'Medium','5 days'),
        I('action','Book demo 2 with Tailspin’s finance lead','They want to see the admin and billing views.',['Tailspin'],'High','1 week'),
        I('action','Send Adatum the recording','Their CISO missed the call.',['Adatum'],'Medium','2 weeks'),
        I('decision','Fabrikam is quoted annual only','Pulls against the monthly offer made to Tailspin.',['Fabrikam'],'','Oct 30'),
        I('decision','Proseware pilot waits for SSO','Their IT team set the condition.',['Proseware'],'','Oct 27'),
        I('decision','Tailspin can pay monthly for the first 6 months','Offered on the call to close before quarter end.',['Tailspin'],'','Oct 24')]},

    discovery: { name:'Sales discoveries', e:'🔍', me:'🔍', n:31, unit:'deals', own:'SM', sources:118, upd:'Today', cnt:{issue:22,action:35,decision:19}, rule:'tagged Discovery',
      next:['Lucerne · discovery','Today','Tue, Nov 3 · 3:30 to 4:00pm'],
      ctx:[['Lucerne','🔍',2,2,'Today'],['Trey Research','🔍',2,1,'Yesterday'],['Woodgrove Bank','🔍',2,1,'4d ago'],['Relecloud','🔍',1,2,'2d ago'],['Fourth Coffee','🔍',1,1,'3d ago'],['Alpine Ski House','🔍',0,2,'5d ago'],['Bellows College','🔍',1,1,'1w ago'],['Wide World Importers','🔍',1,0,'1w ago']],
      pats:[
        ['Buyers describe the same pain in the same words.','“We lose context between calls” came up in 12 of 31 first calls.',['Lucerne','Trey Research','Relecloud','Fourth Coffee','Woodgrove Bank','Alpine Ski House','Bellows College','Margie’s Travel','Fabrikam','Contoso','Litware','Coho Vineyard'],'Detected 4d ago'],
        ['Most buyers already pay for Gong or Chorus.','19 of 31. Most want this beside it, not instead of it.',['Relecloud','Trey Research','Woodgrove Bank','Lucerne','Fourth Coffee','Fabrikam','Tailspin','Litware','Contoso','Northwind','Proseware','Adatum','Wingtip','Coho Vineyard','Alpine Ski House','Bellows College','Margie’s Travel','Wide World Importers','Datum'],'Detected Nov 1'],
        ['The budget owner is missing from the first call.','Missing in 27 of 31. The 4 that had one moved to demo within a week.',['Lucerne','Relecloud','Fourth Coffee','Alpine Ski House','Bellows College','Wide World Importers','Margie’s Travel','Fabrikam','Contoso','Litware','Coho Vineyard','Tailspin','Northwind','Proseware','Adatum','Wingtip','Datum','Lamna','Fincher','Kestrel','Ironwood','Juniper','Halcyon','Brightwater','Granite','Harbor','Larkspur'],'Detected yesterday'],
        ['Teams over 20 reps ask about admin controls.','Asked in 8 deals. All 8 have more than 20 reps.',['Woodgrove Bank','Trey Research','Relecloud','Contoso','Northwind','Fabrikam','Adatum','Proseware'],'Detected Oct 29']],
      items:[
        I('action','Send Lucerne the security overview before today’s call','They asked for it on Friday. The call is at 3:30pm.',['Lucerne'],'Critical','4 days',1),
        I('issue','Trey Research runs on Teams, not Zoom','Their whole sales team uses Teams. It came up twice.',['Trey Research'],'High','1 day',1),
        I('action','Get the budget owner on call 2 with Woodgrove Bank','The first call was the team lead only.',['Woodgrove Bank'],'High','4 days',1),
        I('issue','Relecloud is in a Gong contract until June','They want to start before it ends.',['Relecloud'],'Medium','2 days',1),
        I('action','Send Fourth Coffee a pricing range','They need a number for their Q1 plan.',['Fourth Coffee'],'Medium','3 days'),
        I('action','Book Alpine Ski House’s demo','They asked for a slot next week.',['Alpine Ski House'],'Medium','5 days'),
        I('issue','Bellows College needs procurement approval for any pilot','Approval takes about 6 weeks.',['Bellows College'],'Medium','1 week'),
        I('decision','Woodgrove Bank wants a security review before a demo','Their policy for every new vendor.',['Woodgrove Bank'],'','Oct 30'),
        I('decision','Relecloud will run a side by side with Gong in June','Agreed with their RevOps lead.',['Relecloud'],'','Oct 27'),
        I('decision','Wide World Importers is not a fit until they reach 10 reps','Check back in Q2.',['Wide World Importers'],'','Oct 21')]},

    onboarding: { name:'Client onboarding', e:'🧩', me:'⭐', n:9, unit:'clients', own:'SM', sources:97, upd:'Yesterday', cnt:{issue:12,action:25,decision:14}, rule:'tagged Onboarding',
      next:['Soylent · week 2 training','Tomorrow','Wed, Nov 4 · 11:00 to 11:45am'],
      ctx:[['Oscorp','⭐',3,2,'4d ago'],['Soylent','⭐',2,3,'Yesterday'],['Monarch','⭐',2,2,'2d ago'],['Cyberdyne','⭐',1,2,'3d ago'],['Tyrell','⭐',1,1,'6d ago'],['Gekko & Co','⭐',1,2,'1w ago'],['Bluth Co','⭐',0,2,'1w ago'],['Prestige Worldwide','⭐',1,1,'2w ago'],['Massive Dynamic','⭐',0,1,'2w ago']],
      pats:[
        ['Go-live slips when the client sets up the CRM.','5 of 9 left CRM setup to the client. All 5 slipped by 2 weeks or more.',['Oscorp','Monarch','Gekko & Co','Prestige Worldwide','Tyrell'],'Detected 3d ago'],
        ['Week 2 training gets skipped.','Skipped or moved in 6 of 9. Those clients raised twice as many tickets in month 1.',['Soylent','Monarch','Cyberdyne','Bluth Co','Tyrell','Massive Dynamic'],'Detected yesterday'],
        ['Admins ask the same 3 questions.','SSO, data retention and who can see what. Asked in 7 of 9 kickoffs.',['Oscorp','Soylent','Monarch','Cyberdyne','Tyrell','Gekko & Co','Bluth Co'],'Detected Oct 25']],
      items:[
        I('issue','Oscorp’s CRM sync is failing','Stuck since Oct 28. Go-live is Nov 16.',['Oscorp'],'Critical','6 days',1),
        I('action','Reschedule Soylent’s week 2 training','Missed on Oct 29. Booked for tomorrow.',['Soylent'],'High','5 days',1),
        I('issue','Monarch has no admin named','Kickoff was 2 weeks ago.',['Monarch'],'High','2 weeks',1),
        I('action','Send Cyberdyne the SSO setup guide','Their IT lead asked at kickoff.',['Cyberdyne'],'High','3 days',1),
        I('action','Confirm the go-live date with Gekko & Co','Two dates are in different emails.',['Gekko & Co'],'Medium','1 week'),
        I('issue','Tyrell wants data deleted after 30 days','Our default keeps it for a year.',['Tyrell'],'Medium','6 days'),
        I('action','Send Bluth Co the admin checklist','Promised at kickoff.',['Bluth Co'],'Medium','1 week'),
        I('decision','Oscorp go-live moves to Nov 16','Waiting on the CRM fix.',['Oscorp'],'','Oct 30'),
        I('decision','Soylent starts with the sales team only','Support joins in month 2.',['Soylent'],'','Oct 26'),
        I('decision','Prestige Worldwide skips the CRM sync for now','They are changing CRMs in Q1.',['Prestige Worldwide'],'','Oct 18')]}
  };
  var ORDER = ['top10','depts','prospects','csm','ae','demos','discovery','onboarding'];
  ORDER.forEach(function(k){ R[k].key = k; });
  // v151 · more items per list, tags, and Contexts Neuma suggests adding.
  var MORE = {
    top10:[I('issue','Umbrella’s champion is on leave until January','No backup contact named.',['Umbrella'],'High','1 week'),I('issue','Vandelay wants to cut 20 seats at renewal','Usage dropped after their reorg.',['Vandelay'],'High','6 days'),I('issue','Soylent flagged slow page loads','Two complaints in a week.',['Soylent'],'Medium','4 days'),I('issue','Cyberdyne has not logged in for 3 weeks','Last activity was the QBR.',['Cyberdyne'],'Medium','3 weeks'),I('issue','Acme Corp wants a second region','Their EU team is asking for data residency.',['Acme Corp'],'Medium','1 week'),
      I('action','Send Globex the security questionnaire answers','They sent 140 questions on Oct 27.',['Globex'],'Critical','1 week'),I('action','Introduce Hooli to the new support lead','Their admin asked who to call.',['Hooli'],'High','5 days'),I('action','Confirm the Initech payment plan','Finance agreed to split the invoice.',['Initech'],'High','3 days'),I('action','Book Wayne Enterprises’ IT call on SSO','They want a date in writing.',['Wayne Enterprises'],'High','5 days'),I('action','Send Cyberdyne a usage report','Show what changed since the QBR.',['Cyberdyne'],'Medium','2 weeks'),
      I('decision','Hooli gets a free month while they replace their admin','Approved by Jared K.',['Hooli'],'','Oct 30'),I('decision','Initech can split the overdue invoice in two','Second half due Dec 15.',['Initech'],'','Oct 29'),I('decision','Wayne Enterprises SSO goes in the Q1 plan','Eng confirmed the scope.',['Wayne Enterprises'],'','Oct 21'),I('decision','Vandelay keeps current pricing if they renew by Nov 15','Offered on the renewal call.',['Vandelay'],'','Oct 18')],
    depts:[I('issue','Design has no capacity for the launch','Two campaigns and a redesign in the same month.',['Design review'],'High','1 week'),I('issue','Finance can’t see pipeline in one place','Sales and Finance use different numbers.',['Finance review','Sales team standup'],'High','6 days'),I('issue','Churn reasons aren’t tracked','CS keeps them in notes only.',['CS weekly'],'Medium','2 weeks'),I('issue','Eng on-call is one person','Burnout risk raised twice.',['Eng weekly'],'Medium','1 week'),
      I('action','Agree one pipeline number for the board pack','Sales and Finance to align by Nov 15.',['Finance review','Sales team standup'],'High','6 days'),I('action','Write the launch FAQ for Sales','Questions from customers are piling up.',['Marketing sync'],'High','4 days'),I('action','Start tracking churn reasons in the CRM','One field, filled at cancellation.',['CS weekly'],'Medium','2 weeks'),I('action','Add a second engineer to on-call','Rotation starts in December.',['Eng weekly'],'Medium','1 week'),
      I('decision','Launch announcement moves to Dec 8','After code freeze settles.',['Marketing sync'],'','Oct 30'),I('decision','Design pauses the redesign until January','Launch work comes first.',['Design review'],'','Oct 28'),I('decision','CS owns the at-risk list','Shared with Sales every Monday.',['CS weekly'],'','Oct 22')],
    prospects:[I('issue','Fabrikam’s champion is leaving in December','Need a second contact before then.',['Fabrikam'],'High','4 days'),I('issue','Tailspin wants a 6-week pilot','Our standard pilot is 2 weeks.',['Tailspin'],'Medium','1 week'),I('issue','Litware’s demo environment failed','They asked for a rerun.',['Litware'],'Medium','5 days'),I('issue','Northwind wants on-premise','Not on the roadmap.',['Northwind'],'Medium','2 days'),
      I('action','Find a second contact at Fabrikam','Before their champion leaves.',['Fabrikam'],'High','4 days'),I('action','Rerun Litware’s demo','Use the backup environment.',['Litware'],'High','5 days'),I('action','Send Contoso a pilot plan','Two weeks, three success measures.',['Contoso'],'High','2 days'),I('action','Book Lucerne’s budget owner','Ask the team lead for an intro.',['Lucerne'],'Medium','3 days'),
      I('decision','Contoso pilot runs for 2 weeks, not 6','Agreed with their champion.',['Contoso'],'','Oct 31'),I('decision','No on-premise for Northwind','Offer a private region instead.',['Northwind'],'','Oct 29'),I('decision','Litware gets a second demo','Booked for next week.',['Litware'],'','Oct 28')],
    csm:[I('issue','Umbrella’s admin left','Renewal is in 34 days.',['Umbrella'],'High','5 days'),I('issue','Oscorp wants a custom report','Asked twice this month.',['Oscorp'],'Medium','1 week'),I('issue','Tyrell keeps hitting the seat limit','Three blocked logins last week.',['Tyrell'],'Medium','4 days'),I('issue','Wonka hasn’t opened a QBR invite','Sent twice.',['Wonka'],'Medium','2 weeks'),
      I('action','Train Umbrella’s new admin','Book before the renewal call.',['Umbrella'],'High','5 days'),I('action','Send Hooli a recovery plan','Usage back to September levels by January.',['Hooli'],'High','1 week'),I('action','Offer Tyrell 10 extra seats','Price at the current rate.',['Tyrell'],'Medium','4 days'),I('action','Call Wonka’s champion directly','The QBR invites are being ignored.',['Wonka'],'Medium','2 weeks'),
      I('decision','Oscorp’s custom report goes on the backlog','No date promised.',['Oscorp'],'','Oct 27'),I('decision','Soylent’s extra seats are priced at the current rate','Approved by Sarah M.',['Soylent'],'','Oct 31'),I('decision','Umbrella renewal call moves to Nov 20','After their new admin starts.',['Umbrella'],'','Oct 29')],
    ae:[I('issue','Cyberdyne’s budget is frozen until Q1','Procurement confirmed.',['Cyberdyne'],'Medium','1 week'),I('issue','Bluth Co wants a lower entry price','Below our smallest plan.',['Bluth Co'],'Medium','2 weeks'),I('issue','Monarch’s sponsor moved teams','No replacement named.',['Monarch'],'High','3 weeks'),I('issue','Stark Industries is reviewing all vendors','Their new CFO started in October.',['Stark Industries'],'High','1 week'),
      I('action','Send Stark Industries a value summary','Before their vendor review.',['Stark Industries'],'High','1 week'),I('action','Find Monarch’s new sponsor','Ask the old one for an intro.',['Monarch'],'High','3 weeks'),I('action','Book Q1 planning calls for 8 accounts','Budget is set in January.',['Acme Corp','Cyberdyne','Massive Dynamic','Gekko & Co','Bluth Co','Monarch','Wayne Enterprises','Stark Industries'],'Medium','4 days'),I('action','Send Gekko & Co the net 60 offer','Finance approved net 60 only.',['Gekko & Co'],'Medium','6 days'),
      I('decision','Gekko & Co is offered net 60, not net 90','Finance decision.',['Gekko & Co'],'','Oct 30'),I('decision','Bluth Co stays on the starter plan','No custom pricing.',['Bluth Co'],'','Oct 24'),I('decision','Cyberdyne revisits in January','Budget frozen until then.',['Cyberdyne'],'','Oct 20')],
    demos:[I('issue','Contoso’s security team joined unannounced','Asked about retention for 15 minutes.',['Contoso'],'Medium','2 days'),I('issue','Northwind wants on-premise','Not on the roadmap.',['Northwind'],'Medium','Yesterday'),I('issue','Fabrikam’s champion is leaving in December','Need a second contact.',['Fabrikam'],'High','4 days'),I('issue','Proseware IT won’t approve a pilot without SSO','Their champion asked for a date.',['Proseware'],'High','1 week'),
      I('action','Rerun Litware’s demo','Use the backup environment.',['Litware'],'High','5 days'),I('action','Send Contoso a pilot plan','Two weeks, three success measures.',['Contoso'],'High','2 days'),I('action','Send Trey Research exec demo times','Offer two slots next week.',['Trey Research'],'High','40 mins'),I('action','Add an agenda slide to the demo deck','Make it the first slide.',['Fabrikam','Tailspin','Litware'],'Medium','2 days'),
      I('decision','Contoso pilot runs for 2 weeks','Agreed with their champion.',['Contoso'],'','Oct 31'),I('decision','No on-premise for Northwind','Offer a private region instead.',['Northwind'],'','Oct 29'),I('decision','Trey Research gets an exec demo','Date to be set.',['Trey Research'],'','Nov 3')],
    discovery:[I('issue','Woodgrove Bank needs a security review before a demo','Takes 4 weeks.',['Woodgrove Bank'],'High','4 days'),I('issue','Alpine Ski House has no budget this year','Interested for Q2.',['Alpine Ski House'],'Medium','5 days'),I('issue','Fourth Coffee uses a CRM we don’t support','They use a regional CRM.',['Fourth Coffee'],'Medium','3 days'),I('issue','Wide World Importers has only 6 reps','Below our fit line.',['Wide World Importers'],'Medium','1 week'),
      I('action','Send Woodgrove Bank the security pack','Start their review now.',['Woodgrove Bank'],'High','4 days'),I('action','Ask Trey Research about their Teams setup','Check if they record calls.',['Trey Research'],'High','1 day'),I('action','Check if we can support Fourth Coffee’s CRM','Ask Eng for a rough estimate.',['Fourth Coffee'],'Medium','3 days'),I('action','Set a Q2 reminder for Alpine Ski House','Budget opens in April.',['Alpine Ski House'],'Medium','5 days'),
      I('decision','Alpine Ski House revisits in Q2','No budget this year.',['Alpine Ski House'],'','Oct 29'),I('decision','Bellows College starts procurement now','Six weeks to approve.',['Bellows College'],'','Oct 28'),I('decision','Lucerne moves to demo if the budget owner joins','Agreed with their team lead.',['Lucerne'],'','Nov 2')],
    onboarding:[I('issue','Soylent’s admin hasn’t finished setup','Two steps left.',['Soylent'],'Medium','5 days'),I('issue','Gekko & Co has two go-live dates in emails','Needs one date.',['Gekko & Co'],'Medium','1 week'),I('issue','Bluth Co hasn’t connected their calendar','Meetings won’t come in until they do.',['Bluth Co'],'High','1 week'),I('issue','Massive Dynamic wants SSO before rollout','Their IT team set the condition.',['Massive Dynamic'],'High','2 weeks'),
      I('action','Fix Oscorp’s CRM sync','Eng has the logs.',['Oscorp'],'Critical','6 days'),I('action','Name Monarch’s admin','Ask their sponsor directly.',['Monarch'],'High','2 weeks'),I('action','Walk Bluth Co through the calendar step','15 minute call.',['Bluth Co'],'High','1 week'),I('action','Send Massive Dynamic the SSO guide','Their IT lead asked for it.',['Massive Dynamic'],'Medium','2 weeks'),
      I('decision','Tyrell keeps data for 30 days','Set as their retention policy.',['Tyrell'],'','Oct 31'),I('decision','Massive Dynamic rolls out after SSO','Their IT set the condition.',['Massive Dynamic'],'','Oct 24'),I('decision','Monarch’s kickoff is repeated with their new admin','Once named.',['Monarch'],'','Oct 22')]
  };
  var TAGS = { top10:['Sales','Accounts','Enterprise','APAC','Renewals'], depts:['Internal','Leadership'], prospects:['Sales','Pipeline'], csm:['CS','Clients'], ae:['Sales','Accounts'], demos:['Sales','Demo'], discovery:['Sales','Discovery'], onboarding:['CS','Onboarding'] };
  var SUG = {
    top10:[['🏢','Massive Dynamic','Revenue doubled this quarter. It would rank 8th.'],['⭐','Pendo','Renewal in 6 weeks with 2 open issues.']],
    depts:[['🧑‍💼','People and hiring','Hiring came up as a blocker in 4 of these 6.'],['🛟','Support standup','CS weekly refers to it in most meetings.']],
    prospects:[['🎯','Trey Research','Exec demo requested today.'],['🎯','Relecloud','Pipeline value now in the top 10.']],
    csm:[['⭐','Massive Dynamic','Sarah M. joined 4 of their calls this month.'],['⭐','Prestige Worldwide','Owned by Sarah M. but missing the Client tag.']],
    ae:[['🏢','Oscorp','In Daniel K.’s territory and active this month.'],['🏢','Tyrell','Daniel K. joined their last 3 calls.']],
    demos:[['🎯','Lucerne','Had a demo last week but isn’t tagged Demo.'],['🎯','Coho Vineyard','Demo on Oct 2, not tagged Demo.']],
    discovery:[['🔍','Margie’s Travel','First call last week, not tagged Discovery.'],['🔍','Datum','Booked a discovery call for Friday.']],
    onboarding:[['⭐','Prestige Worldwide','Kickoff was last week. Not tagged Onboarding.'],['⭐','Wingtip','Signed on Oct 30.']]
  };
  ORDER.forEach(function(k){ R[k].items = R[k].items.concat(MORE[k]); R[k].tags = TAGS[k]; R[k].sug = SUG[k]; });


  // Pattern type per example, so each tab’s Patterns column shows the ones about that list.
  var PT = { top10:['issue','issue','issue','action'], depts:['decision','action','issue','issue'], prospects:['issue','action','issue','action'], csm:['issue','issue','action'], ae:['decision','action','action'], demos:['issue','decision','issue','action'], discovery:['issue','issue','action','issue'], onboarding:['action','action','issue'] };
  var PRI = {Critical:['bg-rose-50 text-rose-700','bg-rose-500'], High:['bg-amber-50 text-amber-700','bg-amber-400'], Medium:['bg-slate-100 text-slate-600','bg-slate-300']};
  var AP = function(s){ return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 64 64"><path d="M 8 8 H 56 V 56 H 8 Z M 34 14 V 30 H 50 V 14 Z" fill="url(#ru-g)" fill-rule="evenodd"/></svg>'; };
  var SV = function(w,inner,sw){ return '<svg width="'+w+'" height="'+w+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(sw||2)+'" stroke-linecap="round" stroke-linejoin="round">'+inner+'</svg>'; };
  var ICO = {
    share: SV(13,'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
    lock: SV(11,'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
    back: '<svg style="margin-left:-3px" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    tick: SV(9,'<polyline points="20 6 9 17 4 12"/>',3.5),
    up: SV(12,'<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>'),
    x: SV(12,'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'),
    cal: SV(12,'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'),
    plus: SV(12,'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',2.5),
    chev: SV(11,'<polyline points="6 9 12 15 18 9"/>',2.5),
    spark: SV(12,'<path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z"/>'),
    filter: SV(11,'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>')
  };
  var DOT = '<span class="text-slate-300">·</span>';
  function emo(r,name){ for (var i=0;i<r.ctx.length;i++) if (r.ctx[i][0]===name) return r.ctx[i][1]; return r.me; }
  // Where an item came from: one quiet line, like the Context page’s meta text.
  function from(r,c){ return '<span class="inline-flex items-center gap-1 text-slate-500 whitespace-nowrap"><span class="text-[11px] leading-none">'+emo(r,c[0])+'</span><a href="context.html#context-summary" class="truncate max-w-[160px] hover:underline hover:text-slate-700 cursor-pointer" title="Open '+c[0]+'">'+c[0]+'</a>'+(c.length>1?'<span class="text-slate-400 cursor-default" title="'+c.slice(1).join(', ')+'">+'+(c.length-1)+'</span>':'')+'</span>'; }
  function cardHead(title, sub, right){ return '<div class="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100 mb-wash">'+AP(16)+'<span class="text-[13px] font-semibold text-slate-900">'+title+'</span><span class="text-[11px] font-semibold nm-rank-text">'+sub+'</span>'+(right||'')+'</div>'; }
  function rankRow(r,it,ix,why){
    var title = it.k==='issue' ? 'Mark resolved' : it.k==='action' ? 'Mark done' : 'Mark discussed';
    return '<div class="group flex items-start gap-3 px-4 py-3 hover:bg-slate-50" data-mb-row><span class="mb-rkw w-[20px] shrink-0 flex justify-center pt-[3px]"><span class="mb-rk nm-rank-text" style="font-size:14px">'+(ix+1)+'</span><button type="button" class="mb-tick" data-mb-tick title="'+title+'">'+ICO.tick+'</button></span>'
      + '<div class="min-w-0 flex-1"><div class="text-[13.5px] font-medium text-slate-900 leading-snug mb-ttl">'+it.t+'</div><p class="mt-1 text-[12.5px] leading-[1.5] text-slate-500 truncate">'+(why?'Why: ':'')+it.d+'</p><div class="mt-1 flex items-center text-[11px] text-slate-400">'+from(r,it.c)+'</div></div></div>';
  }
  function rankCard(r,title,sub,list,why,go){
    return '<div class="rounded-xl border border-slate-200 bg-white overflow-hidden mb-card">'+cardHead(title,sub,go?'<a class="ml-auto text-[12px] text-brand-600 hover:text-brand-700 font-medium cursor-pointer" data-ru-go="'+go+'">See all →</a>':'')
      + '<div class="divide-y divide-slate-100">'+list.map(function(it,i){ return rankRow(r,it,i,why); }).join('')+'</div></div>';
  }
  function patternsCard(r, type){
    var list = r.pats.filter(function(p,i){ return !type || PT[r.key][i]===type; });
    if (!list.length) list = r.pats;
    if (!type) list = list.slice(0,3);
    return '<div class="rounded-xl border border-slate-200 bg-white overflow-hidden mb-card">'+cardHead('Patterns','detected by Neuma','')
      + '<div class="divide-y divide-slate-100">'+list.map(function(p){ return '<div class="group relative px-4 py-2.5 pr-16"><span class="absolute right-3 top-2.5 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><button type="button" class="inline-flex items-center justify-center rounded-md text-slate-400 hover:text-brand-600 hover:bg-brand-50 w-6 h-6" title="Useful">'+ICO.up+'</button><button type="button" class="inline-flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 w-6 h-6" title="Dismiss">'+ICO.x+'</button></span><div class="text-[12.5px] font-medium text-slate-900 leading-snug">'+p[0]+'</div><p class="mt-0.5 text-[11.5px] leading-[1.45] text-slate-500">'+p[1]+'</p><div class="mt-1 text-[11px] text-slate-400">'+p[3]+'</div></div>'; }).join('')+'</div></div>';
  }
  // 4.1 · Which Contexts need you. Ranked by critical items, then open items.
  function needsCard(r){
    var list = r.ctx.map(function(c){
      var its = r.items.filter(function(i){ return i.c.indexOf(c[0])>-1 && i.k!=='decision'; });
      var crit = its.filter(function(i){ return i.p==='Critical'; }).length;
      return { c:c, crit:crit, top:its[0], score: crit*10 + its.length*3 + c[2] + c[3] };
    }).sort(function(a,b){ return b.score-a.score; }).slice(0,4);
    var rows = list.map(function(x,ix){ var c = x.c;
      var bits = (x.crit ? '<span class="text-rose-600 font-medium">'+x.crit+' critical</span>'+DOT : '') + '<span>'+c[2]+' issue'+(c[2]===1?'':'s')+'</span>'+DOT+'<span>'+c[3]+' action'+(c[3]===1?'':'s')+'</span>'+DOT+'<span>Last activity '+c[4]+'</span>';
      return '<div class="group flex items-start gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer"><span class="w-[20px] shrink-0 flex justify-center pt-[3px]"><span class="mb-rk nm-rank-text" style="font-size:14px">'+(ix+1)+'</span></span>'
        + '<div class="min-w-0 flex-1"><div class="flex items-center gap-2 text-[13.5px] font-medium text-slate-900 leading-snug"><span class="text-[15px] leading-none">'+c[1]+'</span>'+c[0]+'</div>'
        + '<p class="mt-1 text-[12.5px] leading-[1.5] text-slate-500">'+(x.top ? x.top.t+'.' : 'Nothing urgent.')+'</p><div class="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">'+bits+'</div></div></div>'; }).join('');
    return '<div class="rounded-xl border border-slate-200 bg-white overflow-hidden mb-card">'+cardHead('Contexts that need you','ranked by Neuma','<a class="ml-auto text-[12px] text-brand-600 hover:text-brand-700 font-medium cursor-pointer" data-ru-go="contexts">All '+r.n+' →</a>')+'<div class="divide-y divide-slate-100">'+rows+'</div></div>';
  }
  function build(k, opts){
    var r = R[k]; opts = opts || {};
    var na = r.items.filter(function(i){ return i.na; }).slice(0,3);
    var top = function(k2){ return r.items.filter(function(i){ return i.k===k2; }).slice(0,3); };
    return header(r) + tabs()
      + '<div class="mt-6" data-mb-pane="summary"><div class="grid grid-cols-[1fr_360px] gap-6 items-start"><div class="space-y-5 min-w-0">'
      + (opts.needs ? needsCard(r) : '')
      + rankCard(r,'Needs attention','suggested by Neuma',na,true) + rankCard(r,'Top issues','ranked by Neuma',top('issue'),false,'issues') + rankCard(r,'Top actions','ranked by Neuma',top('action'),false,'actions')
      + '</div><div class="space-y-5">'+patternsCard(r)+'</div></div></div>'
      + listPane(r,'issue') + listPane(r,'action') + listPane(r,'decision') + ctxPane(r) + drawer(r);
  }
  function next(r){
    if (!r.next) return '';
    return '<div data-later class="rounded-xl border border-slate-200 bg-white overflow-hidden" style="box-shadow:0 1px 2px rgb(11 14 46 / .05), 0 10px 28px -12px rgb(11 14 46 / .18)"><div class="px-4 pt-3.5 pb-4"><div class="flex items-center justify-between"><span class="eyebrow">Next meeting</span><span class="text-[11.5px] text-slate-500">'+r.next[1]+'</span></div><div class="mt-2 text-[16px] font-semibold tracking-tight text-slate-900">'+r.next[0]+'</div><div class="mt-1 flex items-center gap-1.5 text-[12.5px] text-slate-500">'+ICO.cal+r.next[2]+'</div><a href="meeting-brief.html#meeting-brief-prep" class="mt-3 flex w-full items-center justify-center gap-1.5 h-8 rounded-md bg-[#0b0e2e] text-white text-[12.5px] font-medium">Open brief</a></div></div>';
  }
  function header(r){
    return '<div class="group/hdr"><a href="contexts.html#contexts" class="inline-flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-900 cursor-pointer">'+ICO.back+'Contexts</a>'
      + '<div class="mt-3 flex items-center justify-between gap-6"><div class="flex items-center gap-3 min-w-0"><span class="text-[28px] leading-none shrink-0">'+r.e+'</span><h1 class="text-[24px] font-semibold tracking-tight text-slate-900 leading-tight truncate">'+r.name+'</h1></div>'
      // Same as the Context header: Share and Add Context for the Owner, then the ⋯ menu. Someone else's Roll up shows ⋯ only.
      + (function(){ var mine = r.own==='JK', MI='w-full px-3 py-2 text-[13px] text-slate-700 hover:bg-slate-50 text-left';
          var menu = mine
            ? '<button type="button" data-ru-edit class="'+MI+'">Edit Roll up</button><button type="button" data-ru-priv class="'+MI+'">Make private</button><div class="my-1 h-px bg-slate-100"></div><button type="button" data-ru-hide class="'+MI+'">Hide for me</button><button type="button" data-ru-del class="w-full px-3 py-2 text-[13px] text-rose-600 hover:bg-rose-50 text-left">Delete for everyone…</button>'
            : '<button type="button" data-ru-hide class="'+MI+'">Hide for me</button><div class="px-3 pt-1 pb-1.5 text-[11.5px] text-slate-400">Only the owner can delete it.</div>';
          return '<div class="flex items-center gap-2">'
            + (mine ? '<button class="btn-out" data-ru-share>'+ICO.share+'Share</button><button class="btn-out inline-flex items-center gap-1.5" style="background:#0b0e2e;color:#fff;border-color:#0b0e2e" data-ru-add>'+ICO.plus+'Add Context</button>' : '')
            + '<div class="relative" data-ru-morewrap><button class="btn-out inline-flex items-center justify-center w-9 px-0" title="More" data-ru-more>⋯</button><div class="hidden absolute right-0 top-full mt-1 w-[200px] rounded-lg border border-slate-200 bg-white py-1 z-40 text-left" data-ru-moremenu style="box-shadow:0 16px 40px -8px rgba(15,23,42,.2)">'+menu+'</div></div>'
            + '</div></div>'; })()
      + '<div class="mt-2 flex items-center gap-2 text-[12.5px] text-slate-500 flex-wrap"><span><span class="num text-slate-800">'+r.n+'</span> Contexts</span>'+DOT+'<span><span class="num text-slate-800">'+r.sources+'</span> sources</span>'+DOT+'<span>Last added '+r.upd+'</span>'+DOT+'<span class="badge bg-brand-50 text-brand-700">Roll up</span>'+(r.tags||[]).slice(0,2).map(function(t){ return '<span class="badge bg-slate-100 text-slate-600">'+t+'</span>'; }).join('')+((r.tags||[]).length>2?'<span class="badge bg-slate-100 text-slate-500 cursor-default" title="'+r.tags.slice(2).join(', ')+'">+'+(r.tags.length-2)+'</span>':'')+'<button type="button" class="text-[11.5px] text-slate-400 hover:text-brand-700 opacity-0 group-hover/hdr:opacity-100 transition-opacity">+ Add tag</button></div></div>';
  }
  function tabs(){
    return '<div class="mt-5 flex items-end justify-between border-b border-slate-200"><div class="flex items-end"><button type="button" class="tab on" data-mb-tab="summary">Summary</button><button type="button" class="tab" data-mb-tab="issues">Issues</button><button type="button" class="tab" data-mb-tab="actions">Actions</button><button type="button" class="tab" data-mb-tab="decisions">Decisions</button><button type="button" class="tab" data-mb-tab="contexts">Contexts</button></div></div>';
  }
  // Object tabs: the same list card and rows as the Context page, plus where each item came from.
  function listRow(r,it,i){
    var p = PRI[it.p] || PRI.Medium, lead, meta;
    if (it.k==='issue') lead = '<span class="zl-rk w-[18px] shrink-0 flex justify-center pt-[6px]"><span class="zl-dot w-2 h-2 rounded-full '+p[1]+'"></span><button type="button" class="zl-tick" title="Mark resolved">'+ICO.tick+'</button></span>';
    else if (it.k==='action') lead = '<span class="w-[18px] shrink-0 flex justify-center pt-[2px]"><button type="button" class="zl-tick" title="Mark complete">'+ICO.tick+'</button></span>';
    else { var m = it.w.split(' '); lead = '<span class="w-[22px] shrink-0 text-center leading-none pt-[3px]"><span class="block font-mono text-[9px] uppercase tracking-wider text-slate-400">'+m[0]+'</span><span class="block mt-0.5 num text-[13px] font-semibold text-slate-700">'+m[1]+'</span></span>'; }
    meta = it.k==='decision' ? from(r,it.c) : '<span>'+it.w+'</span>'+DOT+'<span class="badge '+p[0]+'" style="padding:1px 6px;font-size:10.5px;">'+it.p+'</span>'+DOT+from(r,it.c);
    return '<div class="group px-4 py-3 cursor-pointer hover:bg-slate-50" data-zlrow data-i="'+i+'"><div class="flex items-start gap-2.5">'+lead+'<div class="flex-1 min-w-0"><div class="zl-ttl text-[13.5px] font-medium text-slate-900 leading-snug">'+it.t+'</div><p class="zl-clamp1 mt-0.5 text-[12.5px] leading-[1.5] text-slate-500">'+it.d+'</p><div class="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-400">'+meta
      + '<span class="ml-auto flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><button type="button" class="inline-flex items-center justify-center rounded-md text-slate-400 hover:text-brand-600 hover:bg-brand-50 w-6 h-6" title="Useful">'+ICO.up+'</button><button type="button" class="inline-flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 w-6 h-6" title="Dismiss">'+ICO.x+'</button></span></div></div></div></div>';
  }
  function listPane(r,k){
    var its = r.items.filter(function(i){ return i.k===k; }), label = {issue:'Detected issues', action:'Detected actions', decision:'Detected decisions'}[k];
    return '<div class="mt-6 hidden" data-mb-pane="'+k+'s"><div class="grid grid-cols-[1fr_360px] gap-6 items-start"><div class="min-w-0"><div class="rounded-xl border border-slate-200 bg-white overflow-hidden">'
      + '<div class="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100"><span class="text-brand-500">'+ICO.spark+'</span><span class="text-[13px] font-semibold text-slate-900">'+label+'</span><span class="ml-1 num font-mono text-[11px] text-slate-400">'+r.cnt[k]+'</span>'
      + '<div class="ml-auto flex items-center gap-1.5"><button type="button" class="btn-out flex items-center gap-1 bg-slate-50" style="padding:3px 9px;font-size:12px;"><span class="text-slate-400">Sort:</span><span>Default</span><span class="text-slate-400">'+ICO.chev+'</span></button><button type="button" class="btn-out flex items-center gap-1.5 bg-slate-50" style="padding:3px 9px;font-size:12px;"><span class="text-slate-400">'+ICO.filter+'</span>Filter</button></div></div>'
      + '<div class="divide-y divide-slate-100">'+its.map(function(it,i){ return listRow(r,it,i); }).join('')+'</div>'
      + '<div class="border-t border-slate-100 px-4 py-2.5"><a class="text-[12px] text-brand-600 font-medium cursor-pointer">Show '+(r.cnt[k]-its.length)+' more</a></div></div></div>'
      + '<div>'+patternsCard(r,k)+'</div></div></div>';
  }
  // Contexts tab: stands in for Sources. Same table as the Contexts list.
  // Sources per Context. Known ones match Screen 2; the rest are sample numbers.
  var SRC = {'Acme Corp':42,'Initech':11,'Hooli':51,'Globex':29,'Umbrella':47,'Wayne Enterprises':51,'Stark Industries':38,'Vandelay':22,'Sales team standup':62,'Design review':17};
  function srcN(c){ return SRC[c[0]] || (c[2]*4 + c[3]*3 + 6); }
  function ctxPane(r){
    var rows = r.ctx.map(function(c){ return '<tr class="group hover:bg-slate-50 cursor-pointer"><td class="pl-5 pr-3 py-3.5"><div class="font-medium text-slate-900 inline-flex items-center gap-2"><span class="text-[16px] leading-none">'+c[1]+'</span><span>'+c[0]+'</span></div></td><td class="px-3 py-3.5 text-right num font-mono text-slate-800">'+srcN(c)+'</td><td class="px-3 py-3.5 text-[12.5px] text-slate-500 text-right">'+c[4]+'</td><td class="pl-2 pr-5 py-3.5 text-right"><button class="text-slate-300 hover:text-slate-700 opacity-0 group-hover:opacity-100 w-7 h-7 rounded hover:bg-slate-100" title="Remove from this Roll up">×</button></td></tr>'; }).join('');
    return '<div class="mt-6 hidden" data-mb-pane="contexts"><div>'
      + '<div class="rounded-xl border border-slate-200 bg-white overflow-hidden"><table class="w-full text-sm"><thead class="bg-brand-50/60 text-brand-700"><tr class="text-[11px] uppercase tracking-wider"><th class="text-left font-medium pl-5 pr-3 py-3">Name</th><th class="text-right font-medium px-3 py-3 w-[100px]">Sources</th><th class="text-right font-medium px-3 py-3 w-[170px]">Last source added</th><th class="w-[52px]"></th></tr></thead><tbody class="divide-y divide-slate-100">'+rows+'</tbody></table>'
      + '<div class="flex items-center justify-between px-5 py-3 border-t border-slate-200 bg-slate-50/40 text-[12px] text-slate-500"><span>Showing <span class="font-medium text-slate-700">'+r.ctx.length+'</span> of <span class="font-medium text-slate-700">'+r.n+'</span></span>'+(r.n>r.ctx.length?'<a class="text-brand-600 font-medium cursor-pointer">Show '+(r.n-r.ctx.length)+' more</a>':'')+'</div></div></div>'
      + '</div>';
      + '<div class="rounded-xl border border-slate-200 bg-white overflow-hidden mb-card">'+cardHead('Suggested','by Neuma','')+'<div class="divide-y divide-slate-100">'+sug+'</div></div></div></div></div>';
  }
  // 4 · Add Contexts slide-over, opened from the header button. Same pattern as Add source on a Context.
  var POOL = [['⭐','Pendo',87],['⭐','Figma',34],['💰','Q4 Pricing Change',18],['🚀','Website redesign',9],['👤','Sarah M. 1:1',24]];
  function drawer(r){
    var cands = (r.sug||[]).map(function(s){ return [s[0],s[1],'Suggested',1]; }).concat(POOL.map(function(p){ return [p[0],p[1],p[2]+' sources',0]; }));
    var inR = r.ctx.slice(0,2).map(function(c){ return '<label class="flex items-center gap-3 px-3.5 py-2.5 opacity-60"><input type="checkbox" class="accent-brand-600 w-3.5 h-3.5" checked disabled><span class="text-[15px] leading-none">'+c[1]+'</span><span class="flex-1 text-[13px] text-slate-900 truncate">'+c[0]+'</span><span class="text-[11.5px] text-slate-400">Already in</span></label>'; }).join('');
    var list = cands.map(function(c){ return '<label class="flex items-center gap-3 px-3.5 py-2.5 hover:bg-slate-50 cursor-pointer"><input type="checkbox" class="accent-brand-600 w-3.5 h-3.5" data-ru-pick><span class="text-[15px] leading-none">'+c[0]+'</span><span class="flex-1 text-[13px] text-slate-900 truncate">'+c[1]+'</span><span class="text-[11.5px] '+(c[3]?'nm-rank-text font-semibold':'text-slate-400')+'">'+c[2]+'</span></label>'; }).join('');
    return '<div class="hidden" data-ru-drawer><div class="absolute inset-0 bg-slate-900/30 z-20" data-ru-close></div><aside class="absolute top-0 right-0 bottom-0 w-[520px] bg-white z-30 flex flex-col" style="box-shadow:-24px 0 48px -16px rgba(15,23,42,0.25);">'
      + '<div class="px-7 pt-6 pb-5 border-b border-slate-200 flex items-start justify-between gap-4"><div><h2 class="text-[17px] font-semibold tracking-tight text-slate-900">Add Contexts</h2><p class="text-[12.5px] text-slate-500 mt-1">To '+r.name+'. Their issues, actions and decisions roll up here.</p></div><button type="button" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 shrink-0" data-ru-close aria-label="Close">'+ICO.x+'</button></div>'
      + '<div class="flex-1 overflow-y-auto px-7 py-6">'+(r.rule?'<p class="mb-3 text-[12.5px] text-slate-500">Contexts '+r.rule+' join on their own. Add any others here.</p>':'')
      + '<div class="relative mb-2"><svg class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16.65" y2="16.65"/></svg><input class="w-full pl-8 pr-3 py-2 text-[13px] rounded-md border border-slate-300 bg-white focus:outline-none focus:border-brand-500" placeholder="Search Contexts…"></div>'
      + '<div class="rounded-lg border border-slate-200 bg-white divide-y divide-slate-100 overflow-hidden">'+list+inR+'</div></div>'
      + '<div class="px-7 py-4 border-t border-slate-200 bg-slate-50/60 flex items-center justify-end gap-2"><button type="button" class="btn-out" data-ru-close>Cancel</button><button type="button" class="btn-out" style="background:#0f172a;color:#fff;border-color:#0f172a;" data-ru-close data-ru-addbtn>Add</button></div></aside></div>';
  }
  // One click handler for every Roll up screen.
  function wire(s){
    s.addEventListener('click', function(e){
      var g = e.target.closest('[data-ru-go]'); if (g) { var tb = s.querySelector('.tab[data-mb-tab="'+g.getAttribute('data-ru-go')+'"]'); if (tb) tb.click(); return; }
      if (e.target.closest('[data-ru-add]')) { s.querySelector('[data-ru-drawer]').classList.remove('hidden'); return; }
      if (e.target.closest('[data-ru-close]')) { s.querySelector('[data-ru-drawer]').classList.add('hidden'); }
    });
    s.addEventListener('change', function(e){ if (!e.target.hasAttribute('data-ru-pick')) return; var n = s.querySelectorAll('[data-ru-pick]:checked').length; var b = s.querySelector('[data-ru-addbtn]'); b.textContent = n ? 'Add '+n : 'Add'; });
  }
  var sec = document.getElementById('rollup');
  if (sec) {
  var main = sec.querySelector('[data-ru-main]'), sw = sec.querySelector('[data-ru-switch]'), cur;
  ORDER.forEach(function(k){ var b = document.createElement('button'); b.type='button'; b.className='ru-sw'; b.setAttribute('data-ru-v',k); b.textContent=R[k].name; sw.appendChild(b); });
  function show(k){
    if (!R[k]) return; cur = k; main.innerHTML = build(k);
    sw.querySelectorAll('[data-ru-v]').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-ru-v')===k); });
  }
  var sec2 = document.getElementById('rollup-needs'); if (sec2) sec2.querySelector('[data-ru-main]').innerHTML = build('top10', {needs:true});
  if (sec2) wire(sec2);
  wire(sec);
  sec.addEventListener('click', function(e){ var v = e.target.closest('[data-ru-v]'); if (v) show(v.getAttribute('data-ru-v')); });

  }
  // Screen 2 · Roll ups are rows like any other Context, with a Roll ups saved view.
  var dir = document.getElementById('contexts');
  if (dir) {
    var tbody = dir.querySelector('tbody');
    var html = ORDER.map(function(k){ var r = R[k], o = OWN[r.own];
      return '<tr class="row group hover:bg-slate-50 cursor-pointer'+(r.all?'':' hidden')+'" data-ru-row="'+k+'"'+(r.all?'':' data-ru-only')+'><td class="pl-5 pr-2 py-3.5"><input type="checkbox" class="accent-brand-600" onclick="event.stopPropagation()"></td>'
        + '<td class="px-3 py-3.5"><div class="font-medium text-slate-900 inline-flex items-center gap-2"><span class="text-[16px] leading-none">'+r.e+'</span><span>'+r.name+'</span><span class="text-[12px] font-normal text-slate-400">'+r.n+' Contexts</span></div></td>'
        + '<td class="px-3 py-3.5 text-right"><span class="num font-mono text-slate-800">'+r.sources+'</span></td><td class="px-3 py-3.5 text-[12.5px] text-slate-500 text-right">'+r.upd+'</td>'
        + '<td class="pl-2 pr-5 py-3.5"><div class="flex items-center justify-end"><span title="'+o[0]+'"><div class="w-6 h-6 rounded-full bg-gradient-to-br '+o[1]+' flex items-center justify-center text-white text-[10px] font-semibold">'+r.own+'</div></span></div></td>'
        + '<td class="pl-2 pr-5 py-3.5 text-right"><button class="text-slate-400 hover:text-slate-700 inline-flex items-center justify-center w-7 h-7 rounded hover:bg-slate-100" onclick="event.stopPropagation()">⋯</button></td></tr>'; }).join('');
    tbody.insertAdjacentHTML('afterbegin', html);
    var foot = dir.querySelector('[data-dir-foot]');
    function view(v){
      dir.querySelectorAll('[data-dir-tab]').forEach(function(t){ t.classList.toggle('on', t.getAttribute('data-dir-tab')===v); });
      tbody.querySelectorAll('tr').forEach(function(tr){ tr.classList.toggle('hidden', v==='ru' ? !tr.hasAttribute('data-ru-row') : tr.hasAttribute('data-ru-only')); });
      if (foot) { var c=tbody.querySelectorAll('tr:not(.hidden)').length; foot.innerHTML = 'Showing <span class="font-medium text-slate-700">1–'+c+'</span> of <span class="font-medium text-slate-700">'+c+'</span>'; }
    }
    dir.addEventListener('click', function(e){
      var t = e.target.closest('[data-dir-tab]'); if (t) { view(t.getAttribute('data-dir-tab')); return; }
      var tr = e.target.closest('[data-ru-row]'); if (tr) location.href = 'rollup.html#rollup-'+tr.getAttribute('data-ru-row');
    });
    view('all');
  }

  if (sec) {
  function fromHash(){ var m = location.hash.match(/^#rollup-(\w+)$/); if (m && R[m[1]]) { show(m[1]); sec.scrollIntoView(); } }
  show('top10');
  window.addEventListener('hashchange', fromHash); fromHash();
  }
})();

// ── Screen 4 · Roll up Share (Manage access) and ⋯ menu. Modelled on the Context page (Screen 3). ──
(function(){
  var sec = document.getElementById('rollup'); if (!sec) return;
  var panel = sec.querySelector('[data-mb-panel]');
  var AVC={JK:'from-amber-400 to-pink-500',SM:'from-emerald-400 to-teal-500',DK:'from-sky-400 to-indigo-500',MR:'from-pink-400 to-rose-500',PS:'from-emerald-400 to-teal-500',SK:'from-violet-400 to-fuchsia-500',JM:'from-sky-400 to-indigo-500',TH:'from-sky-400 to-indigo-500'};
  var GI='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>';
  var X='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  var CH='<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><polyline points="6 9 12 15 18 9"/></svg>';
  var LOCK='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
  var INFO='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>';
  var DARK='background:#0f172a;color:#fff;border-color:#0f172a;';
  // Roll up roles, from integrations-decisions.md (Roles, Roll ups)
  var ROLE={Editor:'Change which Contexts are in it, share',Viewer:'See the full Roll up'};
  var DIR=[{n:'Leadership',g:4},{n:'Sales',g:8},{n:'Customer Success',g:5},{n:'Marketing',g:5},{i:'JM',n:'Jason M.',t:'CTO'},{i:'MR',n:'Mia R.',t:'COO'},{i:'PS',n:'Priya S.',t:'Product'},{i:'SK',n:'Sam K.',t:'Sales'},{i:'TH',n:'Tom H.',t:'Customer Success'},{i:'SM',n:'Sarah M.',t:'Customer Success'},{i:'DK',n:'Daniel K.',t:'Sales'}];
  function e(x){return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function ini(n){var p=n.replace(/[^A-Za-z .]/g,'').split(/[ .]+/).filter(Boolean);return ((p[0]||'?')[0]+((p[1]||'')[0]||'')).toUpperCase();}
  function av(p,sz){sz=sz||'w-7 h-7 text-[10px]';if(p.g)return '<span class="'+sz+' rounded-full bg-slate-100 text-slate-500 inline-flex items-center justify-center shrink-0">'+GI+'</span>';return '<span class="'+sz+' rounded-full bg-gradient-to-br '+(AVC[p.i]||'from-slate-400 to-slate-500')+' inline-flex items-center justify-center text-white font-semibold shrink-0">'+p.i+'</span>';}
  function fresh(){return {role:'Viewer',q:'',chips:[],pend:null,xfer:null,priv:false,privAsk:false,people:[{i:'JK',n:'Jared K.',r:'Owner',you:1},{i:'MR',n:'Mia R.',r:'Editor'},{n:'Leadership',g:4,r:'Viewer'}]};}
  var S=fresh(), menu=null, drawer=null;
  function rname(){ var h=panel.querySelector('[data-ru-main] h1'); return h?h.textContent:'this Roll up'; }
  function has(n){return S.people.some(function(p){return p.n===n;})||S.chips.some(function(c){return c.n===n;});}
  function hd(t){return '<div class="pt-4 pb-1"><span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">'+t+'</span></div>';}
  function bar(msg,no,yes,yl){return '<div class="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 flex items-center gap-3"><span class="flex-1 text-[12.5px] text-slate-700 leading-[1.45]">'+msg+'</span><button type="button" '+no+' class="btn-out" style="padding:3px 10px;font-size:12px;">Cancel</button><button type="button" '+yes+' class="btn-out whitespace-nowrap" style="padding:3px 10px;font-size:12px;'+DARK+'">'+yl+'</button></div>';}
  function names(a){var n=a.map(function(c){return e(c.n)+(c.g?' ('+c.g+' people)':'');});return n.length<2?n[0]:n.slice(0,-1).join(', ')+' and '+n[n.length-1];}
  function roleBtn(p,k){if(p.r==='Owner')return '<span class="text-[12px] text-slate-500 px-2">Owner</span>';return '<button type="button" data-rs-role="'+k+'" class="btn-out flex items-center gap-1" style="padding:3px 8px;font-size:12px;">'+p.r+CH+'</button>';}
  function html(){
    var others=S.people.filter(function(p){return p.r!=='Owner';});
    var h='<div class="px-6 pt-5 pb-4 border-b border-slate-100 flex items-center"><div class="flex-1 text-[16px] font-semibold text-slate-900">Manage access</div><button type="button" class="w-8 h-8 -mr-2 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700" data-rs-close aria-label="Close">'+X+'</button></div>';
    h+='<div class="px-6 pb-20 overflow-y-auto" style="max-height:100%">';
    h+='<div class="mt-4 flex items-start gap-2"><div class="relative flex-1"><div data-rs-box class="min-h-[32px] px-1.5 py-1 border border-slate-300 rounded-md flex flex-wrap items-center gap-1 cursor-text focus-within:border-brand-400">'
      +S.chips.map(function(c,k){return '<span class="inline-flex items-center gap-1 pl-1 pr-1.5 py-0.5 rounded-full bg-slate-100 text-[12px] text-slate-800">'+av(c,'w-4 h-4 text-[7px]')+e(c.n)+(c.g?' <span class="text-slate-400">· '+c.g+'</span>':'')+'<button type="button" data-rs-unchip="'+k+'" class="ml-0.5 text-slate-400 hover:text-slate-700">×</button></span>';}).join('')
      +'<input data-rs-input type="text" autocomplete="off" value="'+e(S.q)+'" placeholder="'+(S.chips.length?'':'Add people or teams')+'" class="flex-1 min-w-[90px] h-6 px-1 text-[13px] outline-none bg-transparent"></div>'
      +'<div data-rs-sugg class="hidden absolute left-0 right-0 top-full mt-1 rounded-lg border border-slate-200 bg-white py-1 z-50" style="box-shadow:0 16px 40px -8px rgba(15,23,42,.2)"></div></div>'
      +'<button type="button" data-rs-role="new" class="btn-out flex items-center gap-1 h-8" style="padding:0 9px;font-size:12.5px;">'+S.role+CH+'</button><button type="button" data-rs-add class="btn-out h-8" style="padding:0 12px;font-size:12.5px;'+DARK+'">Share</button></div>';
    if(S.pend)h+=bar('Sharing with '+names(S.pend)+' notifies everyone with access. Continue?','data-rs-cancel','data-rs-confirm','Share');
    if(S.xfer!=null)h+=bar('Make '+e(S.people[S.xfer].n)+' the Owner? You become an Editor.','data-rs-xno','data-rs-xyes','Make owner');
    h+='<div class="mt-3 rounded-lg bg-slate-50 px-3 py-2.5 flex items-start gap-2 text-[12px] text-slate-600 leading-[1.45]"><span class="text-slate-400 mt-px shrink-0">'+INFO+'</span><span>People get the full Roll up: issues, actions, decisions and patterns, with quotes. They don’t get the Contexts in it. Clicking through asks the Context’s Owner for access.</span></div>';
    h+=hd('People with access');
    h+='<div class="divide-y divide-slate-100">'+S.people.map(function(p,k){return '<div class="flex items-center gap-3 py-2.5">'+av(p)+'<div class="flex-1 min-w-0"><div class="text-[13px] text-slate-900">'+e(p.n)+(p.you?' <span class="text-slate-400">· you</span>':'')+'</div>'+(p.g?'<div class="text-[11.5px] text-slate-500">Team · '+p.g+' people</div>':'')+'</div>'+roleBtn(p,k)+'</div>';}).join('')+'</div>';
    h+=hd('General access');
    h+='<div class="flex items-center gap-3 py-2.5"><span class="w-7 h-7 rounded-full bg-slate-100 text-slate-500 inline-flex items-center justify-center shrink-0">'+LOCK+'</span><div class="flex-1 min-w-0"><div class="text-[13px] text-slate-900">'+(S.priv?'Private':'Restricted')+'</div><div class="text-[11.5px] text-slate-500">'+(S.priv?'Only you can open it. Add people above to share it again.':'Only people with access can open it')+'</div></div>'+((!S.priv&&others.length)?'<button type="button" data-rs-priv class="text-[12.5px] font-medium text-slate-600 hover:text-slate-900 whitespace-nowrap">Make private</button>':'')+'</div>';
    if(S.privAsk&&others.length)h+=bar('Only you will see '+e(rname())+'. '+names(others)+(others.length===1?' loses':' lose')+' access. Nothing is deleted, and they aren’t told.','data-rs-privno','data-rs-privyes','Make private');
    h+='</div><div class="absolute bottom-0 left-0 right-0 px-6 py-3 border-t border-slate-100 bg-white flex items-center gap-2"><button type="button" data-rs-copy class="btn-out" style="padding:4px 10px;font-size:12.5px;">Copy link</button><button type="button" class="btn-out ml-auto" data-rs-close style="padding:4px 12px;font-size:12.5px;'+DARK+'">Done</button></div>';
    return h;
  }
  function ensure(){
    if (drawer) return drawer;
    panel.insertAdjacentHTML('beforeend','<div data-rs-drawer class="hidden"><div class="absolute inset-0 bg-slate-900/20 z-20 rounded-2xl" data-rs-close></div><aside data-rs-rail class="absolute top-0 right-0 bottom-0 w-[460px] bg-white border-l border-slate-200 z-30 shadow-2xl"></aside></div>'
      +'<div data-rs-modal class="hidden absolute inset-0 z-40 items-center justify-center px-4" style="background:rgba(15,23,42,.35)"><div class="w-full max-w-[440px] rounded-xl bg-white border border-slate-200 shadow-card p-6 text-left"><div class="text-[16px] font-semibold text-slate-900" data-rs-mt></div><p class="mt-2 text-[13.5px] text-slate-600" data-rs-mp></p><div class="mt-6 flex justify-end gap-2"><button type="button" data-rs-mcancel class="btn-out">Cancel</button><button type="button" data-rs-mok class="btn-out" style="background:#e11d48;color:#fff;border-color:#e11d48">Delete for everyone</button></div></div></div>'
      +'<div data-rs-toast class="hidden absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-900 text-white text-[12.5px] shadow-lg"><span data-rs-tt></span><button type="button" data-rs-undo class="font-semibold underline">Undo</button></div>');
    drawer = panel.querySelector('[data-rs-drawer]'); return drawer;
  }
  function rail(){ return ensure().querySelector('[data-rs-rail]'); }
  function render(){ rail().innerHTML = html(); placeMenu(); }
  function openShare(priv){ ensure().classList.remove('hidden'); menu=null; S.privAsk = !!priv; render(); }
  function closeShare(){ if (drawer) drawer.classList.add('hidden'); menu=null; placeMenu(); }
  var tt=null;
  function toast(msg, undo){ ensure(); var t=panel.querySelector('[data-rs-toast]'); t.querySelector('[data-rs-tt]').textContent=msg; t.querySelector('[data-rs-undo]').classList.toggle('hidden',!undo); t.classList.remove('hidden'); clearTimeout(tt); tt=setTimeout(function(){ t.classList.add('hidden'); },3200); }
  function menuHTML(k){var p=k==='new'?null:S.people[+k],cur=p?p.r:S.role;
    var h=['Editor','Viewer'].map(function(r){return '<button type="button" data-rs-set="'+k+':'+r+'" class="w-full flex flex-col items-start px-3 py-1.5 hover:bg-slate-50 text-left"><span class="text-[13px] '+(cur===r?'font-medium text-slate-900':'text-slate-700')+'">'+r+(cur===r?' ✓':'')+'</span><span class="text-[11.5px] text-slate-400">'+ROLE[r]+'</span></button>';}).join('');
    if(p)h+='<div class="my-1 h-px bg-slate-100"></div>'+(p.g?'':'<button type="button" data-rs-own="'+k+'" class="w-full px-3 py-1.5 text-[13px] text-slate-700 hover:bg-slate-50 text-left">Make owner</button>')+'<button type="button" data-rs-rm="'+k+'" class="w-full px-3 py-1.5 text-[13px] text-rose-600 hover:bg-rose-50 text-left">Remove access</button>';
    return '<div data-rs-menu class="fixed z-[90] w-[240px] rounded-lg border border-slate-200 bg-white py-1 text-left" style="box-shadow:0 16px 40px -8px rgba(15,23,42,.25)">'+h+'</div>';}
  function placeMenu(){var old=document.querySelector('[data-rs-menu]');if(old)old.remove();if(menu===null||!drawer)return;
    var btn=rail().querySelector('[data-rs-role="'+menu+'"]');if(!btn){menu=null;return;}
    document.body.insertAdjacentHTML('beforeend',menuHTML(menu));
    var m=document.querySelector('[data-rs-menu]'),r=btn.getBoundingClientRect(),mh=m.offsetHeight,top=r.bottom+4;
    if(top+mh>window.innerHeight-8)top=Math.max(8,r.top-4-mh);
    m.style.top=top+'px';m.style.left=Math.max(8,r.right-m.offsetWidth)+'px';}
  function focusIn(){var i=rail().querySelector('[data-rs-input]');if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length);}}
  function sugg(){var box=rail().querySelector('[data-rs-sugg]'),q=S.q.trim().toLowerCase();
    var list=q?DIR.filter(function(d){return d.n.toLowerCase().indexOf(q)>-1||(d.t||'').toLowerCase().indexOf(q)>-1;}).slice(0,6):[];
    if(!list.length){box.classList.add('hidden');box.innerHTML='';return;}
    box.innerHTML=list.map(function(d){var x=has(d.n);return '<button type="button" '+(x?'disabled':'data-rs-pick="'+DIR.indexOf(d)+'"')+' class="w-full flex items-center gap-2.5 px-3 py-1.5 text-left '+(x?'opacity-50 cursor-default':'hover:bg-slate-50')+'">'+av(d,'w-6 h-6 text-[9px]')+'<span class="flex-1 min-w-0"><span class="block text-[13px] text-slate-800">'+d.n+'</span><span class="block text-[11.5px] text-slate-400">'+(d.g?'Team · '+d.g+' people':d.t)+'</span></span>'+(x?'<span class="text-[11.5px] text-slate-400">'+(S.people.some(function(p){return p.n===d.n;})?'Has access':'Added')+'</span>':'')+'</button>';}).join('');
    box.classList.remove('hidden');}
  function typed(){var n=S.q.trim();if(n&&!has(n)){var q=n.toLowerCase(),d=n.indexOf('@')>-1?null:(DIR.filter(function(x){return x.n.toLowerCase()===q;})[0]||DIR.filter(function(x){return !has(x.n)&&x.n.toLowerCase().indexOf(q)>-1;})[0]);S.chips.push(d?{i:d.i,n:d.n,g:d.g}:{i:ini(n),n:n});}S.q='';}
  function closeMore(){ sec.querySelectorAll('[data-ru-moremenu]').forEach(function(m){ m.classList.add('hidden'); }); }
  document.addEventListener('click', function(ev){
    var b = ev.target.closest('button');
    if (b && b.hasAttribute('data-ru-more') && sec.contains(b)) { ev.stopPropagation(); b.parentNode.querySelector('[data-ru-moremenu]').classList.toggle('hidden'); return; }
    if (!ev.target.closest('[data-ru-morewrap]')) closeMore();
    if (b && sec.contains(b)) {
      if (b.hasAttribute('data-ru-share')) { ev.stopPropagation(); openShare(false); return; }
      if (b.hasAttribute('data-ru-priv')) { ev.stopPropagation(); closeMore(); openShare(true); return; }
      if (b.hasAttribute('data-ru-edit')) { closeMore(); location.hash = 'rollup-create'; return; }
      if (b.hasAttribute('data-ru-hide')) { closeMore(); toast('Hidden for you. It stays for everyone else.', true); return; }
      if (b.hasAttribute('data-ru-del')) { closeMore(); ensure(); var m=panel.querySelector('[data-rs-modal]'); var n=S.people.filter(function(p){return !p.you;}).reduce(function(t,p){return t+(p.g||1);},0);
        m.querySelector('[data-rs-mt]').textContent='Delete '+rname()+'?';
        m.querySelector('[data-rs-mp]').textContent='Deletes it for '+n+' people, and tells them. The Contexts in it aren’t touched.';
        m.classList.remove('hidden'); m.classList.add('flex'); return; }
      if (b.hasAttribute('data-rs-mcancel') || b.hasAttribute('data-rs-mok')) { var m2=panel.querySelector('[data-rs-modal]'); m2.classList.add('hidden'); m2.classList.remove('flex'); if (b.hasAttribute('data-rs-mok')) toast('Deleted for everyone.', false); return; }
      if (b.hasAttribute('data-rs-undo')) { panel.querySelector('[data-rs-toast]').classList.add('hidden'); return; }
    }
    if (!drawer || drawer.classList.contains('hidden')) return;
    var inMenu=ev.target.closest('[data-rs-menu]'), onRole=ev.target.closest('[data-rs-role]');
    if (menu!==null && !inMenu && !onRole) { menu=null; placeMenu(); }
    if (ev.target.closest('[data-rs-close]')) { closeShare(); return; }
    if (!ev.target.closest('[data-rs-sugg]') && !ev.target.closest('[data-rs-input]')) { var sb=rail().querySelector('[data-rs-sugg]'); if (sb) sb.classList.add('hidden'); }
    if (!inMenu && !ev.target.closest('[data-rs-rail]')) return;
    if (ev.target.closest('[data-rs-box]') && !b) { focusIn(); return; }
    if (!b) return; var a;
    if((a=b.getAttribute('data-rs-role'))!==null){ev.stopPropagation();menu=menu===a?null:a;placeMenu();return;}
    if((a=b.getAttribute('data-rs-set'))!==null){ev.stopPropagation();var p=a.split(':');if(p[0]==='new')S.role=p[1];else S.people[+p[0]].r=p[1];menu=null;render();return;}
    if((a=b.getAttribute('data-rs-rm'))!==null){ev.stopPropagation();S.people.splice(+a,1);menu=null;render();return;}
    if((a=b.getAttribute('data-rs-own'))!==null){ev.stopPropagation();S.xfer=+a;menu=null;render();return;}
    if((a=b.getAttribute('data-rs-pick'))!==null){ev.stopPropagation();var d=DIR[+a];S.chips.push({i:d.i,n:d.n,g:d.g});S.q='';render();focusIn();return;}
    if((a=b.getAttribute('data-rs-unchip'))!==null){ev.stopPropagation();S.chips.splice(+a,1);render();focusIn();return;}
    if(b.hasAttribute('data-rs-priv')){S.privAsk=true;render();return;}
    if(b.hasAttribute('data-rs-privyes')){S.people=S.people.filter(function(p){return p.r==='Owner';});S.priv=true;S.privAsk=false;render();return;}
    if(b.hasAttribute('data-rs-privno')){S.privAsk=false;render();return;}
    if(b.hasAttribute('data-rs-add')){typed();if(S.chips.length)S.pend=S.chips.slice();render();return;}
    if(b.hasAttribute('data-rs-confirm')){S.pend.forEach(function(c){S.people.push({i:c.i,n:c.n,g:c.g,r:S.role});});S.priv=false;S.chips=[];S.pend=null;render();return;}
    if(b.hasAttribute('data-rs-cancel')){S.pend=null;render();focusIn();return;}
    if(b.hasAttribute('data-rs-xyes')){S.people.forEach(function(p){if(p.r==='Owner')p.r='Editor';});S.people[S.xfer].r='Owner';S.xfer=null;render();return;}
    if(b.hasAttribute('data-rs-xno')){S.xfer=null;render();return;}
    if(b.hasAttribute('data-rs-copy')){try{navigator.clipboard.writeText(location.href.split('#')[0]+'#rollup');}catch(x){}b.textContent='Link copied';setTimeout(function(){b.textContent='Copy link';},1600);return;}
  }, true);
  document.addEventListener('input', function(ev){ if (ev.target.matches && ev.target.matches('[data-rs-input]')) { S.q=ev.target.value; sugg(); } });
  document.addEventListener('keydown', function(ev){
    if (ev.key==='Escape') { if (menu!==null) { menu=null; placeMenu(); return; } closeShare(); closeMore(); return; }
    if (!(ev.target.matches && ev.target.matches('[data-rs-input]'))) return;
    if (ev.key==='Enter') { ev.preventDefault(); typed(); if (!ev.target.value.trim() && S.chips.length && !S.pend) S.pend=S.chips.slice(); render(); focusIn(); }
    else if (ev.key==='Backspace' && !S.q && S.chips.length) { ev.preventDefault(); S.chips.pop(); render(); focusIn(); }
  }, true);
  document.addEventListener('scroll', function(){ if (menu!==null) { menu=null; placeMenu(); } }, true);
  // Switching the example resets the drawer for that Roll up.
  sec.addEventListener('click', function(ev){ if (ev.target.closest('[data-ru-v]')) { S=fresh(); closeShare(); } });
})();
