'use client'

import { свет } from '@/lib/config'

export default function Lights() {
  return (
    <>
      <ambientLight intensity={свет.рассеянный} />
      <pointLight
        position={[0, 0, 0]}
        intensity={свет.точечный.яркость}
        distance={свет.точечный.дальность}
        decay={свет.точечный.затухание}
      />
      <mesh>
        <sphereGeometry args={[свет.шарик.радиус, свет.шарик.сегменты, свет.шарик.сегменты]} />
        {/* Шарик ничего не освещает: он только ярко виден через щели.
            toneMapped выключен, иначе тональная компрессия срежет
            яркость выше единицы и весь смысл пропадёт. */}
        <meshStandardMaterial
          color="#000000"
          emissive={свет.шарик.цвет}
          emissiveIntensity={свет.шарик.яркость}
          toneMapped={false}
        />
      </mesh>
    </>
  )
}
