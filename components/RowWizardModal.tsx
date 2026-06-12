'use client'

import React, { useState } from 'react'
import { STITCHES, Stitch } from '@/lib/stitches'
import { calculateNextRowStitches, IncreaseDecreaseInfo } from '@/lib/stitchCalculator'
import { X, Plus, ChevronRight, AlertCircle } from 'lucide-react'
import { PatternRow } from './PatternBuilder'

interface RowWizardModalProps {
  isOpen: boolean
  onClose: () => void
  onRowAdd: (row: PatternRow) => void
  previousRowStitches?: number
  rowNumber: number
  suggestedStitches?: number
}

const YARN_COLORS = [
  { name: 'Natural', value: '#E8D4C8' },
  { name: 'Cream', value: '#F5E6D3' },
  { name: 'Rust', value: '#C17755' },
  { name: 'Sage', value: '#8BA88D' },
  { name: 'Dusty Blue', value: '#7FA5A8' },
  { name: 'Blush', value: '#D4A5A0' },
  { name: 'Terracotta', value: '#D4745F' },
  { name: 'Stone', value: '#A89A8A' },
  { name: 'White', value: '#FFFBF7' },
  { name: 'Charcoal', value: '#3D3D3D' },
]

export default function RowWizardModal({
  isOpen,
  onClose,
  onRowAdd,
  previousRowStitches = 6,
  rowNumber,
  suggestedStitches,
}: RowWizardModalProps) {
  const [step, setStep] = useState(0)
  const [stitchCount, setStitchCount] = useState(suggestedStitches || previousRowStitches)
  const [selectedStitch, setSelectedStitch] = useState<Stitch>(STITCHES.sc)
  const [rowColor, setRowColor] = useState('#E8D4C8')
  const [modifications, setModifications] = useState<IncreaseDecreaseInfo[]>([])
  const [showCalc, setShowCalc] = useState(false)

  if (!isOpen) return null

  const handleAddModification = (position: number, type: 'increase' | 'decrease') => {
    const existing = modifications.find(m => m.position === position && m.type === type)
    if (existing) {
      setModifications(modifications.filter(m => !(m.position === position && m.type === type)))
    } else {
      setModifications([...modifications, { position, type }])
    }
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleComplete = () => {
    const stitchesArray = Array(stitchCount)
      .fill(null)
      .map(() => ({
        type: selectedStitch.abbreviation,
        stitch: selectedStitch,
      }))

    const newRow: PatternRow = {
      id: `row-${Date.now()}`,
      stitches: stitchesArray,
      color: rowColor,
      modifications,
    }

    onRowAdd(newRow)
    handleReset()
    onClose()
  }

  const handleReset = () => {
    setStep(0)
    setModifications([])
    setShowCalc(false)
  }

  const calculation = calculateNextRowStitches(stitchCount, modifications)

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl animate-in slide-in-from-bottom-1/2 sm:slide-in-from-center">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="text-xl font-semibold text-foreground">
            Row {rowNumber} Builder
            {rowNumber > 1 && <span className="text-sm text-muted-foreground ml-2">Step {step + 1}/4</span>}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-muted transition"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">How many stitches in this row?</h3>
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                  value={stitchCount}
                  onChange={e => setStitchCount(Math.max(3, parseInt(e.target.value) || 3))}
                  className="w-24 rounded-lg border border-border bg-white px-3 py-2 text-foreground"
                  min="3"
                  max="200"
                />
                <span className="text-sm text-muted-foreground">stitches</span>
              </div>

              {rowNumber > 1 && suggestedStitches && suggestedStitches !== previousRowStitches && (
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
                  <p className="text-sm text-blue-900">
                    💡 <span className="font-medium">Suggested:</span> {suggestedStitches} stitches based on your increases/decreases
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Select stitch type</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(STITCHES).map(stitch => (
                  <button
                    key={stitch.abbreviation}
                    onClick={() => setSelectedStitch(stitch)}
                    className={`p-3 rounded-lg border-2 transition ${
                      selectedStitch.abbreviation === stitch.abbreviation
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-mono text-sm font-semibold">{stitch.abbreviation}</div>
                    <div className="text-xs text-muted-foreground">{stitch.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Choose yarn color</h3>
              <div className="grid grid-cols-5 gap-2">
                {YARN_COLORS.map(color => (
                  <button
                    key={color.value}
                    onClick={() => setRowColor(color.value)}
                    className={`w-12 h-12 rounded-lg border-2 transition ${
                      rowColor === color.value ? 'border-primary ring-2 ring-primary' : 'border-border'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                    aria-label={color.name}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Selected: <span className="font-medium">{YARN_COLORS.find(c => c.value === rowColor)?.name}</span>
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground">Mark increases/decreases</h3>
                  <p className="text-sm text-muted-foreground">Optional: Click on stitches to add increases (+) or decreases (-)</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {Array(stitchCount)
                    .fill(null)
                    .map((_, i) => {
                      const hasIncrease = modifications.some(m => m.position === i && m.type === 'increase')
                      const hasDecrease = modifications.some(m => m.position === i && m.type === 'decrease')

                      return (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <button
                            onClick={() => handleAddModification(i, 'increase')}
                            className={`w-8 h-8 rounded text-xs font-bold transition ${
                              hasIncrease
                                ? 'bg-green-500 text-white'
                                : 'bg-muted text-muted-foreground hover:bg-green-100'
                            }`}
                          >
                            +
                          </button>
                          <div
                            className="w-8 h-8 rounded border-2 border-border flex items-center justify-center text-xs font-mono"
                            style={{ backgroundColor: rowColor + '30' }}
                          >
                            {i + 1}
                          </div>
                          <button
                            onClick={() => handleAddModification(i, 'decrease')}
                            className={`w-8 h-8 rounded text-xs font-bold transition ${
                              hasDecrease
                                ? 'bg-red-500 text-white'
                                : 'bg-muted text-muted-foreground hover:bg-red-100'
                            }`}
                          >
                            −
                          </button>
                        </div>
                      )
                    })}
                </div>

                {modifications.length > 0 && (
                  <button
                    onClick={() => setShowCalc(true)}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    See what next row should have →
                  </button>
                )}
              </div>

              {showCalc && modifications.length > 0 && (
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                  <h4 className="font-semibold text-amber-900 mb-2">Next Row Calculation</h4>
                  <p className="text-sm text-amber-800 mb-3">{calculation.explanation}</p>
                  <div className="flex gap-2">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                      +{calculation.increases}
                    </span>
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                      −{calculation.decreases}
                    </span>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded font-semibold">
                      = {calculation.suggestedNextRowStitches}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-border p-6">
          {step > 0 && (
            <button
              onClick={handlePrevious}
              className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition"
            >
              Back
            </button>
          )}
          <div className="flex-1" />
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium"
            >
              <Plus className="h-4 w-4" />
              Add Row
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
