const clients = [
  'Meridian Labs',
  'Apex Digital',
  'Quantum Growth',
  'Strato Systems',
  'Vanguard AI',
  'Nexus Corp',
  'Pinnacle SaaS',
  'Forge Capital',
]

export function LogoBar() {
  const marqueeItems = [...clients, ...clients]

  return (
    <section className="py-8 border-t border-b border-neutral-700/30 overflow-hidden">
      <p className="text-neutral-500 text-sm text-center mb-6">
        Trusted by forward-thinking companies
      </p>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary to-transparent z-10" />

        <div className="flex animate-marquee">
          {marqueeItems.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex-shrink-0 px-10 text-neutral-500 font-heading font-semibold text-lg tracking-wide whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>

        <style jsx>{`
          @keyframes marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </div>
    </section>
  )
}
