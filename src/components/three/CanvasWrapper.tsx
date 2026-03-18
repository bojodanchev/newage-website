'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { WireframeSphere } from './WireframeSphere'

export function CanvasWrapper() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <WireframeSphere />
      </Suspense>
    </Canvas>
  )
}
