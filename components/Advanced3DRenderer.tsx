'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Stitch, STITCHES } from '@/lib/stitches'
import { generateStitchMesh } from '@/lib/stitch3DGeometry'

export interface StitchInstance {
  id: string
  type: string
  stitch: Stitch
  position: number
  color: string
  rowIndex: number
}

export interface PatternRowData {
  id: string
  stitches: StitchInstance[]
  color?: string
}

interface Props {
  rows: PatternRowData[]
  yarnColor: string
  height: number
  onStitchHover?: (stitchId: string | null) => void
  onStitchClick?: (stitchId: string) => void
}

export default function Advanced3DRenderer({
  rows,
  yarnColor,
  height,
  onStitchHover,
  onStitchClick
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const meshesRef = useRef<Map<string, THREE.Mesh>>(new Map())
  const raycasterRef = useRef(new THREE.Raycaster())
  const mouseRef = useRef(new THREE.Vector2())

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xfaf5f0)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 3, 8)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, height)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 10, 7)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xffd9a8, 0.5)
    pointLight.position.set(-5, 5, 5)
    scene.add(pointLight)

    // Grid helper
    const gridHelper = new THREE.GridHelper(20, 20, 0xd4a574, 0xf5ede2)
    gridHelper.position.y = -0.5
    scene.add(gridHelper)

    // Render stitches
    meshesRef.current.clear()
    let maxStitchesInRow = 0

    rows.forEach((row, rowIndex) => {
      maxStitchesInRow = Math.max(maxStitchesInRow, row.stitches.length)

      row.stitches.forEach((stitch, stitchIndex) => {
        try {
          const xOffset = (stitchIndex - row.stitches.length / 2) * 1.2
          const yOffset = (rows.length - rowIndex - 1) * 1.5

          const mesh = generateStitchMesh(
            stitch.stitch,
            new THREE.Vector3(xOffset, yOffset, 0),
            stitch.color || yarnColor
          )

          mesh.userData = { stitchId: stitch.id, rowIndex, stitchIndex }
          scene.add(mesh)
          meshesRef.current.set(stitch.id, mesh)
        } catch (error) {
          console.error('[v0] Error generating stitch mesh:', error)
        }
      })
    })

    // Mouse interaction
    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycasterRef.current.setFromCamera(mouseRef.current, camera)

      const intersects = raycasterRef.current.intersectObjects(scene.children)
      meshesRef.current.forEach((mesh) => {
        mesh.material.emissive.setHex(0x000000)
      })

      if (intersects.length > 0) {
        const firstIntersect = intersects[0].object as THREE.Mesh
        if (firstIntersect.userData.stitchId) {
          firstIntersect.material.emissive.setHex(0xffccaa)
          onStitchHover?.(firstIntersect.userData.stitchId)
        }
      }
    }

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycasterRef.current.setFromCamera(mouseRef.current, camera)
      const intersects = raycasterRef.current.intersectObjects(scene.children)

      if (intersects.length > 0) {
        const firstIntersect = intersects[0].object as THREE.Mesh
        if (firstIntersect.userData.stitchId) {
          onStitchClick?.(firstIntersect.userData.stitchId)
        }
      }
    }

    renderer.domElement.addEventListener('mousemove', onMouseMove)
    renderer.domElement.addEventListener('click', onMouseClick)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotate scene slowly
      scene.rotation.z += 0.001

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const newHeight = height
      camera.aspect = width / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(width, newHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.domElement.removeEventListener('mousemove', onMouseMove)
      renderer.domElement.removeEventListener('click', onMouseClick)
      cancelAnimationFrame(animationId)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [rows, yarnColor, height, onStitchHover, onStitchClick])

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gradient-to-b from-orange-50 to-amber-50 rounded-lg"
      style={{ minHeight: `${height}px` }}
    />
  )
}
