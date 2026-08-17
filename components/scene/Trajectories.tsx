'use client'

import { Segment, Segments, type SegmentObject } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, type RefObject } from 'react'

import { материалКирпича, наведение, отладка, сфера } from '@/lib/config'
import type { Кирпич } from '@/lib/layout/bricks'

type Свойства = {
  кирпичи: Кирпич[]
  смещения: RefObject<Float32Array>
}

export default function Trajectories({ кирпичи, смещения }: Свойства) {
  // Предел числа отрезков задаётся при создании и потом не меняется.
  // Доля затронутых кирпичей равна (1 − cos α)/2; берём вдвое больше
  // расчётного, чтобы запас покрыл неравномерность кладки у полюсов.
  const предел = useMemo(() => {
    const доля = (1 - Math.cos(наведение.угловойРадиус)) / 2
    return Math.max(8, Math.ceil(кирпичи.length * доля * 2))
  }, [кирпичи])

  const ссылки = useRef<(SegmentObject | null)[]>([])

  useFrame(() => {
    let занято = 0
    for (let i = 0; i < кирпичи.length && занято < предел; i++) {
      const смещение = смещения.current[i]
      if (смещение <= наведение.порогТраектории) continue
      const отрезок = ссылки.current[занято]
      if (!отрезок) break
      отрезок.start.copy(кирпичи[i].позиция)
      отрезок.end.copy(кирпичи[i].позиция).addScaledVector(кирпичи[i].нормаль, смещение)
      занято++
    }
    // Неиспользованные отрезки схлопываются в точку: скрыть отдельный
    // отрезок в <Segments> нельзя, но нулевая длина не рисует ничего.
    for (let i = занято; i < предел; i++) {
      const отрезок = ссылки.current[i]
      if (отрезок) отрезок.end.copy(отрезок.start)
    }
  })

  return (
    <Segments limit={предел} lineWidth={отладка.толщинаЛинии}>
      {Array.from({ length: предел }, (_, i) => (
        <Segment
          key={i}
          ref={(узел) => {
            ссылки.current[i] = узел
          }}
          start={[0, сфера.радиус, 0]}
          end={[0, сфера.радиус, 0]}
          color={материалКирпича.цветСвечения}
        />
      ))}
    </Segments>
  )
}
