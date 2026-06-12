import { PatternRow } from '@/components/PatternBuilder'

export type ExportFormat = 'txt' | 'json'

const STITCH_NAMES: Record<string, string> = {
  ch: 'Chain',
  slst: 'Slip Stitch',
  sc: 'Single Crochet',
  hdc: 'Half Double Crochet',
  dc: 'Double Crochet',
  tr: 'Treble Crochet',
  inc: 'Increase',
  dec: 'Decrease'
}

const STITCH_ABBR: Record<string, string> = {
  ch: 'CH',
  slst: 'SL ST',
  sc: 'SC',
  hdc: 'HDC',
  dc: 'DC',
  tr: 'TR',
  inc: 'INC',
  dec: 'DEC'
}

export function generatePatternText(
  patternName: string,
  rows: PatternRow[],
  yarnColor: string,
  hookSize: string
): string {
  const timestamp = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  let text = `╔═══════════════════════════════════════════╗\n`
  text += `║        CROCHET PATTERN: ${patternName.padEnd(20)}║\n`
  text += `║        Created with StitchSketch          ║\n`
  text += `║        ${timestamp.padEnd(39)}║\n`
  text += `╚═══════════════════════════════════════════╝\n\n`

  text += `PATTERN INFORMATION\n`
  text += `─────────────────────────────────────────\n`
  text += `Pattern Name:    ${patternName}\n`
  text += `Total Rows:      ${rows.length}\n`
  text += `Total Stitches:  ${rows.reduce((sum, row) => sum + row.stitches.length, 0)}\n\n`

  text += `MATERIALS\n`
  text += `─────────────────────────────────────────\n`
  text += `Hook Size:       ${hookSize}\n`
  text += `Yarn Color:      ${yarnColor}\n\n`

  text += `PATTERN INSTRUCTIONS\n`
  text += `─────────────────────────────────────────\n`

  rows.forEach((row, idx) => {
    const rowNum = idx + 1
    
    // Group consecutive stitches
    const groups: Array<{ stitch: string; abbr: string; count: number }> = []
    
    row.stitches.forEach(s => {
      const lastGroup = groups[groups.length - 1]
      const stitchName = STITCH_NAMES[s.type] || s.type
      const stitchAbbr = STITCH_ABBR[s.type] || s.type
      
      if (lastGroup && lastGroup.abbr === stitchAbbr) {
        lastGroup.count++
      } else {
        groups.push({ stitch: stitchName, abbr: stitchAbbr, count: 1 })
      }
    })

    const instructions = groups
      .map(g => g.count > 1 ? `${g.abbr} x${g.count}` : g.abbr)
      .join(', ')

    text += `\nRow ${rowNum}: ${instructions}\n`
    text += `         (${row.stitches.length} total stitches)\n`
  })

  text += `\n\nNOTES\n`
  text += `─────────────────────────────────────────\n`
  text += `This pattern was created with StitchSketch.\n`
  text += `For more patterns and tutorials, visit StitchSketch.com\n\n`

  text += `═════════════════════════════════════════\n`
  text += `Happy Crocheting!\n`
  text += `═════════════════════════════════════════\n`

  return text
}

export function exportAsText(
  patternName: string,
  rows: PatternRow[],
  yarnColor: string,
  hookSize: string
): void {
  const text = generatePatternText(patternName, rows, yarnColor, hookSize)
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', `${patternName.toLowerCase().replace(/\s+/g, '-')}-pattern.txt`)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export function exportAsJSON(
  patternName: string,
  rows: PatternRow[],
  yarnColor: string,
  hookSize: string
): void {
  const data = {
    patternName,
    createdDate: new Date().toISOString(),
    materials: {
      hookSize,
      yarnColor
    },
    rows: rows.map((row, idx) => ({
      rowNumber: idx + 1,
      stitches: row.stitches.map(s => ({
        type: s.type,
        name: STITCH_NAMES[s.type] || s.type
      })),
      totalStitches: row.stitches.length
    })),
    stats: {
      totalRows: rows.length,
      totalStitches: rows.reduce((sum, row) => sum + row.stitches.length, 0)
    }
  }

  const element = document.createElement('a')
  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2)))
  element.setAttribute('download', `${patternName.toLowerCase().replace(/\s+/g, '-')}-pattern.json`)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
