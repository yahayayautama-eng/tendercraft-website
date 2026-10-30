export type WindowsComparison = {
  app: string; name: string; path: string; title: string; metaTitle: string; description: string;
  intro: string; columns: { name: string; url: string }[];
  rows: { label: string; cells: string[] }[];
  sections: { title: string; text: string }[];
};

export const windowsComparisons: WindowsComparison[] = [
  {
    metaTitle: 'Windows Text to Speech: Vox Reader vs Speechify vs Balabolka', app: 'vox-reader', name: 'Vox Reader',
    path: '/apps/vox-reader/offline-text-to-speech-comparison',
    title: 'Text to speech on Windows: Vox Reader, Speechify and Balabolka',
    description: 'Compare Windows text-to-speech readers by offline listening, document formats, free allowances and purchase model.',
    intro: 'For offline English listening to your own EPUB books, Vox Reader offers local voices and an optional one-time Pro purchase. Balabolka is a freeware option with installed Windows speech voices. Speechify offers a wider set of platforms and language options. The right choice depends on your documents and where you listen.',
    columns: [
      { name: 'Vox Reader', url: '/apps/vox-reader' },
      { name: 'Speechify', url: 'https://speechify.com/pricing/' },
      { name: 'Balabolka', url: 'https://www.cross-plus-a.com/balabolka.htm' },
    ],
    rows: [
      { label: 'Access model', cells: ['Free tier; optional one-time Pro upgrade through Microsoft Store.', 'Free and subscription Premium plans; check current terms.', 'Freeware; check the licence for your intended use.'] },
      { label: 'Documents', cells: ['Free: DRM-free EPUB, TXT and pasted text. Pro: text-based PDF and DOCX.', 'Text-to-speech and Scan & Listen options are advertised; confirm format support in your chosen app.', 'Supports EPUB, PDF, DOCX and many other text formats.'] },
      { label: 'Offline listening', cells: ['Speech runs on the PC after installation. Store purchase and licence refresh need internet.', 'Confirm offline availability for the specific app, voice and plan before buying.', 'Uses speech voices installed on the computer; voice capabilities depend on the selected engine.'] },
      { label: 'Main tradeoff', cells: ['English only, Windows 10 (19041+) or 11, x64. About 460 MB to download; Free includes 3 hours a week and 3 voices.', 'Premium advertises multiple languages, integrations and voice features beyond book reading.', 'A broad document-to-speech utility; available voices and setup depend on your PC.'] },
    ],
    sections: [
      { title: 'Start with a book you already know', text: 'Import a short, DRM-free EPUB or TXT file and listen before paying. In Vox Reader, the Free allowance is three listening hours each week. Pro removes the limit, adds all 11 bundled voices and unlocks PDF/DOCX import. Scanned image-only PDFs need text recognition elsewhere first. Speech speed and responsiveness depend on your processor.' },
      { title: 'Choose for your actual reading routine', text: 'Choose Vox Reader when local English speech, saved reading positions and a one-time upgrade fit a Windows-only routine. Try Balabolka if you want a freeware tool and already like a voice installed on your PC. Compare Speechify if phone, browser and additional language options matter more. Test offline playback with the connection disabled rather than assuming every voice works offline.' },
    ],
  },
  {
    metaTitle: 'Snagit Alternatives: Cropmark vs ShareX', app: 'cropmark', name: 'Cropmark',
    path: '/apps/cropmark/snagit-alternative-without-subscription',
    title: 'A Snagit alternative without a subscription: Cropmark and ShareX',
    description: 'Compare Cropmark, ShareX and Snagit for screenshot markup, export, screen recording and purchase model on Windows.',
    intro: 'If you mainly capture screenshots, add numbered steps and redact details before sharing, Cropmark has a Free tier and optional one-time Pro access. ShareX is a free, open-source choice with a broader capture and automation toolkit. Current Snagit releases use annual subscriptions and include capabilities beyond still-image markup.',
    columns: [
      { name: 'Cropmark', url: '/apps/cropmark' },
      { name: 'ShareX', url: 'https://getsharex.com/' },
      { name: 'Snagit', url: 'https://support.techsmith.com/hc/en-us/articles/27009223314701-TechSmith-Transition-to-Annual-Subscription-Pricing-Model-in-2025' },
    ],
    rows: [
      { label: 'Purchase model', cells: ['Free tier; Pro can be bought once or yearly through Microsoft Store.', 'Free and open source.', 'New Snagit releases use annual subscriptions. Earlier perpetual editions have different terms.'] },
      { label: 'Screenshot workflow', cells: ['Region/full-screen capture, arrows, text, numbered steps and solid redaction.', 'Multiple capture modes, annotation and configurable after-capture tasks.', 'Capture and editing suite, including scrolling capture; check the selected plan.'] },
      { label: 'Video recording', cells: ['Not included.', 'Screen recording and GIF capture are available.', 'Screen recording is part of the capture suite; check current plan features.'] },
      { label: 'Export', cells: ['Free: PNG, JPEG and single-image PDF, without a watermark. Pro: batch and multi-image PDF.', 'Save, copy or use configured upload destinations and automated tasks.', 'Review current export and sharing tools on the vendor site.'] },
    ],
    sections: [
      { title: 'Pick the smallest workflow that covers your work', text: 'Cropmark requires Windows 11 build 22000 or newer, x64. Try a Free export before deciding whether multi-image projects, batch export or saved styles justify Pro. Choose ShareX when you want broader capture modes, recording and configurable workflows. Keep Snagit in the comparison if its wider editing and capture features save you enough time to justify a subscription.' },
      { title: 'Check the exported redaction', text: 'Cropmark replaces covered pixels with a solid colour in the exported image. You choose each area manually; it does not automatically find secrets. Review the final exported file before sharing it. Original captures and editable projects can retain the original content. A blur or an editable overlay is a different operation, so verify the output of whichever tool you choose.' },
    ],
  },
  {
    metaTitle: 'Screen Time: Still-Lane vs StayFree vs ActivityWatch', app: 'still-lane', name: 'Still-Lane',
    path: '/apps/still-lane/screen-time-tracker-comparison',
    title: 'Windows screen time: Still-Lane, StayFree and ActivityWatch',
    description: 'Compare app-level screen time, website detail, focus reminders and local storage in three Windows tracking tools.',
    intro: 'Still-Lane suits people who want local app-time reports and reminders they can override. ActivityWatch offers free, open-source tracking with more detailed window and browser watchers. StayFree advertises cross-device usage reports and app or website blocking. Decide first whether you want awareness, detailed activity records or enforced limits.',
    columns: [
      { name: 'Still-Lane', url: '/apps/still-lane' },
      { name: 'StayFree', url: 'https://stayfreeapps.com/' },
      { name: 'ActivityWatch', url: 'https://docs.activitywatch.net/en/latest/watchers.html' },
    ],
    rows: [
      { label: 'Getting started', cells: ['15-day Microsoft Store trial, then an optional one-time purchase.', 'Vendor offers a free download; check platform-specific terms.', 'Free and open source.'] },
      { label: 'Recorded detail', cells: ['Foreground app duration with active and idle time. Browser time counts as one app.', 'Vendor advertises app and website usage reports across devices.', 'Window watcher records app and window title; an optional browser extension adds tab information.'] },
      { label: 'Limits and focus', cells: ['Daily budgets and focus sessions provide reminders; they never block or close apps.', 'Vendor advertises scheduled blocks and app/site limits; confirm support on your device.', 'Primarily an activity recorder and reporting tool; check available integrations for other workflows.'] },
      { label: 'Data choice', cells: ['Records stay on the PC. No window titles, websites, keystrokes or screenshots are recorded.', 'Read the current privacy policy and cross-device settings for your setup.', 'Core tracking data stays local; choose and configure watchers for the detail you want.'] },
    ],
    sections: [
      { title: 'Choose the level of detail deliberately', text: 'If you only need total time per program, Still-Lane avoids collecting window titles and website addresses. That also means it cannot separate work sites from distracting sites inside one browser. ActivityWatch is worth comparing when that extra detail matters. Its watcher documentation explains what each component records, so review the enabled watchers before using it with sensitive work.' },
      { title: 'Try a normal working day', text: 'Use the Still-Lane trial on a typical day, review active and idle totals, and set a small app budget. Collection begins after consent and can be paused. CSV/JSON export and deletion controls are included. Choose a blocking tool such as StayFree if reminders you can override are insufficient. Still-Lane is a self-management app and does not provide parental control or employer monitoring.' },
    ],
  },
];
