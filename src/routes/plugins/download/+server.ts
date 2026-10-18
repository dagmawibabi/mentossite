import { error } from '@sveltejs/kit';
import { createHash } from 'node:crypto';
import { registries, parseRegistry } from '#lib/server/registries.ts';
import type { RequestHandler } from './$types';
export const GET: RequestHandler = async ({url,fetch}) => {
 const registry=registries.find(r=>r.id===url.searchParams.get('repo'));
 if(!registry) error(400,'Unknown repository');
 try {
  const get = async (path:string) => {
   for(let attempt=0;attempt<2;attempt++) {
    try { const r=await fetch(path,{signal:AbortSignal.timeout(15000),cache:'no-store'}); if(!r.ok) throw new Error('GitHub fetch failed'); return r; }
    catch(cause) { if(attempt===1) throw cause; }
   }
   throw new Error('GitHub unavailable');
  };
  const entries=parseRegistry(await (await get(registry.url)).json(),registry.id,registry.url);
  const plugin=entries.find(p=>p.id===url.searchParams.get('id'));
  if(!plugin) error(404,'Plugin not found');
  const manifest=await (await get(plugin.manifestUrl)).json();
  if(manifest.id!==plugin.id || manifest.version!==plugin.version || manifest.main!==plugin.main || JSON.stringify(manifest.permissions)!==JSON.stringify(plugin.permissions)) throw new Error('Registry and manifest differ');
  const source=await (await get(plugin.sourceUrl)).text();
  if(!plugin.sha256 || createHash('sha256').update(source).digest('hex')!==plugin.sha256) throw new Error('Checksum mismatch');
  // Escape comment terminators in metadata before producing the single-file installer.
  const header=JSON.stringify(manifest).replaceAll('*/','*\\u002f');
  return new Response(`/* @plugin ${header} */\n${source}`,{headers:{'content-type':'application/javascript; charset=utf-8','content-disposition':`attachment; filename="${plugin.id}.js"`,'cache-control':'no-store'}});
 } catch (cause) { console.error('Plugin download:', cause); error(502,'Unable to prepare a verified plugin download. Please retry or install from the registry in Mentos.'); }
};



