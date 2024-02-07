package com.uwa.uswine.seller.management.repository;

import com.uwa.uswine.seller.management.entity.SellerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesManagementSellerRepository extends JpaRepository<SellerEntity,Long> {
    SellerEntity findByEmail(String email);
}
