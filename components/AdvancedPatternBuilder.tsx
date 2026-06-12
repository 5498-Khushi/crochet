'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { STITCHES, Stitch } from '@/lib/stitches'
import Advanced3DRenderer, { StitchInstance, PatternRowData } from './Advanced3DRenderer'
import SingleStitchManager from './SingleStitchManager'
import ShapePresetsModal from './ShapePresetsModal'
import YarnCustomizer from './YarnCustomizer'
import ExportModal from './ExportModal'
import RowWizardModal from './RowWizardModal'
import PatternSummaryNew from './PatternSummaryNew'
import { ArrowLeft, Save, Download, Sparkles, Grid3x3, Plus, Trash2 } from 'lucide-react'

interface PatternRow {
  id: string
  stitches: StitchInstance[]
  color?: string
}

const YARN_COLORS = [
  '#E8D4C8', '#F5DCC8', '#D4A574', '#C19A6B', '#8B7355',
  '#E8B4A8', '#D9A8A8', '#B8A8A8', '#F5F5F5', '#3C3C3C'
]

export default function AdvancedPatternBuilder() {
  const [patternName, setPatternName] = useState('My Crochet Pattern')
  const [rows, setRows] = useState<PatternRow[]>([
    {
      id: '1',
      stitches: Array(6).fill(null).map((_, i) => ({
        id: `r1-s${i}`,
        type: 'sc',
        stitch: STITCHES.sc,
        color: '#E8D4C8',
        position: i,
        rowIndex: 0
      })),
      color: '#E8D4C8'
    }
  ])

  const [selectedRowId, setSelectedRowId] = useState<string>('1')
  const [selectedStitchId, setSelectedStitchId] = useState<string | null>(null)
  const [showShapeModal, setShowShapeModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showWizard, setShowWizard] = useState(false)
  const [use3DView, setUse3DView] = useState(true)
  const [useWizardMode, setUseWizardMode] = useState(false)
  const [yarnColor, setYarnColor] = useState('#E8D4C8')
  const [yarnWeight, setYarnWeight] = useState('4')
  const [hookSize, setHookSize] = useState('H (5mm)')
  const [hoveredStitchId, setHoveredStitchId] = useState<string | null>(null)

  const selectedRow = rows.find(r => r.id === selectedRowId)

  const handleAddRow = () => {
    const newRowId = Date.now().toString()
    const newRow: PatternRow = {
      id: newRowId,
      stitches: Array(6).fill(null).map((_, i) => ({
        id: `${newRowId}-s${i}`,
        type: 'sc',
        stitch: STITCHES.sc,
        color: yarnColor,
        position: i,
        rowIndex: rows.length
      })),
      color: yarnColor
    }
    setRows([...rows, newRow])
    setSelectedRowId(newRowId)
  }

  const handleAddStitchToRow = (stitchType: string, color: string) => {
    if (!selectedRow) return

    const updatedRows = rows.map(row => {
      if (row.id === selectedRowId) {
        const newStitch: StitchInstance = {
          id: `${row.id}-s${row.stitches.length}`,
          type: stitchType,
          stitch: STITCHES[stitchType as keyof typeof STITCHES],
          color,
          position: row.stitches.length,
          rowIndex: rows.indexOf(row)
        }
        return {
          ...row,
          stitches: [...row.stitches, newStitch]
        }
      }
      return row
    })
    setRows(updatedRows)
  }

  const handleRemoveStitch = (stitchId: string) => {
    const updatedRows = rows.map(row => {
      if (row.id === selectedRowId) {
        return {
          ...row,
          stitches: row.stitches.filter(s => s.id !== stitchId)
        }
      }
      return row
    })
    setRows(updatedRows)
    setSelectedStitchId(null)
  }

  const handleDeleteRow = (rowId: string) => {
    const newRows = rows.filter(r => r.id !== rowId)
    setRows(newRows)
    if (selectedRowId === rowId && newRows.length > 0) {
      setSelectedRowId(newRows[0].id)
    }
  }

  const handleResetPattern = () => {
    setRows([
      {
        id: '1',
        stitches: Array(6).fill(null).map((_, i) => ({
          id: `r1-s${i}`,
          type: 'sc',
          stitch: STITCHES.sc,
          color: '#E8D4C8',
          position: i,
          rowIndex: 0
        })),
        color: '#E8D4C8'
      }
    ])
    setSelectedRowId('1')
  }

  const handleLoadShape = (newRows: any[]) => {
    const convertedRows: PatternRow[] = newRows.map((row, rowIdx) => ({
      id: row.id,
      stitches: row.stitches.map((stitch: any, stitchIdx: number) => ({
        id: `${row.id}-s${stitchIdx}`,
        type: stitch.type || stitch.stitch.id,
        stitch: stitch.stitch,
        color: row.color || yarnColor,
        position: stitchIdx,
        rowIndex: rowIdx
      })),
      color: row.color || yarnColor
    }))
    setRows(convertedRows)
    if (convertedRows.length > 0) {
      setSelectedRowId(convertedRows[0].id)
    }
  }

  const totalStitches = rows.reduce((sum, row) => sum + row.stitches.length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-orange-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/30 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-white/40 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-white/60"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>

            <h1 className="text-xl font-bold text-foreground">{patternName}</h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-white/40 p-1">
                <button
                  onClick={() => setUse3DView(false)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition ${
                    !use3DView ? 'bg-white text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  2D
                </button>
                <button
                  onClick={() => setUse3DView(true)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition flex items-center gap-1 ${
                    use3DView ? 'bg-white text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Grid3x3 className="h-3.5 w-3.5" />
                  3D
                </button>
              </div>

              <button
                onClick={() => setUseWizardMode(!useWizardMode)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  useWizardMode
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border/50 bg-white/40 text-foreground hover:bg-white/60'
                }`}
              >
                {useWizardMode ? '✓ Wizard Mode' : 'Wizard Mode'}
              </button>

              <button
                onClick={() => setShowShapeModal(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-white/40 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-white/60"
              >
                <Sparkles className="h-4 w-4" />
                Presets
              </button>

              <button className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-white/40 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-white/60">
                <Save className="h-4 w-4" />
                Save
              </button>

              <button
                onClick={() => setShowExportModal(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Left Panel - Toolbox */}
          <div className="space-y-4 lg:col-span-1">
            {/* Pattern name */}
            <div className="rounded-lg border border-border/30 bg-white/60 p-4">
              <label className="block text-xs font-semibold text-foreground mb-2">
                Pattern Name
              </label>
              <input
                type="text"
                value={patternName}
                onChange={(e) => setPatternName(e.target.value)}
                className="w-full rounded-lg border border-border/50 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Row selection */}
            <div className="rounded-lg border border-border/30 bg-white/60 p-4 space-y-2">
              <label className="block text-xs font-semibold text-foreground">
                Rows ({rows.length})
              </label>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {rows.map((row, idx) => (
                  <div key={row.id} className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedRowId(row.id)}
                      className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition ${
                        selectedRowId === row.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                    >
                      Row {idx + 1} ({row.stitches.length})
                    </button>
                    <button
                      onClick={() => handleDeleteRow(row.id)}
                      className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddRow}
                className="w-full rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary transition hover:bg-primary/20 flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Row
              </button>
            </div>

            {/* Single stitch management */}
            {selectedRow && (
              <SingleStitchManager
                rowStitches={selectedRow.stitches}
                rowColor={selectedRow.color || yarnColor}
                rowId={selectedRowId}
                onAddStitch={handleAddStitchToRow}
                onRemoveStitch={handleRemoveStitch}
              />
            )}

            {/* Yarn customizer */}
            <YarnCustomizer
              selectedColor={yarnColor}
              selectedWeight={yarnWeight}
              selectedHook={hookSize}
              onColorChange={setYarnColor}
              onWeightChange={setYarnWeight}
              onHookChange={setHookSize}
            />

            {/* Reset button */}
            <button
              onClick={handleResetPattern}
              className="w-full rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-2 text-xs font-medium text-destructive transition hover:bg-destructive/10"
            >
              Reset Pattern
            </button>
          </div>

          {/* Middle Panel - 3D/2D Canvas */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border/50 bg-white/50 overflow-hidden shadow-sm h-[600px]">
              {use3DView ? (
                <Advanced3DRenderer
                  rows={rows}
                  yarnColor={yarnColor}
                  height={600}
                  onStitchHover={setHoveredStitchId}
                  onStitchClick={setSelectedStitchId}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 text-muted-foreground">
                  <p>2D Canvas - Coming Soon with Enhanced Features</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Summary */}
          <div className="lg:col-span-1">
            <PatternSummaryNew
              patternName={patternName}
              rows={rows}
            />

            {/* Selected stitch info */}
            {selectedStitchId && selectedRow && (() => {
              const stitch = selectedRow.stitches.find(s => s.id === selectedStitchId)
              if (stitch) {
                return (
                  <div className="mt-4 rounded-lg border border-border/30 bg-white/60 p-4 space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">
                      {stitch.stitch.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {stitch.stitch.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-semibold">Height:</span> {stitch.stitch.height}
                      </div>
                      <div>
                        <span className="font-semibold">Width:</span> {stitch.stitch.width}
                      </div>
                      <div>
                        <span className="font-semibold">Loops:</span> {stitch.stitch.yarnLoops}
                      </div>
                      <div>
                        <span className="font-semibold">Type:</span> {stitch.stitch.geometryType}
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            })()}
          </div>
        </div>
      </main>

      {/* Modals */}
      <ShapePresetsModal
        isOpen={showShapeModal}
        onClose={() => setShowShapeModal(false)}
        onSelectShape={handleLoadShape}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        patternName={patternName}
        rows={rows.map(r => ({ id: r.id, stitches: r.stitches.map(s => ({ type: s.type, stitch: s.stitch })) }))}
        yarnColor={yarnColor}
        hookSize={hookSize}
      />

      <RowWizardModal
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
        onRowAdd={(newRow) => {
          const convertedRow: PatternRow = {
            id: newRow.id,
            stitches: newRow.stitches.map((stitch, idx) => ({
              id: `${newRow.id}-s${idx}`,
              type: stitch.type,
              stitch: stitch.stitch,
              color: newRow.color || yarnColor,
              position: idx,
              rowIndex: rows.length
            })),
            color: newRow.color || yarnColor
          }
          setRows([...rows, convertedRow])
          setSelectedRowId(convertedRow.id)
        }}
        previousRowStitches={selectedRow?.stitches.length || 6}
        rowNumber={rows.length + 1}
        suggestedStitches={selectedRow?.stitches.length}
      />
    </div>
  )
}
