import { FadeIn } from '@/components/animation/FadeIn'
import type { CaseStudyResult } from '@/types/content'

interface ResultsGridProps {
  results: CaseStudyResult[]
}

export function ResultsGrid({ results }: ResultsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {results.map((result, index) => (
        <FadeIn key={result.metric} delay={index * 0.1}>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold gradient-text md:text-5xl mb-2">
              {result.value}
            </p>
            <p className="text-sm text-neutral-400">{result.label}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
