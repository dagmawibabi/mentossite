import { readRegistries } from '#lib/server/registries.ts';
import catalog from '#lib/plugin-catalog.json';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({fetch, setHeaders}) => {
 setHeaders({'cache-control':'no-store'});
 const result = await readRegistries(fetch);
 // Keep unpublished packages available, without replacing the live repository entries.
 for (const p of catalog.plugins) {
  if (!result.plugins.some(entry=>entry.repository==='mentossite' && entry.id===p.id)) {
   result.plugins.push({...p,repository:'mentossite',manifestUrl:`/plugins/${p.id}/plugin.json`,sourceUrl:`/plugins/${p.id}/main.js`,downloadUrl:`/plugins/${p.id}.js`,local:true});
  }
 }
 return result;
};

