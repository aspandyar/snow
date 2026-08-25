'use client'

import { useЯзык } from '@/lib/landing/language'
import { ТЕКСТЫ } from '@/lib/landing/texts'
import { СХЕМЫ } from './diagrams/Diagrams'
import LanguageSwitch from './LanguageSwitch'

/** Страница, объясняющая сцену.
 *
 *  Начинается ровно там, где свет залил кадр: цвет подложки страницы —
 *  тот же, в который сходится кадр, поэтому стыка не видно. Значение
 *  одно, живёт в lib/config.ts и попадает сюда переменной CSS, а не
 *  второй записью. */
export default function Landing() {
  const язык = useЯзык((с) => с.язык)
  const т = ТЕКСТЫ[язык]

  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-32">
      <header className="flex flex-col gap-6 pt-24">
        <div className="flex items-baseline justify-between gap-6">
          <h1 className="text-4xl font-medium tracking-tight">{т.шапка.название}</h1>
          <LanguageSwitch />
        </div>
        <p className="text-lg leading-relaxed">{т.шапка.описание}</p>
        <p className="text-sm leading-relaxed opacity-70">{т.шапка.сноска}</p>
      </header>

      <div className="mt-24 flex flex-col gap-24">
        {т.разделы.map((раздел, i) => {
          const Схема = СХЕМЫ[i]
          return (
            <section key={раздел.номер} className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm tabular-nums opacity-50">{раздел.номер}</span>
                <h2 className="text-2xl font-medium tracking-tight">{раздел.заголовок}</h2>
                <p className="opacity-70">{раздел.подзаголовок}</p>
              </div>

              {раздел.абзацы.map((абзац) => (
                <p key={абзац.slice(0, 24)} className="leading-relaxed">
                  {абзац}
                </p>
              ))}

              <figure className="mt-2 flex flex-col gap-3">
                <div className="rounded-lg border border-[var(--чернила-слабые)] p-4">
                  <Схема />
                </div>
                <figcaption className="text-sm opacity-60">{раздел.подпись}</figcaption>
              </figure>
            </section>
          )
        })}
      </div>

      <footer className="mt-24 border-t border-[var(--чернила-слабые)] pt-8 text-sm opacity-60">
        <a
          href="https://github.com/aspandyar/snow"
          className="underline underline-offset-4"
          target="_blank"
          rel="noreferrer"
        >
          {т.подвал.исходники}
        </a>
      </footer>
    </div>
  )
}
