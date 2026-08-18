'use client'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import BrickAxes from './BrickAxes'
import BrickSphere from './BrickSphere'
import { ВнешнийСвет, ВнутреннийСвет } from './Lights'
import Snowfield from './Snowfield'
import { сцена } from '@/lib/config'

export default function SceneCanvas() {
  return (
    <Canvas shadows camera={{ position: сцена.камера.позиция, fov: сцена.камера.полеЗрения }}>
      <color attach="background" args={[сцена.фон]} />
      <ВнешнийСвет />
      <Snowfield />
      {/* Внутренний свет едет вместе со сферой: оба принадлежат объекту,
          а не сцене, и должны подниматься на одну высоту. */}
      <group position={[0, сцена.высотаПарения, 0]}>
        <BrickSphere />
        <ВнутреннийСвет />
      </group>
      <BrickAxes />
      <OrbitControls target={[0, сцена.высотаПарения, 0]} />
    </Canvas>
  )
}
