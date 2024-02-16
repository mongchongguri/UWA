package com.uwa.uswine.main.board.repository;

import com.uwa.uswine.main.board.entity.BoardEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface BoardRepository extends JpaRepository<BoardEntity,Long> {
    Page<BoardEntity> findByTitleContainingOrContentContaining(String keyword1,String keyword2,Pageable pageable);
    Page<BoardEntity> findByTitleContaining(String keyword,Pageable pageable);
    Page<BoardEntity> findByContentContaining(String keyword,Pageable pageable);
    Page<BoardEntity> findByNicknameContaining(String keyword,Pageable pageable);
    Page<BoardEntity> findByNicknameAndTitleNot(String nickname,Pageable pageable,String Title);
    
    @Override
    Optional<BoardEntity> findById(Long id);
}
