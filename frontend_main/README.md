# Музыка камня — скульптуры для сада

Сайт [garden-decoration.ru](https://garden-decoration.ru)

## Технические детали

- SCSS запускается в IDE с помощью [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass)
- Из файлов стилей в продакшн идёт только ./CSS/style.css
- Скоро сайт будет переписан на React + TypeScript, будет настроена нормальная сборка билда, будет ветвление по GitHub Flow, коммиты по Conventional Commits и тд.

## Продакшн

Версия, которая загружается в прод, начиная с 18.12.2025, помечается флагом **to_prod**. Например,
```
main_1.2.0 to_prod
```
В билд на сервер добавляется файл version.txt с информацией о текущей версии.