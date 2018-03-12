package ru.letnes.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import ru.letnes.model.BNKSEEKTable;
import ru.letnes.model.PZNTable;
@Transactional
public interface iPznRepository extends CrudRepository<PZNTable, Long> {

    PZNTable findByPzn(String pzn);
    @Modifying
    @Query(value = "alter sequence pzn_sequence restart", nativeQuery = true)
    void restartSequence();
}