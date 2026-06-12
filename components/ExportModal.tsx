'use client'

import { useState } from 'react'
import { exportAsText, exportAsJSON } from '@/lib/export'
import { X, FileText, Code } from 'lucide-react'

interface PatternRow {
  id: string
  stitches: {
    type: string
    stitch: any
  }[]
  color?: string
  modifications?: any[]
}

type ExportModalProps = {
  isOpen: boolean
  onClose: () => void
  patternName: string
  rows: PatternRow[]
  yarnColor: string
  hookSize: string
}

export default function ExportModal({
  isOpen,
  onClose,
  patternName,
  rows,
  yarnColor,
  hookSize,
}: ExportModalProps) {
  const [exported, setExported] = useState(false)

  if (!isOpen) return null

  const handleExportText = () => {
    exportAsText(patternName, rows, yarnColor, hookSize)
    setExported(true)
    setTimeout(() => {
      onClose()
      setExported(false)
    }, 2000)
  }

  const handleExportJSON = () => {
    exportAsJSON(patternName, rows, yarnColor, hookSize)
    setExported(true)
    setTimeout(() => {
      onClose()
      setExported(false)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="border-b border-border/50 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Export Pattern</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted/30 rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {exported ? (
            <div className="text-center py-8">
              <div className="mb-4 text-4xl">✓</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Pattern Exported!
              </h3>
              <p className="text-sm text-muted-foreground">
                Your pattern has been downloaded successfully.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Choose a format to export your crochet pattern:
              </p>

              <button
                onClick={handleExportText}
                className="w-full flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-white/50 hover:bg-white/70 transition text-left"
              >
                <div className="flex-shrink-0 mt-1">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Text Format</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Beautiful formatted text file (.txt). Easy to print and share.
                  </p>
                </div>
              </button>

              <button
                onClick={handleExportJSON}
                className="w-full flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-white/50 hover:bg-white/70 transition text-left"
              >
                <div className="flex-shrink-0 mt-1">
                  <Code className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">JSON Format</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Structured data format (.json). Perfect for importing to other apps.
                  </p>
                </div>
              </button>

              <div className="bg-muted/20 rounded-lg p-3 text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Pattern Details</p>
                <p>Name: {patternName}</p>
                <p>Rows: {rows.length}</p>
                <p>Total Stitches: {rows.reduce((sum, row) => sum + row.stitches.length, 0)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border/50 bg-muted/10 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-lg border border-border/50 bg-white/40 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-white/60"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
