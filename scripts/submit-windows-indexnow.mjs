import { readFile } from 'node:fs/promises';

const config = JSON.parse(await readFile(new URL('./windows-indexnow.json', import.meta.url), 'utf8'));
if (config.host !== 'tendercrafthq.com' || !/^[a-f0-9]{32}\.txt$/.test(config.keyFile)) throw new Error('Unexpected IndexNow host or key filename');
const key = (await readFile(new URL(`../public/${config.keyFile}`, import.meta.url), 'utf8')).trim();
if (config.keyFile !== `${key}.txt`) throw new Error('IndexNow key/file mismatch');
const base = `https://${config.host}`;
const urlList = config.paths.map(path => `${base}${path}`);

if (!process.argv.includes('--submit')) {
  console.log(JSON.stringify({ mode: 'dry-run', endpoint: 'https://api.indexnow.org/indexnow', urls: urlList }, null, 2));
} else {
  const keyLocation = `${base}/${config.keyFile}`;
  const proof = await fetch(keyLocation, { signal: AbortSignal.timeout(20000) });
  if (!proof.ok || (await proof.text()).trim() !== key) throw new Error('Public ownership file is not deployed or does not match');
  for (const url of urlList) {
    const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  }
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: config.host, key, keyLocation, urlList }),
    signal: AbortSignal.timeout(30000),
  });
  console.log(JSON.stringify({ submittedAt: new Date().toISOString(), status: response.status, urls: urlList, response: (await response.text()).slice(0, 1000) }, null, 2));
  if (![200, 202].includes(response.status)) process.exitCode = 1;
}
