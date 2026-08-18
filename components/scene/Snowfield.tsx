'use client'

import { useLayoutEffect, useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { NoColorSpace, PlaneGeometry, RepeatWrapping, SRGBColorSpace } from 'three'

import { материалСнега, рельеф, текстуры } from '@/lib/config'
import { локальныеВМировые } from '@/lib/terrain/height'
import { высотаСцены } from '@/lib/terrain/scene-height'
import { числоПовторов } from '@/lib/textures/tiling'

/** Набор путей к картам вынесен на уровень модуля намеренно.
 *
 *  Литерал внутри компонента создавал бы новый объект на каждой
 *  отрисовке. useTexture получал бы новый ключ, заново приостанавливал
 *  дерево через Suspense, компонент пересобирался — и так по кругу.
 *  В сети это видно как пятнадцать запросов вместо трёх, а на экране —
 *  как пустая сцена: отрисовка не доходит до конца ни разу. */
const КАРТЫ_ЗЕМЛИ = {
  map: текстуры.земля.цвет,
  normalMap: текстуры.земля.нормали,
  roughnessMap: текстуры.земля.шероховатость,
}

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

  const карты = useTexture(КАРТЫ_ЗЕМЛИ)
  const { gl } = useThree()

  useLayoutEffect(() => {
    const повторов = числоПовторов(рельеф.размер, текстуры.земля.метраж)

    for (const карта of [карты.map, карты.normalMap, карты.roughnessMap]) {
      карта.wrapS = RepeatWrapping
      карта.wrapT = RepeatWrapping
      карта.repeat.set(повторов, повторов)

      // Анизотропная фильтрация — ПЕРВОЕ, что нужно включать при мыле.
      // Камера смотрит на снег скользяще, почти вдоль поверхности, и без
      // неё земля мылится независимо от разрешения карты: проблема не в
      // количестве пикселей, а в том, как они усредняются вдоль вытянутой
      // в перспективе ячейки. Значение берётся из возможностей видеокарты:
      // запрошенное сверх поддерживаемого молча игнорируется.
      карта.anisotropy = gl.capabilities.getMaxAnisotropy()

      карта.needsUpdate = true
    }

    // Цветовая карта декодируется как sRGB, остальные обязаны остаться
    // линейными. Если пропустить нормали через sRGB, освещение поедет
    // едва заметно и повсеместно — а искать причину будут в свете.
    карты.map.colorSpace = SRGBColorSpace
    карты.normalMap.colorSpace = NoColorSpace
    карты.roughnessMap.colorSpace = NoColorSpace
  }, [карты, gl])

  return (
    // Четверть оборота вокруг X кладёт плоскость горизонтально.
    // Знак отрицательный — именно он даёт мировую z равной минус
    // локальной y, что учтено в локальныеВМировые.
    <mesh geometry={геометрия} rotation-x={-Math.PI / 2} receiveShadow>
      <meshStandardMaterial
        map={карты.map}
        normalMap={карты.normalMap}
        roughnessMap={карты.roughnessMap}
        roughness={материалСнега.шероховатость}
        metalness={материалСнега.металличность}
      />
    </mesh>
  )
}
