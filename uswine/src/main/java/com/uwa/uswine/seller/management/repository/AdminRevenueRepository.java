package com.uwa.uswine.seller.management.repository;

import com.uwa.uswine.seller.management.entity.AdminRevenueEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRevenueRepository extends JpaRepository<AdminRevenueEntity,Long> {
}
