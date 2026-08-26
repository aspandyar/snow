'use client'

import { useEffect } from 'react'

import { useЯзык, type Язык } from '@/lib/landing/language'
import { ТЕКСТЫ } from '@/lib/landing/texts'

const ЯЗЫКИ: { код: Язык; подпись: string }[] = [
  { код: 'ru', подпись: 'Рус' },
  { код: 'en', подпись: 'Eng' },
]

/** Переключатель языка.
 *
 *  Сохранённый выбор подхватывается ЭФФЕКТОМ после монтирования, а не при
 *  создании хранилища: на сервере localStorage нет, и чтение при создании
 *  развело бы разметку сервера и первую разметку клиента. */
export default function LanguageSwitch() {
  const язык = useЯзык((с) => с.язык)
  const задатьЯзык = useЯзык((с) => с.задатьЯзык)
  const вспомнить = useЯзык((с) => с.вспомнить)

  useEffect(() => {
    вспомнить()
  }, [вспомнить])

  // Атрибут lang у документа следует за выбором. Это не украшение: по
  // нему экранный диктор выбирает произношение, а браузер — правила
  // переноса. Английский текст, прочитанный русскими правилами, звучит
  // кашей. Меняется здесь, а не в разметке страницы: на сервере выбор
  // ещё неизвестен, он лежит в localStorage.
  useEffect(() => {
    document.documentElement.lang = язык
  }, [язык])

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="opacity-60">{ТЕКСТЫ[язык].подвал.языкПодпись}</span>
      <div className="flex overflow-hidden rounded-full border border-[var(--чернила-слабые)]">
        {ЯЗЫКИ.map(({ код, подпись }) => (
          <button
            key={код}
            type="button"
            onClick={() => задатьЯзык(код)}
            aria-pressed={язык === код}
            className={
              'px-3 py-1 transition-colors ' +
              (язык === код
                ? 'bg-[var(--чернила)] text-[var(--подложка)]'
                : 'hover:bg-[var(--чернила-слабые)]')
            }
          >
            {подпись}
          </button>
        ))}
      </div>
    </div>
  )
}
