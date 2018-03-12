package ru.letnes.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import ru.letnes.model.TNPTable;

@Transactional
public interface iTnpRepository extends CrudRepository<TNPTable, Long> {
    TNPTable findByTnp(String tnp);

    @Modifying
    @Query(value = "alter sequence tnp_sequence restart", nativeQuery = true)
    void restartSequence();
}