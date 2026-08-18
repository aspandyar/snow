'use client'

import { RoundedBoxGeometry } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import { InstancedMesh, Matrix4, Sphere, Vector3 } from 'three'

import { материалКирпича, наведение, сфера } from '@/lib/config'
import { подтянуть, цельСмещения } from '@/lib/hover/displacement'
import { размерыКирпича, разложитьКирпичи } from '@/lib/layout/bricks'

export default function BrickSphere() {
  const ссылка = useRef<InstancedMesh>(null)
  const кирпичи = useMemo(() => разложитьКирпичи(сфера), [])
  const размеры = useMemo(() => размерыКирпича(сфера), [])

  // Смещения живут в обычном массиве, а не в состоянии React: они
  // меняются каждый кадр, и перерисовка компонента на каждое движение
  // мыши положила бы страницу.
  const смещения = useRef(new Float32Array(кирпичи.length))

  // Невидимая гладкая сфера для луча. Пересечение с ней считается
  // аналитически. Луч по самим инстансам перебирал бы все 506 копий по
  // полторы сотни треугольников — семьдесят пять тысяч проверок на
  // каждое движение мыши, а их до ста двадцати в секунду.
  const сфераЛуча = useMemo(() => new Sphere(new Vector3(0, 0, 0), сфера.радиус), [])
  const косинусГраницы = useMemo(() => Math.cos(наведение.угловойРадиус), [])

  // Все рабочие объекты выделяются один раз. Создавать вектор или матрицу
  // внутри кадра — значит выбрасывать шестьдесят объектов в секунду
  // сборщику мусора, а он останавливает кадр в непредсказуемый момент.
  const точка = useRef(new Vector3())
  const направлениеНаКурсор = useRef(new Vector3())
  const матрица = useRef(new Matrix4())
  const положение = useRef(new Vector3())

  useLayoutEffect(() => {
    смещения.current.fill(0)
  }, [кирпичи])

  // Приоритет по умолчанию. Любой приоритет больше нуля отключает
  // автоматическую отрисовку в R3F, и экран чернеет без единой ошибки
  // в консоли.
  useFrame((состояние, шаг) => {
    const меш = ссылка.current
    if (!меш) return

    состояние.raycaster.setFromCamera(состояние.pointer, состояние.camera)
    const попал = состояние.raycaster.ray.intersectSphere(сфераЛуча, точка.current)
    const направление = попал
      ? направлениеНаКурсор.current.copy(точка.current).normalize()
      : null

    for (let i = 0; i < кирпичи.length; i++) {
      const к = кирпичи[i]
      const цель = цельСмещения(к.нормаль, направление, косинусГраницы, наведение.максСмещение)
      смещения.current[i] = подтянуть(смещения.current[i], цель, наведение.скорость, шаг)

      положение.current.copy(к.позиция).addScaledVector(к.нормаль, смещения.current[i])
      матрица.current.compose(положение.current, к.кватернион, к.масштаб)
      меш.setMatrixAt(i, матрица.current)
    }
    меш.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ссылка} args={[undefined!, undefined!, кирпичи.length]}>
      <RoundedBoxGeometry
        args={[размеры.ширина, размеры.высота, размеры.толщина]}
        radius={размеры.толщина * материалКирпича.фаска}
        smoothness={материалКирпича.гладкостьФаски}
      />
      <meshPhysicalMaterial
        color={материалКирпича.цвет}
        roughness={материалКирпича.шероховатость}
        metalness={материалКирпича.металличность}
        sheen={материалКирпича.контурноеСвечение}
        sheenRoughness={материалКирпича.шероховатостьСвечения}
        sheenColor={материалКирпича.цветСвечения}
      />
    </instancedMesh>
  )
}
