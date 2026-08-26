'use client'

import { useЯзык } from '@/lib/landing/language'
import { ЗАМЕРЫ } from '@/lib/landing/measurements'
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

              {/* Условия замера стоят рядом с самими числами, а не в
                  подвале: число без условий бессмысленно, и разносить их
                  по странице значит позволить прочитать одно без другого. */}
              {i === т.разделы.length - 1 && (
                <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm opacity-70">
                  <dt>{т.замеры.условия}</dt>
                  <dd>
                    {ЗАМЕРЫ.снято} · {ЗАМЕРЫ.видеокарта} ·{' '}
                    {т.замеры.окно(
                      ЗАМЕРЫ.окно.ширина,
                      ЗАМЕРЫ.окно.высота,
                      ЗАМЕРЫ.окно.плотность,
                    )}{' '}
                    · {т.замеры.сборка}
                  </dd>
                  <dt className="tabular-nums">{ЗАМЕРЫ.вызововОтрисовки}</dt>
                  <dd>{т.замеры.вызовы}</dd>
                  <dt className="tabular-nums">{ЗАМЕРЫ.треугольников.toLocaleString(язык === 'ru' ? 'ru-RU' : 'en-US')}</dt>
                  <dd>{т.замеры.треугольники}</dd>
                  <dt className="tabular-nums">{ЗАМЕРЫ.текстур}</dt>
                  <dd>{т.замеры.текстуры}</dd>
                  <dt className="tabular-nums">{ЗАМЕРЫ.программ}</dt>
                  <dd>{т.замеры.программы}</dd>
                </dl>
              )}
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
