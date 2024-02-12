package com.uwa.uswine.mypage.cart.repository;

import com.uwa.uswine.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCartRepository extends JpaRepository<UserEntity,Long> {
    UserEntity findAddressByEmail(String email);
}
