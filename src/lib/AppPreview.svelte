<script lang="ts">
 let { screen = $bindable('Spaces') }: { screen?: string } = $props();
 const screens = ['Spaces', 'Feed', 'Wallet', 'Network', 'You', 'Plugins'];
 let image = $derived(screen.toLowerCase());
</script>
<div class="capture-preview">
 <div class="phone capture-phone" aria-label={`Actual Mentos ${screen} screen with demonstration data`}>
  <img class="light-capture" src={`/screens/${image}-light.png`} alt={`Mentos ${screen}, captured from the Flutter app in light mode`} width="390" height="844" />
  <img class="dark-capture" src={`/screens/${image}-dark.png`} alt={`Mentos ${screen}, captured from the Flutter app in dark mode`} width="390" height="844" />
 </div>
 <div class="screen-picker" aria-label="Choose an app screenshot">
  {#each screens as name}<button class:chosen={screen===name} aria-pressed={screen===name} onclick={()=>screen=name}>{name}</button>{/each}
 </div>
 <p class="capture-caption">Actual app UI · demonstration data</p>
</div>
<style>
 .capture-preview {position:relative;z-index:2;width: min(100%, 316px);margin:auto;}
 .capture-phone.phone {display:block;position:relative;width:100%;height:auto;min-height:0;padding:7px;border:1px solid #414b45;border-radius:32px;background:#17201b;overflow:hidden;box-sizing:border-box;transform:none;box-shadow:0 28px 65px #071c2324;}
 .capture-phone img {display:block;width:100%;height:auto;aspect-ratio:390 / 844;border-radius:25px;}
 .capture-phone .dark-capture {display:none;}
 :global([data-theme='dark']) .capture-phone .light-capture {display:none;}
 :global([data-theme='dark']) .capture-phone .dark-capture {display:block;}
 .screen-picker {display:flex;justify-content:center;flex-wrap:wrap;gap:4px;margin-top:15px;}
 .screen-picker button {font:inherit;font-size:10px;background:var(--surface);color:var(--muted);border:1px solid var(--line);padding:5px 7px;border-radius:20px;cursor:pointer;}
 .screen-picker button.chosen {background:var(--ink);color:var(--bg);border-color:var(--ink);}
 .screen-picker button:focus-visible {outline:2px solid var(--green);outline-offset:3px;}
 .capture-caption {font-size:10px;text-align:center;color:var(--muted);margin:10px 0 0;}
</style>
