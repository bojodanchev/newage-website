import type { Service } from '@/types/content'

export const services: Service[] = [
  {
    slug: 'software-development',
    title: 'Software Development',
    headline: 'Custom software that becomes your competitive moat.',
    description:
      'We architect and build production-grade web applications, mobile platforms, SaaS products, and API ecosystems designed to scale with your ambition.',
    metaTitle: 'Custom Software Development | New Age',
    metaDescription:
      'Production-grade web apps, mobile platforms, SaaS products, and APIs built to scale. From MVP to enterprise — engineered for revenue.',
    icon: '💻',
    category: 'software-development',
    problem:
      'Most businesses are running on duct-taped tools, disconnected spreadsheets, and off-the-shelf software that was never designed for how they actually operate. The result is bottlenecks everywhere — slow onboarding, manual data entry, missed opportunities, and an engineering debt that compounds monthly. Your team spends more time working around the tool than working with it.',
    solution:
      'We build purpose-built software that maps directly to your business model. Every feature is intentional. Every integration is seamless. The result is a system that accelerates your operations instead of constraining them — a product your team actually wants to use and your customers love interacting with.',
    features: [
      {
        title: 'Full-Stack Web Applications',
        description:
          'React, Next.js, and Node.js applications built with performance-first architecture and pixel-perfect interfaces.',
        icon: '🌐',
      },
      {
        title: 'Mobile App Development',
        description:
          'Cross-platform mobile apps using React Native that deliver native-quality experiences on iOS and Android simultaneously.',
        icon: '📱',
      },
      {
        title: 'SaaS Platform Engineering',
        description:
          'Multi-tenant SaaS products with billing, auth, analytics, and the infrastructure to support thousands of concurrent users.',
        icon: '☁️',
      },
      {
        title: 'API Design & Integration',
        description:
          'RESTful and GraphQL APIs that connect your tools, services, and data into a unified, programmable ecosystem.',
        icon: '🔗',
      },
      {
        title: 'Database Architecture',
        description:
          'Optimized data models using PostgreSQL, Redis, and modern ORMs that keep your queries fast and your data consistent.',
        icon: '🗄️',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Discovery & Scoping',
        description:
          'We map your business logic, user flows, and integration requirements into a detailed technical specification.',
        icon: '🔍',
      },
      {
        step: 2,
        title: 'Architecture & Design',
        description:
          'System architecture, database design, and high-fidelity UI mockups — approved before a single line of code is written.',
        icon: '📐',
      },
      {
        step: 3,
        title: 'Sprint-Based Development',
        description:
          'Two-week sprints with demo sessions. You see working software every 14 days and steer the build in real time.',
        icon: '⚡',
      },
      {
        step: 4,
        title: 'QA & Launch',
        description:
          'Rigorous testing, performance optimization, and a managed deployment to production with monitoring baked in.',
        icon: '🚀',
      },
      {
        step: 5,
        title: 'Post-Launch Support',
        description:
          'Ongoing maintenance, feature iteration, and scaling support so your product evolves with your business.',
        icon: '🛡️',
      },
    ],
    techStack: [
      { name: 'React / Next.js', category: 'Frontend' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Redis', category: 'Cache' },
      { name: 'Vercel / AWS', category: 'Infrastructure' },
      { name: 'Stripe', category: 'Payments' },
      { name: 'Supabase', category: 'BaaS' },
    ],
    pricingTiers: [
      {
        name: 'Starter',
        price: '$5,000',
        description: 'For early-stage products that need a solid technical foundation.',
        features: [
          'MVP web application',
          'Up to 5 core features',
          'Responsive design',
          'Basic authentication',
          'Deployment & hosting setup',
          '30-day post-launch support',
        ],
        cta: 'Start Building',
      },
      {
        name: 'Growth',
        price: '$15,000',
        description: 'For scaling products that need robust architecture and integrations.',
        features: [
          'Full-featured web or mobile app',
          'Up to 15 features & integrations',
          'Custom database architecture',
          'Third-party API integrations',
          'Admin dashboard',
          'CI/CD pipeline',
          'Analytics & monitoring',
          '90-day post-launch support',
        ],
        highlighted: true,
        cta: 'Scale Your Product',
      },
      {
        name: 'Enterprise',
        price: '$40,000+',
        description: 'For complex platforms requiring enterprise-grade reliability and scale.',
        features: [
          'Multi-tenant SaaS platform',
          'Unlimited features & modules',
          'Advanced security & compliance',
          'Custom billing & subscription logic',
          'Dedicated DevOps infrastructure',
          'Load testing & performance optimization',
          'White-label & API access',
          'Dedicated team & priority support',
        ],
        cta: 'Talk to Us',
      },
    ],
    faq: [
      {
        question: 'How long does a typical project take?',
        answer:
          'Starter projects ship in 4–6 weeks. Growth-tier builds take 8–14 weeks. Enterprise platforms are scoped individually, typically 3–6 months. Every project starts with a fixed timeline agreed upon before development begins.',
      },
      {
        question: 'Do you work with existing codebases?',
        answer:
          'Yes. We regularly take over, refactor, and extend existing applications. We start with a codebase audit to assess technical debt and create a prioritized improvement plan.',
      },
      {
        question: 'What technologies do you specialize in?',
        answer:
          'Our core stack is React, Next.js, TypeScript, Node.js, and PostgreSQL. We also work with React Native for mobile, Python for AI/ML, and various cloud providers including AWS, Vercel, and GCP.',
      },
      {
        question: 'Do you provide post-launch support?',
        answer:
          'Every tier includes post-launch support. We also offer ongoing retainer agreements for teams that need continuous development, monitoring, and feature iteration.',
      },
      {
        question: 'How do you handle project communication?',
        answer:
          'You get a dedicated Slack channel, bi-weekly sprint demos, and direct access to the engineering lead. No account managers, no telephone game — you talk to the people building your product.',
      },
      {
        question: 'Can you build AI-powered features?',
        answer:
          'Absolutely. We integrate LLMs, vector search, recommendation engines, and intelligent automation into applications. AI is a tool in our stack, not a buzzword.',
      },
    ],
    relatedSlugs: ['automation-systems', 'full-business-build'],
  },

  {
    slug: 'automation-systems',
    title: 'Automation Systems',
    headline: 'Eliminate the work your team shouldn\'t be doing.',
    description:
      'We design and deploy end-to-end business process automation — from CRM pipelines and database synchronization to multi-step workflows that replace hours of manual labor.',
    metaTitle: 'Business Process Automation | New Age',
    metaDescription:
      'CRM automation, workflow optimization, and intelligent systems that eliminate manual work and accelerate every process in your business.',
    icon: '⚙️',
    category: 'automation-systems',
    problem:
      'Your team is drowning in repetitive tasks. Lead follow-ups fall through cracks. Data lives in five different tools that don\'t talk to each other. Reports require manual exports and spreadsheet gymnastics. Every hour spent on admin work is an hour not spent on growth — and it\'s costing you more than you realize.',
    solution:
      'We build intelligent automation systems that connect your tools, eliminate manual steps, and run your operations 24/7 without human intervention. From lead capture to invoicing, every process is mapped, optimized, and automated — so your team focuses on strategy while the machines handle execution.',
    features: [
      {
        title: 'CRM & Pipeline Automation',
        description:
          'Automated lead scoring, follow-up sequences, deal stage progression, and pipeline alerts that keep revenue flowing.',
        icon: '📊',
      },
      {
        title: 'Workflow Orchestration',
        description:
          'Multi-step, conditional workflows that span tools and teams — triggered by events, not by someone remembering to do it.',
        icon: '🔄',
      },
      {
        title: 'Database Synchronization',
        description:
          'Real-time data sync between your CRM, ERP, accounting, and custom tools — single source of truth, always.',
        icon: '🔗',
      },
      {
        title: 'Document Generation',
        description:
          'Auto-generated proposals, contracts, invoices, and reports populated with live data and delivered on schedule.',
        icon: '📄',
      },
      {
        title: 'Intelligent Alerts & Escalation',
        description:
          'Smart notifications that surface what matters — churn risk, stalled deals, SLA breaches — before they become problems.',
        icon: '🔔',
      },
      {
        title: 'Custom Integrations',
        description:
          'Seamless connections between any combination of tools via API, webhook, or custom middleware — no data silos.',
        icon: '🧩',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Process Audit',
        description:
          'We document every manual process, identify bottlenecks, and calculate the cost of inaction in hours and dollars.',
        icon: '📋',
      },
      {
        step: 2,
        title: 'Automation Blueprint',
        description:
          'A detailed map of every automation, its triggers, conditions, and outputs — reviewed and approved before build.',
        icon: '🗺️',
      },
      {
        step: 3,
        title: 'Build & Test',
        description:
          'Automations are built, connected, and stress-tested with real data scenarios before going live.',
        icon: '🔧',
      },
      {
        step: 4,
        title: 'Deploy & Monitor',
        description:
          'Gradual rollout with monitoring dashboards so you can see every automation firing and its impact in real time.',
        icon: '📡',
      },
    ],
    techStack: [
      { name: 'Make (Integromat)', category: 'Automation' },
      { name: 'n8n', category: 'Automation' },
      { name: 'Zapier', category: 'Automation' },
      { name: 'HubSpot', category: 'CRM' },
      { name: 'Airtable', category: 'Database' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Custom APIs', category: 'Integration' },
      { name: 'Python', category: 'Scripting' },
    ],
    pricingTiers: [
      {
        name: 'Starter',
        price: '$3,000',
        description: 'For businesses ready to automate their first critical workflows.',
        features: [
          'Up to 5 automations',
          'CRM pipeline setup',
          'Email sequence automation',
          'Basic reporting dashboard',
          '30-day optimization window',
        ],
        cta: 'Automate Now',
      },
      {
        name: 'Growth',
        price: '$10,000',
        description: 'For operations teams that need comprehensive process automation.',
        features: [
          'Up to 20 automations',
          'Multi-tool integration',
          'Advanced conditional logic',
          'Database synchronization',
          'Document generation',
          'Custom dashboards & alerts',
          '90-day optimization window',
        ],
        highlighted: true,
        cta: 'Transform Operations',
      },
      {
        name: 'Enterprise',
        price: '$25,000+',
        description: 'For organizations replacing entire manual departments with systems.',
        features: [
          'Unlimited automations',
          'Full business process redesign',
          'Custom middleware & APIs',
          'AI-powered decision logic',
          'Compliance & audit trails',
          'Dedicated automation engineer',
          'Quarterly reviews & optimization',
        ],
        cta: 'Talk to Us',
      },
    ],
    faq: [
      {
        question: 'What tools can you automate?',
        answer:
          'We work with virtually any tool that has an API or integration layer — CRMs (HubSpot, Salesforce, Pipedrive), project management (Asana, Monday), communication (Slack, email), databases (Airtable, Notion, PostgreSQL), and hundreds more.',
      },
      {
        question: 'How quickly will I see ROI?',
        answer:
          'Most clients see measurable time savings within the first week of deployment. Full ROI — where the system has paid for itself in saved labor hours — typically happens within 60–90 days.',
      },
      {
        question: 'Will automations break if a tool updates?',
        answer:
          'We build resilient systems with error handling, retry logic, and monitoring. When tools update their APIs, our monitoring catches it and we fix it before you notice.',
      },
      {
        question: 'Can you automate processes across departments?',
        answer:
          'That is where automation delivers the biggest value. Cross-departmental workflows — like sales-to-finance handoffs or marketing-to-operations triggers — eliminate the gaps where things fall through cracks.',
      },
      {
        question: 'Do we need technical staff to manage automations?',
        answer:
          'No. We build automations with monitoring dashboards that anyone can read. For ongoing changes, we offer retainer support or train your team to make common adjustments.',
      },
    ],
    relatedSlugs: ['software-development', 'sales-infrastructure'],
  },

  {
    slug: 'marketing-growth',
    title: 'Marketing & Growth',
    headline: 'Turn attention into revenue — systematically.',
    description:
      'We build high-converting funnels, automated email ecosystems, inbound content engines, and paid media systems that generate qualified demand on autopilot.',
    metaTitle: 'Marketing & Growth Systems | New Age',
    metaDescription:
      'Funnels, email automation, inbound strategy, and content engines that convert attention into predictable revenue.',
    icon: '📈',
    category: 'marketing-growth',
    problem:
      'You are spending money on ads, posting content, and sending emails — but none of it compounds. Leads come in and disappear. Your funnel has more leaks than conversions. Marketing feels like a cost center because there is no system connecting effort to revenue. Every campaign starts from scratch because nothing is built to last.',
    solution:
      'We build marketing infrastructure — not campaigns. Automated funnels that nurture leads while you sleep. Email sequences that convert based on behavior, not guesswork. Content systems that compound over time. The result is a marketing engine that generates qualified pipeline predictably and measurably.',
    features: [
      {
        title: 'High-Converting Funnels',
        description:
          'Landing pages, lead magnets, and multi-step funnels engineered for conversion with A/B testing built in from day one.',
        icon: '🎯',
      },
      {
        title: 'Email Automation Ecosystems',
        description:
          'Behavior-triggered email sequences for nurturing, onboarding, re-engagement, and upselling — running 24/7.',
        icon: '✉️',
      },
      {
        title: 'Inbound Content Strategy',
        description:
          'SEO-optimized content calendars and production workflows that drive organic traffic and position you as the authority.',
        icon: '📝',
      },
      {
        title: 'Content Automation',
        description:
          'AI-assisted content pipelines that handle research, drafting, scheduling, and distribution across channels.',
        icon: '🤖',
      },
      {
        title: 'Analytics & Attribution',
        description:
          'End-to-end tracking from first touch to closed deal — so you know exactly which channels and campaigns drive revenue.',
        icon: '📊',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Growth Audit',
        description:
          'We analyze your current funnel, traffic sources, conversion rates, and customer journey to find the highest-leverage opportunities.',
        icon: '🔬',
      },
      {
        step: 2,
        title: 'Strategy & Architecture',
        description:
          'A detailed growth blueprint covering funnel design, email flows, content strategy, and channel priorities.',
        icon: '🗺️',
      },
      {
        step: 3,
        title: 'Build & Launch',
        description:
          'Funnels built, emails written, automations connected, and everything launched with tracking in place.',
        icon: '🚀',
      },
      {
        step: 4,
        title: 'Optimize & Scale',
        description:
          'Continuous A/B testing, funnel optimization, and budget allocation based on real performance data.',
        icon: '📈',
      },
    ],
    techStack: [
      { name: 'HubSpot', category: 'Marketing Automation' },
      { name: 'ConvertKit', category: 'Email' },
      { name: 'Webflow / Next.js', category: 'Landing Pages' },
      { name: 'Google Analytics 4', category: 'Analytics' },
      { name: 'Semrush', category: 'SEO' },
      { name: 'Meta Ads', category: 'Paid Media' },
      { name: 'Google Ads', category: 'Paid Media' },
      { name: 'Hotjar', category: 'CRO' },
    ],
    pricingTiers: [
      {
        name: 'Starter',
        price: '$4,000',
        description: 'For businesses building their first automated marketing funnel.',
        features: [
          'Single funnel build (landing + thank you)',
          '5-email nurture sequence',
          'Lead magnet strategy & design',
          'Basic analytics setup',
          'CRM integration',
          '30-day optimization',
        ],
        cta: 'Launch Your Funnel',
      },
      {
        name: 'Growth',
        price: '$12,000',
        description: 'For teams ready to build a full-stack marketing engine.',
        features: [
          'Multi-funnel architecture',
          'Complete email ecosystem (10+ sequences)',
          'Content strategy & calendar',
          'SEO foundation & optimization',
          'Paid media setup & management',
          'Full analytics & attribution',
          'A/B testing framework',
          '90-day optimization',
        ],
        highlighted: true,
        cta: 'Build the Engine',
      },
      {
        name: 'Enterprise',
        price: '$30,000+',
        description: 'For organizations scaling demand generation across channels and markets.',
        features: [
          'Omnichannel growth strategy',
          'Unlimited funnels & sequences',
          'Content production pipeline',
          'Advanced personalization & segmentation',
          'Multi-market / multi-language',
          'Dedicated growth strategist',
          'Weekly performance reviews',
        ],
        cta: 'Talk to Us',
      },
    ],
    faq: [
      {
        question: 'Do you manage paid advertising?',
        answer:
          'We set up and optimize paid media campaigns as part of the Growth and Enterprise tiers. We focus on building the system — targeting, creative frameworks, and automated optimization — rather than being a traditional ad agency.',
      },
      {
        question: 'How do you measure marketing success?',
        answer:
          'Revenue attributed to marketing activities. Not vanity metrics. We set up end-to-end tracking from first click to closed deal so every dollar of spend is accountable.',
      },
      {
        question: 'Can you work with our existing tools?',
        answer:
          'Yes. We optimize within your current stack whenever possible. If a tool change would deliver significantly better results, we will present the case with data — but we never force migrations.',
      },
      {
        question: 'Do you write the content too?',
        answer:
          'We create the strategy, frameworks, and templates. For ongoing content production, we can either train your team, set up AI-assisted workflows, or provide content as part of a retainer engagement.',
      },
      {
        question: 'How long until we see results?',
        answer:
          'Paid channels can generate leads within days of launch. Email automations start converting within weeks. SEO and content typically show compounding results after 60–90 days. We set realistic milestones for each channel.',
      },
      {
        question: 'What if we already have a marketing team?',
        answer:
          'Even better. We build the infrastructure and systems, then hand off to your team with documentation and training. We become the force multiplier, not the bottleneck.',
      },
    ],
    relatedSlugs: ['sales-infrastructure', 'automation-systems'],
  },

  {
    slug: 'sales-infrastructure',
    title: 'Sales Infrastructure',
    headline: 'Build a sales machine that closes while you strategize.',
    description:
      'We architect sales funnels, outbound systems, lead generation engines, and pipeline optimization workflows that turn prospects into revenue predictably.',
    metaTitle: 'Sales Infrastructure & Pipeline Systems | New Age',
    metaDescription:
      'Sales funnels, outbound automation, lead generation, and pipeline optimization systems that convert prospects into predictable revenue.',
    icon: '💰',
    category: 'sales-infrastructure',
    problem:
      'Your sales process depends on individual performers, not systems. When a top rep leaves, pipeline evaporates. Follow-ups are inconsistent. Lead quality is unpredictable. Your CRM is a data graveyard — full of records nobody updates and insights nobody extracts. Revenue is a function of effort, not infrastructure.',
    solution:
      'We build sales systems that work independently of any single person. Automated outbound that fills the top of funnel. Scoring that surfaces the hottest leads. Follow-up sequences that never miss a beat. Pipeline analytics that tell you exactly where deals stall and why. Revenue becomes predictable because the system is predictable.',
    features: [
      {
        title: 'Sales Funnel Architecture',
        description:
          'Multi-stage funnels with optimized touchpoints, qualification gates, and conversion tracking at every step.',
        icon: '🏗️',
      },
      {
        title: 'Outbound Automation',
        description:
          'Automated cold outreach sequences via email, LinkedIn, and multi-channel campaigns — personalized at scale.',
        icon: '📤',
      },
      {
        title: 'Lead Generation Engines',
        description:
          'Inbound and outbound lead gen systems that deliver qualified prospects directly into your pipeline, scored and segmented.',
        icon: '🧲',
      },
      {
        title: 'Pipeline Analytics',
        description:
          'Real-time dashboards showing conversion rates, deal velocity, bottlenecks, and revenue forecasts you can trust.',
        icon: '📊',
      },
      {
        title: 'CRM Optimization',
        description:
          'Clean data, automated entry, smart deal stages, and custom views that make your CRM the command center it should be.',
        icon: '🎛️',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Sales Process Audit',
        description:
          'We analyze your current pipeline, conversion rates, deal cycle, and identify where revenue is leaking.',
        icon: '🔍',
      },
      {
        step: 2,
        title: 'Infrastructure Design',
        description:
          'We architect the funnel stages, outbound sequences, scoring models, and reporting frameworks.',
        icon: '📐',
      },
      {
        step: 3,
        title: 'Build & Integrate',
        description:
          'CRM configured, outbound launched, scoring activated, and dashboards deployed — all connected.',
        icon: '🔧',
      },
      {
        step: 4,
        title: 'Optimize & Iterate',
        description:
          'Continuous refinement based on conversion data. We tune messaging, adjust scoring, and remove friction.',
        icon: '🔄',
      },
    ],
    techStack: [
      { name: 'HubSpot / Salesforce', category: 'CRM' },
      { name: 'Apollo.io', category: 'Outbound' },
      { name: 'Lemlist', category: 'Email Outreach' },
      { name: 'LinkedIn Sales Navigator', category: 'Prospecting' },
      { name: 'Calendly', category: 'Scheduling' },
      { name: 'Stripe', category: 'Payments' },
      { name: 'Looker Studio', category: 'Analytics' },
      { name: 'Custom Webhooks', category: 'Integration' },
    ],
    pricingTiers: [
      {
        name: 'Starter',
        price: '$4,000',
        description: 'For founders and small teams setting up their first sales system.',
        features: [
          'Sales funnel design & build',
          'CRM setup & configuration',
          'Basic outbound sequence (email)',
          'Lead scoring model',
          'Pipeline dashboard',
          '30-day tuning window',
        ],
        cta: 'Build Your Pipeline',
      },
      {
        name: 'Growth',
        price: '$12,000',
        description: 'For growing sales teams that need a full revenue infrastructure.',
        features: [
          'Multi-channel outbound system',
          'Advanced CRM customization',
          'Lead gen engine (inbound + outbound)',
          'Automated follow-up sequences',
          'Deal intelligence & analytics',
          'Sales playbook documentation',
          'Team training & onboarding',
          '90-day optimization',
        ],
        highlighted: true,
        cta: 'Scale Revenue',
      },
      {
        name: 'Enterprise',
        price: '$30,000+',
        description: 'For sales organizations that need enterprise-grade pipeline infrastructure.',
        features: [
          'Full revenue operations design',
          'Multi-team pipeline management',
          'AI-powered lead scoring',
          'Custom integrations & middleware',
          'Territory & quota management',
          'Executive revenue dashboards',
          'Dedicated RevOps strategist',
          'Quarterly strategy reviews',
        ],
        cta: 'Talk to Us',
      },
    ],
    faq: [
      {
        question: 'Do you replace our sales team?',
        answer:
          'No. We make your sales team dramatically more effective. The infrastructure handles prospecting, follow-ups, and data entry — your reps focus on conversations and closing.',
      },
      {
        question: 'What CRMs do you work with?',
        answer:
          'We specialize in HubSpot and Salesforce but also work with Pipedrive, Close, and custom CRM solutions. We will recommend the best fit based on your team size and process complexity.',
      },
      {
        question: 'How do you handle data quality?',
        answer:
          'We implement automated data hygiene — deduplication, enrichment, validation, and decay detection. Clean data is the foundation. Without it, every automation and report is compromised.',
      },
      {
        question: 'Can you build outbound for B2B?',
        answer:
          'B2B outbound is one of our strongest capabilities. We build multi-channel sequences (email, LinkedIn, phone) with personalization, A/B testing, and automated follow-up logic.',
      },
      {
        question: 'What kind of results should we expect?',
        answer:
          'Clients typically see a 40–80% increase in qualified pipeline within 60 days. Response rates on outbound average 15–25%, compared to industry averages of 2–5%. Specific projections are included in every proposal.',
      },
      {
        question: 'Do you provide the leads or just the system?',
        answer:
          'Both. We build the system and can also source and enrich prospect lists as part of the engagement. The system is designed to continuously generate and qualify leads from multiple channels.',
      },
      {
        question: 'How do you handle compliance (GDPR, CAN-SPAM)?',
        answer:
          'Every outbound system we build includes opt-out handling, consent tracking, and compliance safeguards. We follow best practices for GDPR, CAN-SPAM, and CASL by default.',
      },
    ],
    relatedSlugs: ['marketing-growth', 'automation-systems'],
  },

  {
    slug: 'full-business-build',
    title: 'Full Business Build',
    headline: 'From napkin sketch to revenue-generating machine.',
    description:
      'We take your idea from concept to fully operational business — product, systems, marketing, sales, and infrastructure — delivered as a complete, running operation.',
    metaTitle: 'Full Business Build — Idea to Revenue | New Age',
    metaDescription:
      'End-to-end business building: product development, automation, marketing, sales infrastructure, and operations — from idea to revenue.',
    icon: '🏢',
    category: 'full-business-build',
    problem:
      'You have the vision but building a business requires expertise across a dozen disciplines — product, engineering, marketing, sales, operations, finance. Hiring for all of these is slow and expensive. Agencies handle one piece and leave the rest to you. Consultants give advice but don\'t build. The gap between idea and operating business feels impossibly wide.',
    solution:
      'We are the complete build partner. We take your idea through validation, product development, system architecture, marketing launch, and sales infrastructure — and hand you a business that is already generating revenue. One team, one timeline, one outcome: a running business.',
    features: [
      {
        title: 'Idea-to-MVP Pipeline',
        description:
          'Concept validation, market research, product design, and a production-ready MVP — built and launched in 8–12 weeks.',
        icon: '💡',
      },
      {
        title: 'MVP-to-Scale Architecture',
        description:
          'Take a validated product and build the infrastructure for scale — team workflows, automation, and growth systems.',
        icon: '📐',
      },
      {
        title: 'Business-in-a-Box',
        description:
          'Complete operational setup: product, website, CRM, marketing funnels, sales system, analytics — everything running.',
        icon: '📦',
      },
      {
        title: 'Revenue System Design',
        description:
          'Pricing strategy, billing infrastructure, upsell funnels, and retention systems designed from day one.',
        icon: '💰',
      },
      {
        title: 'Operations & Playbooks',
        description:
          'SOPs, team workflows, KPI dashboards, and operational documentation so the business runs without you in the room.',
        icon: '📚',
      },
      {
        title: 'Launch Strategy',
        description:
          'Go-to-market plan, launch sequences, PR outreach, and day-one revenue strategies executed alongside the build.',
        icon: '🎯',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Vision & Validation',
        description:
          'We stress-test your idea against market data, define the business model, and create the build roadmap.',
        icon: '🔬',
      },
      {
        step: 2,
        title: 'Product Build',
        description:
          'Design, develop, and launch the core product — whether that is software, a service platform, or a digital product.',
        icon: '🔨',
      },
      {
        step: 3,
        title: 'Systems & Automation',
        description:
          'CRM, email, workflows, operations — every backend system configured and automated.',
        icon: '⚙️',
      },
      {
        step: 4,
        title: 'Marketing & Sales Launch',
        description:
          'Funnels live, outbound running, content publishing, ads launching — revenue generation begins.',
        icon: '🚀',
      },
      {
        step: 5,
        title: 'Handoff & Growth Support',
        description:
          'Full documentation, team training, and a 90-day support runway to ensure the business runs smoothly.',
        icon: '🤝',
      },
    ],
    techStack: [
      { name: 'Next.js / React', category: 'Product' },
      { name: 'Node.js / Python', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'HubSpot', category: 'CRM & Marketing' },
      { name: 'Stripe', category: 'Billing' },
      { name: 'Make / n8n', category: 'Automation' },
      { name: 'Vercel / AWS', category: 'Infrastructure' },
      { name: 'Figma', category: 'Design' },
    ],
    pricingTiers: [
      {
        name: 'Idea to MVP',
        price: '$15,000',
        description: 'For founders with a validated idea ready to become a real product.',
        features: [
          'Market & competitor analysis',
          'Product design & UX',
          'MVP development (8–12 weeks)',
          'Landing page & launch funnel',
          'Basic CRM & email setup',
          'Go-to-market strategy',
          '60-day post-launch support',
        ],
        cta: 'Launch Your Idea',
      },
      {
        name: 'MVP to Scale',
        price: '$35,000',
        description: 'For businesses with traction that need infrastructure to scale.',
        features: [
          'Product feature expansion',
          'Full automation stack',
          'Marketing engine build',
          'Sales infrastructure',
          'Analytics & KPI dashboards',
          'Team SOPs & playbooks',
          'Hiring plan & role definitions',
          '90-day growth support',
        ],
        highlighted: true,
        cta: 'Scale Your Business',
      },
      {
        name: 'Business-in-a-Box',
        price: '$75,000+',
        description: 'For visionaries who want a complete, operating business delivered turnkey.',
        features: [
          'Everything in MVP to Scale',
          'Complete operations setup',
          'Multi-channel marketing launch',
          'Revenue operations & billing',
          'Legal & compliance framework',
          'Brand identity & design system',
          'Dedicated project team',
          '6-month growth partnership',
        ],
        cta: 'Build My Business',
      },
    ],
    faq: [
      {
        question: 'Who is this for?',
        answer:
          'Founders with a validated business idea, existing businesses launching new product lines, and entrepreneurs who want to skip the 18-month bootstrapping phase and launch with professional infrastructure from day one.',
      },
      {
        question: 'How involved do I need to be?',
        answer:
          'You are the visionary — we need your input on direction, approvals, and domain expertise. Expect 3–5 hours per week of involvement. We handle the execution.',
      },
      {
        question: 'Do you take equity or just charge a fee?',
        answer:
          'Our standard model is project-based fees. For exceptional opportunities, we are open to hybrid arrangements (reduced fee + equity), but that is evaluated case by case.',
      },
      {
        question: 'What if my idea needs to pivot?',
        answer:
          'Pivots happen. Our process includes validation checkpoints specifically designed to catch signals early. If the data says pivot, we reallocate resources quickly and efficiently.',
      },
      {
        question: 'How do you ensure quality across so many disciplines?',
        answer:
          'We have specialist leads for engineering, marketing, sales, and operations. Each workstream has its own QA process. Everything rolls up into a single project lead who owns the outcome.',
      },
      {
        question: 'What happens after handoff?',
        answer:
          'Every package includes post-launch support. We also offer ongoing retainers for businesses that want us to remain the technical and growth partner as they scale.',
      },
      {
        question: 'Can you help with fundraising?',
        answer:
          'We can build investor-ready materials — pitch decks, financial models, traction dashboards — as an add-on. We do not broker introductions but we make sure your data tells a compelling story.',
      },
      {
        question: 'What is the typical timeline?',
        answer:
          'Idea to MVP: 8–12 weeks. MVP to Scale: 12–16 weeks. Business-in-a-Box: 16–24 weeks. Timelines are fixed at project kickoff and we deliver on schedule.',
      },
    ],
    relatedSlugs: ['software-development', 'marketing-growth', 'sales-infrastructure'],
  },
]

export function getAllServices(): Service[] {
  return services
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getServicesByCategory(category: string): Service[] {
  return services.filter((s) => s.category === category)
}
