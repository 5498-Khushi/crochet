'use client'

import { STITCHES, Stitch } from '@/lib/stitches'
import { PatternRow } from './PatternBuilder'
import { Plus, Trash2, RotateCcw } from 'lucide-react'
import { useState } from 'react'

type PatternToolboxProps = {
  selectedStitch: Stitch
  onStitchSelect: (stitch: Stitch) => void
  rows: PatternRow[]
  selectedRowId: string
  onRowSelect: (rowId: string) => void
  onAddRow: () => void
  onAddStitch: () => void
  onDeleteRow: (rowId: string) => void
  onReset: () => void
  patternName: string
  onPatternNameChange: (name: string) => void
}

export default function PatternToolbox({
  selectedStitch,
  onStitchSelect,
  rows,
  selectedRowId,
  onRowSelect,
  onAddRow,
  onAddStitch,
  onDeleteRow,
  onReset,
  patternName,
  onPatternNameChange,
}: PatternToolboxProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const stitchList = Object.values(STITCHES)

  return (
    <div className="flex flex-col gap-4">
      {/* Pattern Name */}
      <div className="rounded-xl border border-border/50 bg-white/50 p-4">
        <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
          Pattern Name
        </label>
        <input
          type="text"
          value={patternName}
          onChange={(e) => onPatternNameChange(e.target.value)}
          className="w-full rounded-lg border border-border/50 bg-white/80 px-3 py-2 text-sm font-medium text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          placeholder="Enter pattern name..."
        />
      </div>

      {/* Stitch Toolbox */}
      <div className="rounded-xl border border-border/50 bg-white/50 p-4">
        <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
          Stitch Toolbox
        </h3>
        
        <div className="space-y-2 mb-4">
          {stitchList.map(stitch => (
            <button
              key={stitch.id}
              onClick={() => onStitchSelect(stitch)}
              className={`w-full flex items-center gap-3 rounded-lg p-2 text-sm font-medium transition ${
                selectedStitch.id === stitch.id
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-muted/30 text-foreground border border-border/30 hover:bg-muted/50'
              }`}
            >
              <span className="text-lg font-bold flex-shrink-0">{stitch.symbol}</span>
              <div className="text-left flex-1 min-w-0">
                <p className="text-xs font-semibold">{stitch.abbreviation}</p>
                <p className="text-xs text-muted-foreground truncate">{stitch.name}</p>
              </div>
            </button>
          ))}
        </div>

        {selectedStitch && (
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
            <p className="text-xs font-semibold text-accent mb-2">Selected</p>
            <p className="text-xs text-muted-foreground">{selectedStitch.description}</p>
          </div>
        )}
      </div>

      {/* Row Controls */}
      <div className="rounded-xl border border-border/50 bg-white/50 p-4">
        <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
          Rows ({rows.length})
        </h3>
        
        <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
          {rows.map((row, idx) => (
            <div
              key={row.id}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition border ${
                selectedRowId === row.id
                  ? 'bg-primary/20 border-primary/30'
                  : 'bg-muted/30 border-border/30 hover:bg-muted/50'
              }`}
              onClick={() => onRowSelect(row.id)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Row {idx + 1}</p>
                <p className="text-xs text-muted-foreground">{row.stitches.length} stitches</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteRow(row.id)
                }}
                className="p-1 hover:bg-destructive/20 rounded transition text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onAddRow}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-border/50 bg-white/40 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-white/60 mb-2"
        >
          <Plus className="h-4 w-4" />
          Add Row
        </button>

        <button
          onClick={onAddStitch}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary/20 border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/30"
        >
          <Plus className="h-4 w-4" />
          Add Stitch to Row
        </button>
      </div>

      {/* Actions */}
      <button
        onClick={onReset}
        className="flex items-center justify-center gap-2 rounded-lg border border-border/50 bg-white/40 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-white/60"
      >
        <RotateCcw className="h-4 w-4" />
        Reset Pattern
      </button>
    </div>
  )
}
