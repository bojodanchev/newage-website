export type InfluencerAudience = 'brands' | 'influencers' | 'ugc'

export interface AudiencePath {
  id: InfluencerAudience
  eyebrow: string
  title: string
  description: string
  cta: string
  href: string
  image: string
  accent: string
}

export interface InfluencerLandingContent {
  metadata: { title: string; description: string }
  hero: {
    eyebrow: string
    title: string
    titleAccent: string
    description: string
    primary: string
    secondary: string
    scroll: string
  }
  audience: { eyebrow: string; title: string; description: string; paths: AudiencePath[] }
  shift: {
    eyebrow: string
    title: string
    oldLabel: string
    oldItems: string[]
    newLabel: string
    newItems: string[]
  }
  process: { eyebrow: string; title: string; description: string; steps: Array<{ number: string; title: string; text: string }> }
  outcomes: { eyebrow: string; title: string; description: string; items: string[] }
  events: { eyebrow: string; title: string; description: string; services: string[]; formats: string[] }
  industries: { eyebrow: string; title: string; items: string[]; platforms: string[] }
  final: { eyebrow: string; title: string; description: string; primary: string; secondary: string }
}

export interface InfluencerFunnelContent {
  id: InfluencerAudience
  metadata: { title: string; description: string }
  hero: { eyebrow: string; title: string; description: string; cta: string; note: string }
  problem: { eyebrow: string; title: string; items: string[] }
  solution: { eyebrow: string; title: string; description: string; items: string[] }
  services: { eyebrow: string; title: string; items: string[] }
  journey: { eyebrow: string; title: string; steps: string[] }
  form: {
    eyebrow: string
    title: string
    description: string
    submit: string
    successTitle: string
    successText: string
    fields: { name: string; email: string; phone: string; company: string; website: string; audience: string; niche: string; goals: string }
  }
}

const landingEn: InfluencerLandingContent = {
  metadata: {
    title: 'Influencer Marketing Agency',
    description: 'NewAge Influence connects brands with creators and UGC talent through strategy, production, negotiation and measurable campaign reporting.',
  },
  hero: {
    eyebrow: 'NewAge Influence · Brands × Creators × Culture',
    title: 'Influence that',
    titleAccent: 'converts.',
    description: 'We connect ambitious brands with the right people—not just creators with reach, but voices that move audiences to act.',
    primary: 'Find creators',
    secondary: 'Join the network',
    scroll: 'Explore the ecosystem',
  },
  audience: {
    eyebrow: 'One ecosystem · three ways in',
    title: 'Choose your side of the story.',
    description: 'Every path has its own team, process and commercial model. Pick the one built around your next move.',
    paths: [
      { id: 'brands', eyebrow: 'For brands', title: 'Turn attention into demand.', description: 'Creator selection, campaign strategy, contracts, content control and reporting—managed end to end.', cta: 'Build a campaign', href: '/influencer-marketing/brands', image: '/influencer/brand-studio.webp', accent: '#ff725e' },
      { id: 'influencers', eyebrow: 'For influencers', title: 'More deals. Better terms.', description: 'Representation, sales, negotiation and partnerships that respect the value of your audience.', cta: 'Apply for representation', href: '/influencer-marketing/influencers', image: '/influencer/ecosystem-hero.webp', accent: '#a78bfa' },
      { id: 'ugc', eyebrow: 'For UGC creators', title: 'Skill beats follower count.', description: 'Build a portfolio, receive real briefs and get paid for content brands can actually use.', cta: 'Become a UGC creator', href: '/influencer-marketing/ugc', image: '/influencer/ugc-creator.webp', accent: '#8ee8c1' },
    ],
  },
  shift: {
    eyebrow: 'The shift',
    title: 'People trust people. Your marketing should too.',
    oldLabel: 'The old model',
    oldItems: ['Buy reach and hope', 'Choose by follower count', 'Approve content in a vacuum', 'Report vanity metrics'],
    newLabel: 'The NewAge model',
    newItems: ['Start with a business outcome', 'Match on audience and credibility', 'Build content for the platform', 'Track action, not applause'],
  },
  process: {
    eyebrow: 'The operating system',
    title: 'From brief to business result.',
    description: 'One accountable team across strategy, creators, production and measurement.',
    steps: [
      { number: '01', title: 'Define the signal', text: 'Audience, offer, platform and the action the campaign must create.' },
      { number: '02', title: 'Build the match', text: 'We shortlist for fit, content quality, audience credibility and commercial value.' },
      { number: '03', title: 'Make it native', text: 'Briefs protect the brand without sanding away the creator’s voice.' },
      { number: '04', title: 'Prove the outcome', text: 'Approvals, usage rights, performance and learning live in one reporting loop.' },
    ],
  },
  outcomes: {
    eyebrow: 'Campaign capability',
    title: 'Built for more than awareness.',
    description: 'We shape the creator mix, commercial model and content system around the result you need.',
    items: ['Sales', 'Qualified leads', 'Product launches', 'Always-on UGC', 'Affiliate revenue', 'Brand demand', 'Community', 'Retention'],
  },
  events: {
    eyebrow: 'Influence in the room',
    title: 'Events made to travel beyond the guest list.',
    description: 'Creator guest lists, live content and media moments that turn one night into weeks of distribution.',
    services: ['Creator guest list', 'PR & media', 'Photography', 'Reels & TikToks', 'Aftermovie', 'Live coverage'],
    formats: ['Launches', 'Hospitality', 'Automotive', 'VIP', 'Creator meetups', 'Mall activations'],
  },
  industries: {
    eyebrow: 'Where we work',
    title: 'Category fluency. Platform-native execution.',
    items: ['Beauty', 'Hospitality', 'Food', 'Automotive', 'Real estate', 'Fitness', 'Healthcare', 'Finance', 'Apps & SaaS', 'Ecommerce', 'Luxury', 'Fashion'],
    platforms: ['Instagram', 'TikTok', 'YouTube', 'LinkedIn'],
  },
  final: {
    eyebrow: 'Make influence accountable',
    title: 'Your next campaign should create more than views.',
    description: 'Tell us where the business needs to move. We’ll build the creator system around it.',
    primary: 'Book a strategy call',
    secondary: 'Apply as a creator',
  },
}

const landingBg: InfluencerLandingContent = {
  metadata: {
    title: 'Инфлуенсър маркетинг агенция',
    description: 'NewAge Influence свързва брандове с инфлуенсъри и UGC таланти чрез стратегия, продукция, преговори и измерими кампании.',
  },
  hero: {
    eyebrow: 'NewAge Influence · Брандове × Създатели × Култура',
    title: 'Влияние, което',
    titleAccent: 'продава.',
    description: 'Свързваме амбициозни компании с правилните хора—не просто лица с аудитория, а гласове, които карат хората да действат.',
    primary: 'Намерете създатели',
    secondary: 'Стани част от мрежата',
    scroll: 'Разгледайте екосистемата',
  },
  audience: {
    eyebrow: 'Една екосистема · три входа',
    title: 'Изберете своята роля.',
    description: 'Всеки път има собствен екип, процес и търговски модел. Изберете този, който отговаря на следващата ви стъпка.',
    paths: [
      { id: 'brands', eyebrow: 'За брандове', title: 'Превърнете вниманието в търсене.', description: 'Подбор, стратегия, договори, контрол на съдържанието и отчетност—от край до край.', cta: 'Създайте кампания', href: '/influencer-marketing/brands', image: '/influencer/brand-studio.webp', accent: '#ff725e' },
      { id: 'influencers', eyebrow: 'За инфлуенсъри', title: 'Повече сделки. По-добри условия.', description: 'Представителство, продажби, преговори и партньорства, които уважават стойността на аудиторията ви.', cta: 'Кандидатствайте за представителство', href: '/influencer-marketing/influencers', image: '/influencer/ecosystem-hero.webp', accent: '#a78bfa' },
      { id: 'ugc', eyebrow: 'За UGC creators', title: 'Умението е по-важно от последователите.', description: 'Изградете портфолио, получавайте реални брифове и печелете от съдържание за брандове.', cta: 'Станете UGC creator', href: '/influencer-marketing/ugc', image: '/influencer/ugc-creator.webp', accent: '#8ee8c1' },
    ],
  },
  shift: {
    eyebrow: 'Промяната',
    title: 'Хората вярват на хора. Маркетингът ви също трябва.',
    oldLabel: 'Старият модел',
    oldItems: ['Купувате reach и се надявате', 'Избирате по брой последователи', 'Одобрявате съдържание без контекст', 'Отчитате vanity metrics'],
    newLabel: 'Моделът на NewAge',
    newItems: ['Започваме с бизнес резултат', 'Съчетаваме аудитория и доверие', 'Създаваме за самата платформа', 'Следим действие, не аплодисменти'],
  },
  process: {
    eyebrow: 'Операционната система',
    title: 'От брифа до бизнес резултата.',
    description: 'Един отговорен екип за стратегия, подбор, продукция и измерване.',
    steps: [
      { number: '01', title: 'Определяме сигнала', text: 'Аудитория, оферта, платформа и действието, което кампанията трябва да създаде.' },
      { number: '02', title: 'Правим точния match', text: 'Подбираме по fit, качество, доверие на аудиторията и търговска стойност.' },
      { number: '03', title: 'Създаваме native', text: 'Брифът пази бранда, без да отнема естествения глас на създателя.' },
      { number: '04', title: 'Доказваме резултата', text: 'Одобрения, права, ефективност и изводи в един отчетен цикъл.' },
    ],
  },
  outcomes: {
    eyebrow: 'Възможности',
    title: 'Създадено за повече от awareness.',
    description: 'Подбираме creator mix, търговски модел и съдържание според реалния резултат, който търсите.',
    items: ['Продажби', 'Качествени лийдове', 'Продуктови премиери', 'Always-on UGC', 'Affiliate приходи', 'Търсене на бранда', 'Общност', 'Retention'],
  },
  events: {
    eyebrow: 'Влияние на живо',
    title: 'Събития, които стигат отвъд списъка с гости.',
    description: 'Creator guest lists, live content и медийни моменти, които превръщат една вечер в седмици дистрибуция.',
    services: ['Creator guest list', 'PR и медии', 'Фотография', 'Reels и TikToks', 'Aftermovie', 'Live coverage'],
    formats: ['Премиери', 'Хотели и ресторанти', 'Automotive', 'VIP', 'Creator meetups', 'Mall activations'],
  },
  industries: {
    eyebrow: 'Къде работим',
    title: 'Познаване на категорията. Native изпълнение.',
    items: ['Beauty', 'Хотели и туризъм', 'Food', 'Automotive', 'Имоти', 'Fitness', 'Healthcare', 'Finance', 'Apps & SaaS', 'Ecommerce', 'Luxury', 'Fashion'],
    platforms: ['Instagram', 'TikTok', 'YouTube', 'LinkedIn'],
  },
  final: {
    eyebrow: 'Направете влиянието измеримо',
    title: 'Следващата ви кампания трябва да създаде повече от гледания.',
    description: 'Кажете ни какъв бизнес резултат търсите. Ние ще изградим creator системата около него.',
    primary: 'Запазете стратегически разговор',
    secondary: 'Кандидатствайте като creator',
  },
}

const sharedFieldsEn = { name: 'Your name', email: 'Email', phone: 'Phone (optional)', company: 'Brand / company', website: 'Website or portfolio', audience: 'Audience size', niche: 'Primary niche', goals: 'What would make this a win?' }
const sharedFieldsBg = { name: 'Вашето име', email: 'Имейл', phone: 'Телефон (по избор)', company: 'Бранд / компания', website: 'Сайт или портфолио', audience: 'Размер на аудиторията', niche: 'Основна ниша', goals: 'Как би изглеждал успешният резултат?' }

const funnelsEn: Record<InfluencerAudience, InfluencerFunnelContent> = {
  brands: {
    id: 'brands', metadata: { title: 'Influencer Campaigns for Brands', description: 'End-to-end influencer, UGC, affiliate and ambassador campaigns built around measurable business outcomes.' },
    hero: { eyebrow: 'For brands', title: 'Find the right faces for your business.', description: 'Stop buying follower counts. Start building creator campaigns around audience fit, content quality and commercial outcomes.', cta: 'Book a strategy call', note: 'Strategy · Selection · Negotiation · Reporting' },
    problem: { eyebrow: 'The expensive guesswork', title: 'A creator list is not a strategy.', items: ['You do not know who truly fits', 'Pricing is opaque', 'Content misses the platform', 'ROI arrives as a screenshot'] },
    solution: { eyebrow: 'One accountable partner', title: 'Every moving part, managed.', description: 'From the first shortlist to final usage rights and reporting, we run the whole campaign.', items: ['Creator selection', 'Campaign strategy', 'Negotiation', 'Contracts & usage rights', 'Content review', 'Performance reporting'] },
    services: { eyebrow: 'Campaign stack', title: 'Choose the engine for the outcome.', items: ['Influencer campaigns', 'UGC production', 'Affiliate programs', 'Ambassadors', 'Product seeding', 'Reviews', 'Launches', 'Events & PR'] },
    journey: { eyebrow: 'How it moves', title: 'Brief to report, without the chaos.', steps: ['Discovery', 'Strategy', 'Creator matching', 'Negotiation', 'Production', 'Launch', 'Reporting'] },
    form: { eyebrow: 'Campaign intake', title: 'Tell us what needs to move.', description: 'Share the outcome, category and timing. We will respond with the right next step.', submit: 'Request a strategy call', successTitle: 'Brief received.', successText: 'We’ll review the opportunity and come back with a clear next step within one business day.', fields: sharedFieldsEn },
  },
  influencers: {
    id: 'influencers', metadata: { title: 'Influencer Representation', description: 'Representation, commercial strategy, negotiation and brand partnerships for serious creators.' },
    hero: { eyebrow: 'For influencers', title: 'More deals. Higher budgets. Less admin.', description: 'You build the audience. We build the commercial engine around it—without flattening your voice or taking every opportunity.', cta: 'Apply now', note: 'Selective representation · Long-term partnerships' },
    problem: { eyebrow: 'The creator bottleneck', title: 'Your inbox should not run your business.', items: ['Low or inconsistent offers', 'No outbound brand sales', 'Weak negotiation leverage', 'Contracts and payments consume your time'] },
    solution: { eyebrow: 'Representation with a point of view', title: 'A commercial team behind your talent.', description: 'We position, package and sell your value while keeping fit and audience trust non-negotiable.', items: ['Representation', 'Brand outreach', 'Negotiation', 'Contracts & payments', 'Pricing strategy', 'Media kit & analytics'] },
    services: { eyebrow: 'What we build', title: 'From creator to durable brand.', items: ['Commercial positioning', 'Personal brand strategy', 'Partnership pipeline', 'Rate architecture', 'Campaign operations', 'Long-term ambassadorships'] },
    journey: { eyebrow: 'Creator journey', title: 'Selective by design.', steps: ['Apply', 'Portfolio review', 'Interview', 'Positioning', 'Brand matching', 'Campaigns', 'Long-term partnerships'] },
    form: { eyebrow: 'Creator application', title: 'Let’s see what we can build together.', description: 'Tell us about your voice, audience and the partnerships you want more of.', submit: 'Submit application', successTitle: 'Application received.', successText: 'Our talent team will review your profile and contact you if there is a strong fit.', fields: sharedFieldsEn },
  },
  ugc: {
    id: 'ugc', metadata: { title: 'UGC Creator Network', description: 'A UGC creator network for paid brand briefs, portfolio growth, practical support and reliable payments.' },
    hero: { eyebrow: 'For UGC creators', title: 'You do not need 100,000 followers.', description: 'You need content that feels native, holds attention and helps a brand sell. We connect that skill with real briefs.', cta: 'Become a UGC creator', note: 'Portfolio · Briefs · Brand deals · Payments' },
    problem: { eyebrow: 'Where talent gets stuck', title: 'Good content is not enough if nobody sees it.', items: ['No consistent clients', 'No portfolio direction', 'Unclear pricing', 'Briefs and payments feel improvised'] },
    solution: { eyebrow: 'A working creator network', title: 'Build the craft. We build the pipeline.', description: 'A clear route from portfolio to paid assignments, with expectations and feedback you can actually use.', items: ['Portfolio guidance', 'Creator training', 'Paid brand briefs', 'Content feedback', 'Recurring opportunities', 'Reliable payment flow'] },
    services: { eyebrow: 'Where demand lives', title: 'Content across high-velocity categories.', items: ['Beauty', 'Food', 'Travel & hotels', 'Apps', 'Automotive', 'Fashion', 'Real estate', 'Electronics', 'Fitness', 'Pets'] },
    journey: { eyebrow: 'UGC journey', title: 'From sample to paid brief.', steps: ['Apply', 'Portfolio review', 'Creator profile', 'Brand matching', 'Brief', 'Production', 'Payment'] },
    form: { eyebrow: 'UGC application', title: 'Show us how you create.', description: 'A large audience is not required. A clear point of view, good craft and reliability are.', submit: 'Join the creator network', successTitle: 'Application received.', successText: 'We’ll review your work and contact you when your profile matches an active category.', fields: sharedFieldsEn },
  },
}

const funnelsBg: Record<InfluencerAudience, InfluencerFunnelContent> = {
  brands: {
    id: 'brands', metadata: { title: 'Инфлуенсър кампании за брандове', description: 'Цялостни influencer, UGC, affiliate и ambassador кампании, изградени около измерими бизнес резултати.' },
    hero: { eyebrow: 'За брандове', title: 'Намерете правилните лица за своя бизнес.', description: 'Спрете да купувате последователи. Започнете да изграждате кампании според аудитория, съдържание и бизнес резултат.', cta: 'Запазете стратегически разговор', note: 'Стратегия · Подбор · Преговори · Отчетност' },
    problem: { eyebrow: 'Скъпото гадаене', title: 'Списъкът с инфлуенсъри не е стратегия.', items: ['Не знаете кой наистина пасва', 'Цените са непрозрачни', 'Съдържанието не е native', 'ROI идва като screenshot'] },
    solution: { eyebrow: 'Един отговорен партньор', title: 'Управляваме всяка движеща се част.', description: 'От първия shortlist до правата за ползване и финалния отчет—водим цялата кампания.', items: ['Creator selection', 'Campaign стратегия', 'Преговори', 'Договори и usage rights', 'Content review', 'Performance reporting'] },
    services: { eyebrow: 'Campaign stack', title: 'Изберете двигателя за резултата.', items: ['Influencer кампании', 'UGC продукция', 'Affiliate програми', 'Ambassadors', 'Product seeding', 'Reviews', 'Launches', 'Events & PR'] },
    journey: { eyebrow: 'Как работим', title: 'От бриф до отчет, без хаос.', steps: ['Discovery', 'Стратегия', 'Creator matching', 'Преговори', 'Продукция', 'Launch', 'Отчет'] },
    form: { eyebrow: 'Campaign intake', title: 'Кажете ни какво трябва да променим.', description: 'Споделете целта, категорията и времето. Ще ви върнем най-добрата следваща стъпка.', submit: 'Заявете стратегически разговор', successTitle: 'Получихме брифа.', successText: 'Ще прегледаме възможността и ще ви върнем ясна следваща стъпка до един работен ден.', fields: sharedFieldsBg },
  },
  influencers: {
    id: 'influencers', metadata: { title: 'Представителство за инфлуенсъри', description: 'Представителство, търговска стратегия, преговори и бранд партньорства за сериозни creators.' },
    hero: { eyebrow: 'За инфлуенсъри', title: 'Повече сделки. По-високи бюджети. По-малко администрация.', description: 'Вие изграждате аудиторията. Ние изграждаме търговската система около нея—без да заличаваме гласа ви.', cta: 'Кандидатствайте', note: 'Селективно представителство · Дългосрочни партньорства' },
    problem: { eyebrow: 'Creator bottleneck', title: 'Вашият inbox не трябва да управлява бизнеса ви.', items: ['Ниски или непостоянни оферти', 'Няма outbound продажби', 'Слаба позиция при преговори', 'Договорите и плащанията отнемат време'] },
    solution: { eyebrow: 'Представителство с позиция', title: 'Търговски екип зад таланта ви.', description: 'Позиционираме, пакетираме и продаваме стойността ви, без компромис с fit-а и доверието на аудиторията.', items: ['Представителство', 'Brand outreach', 'Преговори', 'Договори и плащания', 'Pricing стратегия', 'Media kit и analytics'] },
    services: { eyebrow: 'Какво изграждаме', title: 'От creator към устойчив бранд.', items: ['Търговско позициониране', 'Personal brand стратегия', 'Партньорски pipeline', 'Rate architecture', 'Campaign operations', 'Дългосрочни ambassadors'] },
    journey: { eyebrow: 'Creator journey', title: 'Селективно по замисъл.', steps: ['Кандидатстване', 'Portfolio review', 'Интервю', 'Позициониране', 'Brand matching', 'Кампании', 'Дългосрочни партньорства'] },
    form: { eyebrow: 'Creator application', title: 'Нека видим какво можем да изградим заедно.', description: 'Разкажете ни за гласа, аудиторията и партньорствата, които искате.', submit: 'Изпратете кандидатура', successTitle: 'Получихме кандидатурата.', successText: 'Talent екипът ни ще прегледа профила ви и ще се свърже при силен fit.', fields: sharedFieldsBg },
  },
  ugc: {
    id: 'ugc', metadata: { title: 'UGC Creator Network', description: 'UGC creator мрежа за платени брифове, развитие на портфолио, практическа подкрепа и надеждни плащания.' },
    hero: { eyebrow: 'За UGC creators', title: 'Не ви трябват 100 000 последователи.', description: 'Трябва ви съдържание, което изглежда естествено, задържа внимание и помага на бранда да продава.', cta: 'Станете UGC creator', note: 'Портфолио · Брифове · Brand deals · Плащания' },
    problem: { eyebrow: 'Къде талантът зацикля', title: 'Доброто съдържание не стига, ако никой не го вижда.', items: ['Няма постоянни клиенти', 'Няма посока за портфолиото', 'Неясни цени', 'Брифове и плащания без процес'] },
    solution: { eyebrow: 'Работеща creator мрежа', title: 'Вие развивате умението. Ние изграждаме pipeline.', description: 'Ясен път от портфолио до платени задачи, с очаквания и обратна връзка, които помагат.', items: ['Portfolio guidance', 'Creator training', 'Платени brand briefs', 'Content feedback', 'Повтаряеми възможности', 'Надежден payment flow'] },
    services: { eyebrow: 'Къде има търсене', title: 'Съдържание за динамични категории.', items: ['Beauty', 'Food', 'Travel & hotels', 'Apps', 'Automotive', 'Fashion', 'Real estate', 'Electronics', 'Fitness', 'Pets'] },
    journey: { eyebrow: 'UGC journey', title: 'От sample до платен brief.', steps: ['Кандидатствайте', 'Portfolio review', 'Creator profile', 'Brand matching', 'Brief', 'Продукция', 'Плащане'] },
    form: { eyebrow: 'UGC application', title: 'Покажете ни как създавате.', description: 'Голяма аудитория не е нужна. Нужни са гледна точка, добро изпълнение и надеждност.', submit: 'Присъединете се към мрежата', successTitle: 'Получихме кандидатурата.', successText: 'Ще прегледаме работата ви и ще се свържем, когато профилът ви пасне на активна категория.', fields: sharedFieldsBg },
  },
}

export function getInfluencerLanding(locale: string): InfluencerLandingContent {
  return locale === 'bg' ? landingBg : landingEn
}

export function getInfluencerFunnel(locale: string, audience: InfluencerAudience): InfluencerFunnelContent {
  return locale === 'bg' ? funnelsBg[audience] : funnelsEn[audience]
}
