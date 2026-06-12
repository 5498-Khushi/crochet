export type Stitch = {
  id: string
  name: string
  abbreviation: string
  symbol: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  description: string
  steps: string[]
  usageExamples: string[]
  height: number // relative height in pattern grid
  yarnHeight: number // actual yarn height in cm
  width: number // relative width (1 = normal)
  complexity: number // yarn loop complexity (1-5)
  yarnLoops: number // number of loops in the stitch
  geometryType: 'chain' | 'loop' | 'puff' | 'bobble' | 'popcorn' | 'tulip' | 'spike'
}

export const STITCHES: Record<string, Stitch> = {
  ch: {
    id: 'ch',
    name: 'Chain Stitch',
    abbreviation: 'CH',
    symbol: '○',
    difficulty: 'beginner',
    description: 'The foundation of all crochet. Creates a series of loops that form the base for most patterns.',
    steps: [
      'Slip the loop from your hook and pull the yarn through',
      'Yarn over and pull through the loop on the hook',
      'Repeat until you have the desired number of chains'
    ],
    usageExamples: [
      'Starting foundation for projects',
      'Creating base rows for blankets',
      'Decorative edging and borders'
    ],
    height: 1,
    yarnHeight: 0.3,
    width: 0.6,
    complexity: 1,
    yarnLoops: 1,
    geometryType: 'chain'
  },
  slst: {
    id: 'slst',
    name: 'Slip Stitch',
    abbreviation: 'SL ST',
    symbol: '•',
    difficulty: 'beginner',
    description: 'A joining stitch that creates minimal height. Used to join rounds and connect pieces.',
    steps: [
      'Insert hook into the stitch',
      'Yarn over and pull through both loops on the hook',
      'Join rounds or edges together'
    ],
    usageExamples: [
      'Joining rounds in circular patterns',
      'Connecting pieces together',
      'Creating a seamless look'
    ],
    height: 0.5,
    yarnHeight: 0.2,
    width: 0.5,
    complexity: 1,
    yarnLoops: 1,
    geometryType: 'loop'
  },
  sc: {
    id: 'sc',
    name: 'Single Crochet',
    abbreviation: 'SC',
    symbol: 'x',
    difficulty: 'beginner',
    description: 'The shortest crochet stitch. Creates a tight, dense fabric perfect for amigurumi and structured pieces.',
    steps: [
      'Insert hook into the stitch',
      'Yarn over and pull through one loop',
      'Yarn over and pull through both loops'
    ],
    usageExamples: [
      'Creating amigurumi (stuffed toys)',
      'Tight fitting garments',
      'Borders and edges'
    ],
    height: 1,
    yarnHeight: 0.6,
    width: 0.7,
    complexity: 2,
    yarnLoops: 2,
    geometryType: 'loop'
  },
  hdc: {
    id: 'hdc',
    name: 'Half Double Crochet',
    abbreviation: 'HDC',
    symbol: 'T',
    difficulty: 'beginner',
    description: 'Medium height stitch that creates a fabric with a bit more drape than single crochet but still firm.',
    steps: [
      'Yarn over once',
      'Insert hook into the stitch and pull through',
      'Yarn over and pull through all three loops on hook'
    ],
    usageExamples: [
      'Baby blankets',
      'Sweaters and wearables',
      'Hats and beanies'
    ],
    height: 1.5,
    yarnHeight: 0.8,
    width: 0.8,
    complexity: 3,
    yarnLoops: 3,
    geometryType: 'loop'
  },
  dc: {
    id: 'dc',
    name: 'Double Crochet',
    abbreviation: 'DC',
    symbol: 'T',
    difficulty: 'intermediate',
    description: 'One of the most versatile stitches. Creates an open, airy fabric with good drape and height.',
    steps: [
      'Yarn over once',
      'Insert hook and pull through',
      'Yarn over and pull through 2 loops',
      'Yarn over and pull through remaining 2 loops'
    ],
    usageExamples: [
      'Shawls and wraps',
      'Summer clothing',
      'Granny squares',
      'Afghans and throws'
    ],
    height: 2,
    yarnHeight: 1.0,
    width: 0.9,
    complexity: 4,
    yarnLoops: 4,
    geometryType: 'loop'
  },
  tr: {
    id: 'tr',
    name: 'Treble Crochet',
    abbreviation: 'TR',
    symbol: 'ɪ',
    difficulty: 'intermediate',
    description: 'A tall stitch that creates an open, lacy fabric. Perfect for lightweight draping pieces.',
    steps: [
      'Yarn over twice',
      'Insert hook and pull through',
      'Yarn over and pull through 2 loops (3 times)',
    ],
    usageExamples: [
      'Lacy shawlettes',
      'Lightweight scarves',
      'Openwork designs'
    ],
    height: 2.5,
    yarnHeight: 1.3,
    width: 1.0,
    complexity: 5,
    yarnLoops: 5,
    geometryType: 'loop'
  },
  inc: {
    id: 'inc',
    name: 'Increase',
    abbreviation: 'INC',
    symbol: '⊕',
    difficulty: 'intermediate',
    description: 'Work 2 or more stitches in the same stitch or space. Used to increase width in patterns.',
    steps: [
      'Work 2 stitches in the same stitch',
      'Can be done with any stitch type',
      'Creates width expansion in rounds or rows'
    ],
    usageExamples: [
      'Shaping circular pieces',
      'Creating sleeve caps',
      'Expanding granny squares'
    ],
    height: 1,
    yarnHeight: 0.8,
    width: 1.2,
    complexity: 3,
    yarnLoops: 2,
    geometryType: 'loop'
  },
  dec: {
    id: 'dec',
    name: 'Decrease',
    abbreviation: 'DEC',
    symbol: '⊖',
    difficulty: 'intermediate',
    description: 'Combine 2 stitches into 1 stitch. Used to decrease width and shape pieces.',
    steps: [
      'Work first stitch until 2 loops remain on hook',
      'Work next stitch until 2 loops, yarn over and pull through all 3 loops',
      'One stitch now covers 2 stitches'
    ],
    usageExamples: [
      'Decreasing for armholes',
      'Creating amigurumi shaping',
      'Closing off garment sections'
    ],
    height: 1,
    yarnHeight: 0.8,
    width: 1.5,
    complexity: 4,
    yarnLoops: 2,
    geometryType: 'loop'
  },
  mr: {
    id: 'mr',
    name: 'Magic Ring',
    abbreviation: 'MR',
    symbol: 'ⓞ',
    difficulty: 'intermediate',
    description: 'A method of starting a project in a tight ring instead of a chain. Perfect for circular amigurumi.',
    steps: [
      'Make a loop with yarn',
      'Pull yarn through the loop',
      'Work stitches into the ring',
      'Pull tail to tighten ring'
    ],
    usageExamples: [
      'Starting amigurumi heads',
      'Beginning circular mandalas',
      'Creating seamless round foundations'
    ],
    height: 0.5,
    yarnHeight: 0.4,
    width: 1.5,
    complexity: 2,
    yarnLoops: 1,
    geometryType: 'chain'
  },
  dtr: {
    id: 'dtr',
    name: 'Double Treble Crochet',
    abbreviation: 'DTR',
    symbol: 'ⱴ',
    difficulty: 'advanced',
    description: 'An even taller stitch than treble, creating very open, lacy textures.',
    steps: [
      'Yarn over 3 times',
      'Insert hook and pull through',
      'Yarn over and pull through 2 loops (4 times)'
    ],
    usageExamples: [
      'Elegant shawls',
      'Delicate lacy pieces',
      'Lightweight wraps'
    ],
    height: 3,
    yarnHeight: 1.6,
    width: 1.1,
    complexity: 5,
    yarnLoops: 6,
    geometryType: 'loop'
  },
  trtr: {
    id: 'trtr',
    name: 'Triple Treble',
    abbreviation: 'TRTR',
    symbol: '㎴',
    difficulty: 'advanced',
    description: 'The tallest basic stitch, creating extremely open and airy fabric.',
    steps: [
      'Yarn over 4 times',
      'Insert and pull through',
      'Yarn over and pull through 2 loops (5 times)'
    ],
    usageExamples: [
      'Gossamer shawlettes',
      'Very openwork designs'
    ],
    height: 3.5,
    yarnHeight: 1.9,
    width: 1.2,
    complexity: 5,
    yarnLoops: 7,
    geometryType: 'loop'
  },
  puff: {
    id: 'puff',
    name: 'Puff Stitch',
    abbreviation: 'PUFF',
    symbol: '◉',
    difficulty: 'advanced',
    description: 'A textured stitch that creates a bumpy, dimensional fabric.',
    steps: [
      'Yarn over and pull through (4-6 times)',
      'Yarn over and pull through all loops on hook'
    ],
    usageExamples: [
      'Cozy blankets',
      'Textured garments',
      'Chunky accessories'
    ],
    height: 1.5,
    yarnHeight: 0.9,
    width: 1.3,
    complexity: 5,
    yarnLoops: 8,
    geometryType: 'puff'
  },
  bobble: {
    id: 'bobble',
    name: 'Bobble Stitch',
    abbreviation: 'BOB',
    symbol: '⊙',
    difficulty: 'advanced',
    description: 'Creates a puffy, dimensional bobble that adds great texture to projects.',
    steps: [
      'Work 5 incomplete stitches in same stitch',
      'Yarn over and pull through all 6 loops'
    ],
    usageExamples: [
      'Embellished scarves',
      'Textured afghans',
      'Dimensional hats'
    ],
    height: 2,
    yarnHeight: 1.2,
    width: 1.4,
    complexity: 5,
    yarnLoops: 10,
    geometryType: 'bobble'
  },
  popcorn: {
    id: 'popcorn',
    name: 'Popcorn Stitch',
    abbreviation: 'PC',
    symbol: '⚡',
    difficulty: 'advanced',
    description: 'Similar to bobble but with stitches worked in the same stitch, creating distinct bumps.',
    steps: [
      'Work 5 DC in same stitch',
      'Remove hook and insert from front',
      'Pull through to close the popcorn'
    ],
    usageExamples: [
      'Chunky blankets',
      'Textured wraps',
      'Statement pieces'
    ],
    height: 2.2,
    yarnHeight: 1.3,
    width: 1.5,
    complexity: 5,
    yarnLoops: 10,
    geometryType: 'popcorn'
  },
  tulip: {
    id: 'tulip',
    name: 'Tulip Stitch',
    abbreviation: 'TUL',
    symbol: '❀',
    difficulty: 'advanced',
    description: 'A decorative stitch that resembles a tulip flower, great for embellishments.',
    steps: [
      'Yarn over, pull through 5 loops',
      'Work into same stitch multiple times'
    ],
    usageExamples: [
      'Decorative appliques',
      'Floral embellishments',
      'Special effects'
    ],
    height: 2,
    yarnHeight: 1.2,
    width: 1.6,
    complexity: 5,
    yarnLoops: 12,
    geometryType: 'tulip'
  },
  spike: {
    id: 'spike',
    name: 'Spike Stitch',
    abbreviation: 'SPK',
    symbol: '↓',
    difficulty: 'intermediate',
    description: 'A tall stitch that goes down to an earlier row, creating vertical lines in fabric.',
    steps: [
      'Skip next stitch',
      'Insert into stitch 1 or 2 rows below',
      'Complete as desired stitch'
    ],
    usageExamples: [
      'Creating vertical stripes',
      'Texture effects',
      'Interesting patterns'
    ],
    height: 2.5,
    yarnHeight: 1.4,
    width: 0.8,
    complexity: 4,
    yarnLoops: 5,
    geometryType: 'spike'
  },
  fsc: {
    id: 'fsc',
    name: 'Foundation Single Crochet',
    abbreviation: 'FSC',
    symbol: 'ƒ',
    difficulty: 'intermediate',
    description: 'Creates foundation and first row in one step, eliminating the need for a separate chain.',
    steps: [
      'Chain 2, insert into first chain',
      'Yarn over, pull through, yarn over, pull through 2',
      'Repeat along the chain'
    ],
    usageExamples: [
      'Quick project starts',
      'Avoiding chain gaps',
      'Neat bottom edges'
    ],
    height: 1,
    yarnHeight: 0.6,
    width: 0.7,
    complexity: 3,
    yarnLoops: 2,
    geometryType: 'loop'
  },
  fhdc: {
    id: 'fhdc',
    name: 'Foundation Half Double',
    abbreviation: 'FHDC',
    symbol: 'ƒ2',
    difficulty: 'intermediate',
    description: 'Foundation row in half double crochet stitch.',
    steps: [
      'Similar to FSC but using half double crochet',
      'Creates medium height foundation row'
    ],
    usageExamples: [
      'Starting projects with good drape',
      'Quick blanket bases',
      'Even edges'
    ],
    height: 1.5,
    yarnHeight: 0.8,
    width: 0.8,
    complexity: 3,
    yarnLoops: 3,
    geometryType: 'loop'
  },
  fdc: {
    id: 'fdc',
    name: 'Foundation Double Crochet',
    abbreviation: 'FDC',
    symbol: 'ƒ3',
    difficulty: 'intermediate',
    description: 'Foundation row in double crochet stitch.',
    steps: [
      'Work double crochets into chain as you create it',
      'One motion creating foundation and first row'
    ],
    usageExamples: [
      'Starting lacy projects',
      'Quick airy bases',
      'Clean top and bottom edges'
    ],
    height: 2,
    yarnHeight: 1.0,
    width: 0.9,
    complexity: 4,
    yarnLoops: 4,
    geometryType: 'loop'
  },
  cdc: {
    id: 'cdc',
    name: 'Crossed Double Crochet',
    abbreviation: 'CDC',
    symbol: '✕',
    difficulty: 'intermediate',
    description: 'Double crochets that cross over each other creating an X pattern.',
    steps: [
      'Skip a stitch',
      'DC in next stitch',
      'DC in skipped stitch'
    ],
    usageExamples: [
      'Lattice patterns',
      'Open work designs',
      'Special textures'
    ],
    height: 2,
    yarnHeight: 1.0,
    width: 1.4,
    complexity: 4,
    yarnLoops: 4,
    geometryType: 'loop'
  },
  v: {
    id: 'v',
    name: 'V-Stitch',
    abbreviation: 'V',
    symbol: 'V',
    difficulty: 'intermediate',
    description: 'Two stitches separated by a chain, creating a V pattern.',
    steps: [
      'Work DC, chain 1',
      'Work DC in same stitch',
      'Creates a V or shell-like appearance'
    ],
    usageExamples: [
      'Shell stitch variations',
      'Lacy tops',
      'Fan patterns'
    ],
    height: 2,
    yarnHeight: 1.0,
    width: 1.3,
    complexity: 3,
    yarnLoops: 4,
    geometryType: 'loop'
  },
  shell: {
    id: 'shell',
    name: 'Shell Stitch',
    abbreviation: 'SHELL',
    symbol: '⊂⊃',
    difficulty: 'intermediate',
    description: 'Multiple stitches grouped together creating a shell or fan effect.',
    steps: [
      'Work 3-5 stitches in same stitch/space',
      'Skip next stitch',
      'Creates fan or shell appearance'
    ],
    usageExamples: [
      'Shell blankets',
      'Scalloped edges',
      'Flowing garments'
    ],
    height: 2,
    yarnHeight: 1.1,
    width: 1.8,
    complexity: 4,
    yarnLoops: 6,
    geometryType: 'loop'
  },
  cluster: {
    id: 'cluster',
    name: 'Cluster Stitch',
    abbreviation: 'CL',
    symbol: '◆',
    difficulty: 'advanced',
    description: 'Multiple incomplete stitches joined together, creating a dense cluster.',
    steps: [
      'Work 3+ incomplete stitches',
      'Yarn over and pull through all loops',
      'Creates a compact cluster'
    ],
    usageExamples: [
      'Textured blankets',
      'Dense fabrics',
      'Unique textures'
    ],
    height: 1.8,
    yarnHeight: 1.0,
    width: 1.2,
    complexity: 5,
    yarnLoops: 8,
    geometryType: 'puff'
  },
  bullion: {
    id: 'bullion',
    name: 'Bullion Stitch',
    abbreviation: 'BULL',
    symbol: '⟲',
    difficulty: 'advanced',
    description: 'Decorative stitch made by wrapping yarn multiple times, creating a ribbed effect.',
    steps: [
      'Yarn over 7-10 times around hook',
      'Insert hook and pull through',
      'Pull through all loops'
    ],
    usageExamples: [
      'Decorative embellishments',
      'Textured details',
      'Special effects'
    ],
    height: 0.8,
    yarnHeight: 0.8,
    width: 0.6,
    complexity: 5,
    yarnLoops: 10,
    geometryType: 'puff'
  },
  lacet: {
    id: 'lacet',
    name: 'Lacet',
    abbreviation: 'LAC',
    symbol: '≈',
    difficulty: 'advanced',
    description: 'A fancy, open stitch creating intricate lace patterns.',
    steps: [
      'Chain and work in a specific pattern',
      'Creates openwork lace effects'
    ],
    usageExamples: [
      'Delicate shawls',
      'Lacy shawlettes',
      'Fine garments'
    ],
    height: 2.3,
    yarnHeight: 1.2,
    width: 1.5,
    complexity: 5,
    yarnLoops: 8,
    geometryType: 'loop'
  },
  picot: {
    id: 'picot',
    name: 'Picot',
    abbreviation: 'PIC',
    symbol: '∨',
    difficulty: 'intermediate',
    description: 'A small decorative loop created with chains, used for edging and embellishment.',
    steps: [
      'Chain 3-5',
      'Slip stitch in first chain',
      'Continue with stitch'
    ],
    usageExamples: [
      'Decorative edging',
      'Lace trim',
      'Embellished borders'
    ],
    height: 1.2,
    yarnHeight: 0.6,
    width: 0.7,
    complexity: 2,
    yarnLoops: 3,
    geometryType: 'chain'
  },
  fbtr: {
    id: 'fbtr',
    name: 'Front Post Treble',
    abbreviation: 'FBTR',
    symbol: '⟨',
    difficulty: 'advanced',
    description: 'A post stitch worked around the post of a stitch in previous row.',
    steps: [
      'Yarn over twice',
      'Insert around post from front',
      'Complete as treble'
    ],
    usageExamples: [
      'Ribbed textures',
      'Stitch definition',
      'Textured patterns'
    ],
    height: 2.5,
    yarnHeight: 1.3,
    width: 0.9,
    complexity: 5,
    yarnLoops: 5,
    geometryType: 'loop'
  },
  bpsc: {
    id: 'bpsc',
    name: 'Back Post Single Crochet',
    abbreviation: 'BPSC',
    symbol: '⟩',
    difficulty: 'intermediate',
    description: 'Single crochet worked around the back post of stitches for ribbed effects.',
    steps: [
      'Insert around post from back',
      'Complete as single crochet',
      'Creates ribbed texture'
    ],
    usageExamples: [
      'Rib trim on hats',
      'Cuff edging',
      'Textured details'
    ],
    height: 1,
    yarnHeight: 0.6,
    width: 0.7,
    complexity: 3,
    yarnLoops: 2,
    geometryType: 'loop'
  },
  fpdc: {
    id: 'fpdc',
    name: 'Front Post Double Crochet',
    abbreviation: 'FPDC',
    symbol: '⟨2',
    difficulty: 'intermediate',
    description: 'Double crochet worked around the front post for textured ribbing.',
    steps: [
      'Yarn over once',
      'Insert around post from front',
      'Complete as double crochet'
    ],
    usageExamples: [
      'Cable knit look',
      'Ribbed garments',
      'Textured sweaters'
    ],
    height: 2,
    yarnHeight: 1.0,
    width: 0.9,
    complexity: 4,
    yarnLoops: 4,
    geometryType: 'loop'
  },
  bpdc: {
    id: 'bpdc',
    name: 'Back Post Double Crochet',
    abbreviation: 'BPDC',
    symbol: '⟩2',
    difficulty: 'intermediate',
    description: 'Double crochet worked around back post for ribbed texture.',
    steps: [
      'Yarn over once',
      'Insert around post from back',
      'Complete as double crochet'
    ],
    usageExamples: [
      'Cable patterns',
      'Textured yokes',
      'Ribbed patterns'
    ],
    height: 2,
    yarnHeight: 1.0,
    width: 0.9,
    complexity: 4,
    yarnLoops: 4,
    geometryType: 'loop'
  },
  longsc: {
    id: 'longsc',
    name: 'Long Single Crochet',
    abbreviation: 'LONGSC',
    symbol: '∿',
    difficulty: 'intermediate',
    description: 'Single crochet worked several rows down creating vertical lines.',
    steps: [
      'Insert several rows below',
      'Pull up a long loop',
      'Complete as single crochet'
    ],
    usageExamples: [
      'Vertical stripes',
      'Texture lines',
      'Interesting effects'
    ],
    height: 1,
    yarnHeight: 0.8,
    width: 0.6,
    complexity: 3,
    yarnLoops: 2,
    geometryType: 'spike'
  },
  dtr2tog: {
    id: 'dtr2tog',
    name: 'Double Treble 2 Together',
    abbreviation: 'DTR2TOG',
    symbol: '∇',
    difficulty: 'advanced',
    description: 'Decrease by combining 2 double treble stitches.',
    steps: [
      'Work DTR until 2 loops remain',
      'Work DTR until 2 loops, pull through all 3',
      'One stitch replaces two'
    ],
    usageExamples: [
      'Lacy decreases',
      'Shaping lace pieces',
      'Open pattern decreasing'
    ],
    height: 3,
    yarnHeight: 1.6,
    width: 1.6,
    complexity: 5,
    yarnLoops: 6,
    geometryType: 'loop'
  },
  star: {
    id: 'star',
    name: 'Star Stitch',
    abbreviation: 'STAR',
    symbol: '★',
    difficulty: 'advanced',
    description: 'A complex stitch that creates a star-shaped pattern with dimensional texture.',
    steps: [
      'Work multiple stitches in pattern',
      'Pull through center loop creating star',
      'Creates dimensional effect'
    ],
    usageExamples: [
      'Blankets with star texture',
      'Special effect garments',
      'Dimensional pieces'
    ],
    height: 2.2,
    yarnHeight: 1.2,
    width: 1.7,
    complexity: 5,
    yarnLoops: 12,
    geometryType: 'bobble'
  }
}

export const STITCH_COLORS: Record<string, string> = {
  ch: 'from-blue-100 to-blue-50',
  slst: 'from-purple-100 to-purple-50',
  sc: 'from-pink-100 to-pink-50',
  hdc: 'from-amber-100 to-amber-50',
  dc: 'from-green-100 to-green-50',
  tr: 'from-rose-100 to-rose-50',
  inc: 'from-yellow-100 to-yellow-50',
  dec: 'from-red-100 to-red-50'
}

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-800'
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800'
    case 'advanced':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
