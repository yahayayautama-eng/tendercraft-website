import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { getSiteUrl } from '@/lib/site';
import { recipeBox, recipeBoxGuides } from '@/lib/recipe-box';

type Faq = { question: string; answer: string };

export function guideMetadata(slug: string, title: string, description: string): Metadata {
  const url = `${getSiteUrl()}${recipeBox.path}/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | Tendercraft`, description, url, type: 'article' },
  };
}

/** Shared layout for the Recipe Box guides: one h1, Article + FAQPage JSON-LD, related guides, store link. */
export function RecipeBoxGuide({
  slug,
  title,
  headline,
  description,
  intro,
  faq,
  children,
}: {
  slug: string;
  title: string;
  headline: string;
  description: string;
  intro: string;
  faq?: Faq[];
  children: ReactNode;
}) {
  const baseUrl = getSiteUrl();
  const url = `${baseUrl}${recipeBox.path}/${slug}`;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline,
      description,
      mainEntityOfPage: url,
      dateModified: recipeBox.updatedAt,
      datePublished: recipeBox.updatedAt,
      author: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl },
      publisher: { '@type': 'Organization', name: 'Tendercraft', url: baseUrl },
      about: { '@type': 'SoftwareApplication', name: recipeBox.fullName, url: `${baseUrl}${recipeBox.path}` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Recipe Box for Fire tablets', item: `${baseUrl}${recipeBox.path}` },
        { '@type': 'ListItem', position: 2, name: title, item: url },
      ],
    },
  ];
  if (faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }
  const schema = { '@context': 'https://schema.org', '@graph': graph };
  const others = recipeBoxGuides.filter((g) => g.slug !== slug);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-8 py-14 sm:py-20 text-[#2a211c] dark:text-[#f4ede4]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <Link href={recipeBox.path} className="font-semibold text-[#a63a23] dark:text-[#e58a6f] underline underline-offset-4">← Recipe Box for Fire tablets</Link>
      <h1 className="mt-7 text-4xl sm:text-5xl font-extrabold tracking-tight">{headline}</h1>
      <p className="mt-5 text-lg leading-relaxed">{intro}</p>
      <div className="mt-10 space-y-10 text-lg leading-relaxed">{children}</div>

      {faq?.length ? (
        <section className="mt-14" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold">Questions</h2>
          <div className="mt-4 divide-y divide-[#e6dccf] dark:divide-white/10">
            {faq.map((f) => (
              <div key={f.question} className="py-5">
                <h3 className="text-lg font-bold">{f.question}</h3>
                <p className="mt-2 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <p className="mt-12 rounded-2xl bg-[#faf6f0] dark:bg-[#28241f] p-6">
        {recipeBox.amazonUrl ? (
          <a href={recipeBox.amazonUrl} className="font-bold underline underline-offset-4" rel="noopener">Get Recipe Box on the Amazon Appstore</a>
        ) : (
          <Link href={recipeBox.path} className="font-bold underline underline-offset-4">See Recipe Box for Fire tablets</Link>
        )}
        <span className="block mt-1 text-base">Free for {recipeBox.freeRecipeLimit} recipes, then one purchase to unlock unlimited recipes. No ads, no account.</span>
      </p>

      <nav aria-label="More Recipe Box guides" className="mt-10">
        <h2 className="text-xl font-bold">More guides</h2>
        <ul className="mt-3 space-y-2">
          {others.map((g) => (
            <li key={g.slug}>
              <Link href={`${recipeBox.path}/${g.slug}`} className="underline underline-offset-4">{g.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
