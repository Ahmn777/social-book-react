# Social Book — React + Redux Toolkit

Готовое приложение по макету Social Book: публикации, редактирование/удаление постов, раскрытие комментариев, добавление и удаление комментариев. Данные хранятся в Redux store, изменения выполняются через Redux Toolkit actions.

## Запуск

1. Установите [Node.js](https://nodejs.org/) (LTS).
2. Откройте эту папку в VS Code.
3. В терминале выполните:

```bash
npm install
npm start
```

4. Откройте адрес, который покажет Vite (обычно `http://localhost:5173`).

## GitHub Pages

1. Создайте пустой репозиторий на GitHub и загрузите проект.
2. В `package.json` уже есть команда публикации:

```bash
npm run deploy
```

3. После публикации включите GitHub Pages для ветки `gh-pages` в настройках репозитория, если GitHub не включил её автоматически.

Можно также собрать проект командой `npm run build`; готовые файлы появятся в `dist`.

## Структура

- `src/App.jsx` — интерфейс и обработчики действий.
- `src/store/postsSlice.js` — Redux Toolkit slice и actions.
- `src/store/store.js` — конфигурация Redux store.
- `src/styles.css` — стили и адаптивная верстка.
