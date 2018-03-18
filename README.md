# CrudBic

[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=ru.letnes%3ACrudBic&metric=alert_status)](https://sonarcloud.io/dashboard?id=ru.letnes%3ACrudBic)

[Развёрнутое приложение на Heroku](https://stark-harbor-29920.herokuapp.com)

БД: Приложение требует наличия поднятой PostgreSQL с параметрами
`jdbc:postgresql://localhost:5432/bic`
`user: postgres`
`password: admin`

Таблицы создавать не требуется, включена функция Generate DDL. 
Для наполнения таблиц данными требуется вызвать сервис сброса таблиц по адресу `http://localhost:8090/rest/bnkseek/reset`

Все указанные параметры в случае необходимости можно изменить в файле `src\main\webapp\WEB-INF\applicationContext.xml`

Запуск приложения производится коммандой `mvn jetty:run`

Основной экран приложения доступен по адресу `http://localhost:8090/`

TODO:
 - [x] Отображение таблицы с данными справочника БИК;
 - [x] Постраничная навигация, Фильтрация методом выбора значений, сортировка;
 - [x] Возможность удаления отдельных записей справочника;
 - [x] Возможность редактирования отдельных записей справочника;
 - [x] Возможность добавления новых записей справочника;

