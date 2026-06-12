'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { STITCHES, Stitch } from '@/lib/stitches'
import PatternToolbox from './PatternToolbox'
import CrochetCanvas from './CrochetCanvas'
import PatternSummary from './PatternSummary'
import ShapePresetsModal from './ShapePresetsModal'
import YarnCustomizer from './YarnCustomizer'
import ExportModal from './ExportModal'
import { ArrowLeft, Save, Download, Sparkles, Grid3x3, Plus } from 'lucide-react'
import RowWizardModal from './RowWizardModal'
import Stitch3DRenderer from './Stitch3DRenderer'
import { IncreaseDecreaseInfo } from '@/lib/stitchCalculator'

export type PatternRow = {
  id: string
  stitches: {
    type: string
    stitch: Stitch
  }[]
  color?: string
  modifications?: IncreaseDecreaseInfo[]
}

export default function PatternBuilder() {
  const [patternName, setPatternName] = useState('My Crochet Pattern')
  const [rows, setRows] = useState<PatternRow[]>([
    {
      id: '1',
      stitches: [
        { type: 'sc', stitch: STITCHES.sc },
        { type: 'sc', stitch: STITCHES.sc },
        { type: 'sc', stitch: STITCHES.sc },
        { type: 'sc', stitch: STITCHES.sc },
        { type: 'sc', stitch: STITCHES.sc },
        { type: 'sc', stitch: STITCHES.sc },
      ]
    }
  ])
  const [selectedStitch, setSelectedStitch] = useState<Stitch>(STITCHES.sc)
  const [selectedRowId, setSelectedRowId] = useState<string>('1')
  const [showShapeModal, setShowShapeModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showWizard, setShowWizard] = useState(false)
  const [use3DView, setUse3DView] = useState(false)
  const [useWizardMode, setUseWizardMode] = useState(false)
  const [yarnColor, setYarnColor] = useState('#E8D4C8')
  const [yarnWeight, setYarnWeight] = useState('4')
  const [hookSize, setHookSize] = useState('H (5mm)')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleAddRow = () => {
    const newRow: PatternRow = {
      id: Date.now().toString(),
      stitches: Array(rows[rows.length - 1]?.stitches.length || 6).fill(null).map(() => ({
        type: selectedStitch.id,
        stitch: selectedStitch
      }))
    }
    setRows([...rows, newRow])
    setSelectedRowId(newRow.id)
  }

  const handleAddStitchToRow = () => {
    setRows(rows.map(row => 
      row.id === selectedRowId 
        ? {
            ...row,
            stitches: [...row.stitches, { type: selectedStitch.id, stitch: selectedStitch }]
          }
        : row
    ))
  }

  const handleRemoveStitch = (rowId: string, stitchIndex: number) => {
    setRows(rows.map(row =>
      row.id === rowId
        ? { ...row, stitches: row.stitches.filter((_, i) => i !== stitchIndex) }
        : row
    ))
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
        stitches: [
          { type: 'sc', stitch: STITCHES.sc },
          { type: 'sc', stitch: STITCHES.sc },
          { type: 'sc', stitch: STITCHES.sc },
          { type: 'sc', stitch: STITCHES.sc },
          { type: 'sc', stitch: STITCHES.sc },
          { type: 'sc', stitch: STITCHES.sc },
        ]
      }
    ])
    setSelectedRowId('1')
  }

  const handleLoadShape = (newRows: PatternRow[]) => {
    setRows(newRows)
    if (newRows.length > 0) {
      setSelectedRowId(newRows[0].id)
    }
  }

  const handleWizardRowAdd = (newRow: PatternRow) => {
    setRows([...rows, newRow])
    setSelectedRowId(newRow.id)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <div className="pl-4 border-l border-border/50">
              <h1 className="text-xl font-semibold text-foreground">Pattern Designer</h1>
            </div>
          </div>
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
      </header>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row gap-6 p-6">
          {/* Left Panel - Toolbox */}
          <div className="w-full lg:w-80 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-140px)]">
            {useWizardMode && (
              <button
                onClick={() => setShowWizard(true)}
                className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition hover:bg-primary/90 flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Row with Wizard
              </button>
            )}

            <PatternToolbox
              selectedStitch={selectedStitch}
              onStitchSelect={setSelectedStitch}
              rows={rows}
              selectedRowId={selectedRowId}
              onRowSelect={setSelectedRowId}
              onAddRow={useWizardMode ? () => setShowWizard(true) : handleAddRow}
              onAddStitch={handleAddStitchToRow}
              onDeleteRow={handleDeleteRow}
              onReset={handleResetPattern}
              patternName={patternName}
              onPatternNameChange={setPatternName}
            />

            <YarnCustomizer
              selectedColor={yarnColor}
              selectedWeight={yarnWeight}
              selectedHook={hookSize}
              onColorChange={setYarnColor}
              onWeightChange={setYarnWeight}
              onHookChange={setHookSize}
            />
          </div>

          {/* Middle Panel - Canvas */}
          <div className="flex-1 min-h-0 flex flex-col gap-4">
            <div className="flex-1 rounded-2xl border border-border/50 bg-white/50 overflow-hidden shadow-sm">
              {use3DView ? (
                <Stitch3DRenderer
                  rows={rows}
                  yarnColor={yarnColor}
                  height={500}
                />
              ) : (
                <CrochetCanvas 
                  canvasRef={canvasRef}
                  rows={rows}
                  selectedRowId={selectedRowId}
                  onStitchClick={handleRemoveStitch}
                />
              )}
            </div>
          </div>

          {/* Right Panel - Summary */}
          <PatternSummary
            patternName={patternName}
            rows={rows}
            selectedRowId={selectedRowId}
          />
        </div>
      </div>

      {/* Shape Presets Modal */}
      <ShapePresetsModal
        isOpen={showShapeModal}
        onClose={() => setShowShapeModal(false)}
        onSelectShape={handleLoadShape}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        patternName={patternName}
        rows={rows}
        yarnColor={yarnColor}
        hookSize={hookSize}
      />

      {/* Row Wizard Modal */}
      <RowWizardModal
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
        onRowAdd={handleWizardRowAdd}
        previousRowStitches={rows[rows.length - 1]?.stitches.length || 6}
        rowNumber={rows.length + 1}
        suggestedStitches={rows.length > 0 ? rows[rows.length - 1]?.stitches.length : undefined}
      />
    </div>
  )
}
