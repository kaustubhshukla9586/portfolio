export const workExperience = [
  {
    company: "OffSecDiary",
    role: "Software Development Intern, R&D",
    date: "Jun. 2026 – Aug. 2026",
    location: "Remote",
    achievements: [
      "Katana Vault: Built and shipped a zero-knowledge encrypted password manager solo, end to end. Includes a Chrome extension (MV3), backend, database, and a full website with marketing, self-service signup, company admin portal and superadmin portal.",
      "Encryption: Implemented client-side AES-256-GCM vault encryption with PBKDF2 key derivation and an RSA-2048 application-layer request tunnel on top of HTTPS so vault data stays encrypted end to end.",
      "Recovery: Built biometric facial account recovery with liveness detection and designed the full forgot-password and account recovery flow from scratch.",
      "Payments: Integrated Razorpay covering order creation, checkout, signature verification and webhooks, supporting multiple subscription tiers with role-based access control.",
      "Security: Found and fixed a payment plan-escalation vulnerability and a NoSQL injection risk. Added rate limiting, CSP hardening, hashed session tokens and fail-closed startup checks.",
      "Documentation: Authored complete technical docs covering architecture, API reference, database schema, security considerations and deployment roadmap."
    ]
  },
  {
    company: "Real Gods eSports",
    role: "Frontend Developer & Sponsorship Manager",
    date: "Oct. 2025 – Present",
    location: "Remote, India",
    achievements: [
      "Developed and maintained a responsive website using HTML5, CSS3 and JavaScript for event updates and community engagement.",
      "Managed end-to-end sponsorship workflow for 5+ brand partnerships, from outreach to website integration.",
      "Improved overall user experience through UI/UX enhancements and site performance optimizations."
    ]
  },
  {
    company: "Real Gods eSports",
    role: "Organisation Manager",
    date: "Nov. 2022 – May 2023",
    location: "Remote, India",
    achievements: [
      "Managed multiple Valorant roster line-ups, handling player coordination, scheduling and tournament registration.",
      "Oversaw team logistics and communication between players, managers and event organizers.",
      "Led team to 4th & 3rd place Nodwin Cups, #1 Vision Week qualification and Red Bull Qualifier finishes."
    ]
  }
];

// Display order = array order. `id` is a stable slug used to pick each
// project's layout + mockup-offset regardless of its position in the list,
// so this array can be reordered freely without scrambling layouts.
export const projects = [
  {
    id: "katana-vault",
    name: "Katana Vault",
    links: {},
    description: "Built and shipped a zero-knowledge encrypted password manager solo, end to end. Includes a Chrome extension (MV3), backend, database, and a full website.",
    image: "/assets/projects/watermark-removed-katanavault mockup.png"
  },
  {
    id: "pathified",
    name: "Pathified",
    links: { website: "https://pathified.vercel.app", github: "https://github.com/kaustubhshukla9586/Pathified" },
    description: "AI-powered CS career guidance app featuring a 25-question adaptive quiz with real-time personalized career recommendations. Built with React, Groq API and Supabase; deployed on Vercel.",
    image: "/assets/projects/watermark-removed-pathified mockup.png"
  },
  {
    id: "lpu-wifi",
    name: "LPU WiFi Extension",
    links: { github: "https://github.com/kaustubhshukla9586/lpu-wifi-extension" },
    description: "Browser extension streamlining LPU campus network login and connectivity, removing manual steps for daily network authentication. Built with HTML5, CSS3 and JavaScript.",
    image: "/assets/projects/watermark-removed-lpu-wifi mockup.png"
  },
  {
    id: "ironforge",
    name: "IronForge Fitness",
    links: { website: "https://forgeiron.vercel.app", github: "https://github.com/kaustubhshukla9586/IronForge" },
    description: "Responsive gym landing page with smooth scroll animations and mobile-first design. Built with React 18, Vite, Tailwind CSS and Framer Motion; deployed on Vercel.",
    image: "/assets/projects/watermark-removed-ironforge mockup.png"
  },
  {
    id: "studylpu",
    name: "Study LPU",
    links: { website: "https://studylpu.online" },
    description: "A comprehensive study and resource platform built for LPU students.",
    image: "/assets/projects/watermark-removed-studylpu mockup.png"
  }
];

export const research = [
  {
    type: "Patent",
    role: "Co-inventor",
    title: "DBMS Predictive Execution",
    collaborators: [],
    area: "Database Systems",
    description: "Co-inventor/applicant on a database predictive-execution patent initiative. Research area: database systems, predictive execution and applied computing."
  }
];
