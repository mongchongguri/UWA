package com.uwa.uswine.user.repository;

import com.uwa.uswine.user.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    //username을 받아 DB 테이블에서 회원을 조회하는 메소드
    UserEntity findByEmail(String username);

}
