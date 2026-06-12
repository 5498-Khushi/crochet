'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, BookOpen, Zap } from 'lucide-react'

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: Sparkles,
      title: 'Interactive Designer',
      description: 'Create custom crochet patterns with an intuitive drag-and-drop interface inspired by Canva.',
    },
    {
      icon: BookOpen,
      title: 'Learn Stitches',
      description: 'Master 8 fundamental stitches with visual guides, difficulty levels, and real-world examples.',
    },
    {
      icon: Zap,
      title: 'Instant Preview',
      description: 'See your crochet diagram update in real-time as you modify rows, stitches, and counts.',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold">
              SS
            </div>
            <span className="text-lg font-semibold text-foreground">StitchSketch</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="#library"
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              Stitches
            </Link>
            <Link
              href="/builder"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Start Designing
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20">
        <div className="absolute inset-0 -z-10 yarn-pattern opacity-40" />
        
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-block rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent">
            Welcome to the Crochet Revolution
          </div>

          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground md:text-6xl">
            Design Your Crochet Ideas<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Before You Stitch
            </span>
          </h1>

          <p className="mb-8 text-balance text-lg text-muted-foreground">
            Create, visualize, and customize crochet patterns with StitchSketch. 
            An interactive digital planner for beginners learning stitches and creative minds designing custom projects.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/builder"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition hover:bg-primary/90 hover:shadow-lg"
            >
              Start Designing
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#library"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white/40 px-8 py-4 text-base font-semibold text-foreground transition hover:bg-white/60"
            >
              Explore Stitches
            </Link>
          </div>
        </div>

        {/* Decorative yarn ball illustration area */}
        <div className="mt-16 mx-auto max-w-2xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-3xl" />
            <div className="relative h-72 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl border border-border/50 flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <div className="text-6xl mb-4">🧶</div>
                <p className="text-sm font-medium text-muted-foreground">Beautiful crochet patterns await</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border/50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Why Choose StitchSketch?
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to visualize, learn, and create crochet patterns
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="group rounded-2xl border border-border/50 bg-white/40 p-8 transition hover:border-border hover:bg-white/60 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-accent/20 p-3 text-accent transition group-hover:bg-accent/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stitch Library Preview Section */}
      <section id="library" className="border-t border-border/50 px-6 py-20 bg-muted/20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Master 8 Essential Stitches
            </h2>
            <p className="text-lg text-muted-foreground">
              Learn from beginner to advanced techniques with visual guides
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Chain', abbr: 'CH', color: 'from-primary' },
              { name: 'Slip Stitch', abbr: 'SL ST', color: 'from-accent' },
              { name: 'Single Crochet', abbr: 'SC', color: 'from-secondary' },
              { name: 'Double Crochet', abbr: 'DC', color: 'from-primary' },
              { name: 'Half Double', abbr: 'HDC', color: 'from-accent' },
              { name: 'Treble', abbr: 'TR', color: 'from-secondary' },
              { name: 'Increase', abbr: 'INC', color: 'from-primary' },
              { name: 'Decrease', abbr: 'DEC', color: 'from-accent' },
            ].map((stitch, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border/50 bg-white/50 p-6 text-center transition hover:bg-white/70 hover:shadow-md"
              >
                <div className={`mb-3 h-12 w-12 rounded-lg bg-gradient-to-br ${stitch.color} to-primary/30 mx-auto`} />
                <h3 className="font-semibold text-foreground">{stitch.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{stitch.abbr}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition"
            >
              View Complete Stitch Library
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/50 px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border/50 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Ready to Create?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Start designing your first crochet pattern today and bring your creative ideas to life.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Launch the Designer
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
                  SS
                </div>
                <span className="font-semibold text-foreground">StitchSketch</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Design beautiful crochet patterns with ease.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/builder" className="hover:text-foreground transition">Designer</Link></li>
                <li><Link href="#library" className="hover:text-foreground transition">Stitch Library</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Learn</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Tutorials</a></li>
                <li><a href="#" className="hover:text-foreground transition">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Gallery</a></li>
                <li><a href="#" className="hover:text-foreground transition">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 StitchSketch. Designed for makers, by makers.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
