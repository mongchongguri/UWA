package com.uwa.uswine.user.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uwa.uswine.user.entity.Role;
import com.uwa.uswine.user.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
	Page<UserEntity> findAll(Pageable pagable);
    //username을 받아 DB 테이블에서 회원을 조회하는 메소드
    UserEntity findByEmail(String word);
    UserEntity findByNickname(String nickcname);
//    List<UserEntity> findAll();
    List<UserEntity> findByEmailContaining(String word);
    List<UserEntity> findByEmailContaining(String word, Sort sort);
    
    List<UserEntity> findByEmailContainingAndRole(String word,Role Role);
    List<UserEntity> findByEmailContainingAndRole(String word,Role Role,Sort sort);
    
    List<UserEntity> findByNicknameContaining(String word);
    List<UserEntity> findByNicknameContaining(String word,Sort sort);
    
    List<UserEntity> findByNicknameContainingAndRole(String word,Role Role);
    List<UserEntity> findByNicknameContainingAndRole(String word,Role Role,Sort sort);
    
    
}
