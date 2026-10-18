let ends = 0;
let alarm = null;
function stop() { if (alarm !== null) mentos.timer.cancel(alarm); alarm=null; ends=0; }
function start() { stop(); ends=Date.now()+25*60*1000; alarm=mentos.timer.after(1500,()=>{ends=0; alarm=null; mentos.notify('Focus session complete. Take a break.'); mentos.ui.refresh();}); }
mentos.timer.every(5,()=>{if(ends>0) mentos.ui.refresh();});
mentos.ui.page({id:'main',title:'Focus timer',icon:'timer',render:()=>[
 {type:'stat',label:'Minutes remaining',value:ends>0 ? String(Math.max(0,Math.ceil((ends-Date.now())/60000))) : 'Ready'},
 {type:'text',text:'25 minutes for one thing. Keep Mentos open; closing or disabling this plugin cancels the timer.',style:'muted'},
 {type:'button',label:ends>0 ? 'Restart 25 minutes' : 'Start 25 minutes',onTap:start},
 {type:'button',label:'Cancel session',style:'outline',onTap:stop}
]});
