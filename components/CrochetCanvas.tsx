'use client'

import { useEffect, RefObject } from 'react'
import { PatternRow } from './PatternBuilder'

type CrochetCanvasProps = {
  canvasRef: RefObject<HTMLCanvasElement>
  rows: PatternRow[]
  selectedRowId: string
  onStitchClick: (rowId: string, stitchIndex: number) => void
}

const GRID_SIZE = 40
const STITCH_SYMBOLS: Record<string, string> = {
  ch: '○',
  slst: '•',
  sc: 'x',
  hdc: 'T',
  dc: 'T',
  tr: 'ɪ',
  inc: '⊕',
  dec: '⊖'
}

export default function CrochetCanvas({
  canvasRef,
  rows,
  selectedRowId,
  onStitchClick,
}: CrochetCanvasProps) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Calculate dimensions
    const maxStitches = Math.max(...rows.map(r => r.stitches.length))
    const width = Math.max(400, maxStitches * GRID_SIZE + 100)
    const height = rows.length * GRID_SIZE + 100

    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= rows.length; i++) {
      ctx.beginPath()
      ctx.moveTo(50, 50 + i * GRID_SIZE)
      ctx.lineTo(50 + maxStitches * GRID_SIZE, 50 + i * GRID_SIZE)
      ctx.stroke()
    }
    for (let i = 0; i <= maxStitches; i++) {
      ctx.beginPath()
      ctx.moveTo(50 + i * GRID_SIZE, 50)
      ctx.lineTo(50 + i * GRID_SIZE, 50 + rows.length * GRID_SIZE)
      ctx.stroke()
    }

    // Draw stitches
    rows.forEach((row, rowIdx) => {
      row.stitches.forEach((stitchData, stitchIdx) => {
        const x = 50 + stitchIdx * GRID_SIZE + GRID_SIZE / 2
        const y = 50 + rowIdx * GRID_SIZE + GRID_SIZE / 2

        const isSelected = row.id === selectedRowId

        // Draw circle background
        ctx.fillStyle = isSelected ? '#fcd34d20' : '#f3f4f620'
        ctx.beginPath()
        ctx.arc(x, y, GRID_SIZE / 2.5, 0, Math.PI * 2)
        ctx.fill()

        // Draw border
        ctx.strokeStyle = isSelected ? '#fbbf24' : '#d1d5db'
        ctx.lineWidth = isSelected ? 2 : 1
        ctx.beginPath()
        ctx.arc(x, y, GRID_SIZE / 2.5, 0, Math.PI * 2)
        ctx.stroke()

        // Draw symbol
        ctx.fillStyle = '#6b7280'
        ctx.font = 'bold 18px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(STITCH_SYMBOLS[stitchData.type] || '?', x, y)
      })
    })

    // Draw row numbers
    ctx.fillStyle = '#9ca3af'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    rows.forEach((row, rowIdx) => {
      ctx.fillText(`R${rowIdx + 1}`, 35, 50 + rowIdx * GRID_SIZE + GRID_SIZE / 2)
    })
  }, [rows, selectedRowId, canvasRef])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate which stitch was clicked
    const maxStitches = Math.max(...rows.map(r => r.stitches.length))
    const canvasX = x - 50
    const canvasY = y - 50

    if (canvasX < 0 || canvasY < 0) return

    const stitchIdx = Math.floor(canvasX / GRID_SIZE)
    const rowIdx = Math.floor(canvasY / GRID_SIZE)

    if (rowIdx >= 0 && rowIdx < rows.length && stitchIdx >= 0) {
      const row = rows[rowIdx]
      if (stitchIdx < row.stitches.length) {
        onStitchClick(row.id, stitchIdx)
      }
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center overflow-auto bg-gradient-to-b from-white/50 to-muted/20 p-4">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="border border-border/50 rounded-lg shadow-sm cursor-pointer bg-white"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </div>
  )
}
