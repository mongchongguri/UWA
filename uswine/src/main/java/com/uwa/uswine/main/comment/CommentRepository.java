package com.uwa.uswine.main.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity,Long> {
    List<CommentEntity> findByBoardIdx(String idx);
    CommentEntity findByBoardIdxAndId(String boardIdx,long id);
    long countByBoardIdx(String idx);
}
