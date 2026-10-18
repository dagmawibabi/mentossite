<script lang="ts">
 import catalog from './plugin-catalog.json';
</script>
<section class="plugin-section" id="plugins" aria-labelledby="plugin-heading">
 <div class="intro"><p class="eyebrow">SMALL TOOLS. MORE POSSIBILITIES.</p><h2 id="plugin-heading">Make room for<br /><em>your own ideas.</em></h2><p>Give Mentos a new command, a personal tool, or a different look. Plugins run inside the app and build pages with its native UI.</p><a class="button primary" href="/plugins">Explore plugins <span aria-hidden="true">↗</span></a></div>
 <div class="plugin-list">{#each catalog.plugins as plugin, i}<a href={`/plugins#${plugin.id}`}><span class="number">0{i+1}</span><div><h3>{plugin.name}</h3><p>{plugin.description}</p><small>{plugin.permissions.join(' · ')}</small></div><span aria-hidden="true">↗</span></a>{/each}</div>
 <div class="plugin-foot"><strong>You choose what runs.</strong><span>Review permissions before installing. Disable or remove plugins in Settings → Plugins. The sandbox exposes only approved APIs.</span></div>
</section>
<style>
 .plugin-section {margin:80px 0;padding:64px;border:1px solid var(--line);border-radius:28px;background:var(--surface);display:grid;grid-template-columns:1fr 1.1fr;gap:45px;}
 h2 {font-size:clamp(32px,4vw,53px);line-height:1.08;letter-spacing:-2px;margin:22px 0;}em{font-style:normal;color:var(--green);}.intro>p:not(.eyebrow){color:var(--muted);line-height:1.8;max-width:390px;margin-bottom:28px;}
 .plugin-list>a{display:flex;align-items:baseline;gap:18px;text-decoration:none;color:var(--ink);padding:23px 0;border-bottom:1px solid var(--line);}.plugin-list>a:first-child{padding-top:0}.number,small{font-family:monospace;color:var(--green);font-size:11px;}h3{font-size:21px;margin:0 0 9px;}.plugin-list p{font-size:13px;line-height:1.7;color:var(--muted);margin:0 0 10px;}.plugin-foot{grid-column:1/-1;border-top:1px solid var(--line);padding-top:25px;display:flex;gap:30px;font-size:12px;line-height:1.7;}.plugin-foot span{color:var(--muted);max-width:670px;}
 @media(max-width:800px){.plugin-section{grid-template-columns:1fr;padding:28px;margin:45px 0;gap:28px;}.plugin-foot{flex-direction:column;gap:8px;}}
</style>
