package com.uwa.uswine.adminchart.repository;

import com.uwa.uswine.seller.InfoWine.entity.InfoWineSellEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

public interface InfoWineSellRepository extends JpaRepository<InfoWineSellEntity, Long> {
    List<InfoWineSellEntity> findBySellDateBetween(Date date, Date date1);
}
