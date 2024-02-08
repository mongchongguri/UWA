package com.uwa.uswine.adminseller.repository;


import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MNWSellWineSqlRepository extends JpaRepository<SellWineSqlEntity, Long> {

}
