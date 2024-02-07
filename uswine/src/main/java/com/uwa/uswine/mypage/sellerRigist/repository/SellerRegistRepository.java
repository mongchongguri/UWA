package com.uwa.uswine.mypage.sellerRigist.repository;

import com.uwa.uswine.mypage.sellerRigist.entity.SellerRegistEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRegistRepository extends JpaRepository<SellerRegistEntity, Object> {
	Page<SellerRegistEntity> findAll(Pageable pageable);
	SellerRegistEntity findByEmail(String email);
}
