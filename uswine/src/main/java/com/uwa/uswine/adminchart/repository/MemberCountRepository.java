package com.uwa.uswine.adminchart.repository;

import com.uwa.uswine.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface MemberCountRepository extends JpaRepository<UserEntity, Long> {
    List<UserEntity> findByJoindateContaining(String year);

}
