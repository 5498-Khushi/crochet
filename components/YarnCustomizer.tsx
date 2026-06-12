'use client'

import { useState } from 'react'
import { YARN_COLORS, YARN_WEIGHTS, HOOK_SIZES } from '@/lib/shapes'
import { Palette, TrendingUp, Feather } from 'lucide-react'

type YarnCustomizerProps = {
  selectedColor: string
  selectedWeight: string
  selectedHook: string
  onColorChange: (color: string) => void
  onWeightChange: (weight: string) => void
  onHookChange: (hook: string) => void
}

export default function YarnCustomizer({
  selectedColor,
  selectedWeight,
  selectedHook,
  onColorChange,
  onWeightChange,
  onHookChange,
}: YarnCustomizerProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="rounded-xl border border-border/50 bg-white/50 p-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Yarn & Supplies
        </h3>
        <div className="text-xs text-primary font-medium">
          {isExpanded ? 'Hide' : 'Show'}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {/* Yarn Color */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-foreground mb-2">
              <Palette className="h-4 w-4 text-primary" />
              Yarn Color
            </label>
            <div className="grid grid-cols-5 gap-2">
              {YARN_COLORS.map(color => (
                <button
                  key={color.hex}
                  onClick={() => onColorChange(color.hex)}
                  className={`aspect-square rounded-lg border-2 transition ${
                    selectedColor === color.hex
                      ? 'border-primary shadow-md'
                      : 'border-border/50 hover:border-border'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {YARN_COLORS.find(c => c.hex === selectedColor)?.name || 'Custom'}
            </p>
          </div>

          {/* Yarn Weight */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-foreground mb-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              Yarn Weight
            </label>
            <select
              value={selectedWeight}
              onChange={(e) => onWeightChange(e.target.value)}
              className="w-full rounded-lg border border-border/50 bg-white/80 px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
            >
              {YARN_WEIGHTS.map(weight => (
                <option key={weight.weight} value={weight.weight}>
                  {weight.name}
                </option>
              ))}
            </select>
          </div>

          {/* Hook Size */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-foreground mb-2">
              <Feather className="h-4 w-4 text-secondary" />
              Hook Size
            </label>
            <select
              value={selectedHook}
              onChange={(e) => onHookChange(e.target.value)}
              className="w-full rounded-lg border border-border/50 bg-white/80 px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
            >
              {HOOK_SIZES.map(hook => (
                <option key={hook.size} value={hook.size}>
                  {hook.size}
                </option>
              ))}
            </select>
          </div>

          {/* Preview */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4 border border-border/30">
            <p className="text-xs font-semibold text-foreground mb-3">Preview</p>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div
                  className="h-6 w-6 rounded-full border border-border/50"
                  style={{ backgroundColor: selectedColor }}
                />
                <span>Color preview</span>
              </div>
              <p>These settings will affect your pattern visualization</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
