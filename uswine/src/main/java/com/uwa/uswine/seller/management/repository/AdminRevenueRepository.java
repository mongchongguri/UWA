package com.uwa.uswine.seller.management.repository;

import com.uwa.uswine.seller.management.entity.AdminRevenueEntity;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRevenueRepository extends JpaRepository<AdminRevenueEntity, Long> {
  List<AdminRevenueEntity> findByTimestampBetween(Date startDateOfYear, Date endDateOfYear);
}
