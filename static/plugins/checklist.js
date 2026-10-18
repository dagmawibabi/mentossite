/* @plugin {"id":"checklist","name":"Checklist","version":"1.0.0","author":"Mentos","description":"Keep a private checklist. Add tasks with /todo and tap a task to mark it done.","icon":"note","permissions":["commands","storage","ui"],"main":"main.js"} */
let draft = '';
function tasks() { return mentos.storage.get('tasks', []); }
function add(text) { if (!text.trim()) return; const list = tasks(); list.unshift({text: text.trim(), done: false}); mentos.storage.set('tasks', list.slice(0,100)); draft = ''; }
mentos.commands.add('todo', 'Add a private checklist item', (args) => { add(args); return ''; });
mentos.ui.page({id:'main', title:'Checklist', icon:'note', render: () => [
 {type:'input', key:'task', label:'New task', value:draft, onChange:(v)=>{draft=v;}, onSubmit:(v)=>add(v)},
 {type:'button', label:'Add task', onTap:()=>add(draft)},
 {type:'text', text:'Private to this device. Tap a task to toggle completion.', style:'muted'},
 {type:'list', items:tasks().map((t,i)=>({title:(t.done ? '✓ ' : '○ ')+t.text, subtitle:t.done ? 'Completed' : 'To do', onTap:()=>{const list=tasks(); list[i].done=!list[i].done; mentos.storage.set('tasks',list);}}))},
 {type:'button', label:'Clear completed', style:'text', onTap:()=>mentos.storage.set('tasks',tasks().filter((t)=>!t.done))}
]});
