/** Public claims for the Recipe Box pages. Flip availability only after the Amazon listing is live and the URL is verified. */
export const recipeBox = {
  name: 'Recipe Box',
  fullName: 'Recipe Box for Fire tablets',
  path: '/apps/recipe-box',
  availability: 'coming-soon' as 'coming-soon' | 'available',
  amazonUrl: null as string | null,
  supportEmail: 'info@tendercrafthq.com',
  privacyUrl: '/recipe-box/privacy.html',
  updatedAt: '2026-10-24',
  freeRecipeLimit: 20,
} as const;

export function recipeBoxContactUrl(subject = 'Recipe Box question') {
  return `mailto:${recipeBox.supportEmail}?subject=${encodeURIComponent(subject)}`;
}

/** Shown on the page and emitted as FAQPage JSON-LD, so both always match. */
export const recipeBoxFaq = [
  {
    question: 'Does Recipe Box work offline?',
    answer: 'Yes. Your recipes, photos, grocery list and timers are stored on the tablet. Only importing a recipe from a website needs an internet connection.',
  },
  {
    question: 'Can I save recipes from cooking websites?',
    answer: 'Yes. Paste a link from most recipe websites and Recipe Box fills in the title, ingredients, steps and photo. You can also type recipes in by hand.',
  },
  {
    question: 'What is Cook Mode?',
    answer: 'Cook Mode shows one large step at a time with big Next and Back buttons, and keeps the screen on. When a step mentions a time, such as "simmer 20 minutes", a one-tap timer appears. Timers keep running and ring even if you switch apps.',
  },
  {
    question: 'Is it free?',
    answer: `Recipe Box is free for up to ${recipeBox.freeRecipeLimit} recipes. A single one-time purchase removes the limit. There is no subscription.`,
  },
  {
    question: 'Are there ads or accounts?',
    answer: 'No. There are no ads, no accounts and no analytics. Your recipes stay on your tablet.',
  },
  {
    question: 'Can I move my recipes to another tablet?',
    answer: 'Yes. Save a backup file from the app and restore it on another tablet.',
  },
  {
    question: 'Which devices does it run on?',
    answer: 'Recipe Box is made for Amazon Fire tablets. The Amazon Appstore listing shows the supported models.',
  },
];
