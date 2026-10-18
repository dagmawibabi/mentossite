export const registries = [
 { id: 'mentos', url: 'https://raw.githubusercontent.com/dagmawibabi/mentos/main/plugins/index.json' },
 { id: 'mentossite', url: 'https://raw.githubusercontent.com/dagmawibabi/mentossite/main/plugins/index.json' }
];
export type Plugin = {id:string;name:string;version:string;author:string;description:string;icon:string;permissions:string[];main:string;sha256?:string;manifest:string;repository:string;manifestUrl:string;sourceUrl:string;downloadUrl:string;local?:boolean};
export function parseRegistry(data: unknown, repository: string, url: string): Plugin[] {
 if (!data || typeof data !== 'object' || !('plugins' in data) || !Array.isArray(data.plugins)) throw new Error('Invalid registry format');
 return data.plugins.map((p: unknown) => {
  if (!p || typeof p !== 'object') throw new Error('Invalid plugin');
  const item = p as Record<string, unknown>;
  for (const key of ['id','name','version','description','manifest','main']) if (typeof item[key] !== 'string') throw new Error(`Invalid plugin ${key}`);
  if (!/^[a-z0-9][a-z0-9-]{1,39}$/.test(item.id as string) || !Array.isArray(item.permissions) || !item.permissions.every(x=>typeof x==='string')) throw new Error('Invalid plugin metadata');
  const base = new URL('.',url).href;
  const manifestUrl = new URL(item.manifest as string,url).href;
  const sourceUrl = new URL(item.main as string,manifestUrl).href;
  if (!manifestUrl.startsWith(base) || !sourceUrl.startsWith(base)) throw new Error('Plugin path leaves registry');
  return {...item,author:typeof item.author==='string'?item.author:'Community',icon:typeof item.icon==='string'?item.icon:'code',repository,manifestUrl,sourceUrl,downloadUrl:`/plugins/download?repo=${repository}&id=${item.id}`} as Plugin;
 });
}
export async function readRegistries(fetcher: typeof fetch) {
 const results = await Promise.all(registries.map(async registry => {
  try {
   const response = await fetcher(registry.url,{signal:AbortSignal.timeout(8000),cache:'no-store'});
   if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
   return {...registry,plugins:parseRegistry(await response.json(),registry.id,registry.url),error:null};
  } catch (error) { return {...registry,plugins:[] as Plugin[],error:error instanceof Error?error.message:'Unable to load registry'}; }
 }));
 return {plugins:results.flatMap(r=>r.plugins).sort((a,b)=>a.name.localeCompare(b.name)),sources:results.map(({id,url,plugins,error})=>({id,url,count:plugins.length,error}))};
}
