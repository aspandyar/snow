'use client'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import BrickAxes from './BrickAxes'
import BrickSphere from './BrickSphere'
import Lights from './Lights'
import Snowfield from './Snowfield'
import { сцена } from '@/lib/config'

export default function SceneCanvas() {
  return (
    <Canvas camera={{ position: сцена.камера.позиция, fov: сцена.камера.полеЗрения }}>
      <color attach="background" args={[сцена.фон]} />
      <Lights />
      <BrickSphere />
      <Snowfield />
      <BrickAxes />
      <OrbitControls />
    </Canvas>
  )
}
