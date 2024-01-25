package com.uwa.uswine.mypage.sellerRigist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRegistRepository extends JpaRepository<SellerRegistEntity, Object> {
}
