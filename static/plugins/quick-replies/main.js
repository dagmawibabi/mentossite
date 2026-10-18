function replies() { return mentos.storage.get('replies',['On my way.','Thanks! I will get back to you soon.','Could you send a little more detail?']); }
mentos.commands.add('reply','Insert saved reply 1, 2, or 3',(args)=>{const n=Number(args.trim()); if(n<1 || n>3 || Math.floor(n)!==n) return ''; return replies()[n-1];});
mentos.ui.page({id:'main',title:'Quick replies',icon:'chat',render:()=>[
 {type:'text',text:'Use /reply 1, /reply 2, or /reply 3 in a conversation. The selected reply is sent when you submit the command.',style:'muted'},
 ...replies().map((text,i)=>({type:'input',key:'reply-'+i,label:'Reply '+(i+1),value:text,multiline:true,onChange:(v)=>{const list=replies(); list[i]=v; mentos.storage.set('replies',list);}}))
]});
