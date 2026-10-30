import { readFile, writeFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const config = JSON.parse(await readFile(new URL('./windows-indexnow.json', import.meta.url), 'utf8'));
if (config.host !== 'tendercrafthq.com' || !/^[a-f0-9]{32}\.txt$/.test(config.keyFile)) throw new Error('Unexpected IndexNow host or key filename');
const key = (await readFile(new URL(`../public/${config.keyFile}`, import.meta.url), 'utf8')).trim();
if (config.keyFile !== `${key}.txt`) throw new Error('IndexNow key/file mismatch');
const base = `https://${config.host}`;
const urlList = config.paths.map(path => `${base}${path}`);

if (!process.argv.includes('--submit')) {
  console.log(JSON.stringify({ mode: 'dry-run', endpoint: 'https://api.indexnow.org/indexnow', urls: urlList }, null, 2));
} else {
  const reportArg = process.argv.indexOf('--report');
  if (reportArg < 0 || !process.argv[reportArg + 1]) throw new Error('Provide a new --report path to retain submission evidence');
  const reportPath = resolve(process.argv[reportArg + 1]);
  try { await access(reportPath); throw new Error('Report already exists; check previous submission before repeating URLs'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const keyLocation = `${base}/${config.keyFile}`;
  const proof = await fetch(keyLocation, { signal: AbortSignal.timeout(20000) });
  if (!proof.ok || (await proof.text()).trim() !== key) throw new Error('Public ownership file is not deployed or does not match');
  for (const url of urlList) {
    const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
    if (response.status !== 200) throw new Error(`${url} returned ${response.status}`);
    const html = await response.text();
    if (!html.includes(`rel="canonical" href="${url}"`)) throw new Error(`Canonical mismatch: ${url}`);
    if (/name="robots"[^>]*content="[^"]*noindex/i.test(html)) throw new Error(`Page is noindex: ${url}`);
  }
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: config.host, key, keyLocation, urlList }),
    signal: AbortSignal.timeout(30000),
  });
  const evidence = { submittedAt: new Date().toISOString(), endpoint: 'https://api.indexnow.org/indexnow', status: response.status, urls: urlList, response: (await response.text()).slice(0, 1000), interpretation: response.status === 200 ? 'URLs received; indexing is a separate decision' : response.status === 202 ? 'URLs received; ownership validation pending' : 'Submission failed' };
  await writeFile(reportPath, JSON.stringify(evidence, null, 2) + '\n', { flag: 'wx' });
  console.log(JSON.stringify(evidence, null, 2));
  if (![200, 202].includes(response.status)) process.exitCode = 1;
}
