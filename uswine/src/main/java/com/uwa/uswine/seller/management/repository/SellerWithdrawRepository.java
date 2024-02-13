package com.uwa.uswine.seller.management.repository;

import com.uwa.uswine.seller.management.entity.SellerWithdrawEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerWithdrawRepository extends JpaRepository<SellerWithdrawEntity,Long> {
}
