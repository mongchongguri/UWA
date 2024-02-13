package com.uwa.uswine.mypage.cart.repository;

import com.uwa.uswine.mypage.cart.entity.WineTransactionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WineTransactionRepository extends JpaRepository<WineTransactionEntity,Long> {
    Page<WineTransactionEntity> findBySelleremaiil(String email, Pageable pageable);
}
