import * as THREE from 'three'
import { Stitch } from './stitches'

export interface StitchGeometry {
  geometry: THREE.BufferGeometry
  scale: { x: number; y: number; z: number }
  color: string
}

// Helper function to create a tube (yarn segment)
function createTube(
  start: THREE.Vector3,
  end: THREE.Vector3,
  radius: number = 0.05
): THREE.TubeGeometry {
  const curve = new THREE.LineCurve3(start, end)
  return new THREE.TubeGeometry(curve, 8, radius, 8, false)
}

// Helper function to create an ellipse (loop)
function createLoop(
  center: THREE.Vector3,
  radiusX: number,
  radiusY: number,
  radiusZ: number = 0.1
): THREE.TorusGeometry {
  const torusGeom = new THREE.TorusGeometry(radiusX, radiusZ, 16, 16)
  const positionAttribute = torusGeom.getAttribute('position')
  const positions = positionAttribute.array as Float32Array

  for (let i = 0; i < positions.length; i += 3) {
    positions[i] += center.x // x
    positions[i + 1] = positions[i + 1] * (radiusY / radiusX) + center.y // y scaled
    positions[i + 2] += center.z // z
  }
  positionAttribute.needsUpdate = true
  return torusGeom
}

export function createStitchGeometry(
  stitch: Stitch,
  yarnColor: string = '#E8D4C8'
): StitchGeometry {
  const baseScale = { x: stitch.width, y: stitch.height, z: 1 }

  switch (stitch.geometryType) {
    case 'chain': {
      // Chain: interlocking oval loops - use single torus
      const geometry = new THREE.TorusGeometry(0.3, 0.08, 8, 16)
      return {
        geometry,
        scale: { x: baseScale.x * 0.8, y: stitch.height * 0.4, z: 0.8 },
        color: yarnColor
      }
    }

    case 'loop': {
      // Loop-based stitches (SC, HDC, DC, TR): Progressively taller loops
      const loopHeight = Math.min(stitch.height * 0.5, 1.2)
      const loopRadius = stitch.complexity * 0.15

      const geometry = new THREE.TorusGeometry(
        loopRadius,
        0.06,
        12,
        stitch.yarnLoops * 4
      )

      return {
        geometry,
        scale: { x: stitch.width * 0.8, y: loopHeight, z: 0.8 },
        color: yarnColor
      }
    }

    case 'puff': {
      // Puff: larger bulbous shape
      const geometry = new THREE.IcosahedronGeometry(
        stitch.complexity * 0.2,
        3
      )

      return {
        geometry,
        scale: {
          x: stitch.width * 0.7,
          y: stitch.height * 0.6,
          z: stitch.width * 0.6
        },
        color: yarnColor
      }
    }

    case 'bobble': {
      // Bobble: bumpy sphere geometry
      const geometry = new THREE.IcosahedronGeometry(stitch.width * 0.25, 3)
      return {
        geometry,
        scale: {
          x: stitch.width,
          y: stitch.height * 0.7,
          z: stitch.width * 0.9
        },
        color: yarnColor
      }
    }

    case 'popcorn': {
      // Popcorn: tight cluster of loops
      const geometry = new THREE.TorusGeometry(
        stitch.width * 0.25,
        0.08,
        10,
        stitch.yarnLoops * 3
      )

      return {
        geometry,
        scale: {
          x: stitch.width * 0.8,
          y: stitch.height * 0.8,
          z: stitch.width * 0.7
        },
        color: yarnColor
      }
    }

    case 'tulip': {
      // Tulip: petal-like shape with layers
      const lathePoints = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0.2, 0.3),
        new THREE.Vector2(0.3, 0.6),
        new THREE.Vector2(0.25, 0.9),
        new THREE.Vector2(0.15, 1.0),
        new THREE.Vector2(0, 1.0)
      ]

      const geometry = new THREE.LatheGeometry(lathePoints, 16)

      return {
        geometry,
        scale: {
          x: stitch.width * 0.6,
          y: stitch.height * 0.9,
          z: stitch.width * 0.6
        },
        color: yarnColor
      }
    }

    case 'spike': {
      // Spike: tall thin vertical stitch
      const geometry = new THREE.ConeGeometry(
        stitch.width * 0.15,
        stitch.height * 1.5,
        8
      )

      return {
        geometry,
        scale: { x: 0.7, y: 1.2, z: 0.7 },
        color: yarnColor
      }
    }

    default: {
      // Fallback to simple box
      return {
        geometry: new THREE.BoxGeometry(
          stitch.width * 0.6,
          stitch.height * 0.5,
          0.5
        ),
        scale: baseScale,
        color: yarnColor
      }
    }
  }
}

// Generate a visualization mesh for a single stitch
export function generateStitchMesh(
  stitch: Stitch,
  position: THREE.Vector3,
  yarnColor: string = '#E8D4C8'
): THREE.Mesh {
  const { geometry, scale, color } = createStitchGeometry(stitch, yarnColor)

  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.3,
    roughness: 0.6,
    side: THREE.DoubleSide
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.scale.set(scale.x, scale.y, scale.z)
  mesh.position.copy(position)
  mesh.castShadow = true
  mesh.receiveShadow = true

  return mesh
}
