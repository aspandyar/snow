'use client'

import { Segment, Segments } from '@react-three/drei'
import { useMemo } from 'react'
import { Vector3 } from 'three'

import { отладка, сфера } from '@/lib/config'
import { разложитьКирпичи } from '@/lib/layout/bricks'

/** Три оси базиса каждого N-го кирпича: красная вдоль кольца, зелёная
 *  вдоль меридиана, синяя по нормали. Если красные оси где-то кренятся
 *  относительно горизонта — базис собран неправильно. Это единственный
 *  способ увидеть ошибку до того, как её замаскирует фаска. */
export default function BrickAxes() {
  const оси = useMemo(() => {
    const кирпичи = разложитьКирпичи(сфера)
    const результат: { начало: Vector3; конец: Vector3; цвет: string }[] = []

    for (let i = 0; i < кирпичи.length; i += отладка.шагВыборки) {
      const к = кирпичи[i]
      const направления: [Vector3, string][] = [
        [new Vector3(1, 0, 0).applyQuaternion(к.кватернион), '#d64545'],
        [new Vector3(0, 1, 0).applyQuaternion(к.кватернион), '#4a9e5c'],
        [new Vector3(0, 0, 1).applyQuaternion(к.кватернион), '#3f6fd8'],
      ]
      for (const [направление, цвет] of направления) {
        результат.push({
          начало: к.позиция.clone(),
          конец: к.позиция.clone().addScaledVector(направление, отладка.длинаОси),
          цвет,
        })
      }
    }
    return результат
  }, [])

  if (!отладка.осиВидны) return null

  return (
    <Segments limit={оси.length} lineWidth={отладка.толщинаЛинии}>
      {оси.map((ось, i) => (
        <Segment key={i} start={ось.начало} end={ось.конец} color={ось.цвет} />
      ))}
    </Segments>
  )
}
