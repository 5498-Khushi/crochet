export interface IncreaseDecreaseInfo {
  position: number; // 0-indexed position in the row
  type: 'increase' | 'decrease';
}

export interface StitchCalculationResult {
  totalStitches: number;
  suggestedNextRowStitches: number;
  increases: number;
  decreases: number;
  explanation: string;
  modifications: IncreaseDecreaseInfo[];
}

/**
 * Calculate how many stitches the next row should have based on current row modifications
 * Increases: 1 stitch becomes 2 stitches
 * Decreases: 2 stitches become 1 stitch
 */
export function calculateNextRowStitches(
  currentRowStitches: number,
  modifications: IncreaseDecreaseInfo[]
): StitchCalculationResult {
  const increases = modifications.filter(m => m.type === 'increase').length;
  const decreases = modifications.filter(m => m.type === 'decrease').length;

  const totalStitches = currentRowStitches;
  const suggestedNextRowStitches = currentRowStitches + increases - decreases;

  let explanation = '';
  if (increases > 0 && decreases > 0) {
    explanation = `${currentRowStitches} stitches + ${increases} increases - ${decreases} decreases = ${suggestedNextRowStitches} stitches`;
  } else if (increases > 0) {
    explanation = `${currentRowStitches} stitches + ${increases} increases = ${suggestedNextRowStitches} stitches`;
  } else if (decreases > 0) {
    explanation = `${currentRowStitches} stitches - ${decreases} decreases = ${suggestedNextRowStitches} stitches`;
  } else {
    explanation = `Same as current: ${suggestedNextRowStitches} stitches`;
  }

  return {
    totalStitches,
    suggestedNextRowStitches: Math.max(1, suggestedNextRowStitches),
    increases,
    decreases,
    explanation,
    modifications,
  };
}

/**
 * Validate if stitch count makes sense for the shape being created
 */
export function isValidStitchCount(stitches: number): boolean {
  return stitches >= 3 && stitches <= 200;
}

/**
 * Get common crochet patterns for different stitch counts
 * Helps users understand what shapes they can create
 */
export function getCommonPatterns(stitchCount: number): string[] {
  const patterns: Record<number, string[]> = {
    3: ['Small triangle', 'Three-point star'],
    4: ['Square base', 'Small circle'],
    5: ['Pentagon', 'Small flower'],
    6: ['Circle/Amigurumi base', 'Hexagon', 'Flower with 6 petals'],
    8: ['Octagon', 'Larger circle'],
    12: ['Granny square', 'Large circle'],
    18: ['Cowl', 'Large blanket section'],
  };

  return patterns[stitchCount] || ['Custom shape'];
}

/**
 * Calculate the visual progression of a pattern
 * Useful for showing users what the final shape will look like
 */
export interface PatternProgression {
  row: number;
  stitches: number;
  percentageGrowth: number;
}

export function calculatePatternProgression(
  rows: Array<{ id: string; stitches: { type: string; stitch: any }[] }>
): PatternProgression[] {
  const maxStitches = Math.max(...rows.map(r => r.stitches.length), 1);

  return rows.map((row, index) => ({
    row: index + 1,
    stitches: row.stitches.length,
    percentageGrowth: (row.stitches.length / maxStitches) * 100,
  }));
}
