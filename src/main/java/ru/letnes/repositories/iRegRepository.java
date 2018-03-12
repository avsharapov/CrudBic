package ru.letnes.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import ru.letnes.model.REGTable;

@Transactional
public interface iRegRepository extends CrudRepository<REGTable, Long> {
    REGTable findByRgn(String rgn);

    @Modifying
    @Query(value = "alter sequence reg_sequence restart", nativeQuery = true)
    void restartSequence();
}