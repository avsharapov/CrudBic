package ru.letnes.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import ru.letnes.model.BNKSEEKTable;

@Transactional
public interface iBnkseekRepository extends CrudRepository<BNKSEEKTable, Long> {
    @Modifying
    @Query(value = "alter sequence bnkseek_sequence restart", nativeQuery = true)
    void restartSequence();

    BNKSEEKTable findByNewnum(String newnum);

}