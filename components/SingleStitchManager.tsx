'use client'

import { useState } from 'react'
import { STITCHES, Stitch } from '@/lib/stitches'
import { X, Plus } from 'lucide-react'

interface StitchInstance {
  id: string
  type: string
  stitch: Stitch
  color: string
}

interface Props {
  rowStitches: StitchInstance[]
  rowColor: string
  rowId: string
  onAddStitch: (stitchType: string, color: string) => void
  onRemoveStitch: (stitchId: string) => void
}

export default function SingleStitchManager({
  rowStitches,
  rowColor,
  rowId,
  onAddStitch,
  onRemoveStitch
}: Props) {
  const [selectedStitch, setSelectedStitch] = useState<string>('sc')
  const [showStitchPicker, setShowStitchPicker] = useState(false)

  const stitchTypes = Object.values(STITCHES)

  const handleAddStitch = () => {
    onAddStitch(selectedStitch, rowColor)
    setShowStitchPicker(false)
  }

  return (
    <div className="space-y-3 rounded-lg border border-border/30 bg-white/40 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          Manage Stitches ({rowStitches.length})
        </h3>
      </div>

      {/* Stitch list */}
      <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
        {rowStitches.map((stitch, index) => (
          <div
            key={stitch.id}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r px-3 py-1.5 text-xs font-medium text-white shadow-sm"
            style={{
              backgroundImage: `linear-gradient(135deg, ${stitch.color}, ${stitch.color}cc)`
            }}
          >
            <span className="font-mono">{stitch.stitch.abbreviation}</span>
            <span className="text-xs opacity-80">{index + 1}</span>
            <button
              onClick={() => onRemoveStitch(stitch.id)}
              className="ml-1 rounded-full p-0.5 transition hover:bg-white/20"
              title="Remove stitch"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Add stitch controls */}
      <div className="space-y-2 border-t border-border/20 pt-2">
        <button
          onClick={() => setShowStitchPicker(!showStitchPicker)}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition hover:bg-primary/20"
        >
          <Plus className="h-4 w-4" />
          Add Single Stitch
        </button>

        {showStitchPicker && (
          <div className="space-y-2 rounded-lg bg-white/60 p-2">
            <label className="text-xs font-semibold text-foreground">
              Select Stitch Type
            </label>
            <select
              value={selectedStitch}
              onChange={(e) => setSelectedStitch(e.target.value)}
              className="w-full rounded-lg border border-border/50 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {stitchTypes.map((stitch) => (
                <option key={stitch.id} value={stitch.id}>
                  {stitch.abbreviation} - {stitch.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddStitch}
              className="w-full rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Add to Row
            </button>
          </div>
        )}
      </div>

      {/* Stitch info */}
      {selectedStitch && (
        <div className="rounded-lg bg-muted/50 p-2 text-xs">
          <p className="font-semibold text-foreground">
            {STITCHES[selectedStitch as keyof typeof STITCHES]?.name}
          </p>
          <p className="text-muted-foreground">
            Height: {STITCHES[selectedStitch as keyof typeof STITCHES]?.height}
            <span className="mx-2">•</span>
            Loops: {STITCHES[selectedStitch as keyof typeof STITCHES]?.yarnLoops}
          </p>
        </div>
      )}
    </div>
  )
}
