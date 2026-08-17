'use client'

import dynamic from 'next/dynamic'

// Холст ввозится динамически с отключённым отрисовыванием на сервере.
// Одного 'use client' не хватает: клиентские компоненты всё равно проходят
// серверную отрисовку, а там нет window, и WebGL падает при монтировании.
// Сам вызов dynamic с ssr: false запрещён в серверных компонентах Next,
// поэтому он обязан жить здесь, в отдельном клиентском файле.
const SceneCanvas = dynamic(() => import('./SceneCanvas'), { ssr: false })

export default function SceneMount() {
  return <SceneCanvas />
}
