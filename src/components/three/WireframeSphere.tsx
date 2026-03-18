'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh, BufferAttribute } from 'three'

export function WireframeSphere() {
  const meshRef = useRef<Mesh>(null)
  const originalPositions = useRef<Float32Array | null>(null)

  const geometry = useMemo(() => {
    const { IcosahedronGeometry } = require('three')
    const geo = new IcosahedronGeometry(2.5, 4)
    originalPositions.current = new Float32Array(geo.attributes.position.array)
    return geo
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current || !originalPositions.current) return

    meshRef.current.rotation.y = clock.elapsedTime * 0.08

    const positions = meshRef.current.geometry.attributes.position as BufferAttribute
    const original = originalPositions.current
    const time = clock.elapsedTime * 0.4

    for (let i = 0; i < positions.count; i++) {
      const ox = original[i * 3]
      const oy = original[i * 3 + 1]
      const oz = original[i * 3 + 2]

      const displacement =
        Math.sin(ox * 1.5 + time) * 0.05 +
        Math.cos(oy * 1.5 + time * 0.7) * 0.05 +
        Math.sin(oz * 1.5 + time * 0.5) * 0.03

      const scale = 1 + displacement
      positions.array[i * 3] = ox * scale
      positions.array[i * 3 + 1] = oy * scale
      positions.array[i * 3 + 2] = oz * scale
    }

    positions.needsUpdate = true
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial
        wireframe
        transparent
        opacity={0.15}
        color="#8B5CF6"
      />
    </mesh>
  )
}
