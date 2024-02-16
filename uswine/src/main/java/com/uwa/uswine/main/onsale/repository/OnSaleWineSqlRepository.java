package com.uwa.uswine.main.onsale.repository;

import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import jakarta.persistence.Tuple;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnSaleWineSqlRepository extends JpaRepository<SellWineSqlEntity,Long> {
    Page<SellWineSqlEntity> findByWineNameContainingAndStockGreaterThan(String search,String stock,Pageable pageable);
    SellWineSqlEntity findEmailByNickname(String nickname);
    SellWineSqlEntity findByMongoId(String id);
}
