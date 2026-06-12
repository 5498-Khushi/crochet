'use client'

import { AlertCircle } from 'lucide-react'
import { STITCHES } from '@/lib/stitches'

interface StitchInstance {
  id: string
  type: string
  stitch: any
  color: string
  position: number
  rowIndex: number
}

interface PatternRowData {
  id: string
  stitches: StitchInstance[]
}

type PatternSummaryNewProps = {
  patternName: string
  rows: PatternRowData[]
}

export default function PatternSummaryNew({
  patternName,
  rows
}: PatternSummaryNewProps) {
  const totalRows = rows.length
  const totalStitches = rows.reduce((sum, row) => sum + row.stitches.length, 0)

  // Get stitch counts
  const stitchCounts: Record<string, number> = {}
  rows.forEach(row => {
    row.stitches.forEach(stitch => {
      stitchCounts[stitch.type] = (stitchCounts[stitch.type] || 0) + 1
    })
  })

  return (
    <div className="space-y-4 rounded-lg border border-border/30 bg-white/60 p-6">
      <div>
        <h3 className="text-lg font-bold text-foreground">{patternName}</h3>
        <p className="text-xs text-muted-foreground">Pattern Summary</p>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-border/20 pt-4">
        <div className="rounded-lg bg-primary/10 p-3">
          <p className="text-xs font-semibold text-primary">Total Rows</p>
          <p className="text-2xl font-bold text-primary">{totalRows}</p>
        </div>
        <div className="rounded-lg bg-accent/10 p-3">
          <p className="text-xs font-semibold text-accent">Total Stitches</p>
          <p className="text-2xl font-bold text-accent">{totalStitches}</p>
        </div>
      </div>

      {totalRows > 0 && (
        <div className="border-t border-border/20 pt-3 space-y-2">
          <p className="text-xs font-semibold text-foreground">Stitches by Type</p>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {Object.entries(stitchCounts).map(([type, count]) => {
              const stitch = STITCHES[type as keyof typeof STITCHES]
              return (
                <div key={type} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {stitch?.abbreviation || type}
                  </span>
                  <span className="font-semibold text-foreground">{count}x</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {totalRows > 0 && (
        <div className="border-t border-border/20 pt-3">
          <p className="text-xs font-semibold text-foreground mb-2">Row Breakdown</p>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {rows.map((row, idx) => (
              <div key={row.id} className="flex items-center justify-between text-xs bg-muted/30 rounded px-2 py-1">
                <span className="text-muted-foreground">Row {idx + 1}</span>
                <span className="font-semibold">{row.stitches.length} stitches</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {totalRows === 0 && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 flex gap-2">
          <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-800">Start by adding stitches to your pattern.</p>
        </div>
      )}
    </div>
  )
}
