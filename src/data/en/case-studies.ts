import type { CaseStudy } from '@/types/content'

export const caseStudies: CaseStudy[] = [
  {
    slug: 'saas-3x-revenue',
    title: 'How a SaaS Company Tripled Revenue in 90 Days',
    client: 'StreamlineHQ',
    industry: 'SaaS & Technology',
    servicesUsed: ['automation-systems', 'marketing-growth', 'sales-infrastructure'],
    timeline: '90 days',
    challenge:
      'StreamlineHQ had a strong product but a broken go-to-market engine. Their sales team was manually qualifying leads from spreadsheets, marketing was running disconnected campaigns with no attribution, and 70% of trial users churned before ever reaching the activation milestone. Revenue had plateaued at $45K MRR despite a growing user base.',
    approach:
      'We started with a full-stack audit — product analytics, funnel performance, sales process, and automation gaps. The diagnosis was clear: the product was solid, but the infrastructure around it was built for a 5-person startup, not a scaling SaaS company. We rebuilt everything between the product and the customer.',
    solution:
      'We deployed 12 automations covering lead scoring, trial onboarding, churn prevention, and upsell sequencing. Built a new marketing funnel with targeted landing pages, behavior-triggered email campaigns, and retargeting. Redesigned the sales pipeline with automated qualification, CRM hygiene, and real-time deal analytics. The entire system went live in phases over 90 days.',
    techStack: ['HubSpot', 'Make', 'Next.js', 'Stripe', 'Intercom', 'Mixpanel', 'PostgreSQL'],
    results: [
      { metric: '3x', value: '3x', label: 'Revenue Growth', icon: '📈' },
      { metric: '65%', value: '65%', label: 'Reduction in Manual Work', icon: '⚙️' },
      { metric: '4.2x', value: '4.2x', label: 'Return on Investment', icon: '💰' },
      { metric: '12', value: '12', label: 'Automations Deployed', icon: '🤖' },
    ],
    testimonial: {
      quote:
        'New Age didn\'t just optimize our funnel — they rebuilt the entire revenue engine. We went from $45K to $135K MRR in 90 days. The automations alone save our team 30 hours a week.',
      name: 'Marcus Chen',
      title: 'CEO',
      company: 'StreamlineHQ',
      rating: 5,
    },
    projectTimeline: [
      {
        date: 'Week 1–2',
        title: 'Full-Stack Audit',
        description:
          'Mapped every touchpoint from ad click to subscription. Identified 14 critical gaps in the funnel and 8 processes ripe for automation.',
      },
      {
        date: 'Week 3–4',
        title: 'Automation & CRM Build',
        description:
          'Deployed lead scoring, automated trial onboarding sequences, and rebuilt the CRM pipeline with clean data and smart deal stages.',
      },
      {
        date: 'Week 5–8',
        title: 'Funnel & Marketing Launch',
        description:
          'Launched redesigned landing pages, behavior-triggered email campaigns, and retargeting across paid channels.',
      },
      {
        date: 'Week 9–12',
        title: 'Optimization & Scale',
        description:
          'A/B tested every major touchpoint, optimized sequences based on conversion data, and scaled ad spend on winning channels.',
      },
      {
        date: 'Week 13+',
        title: 'Handoff & Monitoring',
        description:
          'Delivered full documentation, trained the team, and transitioned to monitoring mode with quarterly optimization reviews.',
      },
    ],
    beforeAfter: {
      before:
        'Manual lead qualification from spreadsheets. Disconnected marketing campaigns with no attribution. 70% trial churn. Revenue plateaued at $45K MRR. Sales team spending 60% of time on admin.',
      after:
        'Automated lead scoring and routing. Unified marketing engine with full attribution. Trial churn dropped to 25%. Revenue at $135K MRR and growing. Sales team fully focused on closing.',
    },
    metaTitle: 'SaaS Revenue Tripled in 90 Days | New Age Case Study',
    metaDescription:
      'How we helped StreamlineHQ go from $45K to $135K MRR in 90 days through automation, funnel optimization, and sales infrastructure.',
    featured: true,
  },

  {
    slug: 'ecommerce-automation',
    title: 'E-Commerce Brand Automates to 185% More Conversions',
    client: 'Velora Living',
    industry: 'E-Commerce',
    servicesUsed: ['automation-systems', 'marketing-growth'],
    timeline: '8 weeks',
    challenge:
      'Velora Living was a premium home goods brand doing $1.8M annually but hitting a ceiling. Their Shopify store converted at 1.2% — well below industry average. Cart abandonment was 78%. Post-purchase follow-up was nonexistent. The founder was personally managing inventory, customer service, and marketing — burning 60+ hours a week on operations instead of growth.',
    approach:
      'We identified that Velora\'s products were strong but the buying experience was leaving revenue on the table at every stage. The strategy was twofold: automate operations to free the founder\'s time, and rebuild the conversion funnel to capture the revenue that was already walking through the door.',
    solution:
      'We built 18 automations covering inventory alerts, order processing, customer support triage, and post-purchase nurture sequences. Redesigned the product pages and checkout flow for conversion. Deployed a cart abandonment recovery system with SMS and email. Created a loyalty program with automated rewards and re-engagement campaigns.',
    techStack: ['Shopify Plus', 'Klaviyo', 'Make', 'Gorgias', 'Attentive', 'Google Analytics 4'],
    results: [
      { metric: '185%', value: '185%', label: 'Conversion Increase', icon: '📈' },
      { metric: '$2.4M', value: '$2.4M', label: 'Additional Revenue', icon: '💰' },
      { metric: '40hrs', value: '40hrs', label: 'Saved Weekly', icon: '⏰' },
      { metric: '8 wks', value: '8 wks', label: 'Delivery Time', icon: '🚀' },
    ],
    testimonial: {
      quote:
        'I was working 60-hour weeks running everything manually. Now the systems handle operations and I focus on product and partnerships. Revenue more than doubled and I actually have weekends again.',
      name: 'Sofia Reyes',
      title: 'Founder & CEO',
      company: 'Velora Living',
      rating: 5,
    },
    projectTimeline: [
      {
        date: 'Week 1',
        title: 'Operations Audit',
        description:
          'Documented all manual processes, identified automation candidates, and mapped the customer journey from discovery to repeat purchase.',
      },
      {
        date: 'Week 2–3',
        title: 'Automation Build',
        description:
          'Deployed 18 automations: inventory management, order workflows, customer support routing, and internal notifications.',
      },
      {
        date: 'Week 4–5',
        title: 'Conversion Optimization',
        description:
          'Redesigned product pages, checkout flow, and deployed cart abandonment recovery via email and SMS.',
      },
      {
        date: 'Week 6–8',
        title: 'Marketing Systems & Launch',
        description:
          'Built loyalty program, post-purchase email sequences, and re-engagement campaigns. Launched and optimized.',
      },
    ],
    beforeAfter: {
      before:
        '1.2% conversion rate. 78% cart abandonment. No post-purchase automation. Founder managing all operations manually. $1.8M annual revenue, flat growth.',
      after:
        '3.4% conversion rate. Cart abandonment recovered 22% of lost sales. Full post-purchase automation driving 35% repeat purchases. Founder focused on growth. $4.2M annual run rate.',
    },
    metaTitle: 'E-Commerce Conversions Up 185% | New Age Case Study',
    metaDescription:
      'How Velora Living automated operations and rebuilt their conversion funnel to generate $2.4M in additional revenue in 8 weeks.',
  },

  {
    slug: 'real-estate-pipeline',
    title: 'Real Estate Firm Generates 200+ Qualified Leads Monthly',
    client: 'Apex Realty Group',
    industry: 'Real Estate',
    servicesUsed: ['sales-infrastructure', 'automation-systems', 'marketing-growth'],
    timeline: '6 months',
    challenge:
      'Apex Realty Group had 12 agents but no centralized lead generation system. Each agent sourced their own leads through personal networks, cold calls, and door knocking. Lead quality was inconsistent, follow-up was unreliable, and the firm had no visibility into pipeline health. Monthly closings fluctuated wildly — from 8 to 22 — making revenue unpredictable.',
    approach:
      'We treated Apex like a B2B company that happened to sell real estate. The goal was to build a centralized lead generation and pipeline management system that gave every agent a consistent flow of qualified prospects and gave leadership real-time visibility into performance.',
    solution:
      'Built a multi-channel lead generation engine combining targeted Meta and Google ads, SEO-optimized neighborhood landing pages, and an automated referral program. Deployed a CRM overhaul with lead scoring, automated nurture sequences, and agent routing. Created dashboards showing lead-to-close metrics by agent, source, and neighborhood.',
    techStack: ['Salesforce', 'Meta Ads', 'Google Ads', 'Next.js', 'Make', 'Calendly', 'Looker Studio'],
    results: [
      { metric: '200+', value: '200+', label: 'Qualified Leads/Month', icon: '🧲' },
      { metric: '340%', value: '340%', label: 'More Closings', icon: '🏠' },
      { metric: '75%', value: '75%', label: 'Faster Response Time', icon: '⚡' },
      { metric: '6 mo', value: '6 mo', label: 'Full ROI Timeline', icon: '📊' },
    ],
    testimonial: {
      quote:
        'Before New Age, our agents were hunting for leads individually. Now the system feeds them qualified prospects daily. Closings went from 12 to 52 per month. It completely transformed how we operate.',
      name: 'David Thornton',
      title: 'Managing Broker',
      company: 'Apex Realty Group',
      rating: 5,
    },
    projectTimeline: [
      {
        date: 'Month 1',
        title: 'Audit & Strategy',
        description:
          'Analyzed agent performance, lead sources, conversion rates, and pipeline gaps. Designed the centralized system architecture.',
      },
      {
        date: 'Month 2',
        title: 'CRM & Pipeline Build',
        description:
          'Migrated to Salesforce, configured lead scoring, routing rules, and automated nurture sequences for each pipeline stage.',
      },
      {
        date: 'Month 3',
        title: 'Lead Gen Launch',
        description:
          'Launched 15 neighborhood landing pages, Meta and Google ad campaigns, and the automated referral program.',
      },
      {
        date: 'Month 4–5',
        title: 'Optimization & Training',
        description:
          'Refined ad targeting, A/B tested landing pages, trained all 12 agents on the new system, and optimized nurture sequences.',
      },
      {
        date: 'Month 6',
        title: 'Scale & Handoff',
        description:
          'Scaled ad spend on winning channels, launched performance dashboards, and transitioned to retainer support.',
      },
    ],
    beforeAfter: {
      before:
        'Agents sourcing leads individually. No centralized CRM. Average response time 14 hours. 12 closings per month. No pipeline visibility. Revenue unpredictable.',
      after:
        '200+ qualified leads per month from centralized system. Average response time 3.5 hours. 52 closings per month. Full pipeline visibility with real-time dashboards. Predictable revenue forecasting.',
    },
    metaTitle: 'Real Estate Lead Pipeline — 200+ Leads/Month | New Age Case Study',
    metaDescription:
      'How Apex Realty Group built a centralized lead pipeline generating 200+ qualified leads monthly and tripled their closing rate.',
  },
]
