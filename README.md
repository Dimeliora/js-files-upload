# Разработка приложения для загрузки файлов

Разработка простого одностраничного приложения для загрузки файлов.
Адаптивная верстка для устройств с шириной экрана от 320px.

Проект работает в паре с api, который предоставляет функционал аутентификации пользователей; загрузки, хранения, скачивания и удаления файлов.

## API проекта

Проект api реализован посредством библиотеки expressjs с маршрутизацией для работы с сервисами аутентификации, работы с файлами и пользователями.

Для хранения информации о пользователях и загруженных файлах используется БД MongoDB в связке с ODM Mongoose. Строка подключения к БД должна предоставляться окружением через переменную DB_CONNECTION_URI.

Аутентификация пользователя реализована с использованием JWT (только access-токен), для генерации и верификации токенов используется библиотека jsonwebtoken, хэширование паролей производится библиотекой bcryptjs. Доступ к endpoint'ам осуществляется через middleware с проверкой наличия и верификацей access-токена (кроме маршрута для логина пользователя). Секретный ключ для jwt должен предоставляться окружением через переменную JWT_SECRET.

Данные для регистрации нового пользователя проходят валидацию, для валидации используется библиотека express-validator. Механизм является дополнительным, основная валидация происходит на frontend-части (критерии валидации см. ниже).

Работа с файлами осуществляется средствами модулей fs и fs/promises Node.js (требуется версия Node.js 14+), для упрощения получения файла из запроса используется библиотека express-fileupload.

Для обработки и сохранения изображения аватара пользователя используется библиотека Jimp.

## Frontend-часть проекта

Проект реализован в виде SPA с маршрутизацией через window.location.hash, содержит 4 основные страницы и страницу 404.

Страница Auth содержит формы аутентификации/регистрации пользователя (переключаются соответствующей кнопкой под формой). Для формы регистрации реализована валидация данных:

-   username - не должен быть пустым
-   email - должен быть корректным адресом эл. почты
-   password - должен содержать не менее 6 символов

При успешном входе через форму логина, успешной регистрации, а также при наличии в локальном хранилище брузера ранее полученного access-токена приосходит переход на страницу Dashboard. Access-токен сохраняется в local storage.

Dashboard - главная страница проекта, реализованная в виде административной панели. Интерактивными элементами являются:

-   изображение аватара пользователя, реализована загрузка изображения по клику на него (допустимые форматы: JPG, PNG, WebP)
-   кнопка-ссылка перехода на страницу upload
-   заполненность хранилища в текстовом виде (занято/всего) и в виде прогресс-бара (в модели пользователя для БД установлен объем хранилища 100Мб)
-   строка состояния с отображением времени последней "синхронизации" с api и кнопка logout.

Страница Upload предоставляет блок для загрузки файлов. Возможны варианты выбора файлов:

-   клик по отмеченной области с дальнейшим выбором файлов из диалогового окна браузера
-   перетаскивание файлов и/или папок из проводника файловой системы в отмеченную область. В случае перетаскивания папок всё их содержимое преобразуется в плоский список файлов.

После выбора файлов для загрузки происходит поочередная загрузка файлов на сервер. Состояние загрузки (прогресс, статусное сообщение) отображается в появившемся модальном окне, там же реализована возможность отмены загрузки как конкретного файла из списка, так и всех еще не загруженных файлов.

При переходе на страницу Recent запрашивается с сервера и выводится список уже загруженных файлов (или уведомление о том, что файлов нет). Изначально список ограничен 5-ю последними загруженными файлами. Если файлов 5 и более, отображается кнопка View all uploads, по нажатию на которую запрашиваются и отображаются оставшиеся файлы.

Каждый элемент списка имеет кнопки для скачивания и удаления файла. Для реализации множественного удаления через единственный запрос механизм удаления реализован следующим образом: по нажатию на кнопку файл добавляется в список на удаление, который передается api по истечении debounce time (1 секунда); каждое новое нажатие сбрасывает таймер и добавляет новый файл в список. У элемента списка, помеченного на удаление, отключаются кнопки "Download" и "Delete".

После каждой успешной загрузки или удаления файлов сбрасывается счетчик времени с момента "синхронизации", отображаемый в футере Dashboard и Recent.

Для работы с http-запросами используется библиотека axios.

## Сборка проекта

```bash
1. git clone https://github.com/Dimeliora/js-files-upload
2. cd js-files-upload/client
3. npm install
4. cd ../api
5. npm install
```

Для сборки frontend-части проекта используется планировщик задач Gulp.
Скрипты для сборки:

-   serve - сборка в development-режиме и запуск dev-server
-   build - сборка в development-режиме
-   prod - сборка в production-режиме

В режиме production осуществляется минификация HTML, CSS и JS кода без записи source-map, создание и подключение favicon.

#### ВНИМАНИЕ

Для работы скрипта генерации favicon необходимо наличие файла **_favicon.png_** в директории _src/favicon_, там же расположен файл **_favicon-design.json_** для описания правил отображения иконок на разных устройствах.

Запуск проекта api производится из директории api:

```bash
npm start
```
