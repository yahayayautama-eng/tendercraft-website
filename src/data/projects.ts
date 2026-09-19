export interface ProjectAsset {
  id: string;
  projectId?: string;
  storagePath: string;
  altText: string;
  caption?: string;
  sortOrder: number;
}

export type ProjectStatus = 'prototype' | 'build' | 'deployed' | 'packaged' | 'production';

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  problem: string;
  solution: string;
  capabilities: string[];
  technology: string[];
  status: ProjectStatus;
  statusLabel: string;
  coverImagePath: string;
  liveUrl: string | null;
  storeUrl: string | null;
  repositoryUrl: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  gallery: ProjectAsset[];
  createdAt: string;
  updatedAt: string;
}

export const VERIFIED_PROJECTS: Project[] = [
  {
    id: 'b1e4d1e0-0001-4000-8000-000000000001',
    slug: 'beadle',
    name: 'Beadle',
    tagline: 'Self-hosted desktop broadcast alerts and urgent notification engine for Windows environments.',
    summary:
      'Beadle pushes critical IT outages, security advisories, and emergency broadcasts directly to employee screens with force-on-top positioning, rich document rendering, and audit-defensible acknowledgement receipts.',
    problem:
      'Organizations struggle with critical notifications—like sudden infrastructure downtime or critical cybersecurity alerts—getting lost in crowded email inboxes. Staff ignore mass emails, leaving IT teams blind to who actually saw the message.',
    solution:
      'Tendercraft designed and engineered Beadle as an on-premise Windows mass-alert system. Alerts bypass email, rendering directly over running applications with verifiable delivery and acknowledgement logging tied to Active Directory identities.',
    capabilities: [
      'Topmost Windows desktop agent (.NET 8 + WPF) that commands immediate attention without dismiss bypass.',
      'Active Directory & LDAP targeting across security groups, departments, or entire domain networks.',
      'Persistent real-time SignalR push with offline queuing and catch-up delivery on reconnect.',
      'Server-side PPTX-to-PDF conversion and local PDF rendering via PdfiumViewer and WebView2.',
      'Explicit delivery receipts: distinctly logging display confirmation versus deliberate user acknowledgement.',
      'Silent enterprise deployment via WiX-authored MSI installers pushable through Group Policy (GPO).'
    ],
    technology: ['.NET 8', 'WPF', 'ASP.NET Core', 'SignalR', 'PostgreSQL 16', 'Next.js 14', 'WiX Toolset'],
    status: 'prototype',
    statusLabel: 'On-Premise Build',
    coverImagePath: '/projects/beadle/beadle-hero.png',
    liveUrl: null,
    storeUrl: null,
    repositoryUrl: null,
    featured: true,
    published: true,
    sortOrder: 1,
    gallery: [
      {
        id: 'asset-beadle-1',
        storagePath: '/projects/beadle/beadle-alert-active.png',
        altText: 'Beadle high-priority alert popup with acknowledgement action button',
        caption: 'High-priority desktop popup alert rendered directly on a workstation with force-on-top positioning.',
        sortOrder: 1
      },
      {
        id: 'asset-beadle-2',
        storagePath: '/projects/beadle/beadle-delivery-report.png',
        altText: 'Delivery evidence report table showing displayed and acknowledged rates',
        caption: 'Real-time delivery verification console displaying recipient delivery rates and explicit acknowledgement counts.',
        sortOrder: 2
      }
    ],
    createdAt: '2026-09-17T10:00:00.000Z',
    updatedAt: '2026-09-19T04:00:00.000Z'
  },
  {
    id: 'c0a7e000-0002-4000-8000-000000000002',
    slug: 'compoundos',
    name: 'CompoundOS',
    tagline: 'Residential compound and estate operations software for access, ledgers, and resident service.',
    summary:
      'CompoundOS provides residential estates, gated communities, and multi-tenant facilities with a unified operating system—combining digital gate passes, maintenance dispatch, and service charge ledgers.',
    problem:
      'Estate managers and resident associations rely on disconnected WhatsApp chats, paper visitor gate ledgers, and manual bank transfer reconciliation. The result is security lapses at access gates, lost service fees, and unresolved resident complaints.',
    solution:
      'A structured operations platform tailored for gated communities. CompoundOS integrates front-gate security verification with a resident self-service portal, automated payment ledgers, and maintenance dispatch.',
    capabilities: [
      'Digital visitor gate pass generation with time-bounded validation and security checkpoint verification.',
      'Resident ledger tracking service charges, dues, automated receipting, and transaction history.',
      'Maintenance and facility complaint management lifecycle with SLA tracking and status notifications.',
      'Dedicated tenant self-service portal for gate passes, dues payment, and ticket submission.',
      'Staff and security guard interface optimized for high-throughput gate operations.'
    ],
    technology: ['TypeScript', 'React', 'Vite', 'Express.js', 'Prisma ORM', 'Tailwind CSS'],
    status: 'build',
    statusLabel: 'Working Application',
    coverImagePath: '/projects/compoundos/compoundos-hero.png',
    liveUrl: null,
    storeUrl: null,
    repositoryUrl: null,
    featured: true,
    published: true,
    sortOrder: 2,
    gallery: [
      {
        id: 'asset-comp-1',
        storagePath: '/projects/compoundos/dashboard.png',
        altText: 'CompoundOS operations dashboard with metrics and active resident count',
        caption: 'Estate operations overview detailing active residents, outstanding dues, and daily gate traffic.',
        sortOrder: 1
      },
      {
        id: 'asset-comp-2',
        storagePath: '/projects/compoundos/tenants.png',
        altText: 'Resident directory view with occupancy and unit breakdown',
        caption: 'Central resident directory linking lease profiles, assigned units, and contact details.',
        sortOrder: 2
      },
      {
        id: 'asset-comp-3',
        storagePath: '/projects/compoundos/gatepasses.png',
        altText: 'Visitor access authorization ledger with pass codes and check-in times',
        caption: 'Real-time visitor access ledger showing authorized arrival windows and entry timestamps.',
        sortOrder: 3
      },
      {
        id: 'asset-comp-4',
        storagePath: '/projects/compoundos/payments.png',
        altText: 'Service charge payment tracking and receipt log',
        caption: 'Estate dues ledger tracking payment verification, recurring service charges, and receipts.',
        sortOrder: 4
      }
    ],
    createdAt: '2026-09-10T12:00:00.000Z',
    updatedAt: '2026-09-19T04:00:00.000Z'
  },
  {
    id: 'a88157e0-0003-4000-8000-000000000003',
    slug: 'automated-risk-register',
    name: 'Automated Risk Register',
    tagline: 'Continuous enterprise risk governance, scoring matrix, and executive reporting platform.',
    summary:
      'Automated Risk Register gives risk, compliance, and leadership teams a single operational workspace to capture risks, calculate inherent versus residual exposure, assign remediation owners, and generate audit-ready reports.',
    problem:
      'Traditional risk registers live in static spreadsheets and periodic board decks that become obsolete immediately. Teams lack real-time visibility into who owns remediation actions, leading to unaddressed compliance exposures.',
    solution:
      'Tendercraft built Automated Risk Register as an active operational system that turns compliance into continuous action—providing real-time scoring, accountability workflows, and instant audit trails.',
    capabilities: [
      'Comprehensive risk capture across operational, cybersecurity, compliance, and financial categories.',
      'Dynamic likelihood versus impact matrix comparing inherent exposure against residual risk post-treatment.',
      'Action item assignment with clear accountability, escalation due dates, and review cadences.',
      'Appetite monitoring and early warning threshold alerts for emerging operational vulnerabilities.',
      'Executive dashboard exports formatted for board governance and assurance reviews.'
    ],
    technology: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Vercel Edge'],
    status: 'deployed',
    statusLabel: 'Deployed Web App',
    coverImagePath: '/projects/automated-risk-register/arr-hero.png',
    liveUrl: 'https://automated-risk-register-web.vercel.app/',
    storeUrl: null,
    repositoryUrl: null,
    featured: true,
    published: true,
    sortOrder: 3,
    gallery: [
      {
        id: 'asset-arr-1',
        storagePath: '/projects/automated-risk-register/arr-hero.png',
        altText: 'Automated Risk Register live landing page and interactive risk portfolio card',
        caption: 'Deployed public application displaying active portfolio overview, severity breakdown, and action progress.',
        sortOrder: 1
      },
      {
        id: 'asset-arr-2',
        storagePath: '/projects/automated-risk-register/arr-full.png',
        altText: 'Full page overview of risk management workflow and governance controls',
        caption: 'Operational architecture overview detailing the Capture, Score, Act, and Report governance cycle.',
        sortOrder: 2
      }
    ],
    createdAt: '2026-09-12T08:00:00.000Z',
    updatedAt: '2026-09-19T04:00:00.000Z'
  },
  {
    id: 'f7e194a0-0004-4000-8000-000000000004',
    slug: 'freighthud',
    name: 'FreightHUD',
    tagline: 'Contextual rate-per-mile calculator and load evaluation HUD for freight dispatchers.',
    summary:
      'A specialized browser tool that injects instant spot-market rate calculations, deadhead analysis, and lane margin estimators directly into active DAT One and Truckstop load boards.',
    problem:
      'Freight dispatchers and brokers make time-critical spot rate decisions in seconds. Constantly tab-switching between load boards, mileage tools, and rate calculators introduces calculation errors and loses bids.',
    solution:
      'FreightHUD overlays directly on load boards, automatically parsing load origin, destination, and rate to compute real-time margins, deadhead costs, and negotiation thresholds right beside the load listing.',
    capabilities: [
      'Instant rate-per-mile and net profit calculation overlaid directly in DAT One load board DOM.',
      'Deadhead mileage estimator calculating total trip cost including repositioning distance.',
      'Quick-adjust margin targets for rapid negotiation while on call with carriers.',
      'Lightweight browser extension design with zero latency impact on load board refreshing.'
    ],
    technology: ['Chrome Extension Manifest V3', 'TypeScript', 'Tailwind CSS', 'Vite'],
    status: 'packaged',
    statusLabel: 'Packaged Extension',
    coverImagePath: '/projects/freighthud/freighthud-hero.jpg',
    liveUrl: null,
    storeUrl: null,
    repositoryUrl: null,
    featured: false,
    published: true,
    sortOrder: 4,
    gallery: [
      {
        id: 'asset-f-1',
        storagePath: '/projects/freighthud/screenshot-1.png',
        altText: 'FreightHUD rate calculator injected into load board table',
        caption: 'Contextual HUD overlay computing spot rate benchmarks directly on active load board rows.',
        sortOrder: 1
      },
      {
        id: 'asset-f-2',
        storagePath: '/projects/freighthud/screenshot-2.png',
        altText: 'Detailed rate and deadhead mileage calculation breakdown',
        caption: 'Breakdown modal calculating fuel surcharge, deadhead miles, and target margin.',
        sortOrder: 2
      }
    ],
    createdAt: '2026-09-01T14:00:00.000Z',
    updatedAt: '2026-09-19T04:00:00.000Z'
  },
  {
    id: 'c4a7e110-0005-4000-8000-000000000005',
    slug: 'cartitemizer',
    name: 'CartItemizer',
    tagline: 'Multi-store cart itemization, expense categorization, and QuickBooks export tool.',
    summary:
      'A procurement workflow tool for contractors and purchasing teams, parsing complex Amazon Business and Home Depot receipts into job-costed itemized splits ready for accounting software.',
    problem:
      'Bookkeepers and project managers spend hours manually splitting lump-sum procurement orders across client jobs, cost codes, and tax categories from printed receipts and complex invoices.',
    solution:
      'CartItemizer extracts itemized line items directly from checkout carts and past orders, enabling one-click classification by cost center and direct export to CSV and accounting-ready formats.',
    capabilities: [
      'Line-item extraction from Amazon Business and Home Depot order histories.',
      'Flexible GL code and job expense allocation across individual cart items.',
      'Accounting-ready export presets formatted for QuickBooks and spreadsheet ingestion.',
      'Local-first privacy architecture ensuring purchasing data never leaves the operator machine.'
    ],
    technology: ['Chrome Extension Manifest V3', 'TypeScript', 'Tailwind CSS'],
    status: 'packaged',
    statusLabel: 'Packaged Extension v1.3.1',
    coverImagePath: '/projects/cartitemizer/cartitemizer-hero.jpg',
    liveUrl: null,
    storeUrl: null,
    repositoryUrl: null,
    featured: false,
    published: true,
    sortOrder: 5,
    gallery: [
      {
        id: 'asset-c-1',
        storagePath: '/projects/cartitemizer/screenshot-1.jpg',
        altText: 'Amazon order itemization split across cost codes',
        caption: 'Itemized receipt breakdown allocating line items to project job codes.',
        sortOrder: 1
      },
      {
        id: 'asset-c-2',
        storagePath: '/projects/cartitemizer/screenshot-2.jpg',
        altText: 'Home Depot receipt line item parser and classification',
        caption: 'Home Depot order parser extracting SKU numbers, unit prices, and quantities.',
        sortOrder: 2
      },
      {
        id: 'asset-c-3',
        storagePath: '/projects/cartitemizer/screenshot-3.jpg',
        altText: 'Export formatting options for accounting and bookkeeping',
        caption: 'Export interface generating formatted splits for QuickBooks and CSV ledgers.',
        sortOrder: 3
      }
    ],
    createdAt: '2026-08-20T10:00:00.000Z',
    updatedAt: '2026-09-19T04:00:00.000Z'
  }
];

export function getVerifiedProjects(): Project[] {
  return VERIFIED_PROJECTS.filter((p) => p.published).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getFeaturedProjects(): Project[] {
  return VERIFIED_PROJECTS.filter((p) => p.published && p.featured).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return VERIFIED_PROJECTS.find((p) => p.slug === slug);
}
