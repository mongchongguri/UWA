package com.uwa.uswine.mypage.sellerRigist.repository;

import com.uwa.uswine.mypage.sellerRigist.entity.SellerRegistEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRegistRepository extends JpaRepository<SellerRegistEntity, Object> {
}
