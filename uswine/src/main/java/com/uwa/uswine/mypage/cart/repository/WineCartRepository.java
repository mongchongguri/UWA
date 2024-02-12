package com.uwa.uswine.mypage.cart.repository;

import com.uwa.uswine.mypage.cart.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WineCartRepository extends JpaRepository<CartEntity,Long> {
    CartEntity findByMongoIdAndUseremail(String id,String email);
    List<CartEntity> findByUseremail(String email);
}
