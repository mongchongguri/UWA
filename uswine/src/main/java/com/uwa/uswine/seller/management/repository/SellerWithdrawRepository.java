package com.uwa.uswine.seller.management.repository;

import com.uwa.uswine.seller.management.entity.SellerWithdrawEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellerWithdrawRepository extends JpaRepository<SellerWithdrawEntity,Long> {
    Page<SellerWithdrawEntity> findByEmailOrderByTimestampDesc(String email, Pageable pageable);

    @Query("SELECT SUM(CAST(w.wihtdraw AS INTEGER)) FROM SellerWithdrawEntity w WHERE w.email = :email")
    Long sumWihtdrawByEmail(@Param("email") String email);
}
