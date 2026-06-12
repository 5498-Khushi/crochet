'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Stitch, getDifficultyColor } from '@/lib/stitches'

type StitchCardProps = {
  stitch: Stitch
  onSelect?: (stitch: Stitch) => void
}

export default function StitchCard({ stitch, onSelect }: StitchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="rounded-xl border border-border/50 bg-white/50 overflow-hidden transition hover:shadow-md hover:border-border">
      {/* Header */}
      <div 
        className="p-6 cursor-pointer hover:bg-white/70 transition"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-4xl font-bold text-muted-foreground/50">
                {stitch.symbol}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {stitch.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {stitch.abbreviation}
                </p>
              </div>
            </div>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(stitch.difficulty)}`}>
            {stitch.difficulty}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          {stitch.description}
        </p>

        {/* Expand button */}
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (onSelect) onSelect(stitch)
            }}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition"
          >
            Use in Pattern
          </button>
          <ChevronDown 
            className={`h-4 w-4 text-muted-foreground transition ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </div>
      </div>

      {/* Expandable details */}
      {isExpanded && (
        <div className="border-t border-border/30 bg-muted/10 p-6 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">
              How to Crochet
            </h4>
            <ol className="space-y-2">
              {stitch.steps.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="font-medium text-primary flex-shrink-0">
                    {idx + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">
              What to Make
            </h4>
            <ul className="space-y-1">
              {stitch.usageExamples.map((example, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-accent">•</span>
                  <span>{example}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Stitch Height:</span> {stitch.yarnHeight}cm with medium weight yarn
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
