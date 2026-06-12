import { STITCHES, Stitch } from './stitches'
import { PatternRow } from '@/components/PatternBuilder'

export type Shape = {
  id: string
  name: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  pattern: PatternRow[]
}

const createRow = (stitchIds: string[]): PatternRow => ({
  id: Date.now().toString() + Math.random(),
  stitches: stitchIds.map(id => ({
    type: id,
    stitch: STITCHES[id as keyof typeof STITCHES]
  }))
})

export const SHAPES: Record<string, Shape> = {
  circle: {
    id: 'circle',
    name: 'Circle (Amigurumi Base)',
    description: 'Perfect for creating round shapes used in stuffed toys and decorative pieces',
    difficulty: 'beginner',
    pattern: [
      createRow(['sc', 'sc', 'sc', 'sc', 'sc', 'sc']),
      createRow(['inc', 'inc', 'inc', 'inc', 'inc', 'inc']),
      createRow(['sc', 'inc', 'sc', 'inc', 'sc', 'inc', 'sc', 'inc', 'sc', 'inc', 'sc', 'inc']),
      createRow(['sc', 'sc', 'inc', 'sc', 'sc', 'inc', 'sc', 'sc', 'inc', 'sc', 'sc', 'inc', 'sc', 'sc', 'inc', 'sc', 'sc', 'inc']),
    ]
  },
  square: {
    id: 'square',
    name: 'Granny Square',
    description: 'The classic granny square pattern, perfect for blankets and afghans',
    difficulty: 'intermediate',
    pattern: [
      createRow(['ch', 'ch', 'ch', 'ch']),
      createRow(['dc', 'dc', 'ch', 'ch', 'dc', 'dc', 'ch', 'ch', 'dc', 'dc', 'ch', 'ch']),
      createRow(['dc', 'dc', 'ch', 'ch', 'dc', 'dc', 'ch', 'ch', 'dc', 'dc', 'ch', 'ch']),
      createRow(['dc', 'dc', 'ch', 'ch', 'dc', 'dc', 'ch', 'ch', 'dc', 'dc', 'ch', 'ch']),
    ]
  },
  flower: {
    id: 'flower',
    name: 'Simple Flower',
    description: 'A cute flower petal pattern great for decorations and motifs',
    difficulty: 'beginner',
    pattern: [
      createRow(['sc', 'sc', 'sc', 'sc', 'sc', 'sc']),
      createRow(['inc', 'inc', 'inc', 'inc', 'inc', 'inc']),
      createRow(['sc', 'sc', 'inc', 'sc', 'sc', 'inc', 'sc', 'sc', 'inc', 'sc', 'sc', 'inc']),
      createRow(['sc', 'sc', 'sc', 'sc', 'sc', 'sc', 'sc', 'sc', 'sc', 'sc', 'sc', 'sc']),
      createRow(['dec', 'sc', 'dec', 'sc', 'dec', 'sc', 'dec', 'sc']),
    ]
  },
  cowl: {
    id: 'cowl',
    name: 'Cowl/Collar',
    description: 'A simple cowl neck pattern for a cozy garment',
    difficulty: 'intermediate',
    pattern: [
      createRow(['dc', 'dc', 'dc', 'dc', 'dc', 'dc', 'dc', 'dc']),
      createRow(['dc', 'dc', 'dc', 'dc', 'dc', 'dc', 'dc', 'dc']),
      createRow(['dc', 'dc', 'dc', 'dc', 'dc', 'dc', 'dc', 'dc']),
      createRow(['dc', 'dc', 'dc', 'dc', 'dc', 'dc', 'dc', 'dc']),
    ]
  },
  triangleShawl: {
    id: 'triangle',
    name: 'Triangle Shawl',
    description: 'A classic triangular shawl that increases gradually',
    difficulty: 'advanced',
    pattern: [
      createRow(['ch', 'ch', 'ch']),
      createRow(['dc', 'ch', 'dc']),
      createRow(['dc', 'dc', 'ch', 'ch', 'dc', 'dc']),
      createRow(['dc', 'dc', 'dc', 'ch', 'ch', 'dc', 'dc', 'dc']),
      createRow(['dc', 'dc', 'dc', 'dc', 'ch', 'ch', 'dc', 'dc', 'dc', 'dc']),
    ]
  }
}

export const YARN_COLORS = [
  { name: 'Natural', hex: '#E8D4C8' },
  { name: 'Cream', hex: '#F5F3F0' },
  { name: 'Soft Pink', hex: '#F4B5C5' },
  { name: 'Blush', hex: '#D4A5A5' },
  { name: 'Sage Green', hex: '#C5D5C5' },
  { name: 'Dusty Blue', hex: '#A8B5C5' },
  { name: 'Warm Gray', hex: '#C5C0B8' },
  { name: 'Charcoal', hex: '#4A4845' },
  { name: 'Navy', hex: '#2C3E50' },
  { name: 'Rust', hex: '#A85C5C' },
]

export const YARN_WEIGHTS = [
  { name: 'Lace', weight: '0' },
  { name: 'Fingering', weight: '1' },
  { name: 'Sport', weight: '2' },
  { name: 'Worsted', weight: '4' },
  { name: 'Bulky', weight: '5' },
  { name: 'Super Bulky', weight: '6' },
]

export const HOOK_SIZES = [
  { size: 'A (1mm)', weight: '0' },
  { size: 'B (1.6mm)', weight: '1' },
  { size: 'C (2.75mm)', weight: '2' },
  { size: 'D (3.25mm)', weight: '3' },
  { size: 'E (3.5mm)', weight: '3' },
  { size: 'F (3.75mm)', weight: '3' },
  { size: 'G (4mm)', weight: '4' },
  { size: 'H (5mm)', weight: '4' },
  { size: 'I (5.5mm)', weight: '4' },
  { size: 'J (6mm)', weight: '5' },
  { size: 'K (6.5mm)', weight: '5' },
  { size: 'L (8mm)', weight: '5' },
  { size: 'M (9mm)', weight: '6' },
  { size: 'N (10mm)', weight: '6' },
  { size: 'P (15mm)', weight: '7' },
]
