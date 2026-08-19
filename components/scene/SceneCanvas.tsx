'use client'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import BrickAxes from './BrickAxes'
import BrickSphere from './BrickSphere'
import GroundFog from './GroundFog'
import { ВнешнийСвет, ВнутреннийСвет } from './Lights'
import Sky from './Sky'
import Snowfield from './Snowfield'
import { сцена } from '@/lib/config'

export default function SceneCanvas() {
  return (
    <Canvas shadows camera={{ position: сцена.камера.позиция, fov: сцена.камера.полеЗрения }}>
      {/* Заливка фона (<color attach="background">) сюда не возвращается:
          она и панорама неба спорят за один и тот же слот фона сцены, и
          заливка либо перекроет панораму, либо будет перекрыта ею — в
          обоих случаях одна из них лишняя. Цвет сцена.фон остаётся
          подложкой страницы в app/layout.tsx до первого кадра WebGL. */}
      <Sky />
      <ВнешнийСвет />
      <Snowfield />
      <GroundFog />
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
