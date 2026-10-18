<script lang="ts">
 let {code, label='main.js'}: {code:string;label?:string}=$props();
 let status=$state('');
 async function copy(){try{await navigator.clipboard.writeText(code);status='Copied';}catch{status='Select the code to copy';}}
</script>
<div class="code"><div class="bar"><span>{label}</span><button onclick={copy}>Copy code</button><span role="status">{status}</span></div><pre><code>{code}</code></pre></div>
<style>.code{border:1px solid var(--line);border-radius:14px;overflow:hidden;margin:22px 0;background:var(--surface)}.bar{display:flex;gap:16px;align-items:center;padding:10px 18px;border-bottom:1px solid var(--line);font:11px monospace;color:var(--muted)}button{margin-left:auto;background:transparent;border:0;color:var(--green);font:inherit;cursor:pointer}pre{margin:0;padding:22px;overflow-x:auto;font-size:12px;line-height:1.85;color:var(--ink);tab-size:2}button:focus-visible{outline:2px solid var(--green)}</style>
