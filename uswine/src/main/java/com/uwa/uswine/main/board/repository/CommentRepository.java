package com.uwa.uswine.main.board.repository;

import com.uwa.uswine.main.board.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity,Long> {
    List<CommentEntity> findByBoardIdx(String idx);
    List<CommentEntity> findByNickname(String nickname);
    List<CommentEntity> findByNicknameAndCommentNot(String nickname,String comment);
    CommentEntity findByBoardIdxAndId(String boardIdx,long id);
    long countByBoardIdx(String idx);
    long countByNicknameAndCommentNot(String nickname, String comment);
}
