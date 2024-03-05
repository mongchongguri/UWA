package com.uwa.uswine.adminchart.repository;

import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface SellWineSqlRepository extends JpaRepository<SellWineSqlEntity, Long> {
    List<SellWineSqlEntity> findBySelldateBetween(Date startDateOfYear, Date endDateOfYear);
}
