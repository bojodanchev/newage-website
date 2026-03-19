interface BeforeAfterSliderProps {
  before: string
  after: string
}

export function BeforeAfterSlider({ before, after }: BeforeAfterSliderProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-xl border border-red-500/20 border-l-4 border-l-red-500/40 bg-red-500/[0.05] p-8">
        <span className="text-xs font-mono uppercase tracking-widest text-red-400 mb-4 block">
          Before
        </span>
        <p className="text-neutral-400 leading-relaxed">{before}</p>
      </div>

      <div className="rounded-xl border border-accent-mint/20 border-l-4 border-l-accent-mint/40 bg-accent-mint/[0.05] p-8">
        <span className="text-xs font-mono uppercase tracking-widest text-accent-mint mb-4 block">
          After
        </span>
        <p className="text-neutral-300 leading-relaxed">{after}</p>
      </div>
    </div>
  )
}
