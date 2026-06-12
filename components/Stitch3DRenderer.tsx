'use client'

import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import { PatternRow } from './PatternBuilder'

interface Stitch3DRendererProps {
  rows: PatternRow[]
  yarnColor?: string
  height?: number
}

function StitchBlock({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[0.8, 1, 0.8]} />
      <meshPhongMaterial color={color} emissive={color} emissiveIntensity={0.2} shininess={100} />
    </mesh>
  )
}

function PatternVisualization({ rows, yarnColor }: { rows: PatternRow[]; yarnColor: string }) {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    // Center the pattern when it updates
    if (groupRef.current) {
      groupRef.current.position.y = 0
    }
  }, [rows])

  return (
    <group ref={groupRef}>
      {rows.map((row, rowIndex) => {
        const stitchesInRow = row.stitches.length
        const rowY = -rowIndex * 1.2
        const startX = -(stitchesInRow - 1) * 0.5

        return (
          <group key={row.id}>
            {row.stitches.map((stitch, stitchIndex) => {
              const xPos = startX + stitchIndex
              return (
                <StitchBlock
                  key={`${row.id}-${stitchIndex}`}
                  position={[xPos, rowY, 0]}
                  color={yarnColor}
                />
              )
            })}
          </group>
        )
      })}

      {/* Row labels */}
      {rows.map((row, rowIndex) => (
        <Text
          key={`label-${row.id}`}
          position={[(row.stitches.length + 2) * 0.4, -rowIndex * 1.2, 0]}
          fontSize={0.6}
          color="#8B7355"
          anchorX="left"
          anchorY="middle"
        >
          {`R${rowIndex + 1}`}
        </Text>
      ))}
    </group>
  )
}

export default function Stitch3DRenderer({
  rows,
  yarnColor = '#E8D4C8',
  height = 500,
}: Stitch3DRendererProps) {
  if (rows.length === 0) {
    return (
      <div
        style={{ height }}
        className="flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20"
      >
        <p className="text-sm text-muted-foreground">Add rows to see 3D preview</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border/50 bg-white overflow-hidden" style={{ height }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
        <pointLight position={[-10, -10, 5]} intensity={0.5} />

        <PatternVisualization rows={rows} yarnColor={yarnColor} />

        <OrbitControls autoRotate autoRotateSpeed={2} enableZoom enablePan maxDistance={50} />

        <fog attach="fog" args={['#F5F1E8', 5, 50]} />
      </Canvas>
    </div>
  )
}
