package com.uwa.uswine.admin.repository;

import com.uwa.uswine.main.board.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<BoardEntity, Long> {

    

}
