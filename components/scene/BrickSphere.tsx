'use client'

import { RoundedBoxGeometry } from '@react-three/drei'
import { useLayoutEffect, useMemo, useRef } from 'react'
import { InstancedMesh, Matrix4 } from 'three'

import { материалКирпича, сфера } from '@/lib/config'
import { размерыКирпича, разложитьКирпичи } from '@/lib/layout/bricks'

export default function BrickSphere() {
  const ссылка = useRef<InstancedMesh>(null)
  const кирпичи = useMemo(() => разложитьКирпичи(сфера), [])
  const размеры = useMemo(() => размерыКирпича(сфера), [])

  useLayoutEffect(() => {
    const меш = ссылка.current
    if (!меш) return
    const матрица = new Matrix4()
    for (let i = 0; i < кирпичи.length; i++) {
      const к = кирпичи[i]
      матрица.compose(к.позиция, к.кватернион, к.масштаб)
      меш.setMatrixAt(i, матрица)
    }
    меш.instanceMatrix.needsUpdate = true
  }, [кирпичи])

  return (
    <instancedMesh
      ref={ссылка}
      // Геометрия и материал приходят детьми, поэтому первые два
      // аргумента конструктора пустые. Третий — предельное число
      // инстансов, изменить его после создания нельзя.
      args={[undefined!, undefined!, кирпичи.length]}
    >
      <RoundedBoxGeometry
        args={[размеры.ширина, размеры.высота, размеры.толщина]}
        radius={размеры.толщина * материалКирпича.фаска}
        smoothness={материалКирпича.гладкостьФаски}
      />
      <meshStandardMaterial
        color={материалКирпича.цвет}
        roughness={материалКирпича.шероховатость}
        metalness={материалКирпича.металличность}
        flatShading
      />
    </instancedMesh>
  )
}
