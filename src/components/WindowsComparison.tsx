import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';
import { windowsComparisons, type WindowsComparison as Comparison } from '@/lib/windows-comparisons';

export function comparisonMetadata(comparison: Comparison): Metadata {
  return {
    title: comparison.title, description: comparison.description,
    alternates: { canonical: `${getSiteUrl()}${comparison.path}` },
    openGraph: { title: comparison.title, description: comparison.description, type: 'article', url: `${getSiteUrl()}${comparison.path}` },
  };
}

export function WindowsComparisonLinks({ app }: { app?: string }) {
  return <section className="space-y-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
    <h2 className="text-2xl font-bold">Compare your options</h2>
    <ul className="space-y-3">{windowsComparisons.filter(c => !app || c.app === app).map(c =>
      <li key={c.path}><Link className="underline underline-offset-4 hover:text-blue-600" href={c.path}>{c.title}</Link></li>
    )}</ul>
  </section>;
}

export function WindowsComparison({ comparison: c }: { comparison: Comparison }) {
  const base = getSiteUrl();
  const schema = { '@context': 'https://schema.org', '@type': 'Article', headline: c.title,
    description: c.description, datePublished: '2026-10-30', dateModified: '2026-10-30',
    author: { '@type': 'Organization', name: 'Tendercraft', url: base },
    mainEntityOfPage: `${base}${c.path}` };
  return <article className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-10 text-zinc-900 dark:text-zinc-100">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <nav aria-label="Breadcrumb" className="text-sm flex flex-wrap gap-3 underline">
      <Link href="/apps/windows">Windows apps</Link><span aria-hidden="true">/</span><Link href={`/apps/${c.app}`}>{c.name}</Link>
    </nav>
    <header className="space-y-5 max-w-4xl">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">30 October 2026 · Written by Tendercraft, maker of {c.name}</p>
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">{c.title}</h1>
      <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
    </header>
    <section aria-label="Feature comparison" className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-[760px] w-full text-sm text-left">
        <caption className="text-left p-4 text-zinc-600 dark:text-zinc-400">Vendor information checked 30 October 2026. Column links lead to the product sources; check current terms before buying.</caption>
        <thead className="bg-zinc-100 dark:bg-zinc-900"><tr><th scope="col" className="p-4">What matters</th>{c.columns.map(col => <th scope="col" key={col.name} className="p-4"><a className="underline" href={col.url}>{col.name}</a></th>)}</tr></thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">{c.rows.map(row => <tr key={row.label}><th scope="row" className="p-4 align-top">{row.label}</th>{row.cells.map((cell, i) => <td key={i} className="p-4 align-top leading-relaxed">{cell}</td>)}</tr>)}</tbody>
      </table>
    </section>
    <div className="max-w-4xl space-y-9">{c.sections.map(section => <section key={section.title} className="space-y-3"><h2 className="text-2xl font-bold">{section.title}</h2><p className="leading-relaxed text-zinc-700 dark:text-zinc-300">{section.text}</p></section>)}</div>
    <aside className="max-w-4xl space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Sources and next steps</h2>
      <p>These are product-documentation comparisons, not performance benchmarks. Prices, features and platform support can change.</p>
      <ul className="list-disc pl-5 space-y-2">{c.columns.map(col => <li key={col.name}><a className="underline" href={col.url}>{col.name} product information</a></li>)}
        {c.app === 'cropmark' && <li><a className="underline" href="https://support.techsmith.com/hc/en-us/articles/41688272400781-What-Is-the-Difference-Between-Snagit-Pro-Snagit-Create-and-Snagit">TechSmith plan and capture features</a></li>}
        {c.app === 'still-lane' && <li><a className="underline" href="https://docs.activitywatch.net/en/latest/faq.html">ActivityWatch licence and local storage FAQ</a></li>}
      </ul>
    </aside>
    <Link href={`/apps/${c.app}`} className="inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">See {c.name} features and Store link</Link>
    <WindowsComparisonLinks />
  </article>;
}
