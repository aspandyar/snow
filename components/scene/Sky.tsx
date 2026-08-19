'use client'

import { Environment } from '@react-three/drei'

import { небо } from '@/lib/config'

/**
 * Панорама неба: одновременно фон сцены и источник окружающего света.
 *
 * Одним компонентом Environment делает оба дела намеренно — фон и
 * освещение читаются из одной и той же панорамы, и разводить их по
 * разным элементам означало бы держать два раза одну и ту же карту.
 * Яркости фона и освещения при этом заданы раздельно (см. lib/config.ts):
 * фон часто нужно притушить, не трогая освещение.
 */
export default function Sky() {
  return (
    <Environment
      files={небо.панорама}
      background
      backgroundIntensity={небо.яркостьФона}
      environmentIntensity={небо.яркостьОсвещения}
      backgroundBlurriness={небо.размытие}
    />
  )
}
