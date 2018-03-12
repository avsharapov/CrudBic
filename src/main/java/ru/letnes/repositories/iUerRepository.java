package ru.letnes.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import ru.letnes.model.BNKSEEKTable;
import ru.letnes.model.PZNTable;
import ru.letnes.model.UERTable;
@Transactional
public interface iUerRepository extends CrudRepository<UERTable, Long> {
    UERTable findByUer(String uer);
    @Modifying
    @Query(value = "alter sequence uer_sequence restart", nativeQuery = true)
    void restartSequence();
}