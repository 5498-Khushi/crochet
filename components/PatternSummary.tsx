'use client'

import { PatternRow } from './PatternBuilder'
import { AlertCircle } from 'lucide-react'

type PatternSummaryProps = {
  patternName: string
  rows: PatternRow[]
  selectedRowId: string
}

export default function PatternSummary({
  patternName,
  rows,
  selectedRowId,
}: PatternSummaryProps) {
  const totalRows = rows.length
  const totalStitches = rows.reduce((sum, row) => sum + row.stitches.length, 0)
  const selectedRow = rows.find(r => r.id === selectedRowId)
  
  // Get stitch counts
  const stitchCounts: Record<string, number> = {}
  rows.forEach(row => {
    row.stitches.forEach(s => {
      stitchCounts[s.type] = (stitchCounts[s.type] || 0) + 1
    })
  })

  // Get stitch names
  const stitchNames: Record<string, string> = {
    ch: 'Chain',
    slst: 'Slip Stitch',
    sc: 'Single Crochet',
    hdc: 'Half Double',
    dc: 'Double Crochet',
    tr: 'Treble',
    inc: 'Increase',
    dec: 'Decrease'
  }

  return (
    <div className="w-full lg:w-80 flex flex-col gap-4">
      {/* Pattern Stats */}
      <div className="rounded-xl border border-border/50 bg-white/50 p-4">
        <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
          Pattern Summary
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Name</span>
            <span className="text-sm font-semibold text-foreground">{patternName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Rows</span>
            <span className="text-sm font-semibold text-foreground">{totalRows}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Stitches</span>
            <span className="text-sm font-semibold text-foreground">{totalStitches}</span>
          </div>
          {selectedRow && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Current Row</span>
              <span className="text-sm font-semibold text-foreground">{selectedRow.stitches.length} stitches</span>
            </div>
          )}
        </div>
      </div>

      {/* Stitch Breakdown */}
      <div className="rounded-xl border border-border/50 bg-white/50 p-4">
        <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
          Stitch Breakdown
        </h3>
        
        <div className="space-y-2">
          {Object.entries(stitchCounts).map(([stitchId, count]) => (
            <div key={stitchId} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
              <span className="text-sm font-medium text-foreground">
                {stitchNames[stitchId] || stitchId}
              </span>
              <span className="text-sm font-semibold text-primary">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pattern Sequence */}
      <div className="rounded-xl border border-border/50 bg-white/50 p-4">
        <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
          Row Sequence
        </h3>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {rows.map((row, idx) => {
            const stitchSequence = row.stitches
              .reduce((acc, s) => {
                if (acc.length === 0 || acc[acc.length - 1].type !== s.type) {
                  acc.push({ type: s.type, count: 1 })
                } else {
                  acc[acc.length - 1].count++
                }
                return acc
              }, [] as Array<{ type: string; count: number }>)
              .map(s => `${s.count}${(stitchNames[s.type] || s.type).charAt(0).toUpperCase()}`)
              .join(' ')

            return (
              <div
                key={row.id}
                className={`p-2 rounded-lg text-xs font-mono transition ${
                  row.id === selectedRowId
                    ? 'bg-primary/20 border border-primary/30'
                    : 'bg-muted/30 border border-border/30'
                }`}
              >
                <span className="text-muted-foreground">R{idx + 1}: </span>
                <span className="text-foreground font-semibold">{stitchSequence}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-xl border border-accent/30 bg-accent/10 p-4">
        <div className="flex gap-3">
          <AlertCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-accent mb-1">Tip</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Click on stitches in the canvas to remove them, or use the toolbox to add new rows and stitches.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
