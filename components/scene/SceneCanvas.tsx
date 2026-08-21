'use client'

import { Canvas } from '@react-three/fiber'

import BrickAxes from './BrickAxes'
import BrickSphere from './BrickSphere'
import CameraRig from './CameraRig'
import GroundFog from './GroundFog'
import { ВнешнийСвет, ВнутреннийСвет } from './Lights'
import Ridges from './Ridges'
import ScrollDriver from './ScrollDriver'
import Sky from './Sky'
import Snowfield from './Snowfield'
import { сцена } from '@/lib/config'

export default function SceneCanvas() {
  return (
    <Canvas shadows camera={{ position: сцена.камера.позиция, fov: сцена.камера.полеЗрения }}>
      {/* Толкатель прогресса ставится ПЕРВЫМ: обработчики useFrame при
          одинаковом приоритете вызываются в порядке подписки, и всё, что
          читает прогресс прокрутки из хранилища (камера ниже), должно
          получать уже посчитанное на этом кадре число, а не прошлое.
          Сам он ничего не рисует. */}
      <ScrollDriver />
      {/* Камера ставится сразу за толкателем прогресса и по той же
          причине: она подписывается на useFrame следующей и обязана
          читать уже посчитанный на этом кадре прогресс. */}
      <CameraRig />
      {/* Заливка фона (<color attach="background">) сюда не возвращается:
          она и панорама неба спорят за один и тот же слот фона сцены, и
          заливка либо перекроет панораму, либо будет перекрыта ею — в
          обоих случаях одна из них лишняя. Цвет сцена.фон остаётся
          подложкой страницы в app/layout.tsx до первого кадра WebGL. */}
      <Sky />
      <ВнешнийСвет />
      <Snowfield />
      <GroundFog />
      {/* За краем равнины: закрывают горизонт и дают глазу планы, по
          которым читается простор. Рисуются после земли и тумана, но
          порядок здесь не важен — сортировка по глубине делает своё дело
          независимо от порядка в дереве. */}
      <Ridges />
      {/* Внутренний свет едет вместе со сферой: оба принадлежат объекту,
          а не сцене, и должны подниматься на одну высоту. */}
      <group position={[0, сцена.высотаПарения, 0]}>
        <BrickSphere />
        <ВнутреннийСвет />
      </group>
      <BrickAxes />
    </Canvas>
  )
}
