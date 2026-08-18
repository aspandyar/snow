'use client'

import { useMemo } from 'react'
import { PlaneGeometry } from 'three'

import { материалСнега, рельеф } from '@/lib/config'
import { локальныеВМировые } from '@/lib/terrain/height'
import { высотаСцены } from '@/lib/terrain/scene-height'

export default function Snowfield() {
  const геометрия = useMemo(() => {
    const г = new PlaneGeometry(рельеф.размер, рельеф.размер, рельеф.сегментов, рельеф.сегментов)
    const позиции = г.attributes.position

    for (let i = 0; i < позиции.count; i++) {
      const [x, z] = локальныеВМировые(позиции.getX(i), позиции.getY(i))
      // Смещение идёт по локальной оси Z, которая после поворота станет
      // мировой вертикалью.
      позиции.setZ(i, высотаСцены(x, z))
    }

    // Нормали пересчитываются после смещения: без этого вся земля
    // освещается как плоский лист и рельеф не читается вовсе.
    г.computeVertexNormals()
    return г
  }, [])

  return (
    // Четверть оборота вокруг X кладёт плоскость горизонтально.
    // Знак отрицательный — именно он даёт мировую z равной минус
    // локальной y, что учтено в локальныеВМировые.
    <mesh geometry={геометрия} rotation-x={-Math.PI / 2} receiveShadow>
      <meshStandardMaterial
        color={материалСнега.цвет}
        roughness={материалСнега.шероховатость}
        metalness={материалСнега.металличность}
      />
    </mesh>
  )
}
