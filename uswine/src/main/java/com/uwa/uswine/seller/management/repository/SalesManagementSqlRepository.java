package com.uwa.uswine.seller.management.repository;

import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesManagementSqlRepository extends JpaRepository<SellWineSqlEntity,Long> {
    Page<SellWineSqlEntity> findByEmailAndStockGreaterThan(String email,String stock,Pageable pageable);
    Page<SellWineSqlEntity> findByEmailAndStock(String email,String stock,Pageable pageable);

}
