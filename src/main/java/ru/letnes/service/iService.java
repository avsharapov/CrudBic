package ru.letnes.service;

import ru.letnes.model.IEntity;

import java.util.List;
import java.util.Map;

public interface iService<T extends IEntity> {
    /**
     * @return количество записей в БД.
     */
    long count();
    /**
     * Получить все записи из БД.
     *
     * @return List - список записей
     */
    List<T> list();
    /**
     * Добавить новую запись.
     *
     * @param entity
     */
    void add(T entity);
    /**
     * Создать и добавить новую запись.
     *
     * @param newEntityValues значения полей для создания новой записи.
     */
    void add(Map<String, Object> newEntityValues);
    /**
     * Обновить запись в БД.
     *
     * @param id ID обновляемой записи.
     * @param updatedFields Поля с новыми значениями для обновления.
     */
    void update(Long id, Map<String, Object> updatedFields);
    /**
     * Обновить запись в БД.
     *
     * @param entity
     */
    void update(T entity);
    /**
     * Удалить запись из БД по ID.
     *
     * @param id
     */
    void delete(Long id);
    /**
     * Получить одну запись по ID.
     *
     * @param id
     * @return T
     */
    T findById(Long id);
    /**
     * @return перезалить вторичных таблиц в БД данными.
     */
    void resetSecondTable();
    /**
     * @return перезалить основную таблицу в БД данными.
     */
    void resetFirstTable();
    /**
     * Очистка всех данных в БД
     */
    void dropAllData();
}
