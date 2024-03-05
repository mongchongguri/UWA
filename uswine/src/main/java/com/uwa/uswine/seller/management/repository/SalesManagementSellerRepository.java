package com.uwa.uswine.seller.management.repository;

import com.uwa.uswine.seller.management.entity.SellerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesManagementSellerRepository extends JpaRepository<SellerEntity,Long> {
    SellerEntity findByEmail(String email);

    @Query("SELECT SUM(CAST(w.totalMoney AS INTEGER)) FROM SellerEntity w WHERE w.email = :email")
    Long sumTotalMoneyByEmail(@Param("email") String email);

    @Query("SELECT SUM(CAST(w.Money AS INTEGER)) FROM SellerEntity w WHERE w.email = :email")
    Long sumMoneyByEmail(@Param("email")String email);
}
