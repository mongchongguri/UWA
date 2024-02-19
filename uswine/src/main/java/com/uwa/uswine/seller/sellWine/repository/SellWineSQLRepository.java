package com.uwa.uswine.seller.sellWine.repository;

import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellWineSQLRepository extends JpaRepository<SellWineSqlEntity,Long> {
    SellWineSqlEntity findByMongoIdAndEmail(String id,String email);
    SellWineSqlEntity findById(long id);

    List<SellWineSqlEntity> findByMongoIdIn(List<String> mongoId, Pageable pageable);
}
