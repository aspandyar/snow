'use client'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { сцена } from '@/lib/config'

export default function SceneCanvas() {
  return (
    <Canvas camera={{ position: сцена.камера.позиция, fov: сцена.камера.полеЗрения }}>
      <color attach="background" args={[сцена.фон]} />
      <ambientLight intensity={сцена.проверка.рассеянный} />
      <directionalLight position={сцена.проверка.направленный} />
      <mesh>
        <boxGeometry args={[сцена.проверка.ребро, сцена.проверка.ребро, сцена.проверка.ребро]} />
        <meshStandardMaterial color={сцена.проверка.цветКуба} />
      </mesh>
      <OrbitControls />
    </Canvas>
  )
}
