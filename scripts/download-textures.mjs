/**
 * Добывает CC0-материалы с ambientCG, конвертирует в WebP и раскладывает
 * в public/textures.
 *
 * Запускается ВРУЧНУЮ: `npm run textures`. Частью сборки скрипт быть не
 * должен. Если сделать его частью, деплой начнёт зависеть от чужого
 * сайта: сменится адрес, упадёт источник, включится ограничение по
 * частоте запросов — и сборка ляжет на хостинге, а не у вас. Готовые
 * WebP лежат в репозитории.
 */
import { execFile } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'

import sharp from 'sharp'

const выполнить = promisify(execFile)

const КОРЕНЬ = path.resolve(import.meta.dirname, '..')
const ВЫХОД = path.join(КОРЕНЬ, 'public', 'textures')
const ВРЕМЕННАЯ = path.join(КОРЕНЬ, '.textures-tmp')

/**
 * Качество WebP по типам карт.
 *
 * Живёт здесь, а не в lib/config.ts, намеренно: конфиг попадает в
 * браузерный пакет, и настройки сборки в нём — балласт, который скачает
 * каждый посетитель.
 *
 * У нормалей качество выше остальных: артефакты сжатия в карте нормалей
 * превращаются не в размытие, а в рябь освещения — глаз читает её как
 * грязь на поверхности.
 */
const КАЧЕСТВО = { color: 82, 'normal-gl': 92, roughness: 82 }

const НАБОРЫ = [
  {
    источник: 'Snow006',
    префикс: 'snow',
    // NormalGL, а НЕ NormalDX. Отличаются знаком зелёного канала.
    // С DX свет на неровностях ложится наизнанку: выпуклости читаются
    // впадинами. На однородном насте это почти незаметно, и ошибка
    // доживает до этапа, где её уже никто не свяжет с текстурами.
    карты: { Color: 'color', NormalGL: 'normal-gl', Roughness: 'roughness' },
  },
  {
    источник: 'Ice002',
    префикс: 'ice',
    // Кирпичу нужны только нормали: цвет и шероховатость у него свои,
    // подобранные так, чтобы он оставался темнее снега.
    карты: { NormalGL: 'normal-gl' },
  },
]

async function добыть(набор) {
  const архив = path.join(ВРЕМЕННАЯ, `${набор.источник}.zip`)
  const адрес = `https://ambientcg.com/get?file=${набор.источник}_2K-PNG.zip`

  console.log(`качаю ${набор.источник}`)
  await выполнить('curl', ['-sL', '--max-time', '300', '-o', архив, адрес])
  await выполнить('unzip', ['-qo', архив, '-d', path.join(ВРЕМЕННАЯ, набор.источник)])

  for (const [исходная, имя] of Object.entries(набор.карты)) {
    const вход = path.join(
      ВРЕМЕННАЯ,
      набор.источник,
      `${набор.источник}_2K-PNG_${исходная}.png`,
    )
    const выход = path.join(ВЫХОД, `${набор.префикс}-${имя}.webp`)
    await sharp(вход).webp({ quality: КАЧЕСТВО[имя] }).toFile(выход)
    console.log(`  ${path.basename(выход)}`)
  }
}

await rm(ВРЕМЕННАЯ, { recursive: true, force: true })
await mkdir(ВРЕМЕННАЯ, { recursive: true })
await mkdir(ВЫХОД, { recursive: true })

for (const набор of НАБОРЫ) await добыть(набор)

await writeFile(
  path.join(ВЫХОД, 'SOURCES.md'),
  [
    '# Откуда взяты текстуры',
    '',
    'Материалы с ambientCG под лицензией CC0: использование без',
    'ограничений и без указания авторства.',
    '',
    ...НАБОРЫ.map((н) => `- \`${н.префикс}-*\` — ambientCG ${н.источник}`),
    '',
    'Обновить набор: `npm run textures`.',
    '',
  ].join('\n'),
)

await rm(ВРЕМЕННАЯ, { recursive: true, force: true })
console.log('готово')
