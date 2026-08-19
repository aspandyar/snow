<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Соглашения проекта snow

- Все числовые константы живут в `lib/config.ts`, больше нигде в проекте
  чисел быть не должно — ни в компонентах, ни в стилях, ни в шейдерах.
  Исключение: тесты задают значения у себя, чтобы не краснеть от правки
  настройки.
- Каждое число в конфиге сопровождается комментарием, объясняющим не
  «что это», а почему именно столько и что сломается, если поставить
  иначе.
- Комментарии объясняют «почему», а не «что». Особенно там, где решение
  выглядит странным: у каждой странности в этом проекте есть причина, и
  без неё следующий разработчик вернёт «как правильно» и сломает.
- Код и документация — по-русски: комментарии, имена в конфиге,
  идентификаторы, спеки и планы.
- Сообщения коммитов, заголовки и тела PR — ПО-АНГЛИЙСКИ. Это то, что
  видно снаружи репозитория, и владелец хочет держать историю проекта
  на общем языке. Внутренности остаются русскими.
- Пути и имена файлов — латиницей: кириллица в путях ломает сборку на
  хостинге из-за разных нормализаций Unicode в macOS и Linux.
- Версии пакетов, влияющих на картинку, закрепляются точно, без
  диапазонов.
- Спеки и планы лежат в `docs/superpowers/`.
