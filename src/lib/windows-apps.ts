export interface WindowsApp {
  id: string;
  name: string;
  fullName: string;
  tagline: string;
  summary: string;
  category: string;
  operatingSystem: string;
  storeId: string;
  storeUrl: string;
  pricingLabel: string;
  iconPath: string;
  badge: string;
  features: [string, string][];
  faqs: { question: string; answer: string }[];
  privacyUrl: string;
  supportUrl?: string;
}

export const WINDOWS_APPS: WindowsApp[] = [
  {
    id: 'vox-reader',
    name: 'Vox Reader',
    fullName: 'Vox Reader – Offline Text to Speech & Audiobook Player',
    tagline: 'Listen to EPUB, PDF, TXT and Word documents in natural neural voices offline on Windows.',
    summary:
      'Vox Reader turns the books and documents you already own into natural-sounding speech without sending any text to remote servers. Runs lightweight neural models completely offline.',
    category: 'AudioApplication',
    operatingSystem: 'Windows 10, Windows 11',
    storeId: '9PCVQB5H684W',
    storeUrl: 'https://apps.microsoft.com/detail/9PCVQB5H684W',
    pricingLabel: 'Free tier · One-time $18.99 Pro upgrade (No subscription)',
    iconPath: '/vox-reader/icon.png',
    badge: '100% Offline Neural Speech',
    features: [
      ['On-Device Neural Synthesis', 'English voices generated on your CPU. Performance depends on your PC; higher speeds can pause while speech is generated.'],
      ['Synchronized Sentence Highlighting', 'Follow along as words and sentences illuminate in real time.'],
      ['Format Freedom', 'Read EPUB and TXT files free, with PDF and Microsoft Word (.docx) support in Pro.'],
      ['Speed & Navigation Controls', 'Adjust playback speed, set sleep timers, and jump chapters. Higher speeds depend on your CPU’s speech-generation performance.'],
      ['Offline Reading, Local Library', 'Zero accounts, zero analytics, zero document uploads. Everything stays on your PC.'],
    ],
    faqs: [
      {
        question: 'Does Vox Reader work completely offline?',
        answer: 'Reading aloud works offline after installation, with speech generated on your CPU. Buying or refreshing Pro requires internet access and a Microsoft Store account.',
      },
      {
        question: 'Is there a recurring monthly subscription?',
        answer: 'No. Vox Reader offers a generous free tier (3 hours listening every week, resetting Monday) and a single one-time purchase of $18.99 for permanent unlimited Pro access.',
      },
      {
        question: 'What document formats are supported?',
        answer: 'EPUB, plain text (.txt), and pasted clipboard articles are supported in the free version. Pro unlocks text-based PDF documents and Microsoft Word (.docx) files.',
      },
    ],
    privacyUrl: '/vox-reader/privacy.html',
  },
  {
    id: 'cropmark',
    name: 'Cropmark',
    fullName: 'Cropmark – Screenshot Tool, Annotation & Secure Redaction',
    tagline: 'Native Windows 11 screen capture with verified pixel-erasing redaction and multi-page PDF export.',
    summary:
      'Fast, modern screenshot capture and markup tool built natively with WinUI 3. Designed for technical writers, developers, and privacy-conscious professionals who need true data redaction.',
    category: 'UtilitiesApplication',
    operatingSystem: 'Windows 11',
    storeId: '9NZR4D24CMM6',
    storeUrl: 'https://apps.microsoft.com/detail/9NZR4D24CMM6',
    pricingLabel: 'Free tier · $18.99 lifetime or $9.99/year Pro',
    iconPath: '/cropmark/icon.png',
    badge: 'Solid Screenshot Redaction',
    features: [
      ['True Destructive Redaction', 'Replaces covered pixels with a solid color in exported images and checks the result before saving.'],
      ['Numbered Step Badges', 'Auto-incrementing callouts (1, 2, 3...) to document workflows and bugs in seconds.'],
      ['Professional Canvas Styling', 'Add canvas padding, rounded corners, subtle drop shadows, and neutral borders.'],
      ['Multi-Format Export', 'Save to clipboard, PNG, JPEG, or paginated multi-page PDF documents without watermarks.'],
      ['Native WinUI 3 Architecture', 'Instant global hotkey capture, multi-monitor high-DPI scaling, and zero telemetry.'],
    ],
    faqs: [
      {
        question: 'How is Cropmark redaction different from normal screenshot tools?',
        answer: 'Cropmark replaces covered pixels in exported images and checks the result before saving. Review the exported file before sharing; separate originals and editable projects may retain the original content.',
      },
      {
        question: 'Are exports watermarked?',
        answer: 'Never. Both the Free version and Pro tier export clean images and PDFs with zero watermarks.',
      },
      {
        question: 'What does Cropmark Pro add?',
        answer: 'Pro unlocks batch multi-image export, merging several screenshots into a single multi-page PDF, and saved custom style presets.',
      },
    ],
    privacyUrl: '/cropmark/privacy.html',
  },
  {
    id: 'still-lane',
    name: 'Still-Lane',
    fullName: 'Still-Lane – Screen Time, App Usage Tracker & Gentle Focus Limits',
    tagline: 'Private Windows computer usage tracker with intentional focus sessions and gentle, overridable limits.',
    summary:
      'Clear, private daily view of computer use built for adult self-management. Avoids the surveillance architecture of corporate monitoring tools and the punitive lockouts of aggressive blockers.',
    category: 'ProductivityApplication',
    operatingSystem: 'Windows 10, Windows 11',
    storeId: '9NP26W128KX9',
    storeUrl: 'https://apps.microsoft.com/detail/9NP26W128KX9',
    pricingLabel: '15-day free trial · One-time purchase through Microsoft Store',
    iconPath: '/still-lane/icon.png',
    badge: '100% Local SQLite Storage',
    features: [
      ['Automatic Local Usage Tracking', 'Accurate daily and weekly timelines of active application focus without cloud accounts.'],
      ['Gentle Overridable Budgets', 'Polite reminder notifications when app limits expire that can be snoozed without risking lost work.'],
      ['Deep Focus Intervals', 'Dedicated timed deep work blocks designed to protect your attention on primary tasks.'],
      ['Smart Inactivity Filtering', 'Detects when you step away from your desk so reports reflect real work.'],
      ['Zero Cloud Surveillance', 'Your records stay strictly in your local AppData folder. You can export or purge data anytime.'],
    ],
    faqs: [
      {
        question: 'Does Still-Lane send my computer activity to any server?',
        answer: 'No. All usage data is stored strictly in a local SQLite database on your device. There is no cloud account, no remote dashboard, and zero employer surveillance capability.',
      },
      {
        question: 'Will Still-Lane close my applications or delete unsaved work?',
        answer: 'Never. Still-Lane treats you as an autonomous adult. When a budget is reached, it displays a clear full-screen reminder that you can intentionally snooze or override.',
      },
      {
        question: 'What is the pricing model?',
        answer: 'Still-Lane offers a 15-day free trial through Microsoft Store, then an optional one-time purchase with no subscription. Check its Store listing for the current regional price.',
      },
    ],
    privacyUrl: '/still-lane/privacy-policy.html',
    supportUrl: '/still-lane/support.html',
  },
];
