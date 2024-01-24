package com.uwa.uswine.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uwa.uswine.user.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    //username을 받아 DB 테이블에서 회원을 조회하는 메소드
    UserEntity findByEmail(String username);

}
