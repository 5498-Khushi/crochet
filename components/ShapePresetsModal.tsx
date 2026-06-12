'use client'

import { useState } from 'react'
import { SHAPES } from '@/lib/shapes'
import { PatternRow } from './PatternBuilder'
import { X } from 'lucide-react'

type ShapePresetsModalProps = {
  isOpen: boolean
  onClose: () => void
  onSelectShape: (rows: PatternRow[]) => void
}

export default function ShapePresetsModal({ isOpen, onClose, onSelectShape }: ShapePresetsModalProps) {
  if (!isOpen) return null

  const shapes = Object.values(SHAPES)

  const handleSelectShape = (shapeId: string) => {
    const shape = SHAPES[shapeId]
    if (shape) {
      // Create new IDs for the pattern rows
      const newRows: PatternRow[] = shape.pattern.map(row => ({
        ...row,
        id: Date.now().toString() + Math.random()
      }))
      onSelectShape(newRows)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border/50 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Choose a Shape Preset</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted/30 rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {shapes.map(shape => (
              <button
                key={shape.id}
                onClick={() => handleSelectShape(shape.id)}
                className="text-left rounded-xl border border-border/50 bg-white/50 p-4 transition hover:border-border hover:bg-white/70 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{shape.name}</h3>
                    <p className="text-xs text-muted-foreground">{shape.pattern.length} rows</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    shape.difficulty === 'beginner'
                      ? 'bg-green-100 text-green-800'
                      : shape.difficulty === 'intermediate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {shape.difficulty}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {shape.description}
                </p>
                <div className="mt-3 text-xs text-muted-foreground space-y-1">
                  {shape.pattern.map((row, idx) => (
                    <p key={idx}>
                      Row {idx + 1}: {row.stitches.length} stitches
                    </p>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border/50 bg-muted/10 px-6 py-4">
          <p className="text-xs text-muted-foreground">
            Selecting a preset will replace your current pattern with the shape template.
          </p>
        </div>
      </div>
    </div>
  )
}
