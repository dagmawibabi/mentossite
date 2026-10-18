import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const entries = [];
for (const dir of (await readdir('plugins', {withFileTypes:true})).filter(d=>d.isDirectory()).sort((a,b)=>a.name.localeCompare(b.name))) {
 const base = `plugins/${dir.name}`;
 const manifest = JSON.parse(await readFile(`${base}/plugin.json`,'utf8'));
 if (manifest.id !== dir.name || manifest.main !== 'main.js') throw new Error(`Invalid plugin: ${dir.name}`);
 const source = await readFile(`${base}/main.js`,'utf8');
 const sha256 = createHash('sha256').update(source).digest('hex');
 await mkdir(`static/${base}`,{recursive:true});
 await writeFile(`static/${base}/plugin.json`,JSON.stringify(manifest,null,2)+'\n');
 await writeFile(`static/${base}/main.js`,source);
 await writeFile(`static/plugins/${dir.name}.js`,`/* @plugin ${JSON.stringify(manifest)} */\n${source}`);
 entries.push({...manifest,sha256,manifest:`${dir.name}/plugin.json`});
}
const registry = JSON.stringify({name:'Mentos community plugins',version:1,plugins:entries},null,2)+'\n';
await writeFile('plugins/index.json',registry);
await writeFile('static/plugins/index.json',registry);
await writeFile('src/lib/plugin-catalog.json',registry);
console.log(`Built ${entries.length} plugins with SHA-256 pins and single-file installers.`);
