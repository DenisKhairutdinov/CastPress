# CastPress.
Многостраничный сайт студии подкастов

<img width="3836" height="1916" alt="castpresscover" src="https://github.com/user-attachments/assets/04db3621-87a7-44af-a31b-12be6665b083" />

**[CastPress.](https://castpress-gray.vercel.app/)**

CastPress. - сайт подкаст-студии с каталогом эпизодов, блогом и
информационными страницами. Часть контента генерируется динамически на основе JSON-файлов, что
позволило реализовать каталог эпизодов, блог и навигацию между страницами без ручного
дублирования данных.

## Контент на основе данных
- Загрузка и обработка данных из JSON-файлов;
- Генерация списков эпизодов подкастов;
- Генерация списка статей блога;
- Формирование страниц на основе единого источника данных;
- Собственная реализация пагинации без сторонних библиотек;

## Пользовательский интерфейс
- Светлая и темная темы оформления;
- Переключение темы с сохранением выбора пользователя в localStorage;
- Плавные переходы между состояниями интерфейса через View Transition API;
- Анимации появления элементов через Intersection Observer API;

## Дополнительные решения
Спроектирована и реализована кнопка переключения темы, отсутствовавшая в исходном дизайне;
Исправлены некоторые неточности макета, связанные с системой отступов и визуальным ритмом интерфейса;

## Технологии
HTML5 • SCSS • LightningCSS • JavaScript (ES6+) • TypeScript • Vite • Vituum • Nunjucks • View Transition API • Intersection Observer API • ESLint • Stylelint • Prettier • JSON

## Lighthouse
Результаты проверки Lighthouse представлены ниже.

<img width="800" height="400" alt="castpress-mobile" src="https://github.com/user-attachments/assets/188f268f-ca46-42d2-95cd-4a8efd4ab2d7" />

<img width="800" height="400" alt="castpress-desktop" src="https://github.com/user-attachments/assets/a9a5508c-d709-4b81-b95d-579a738b334a" />

