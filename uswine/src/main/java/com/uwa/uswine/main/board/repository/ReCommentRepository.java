package com.uwa.uswine.main.board.repository;

import com.uwa.uswine.main.board.entity.ReCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReCommentRepository extends JpaRepository<ReCommentEntity,Long> {
    List<ReCommentEntity> findByBoardIdx(String boardIdx);
    List<ReCommentEntity> findByNickname(String nickname);
    List<ReCommentEntity> findByNicknameAndRecommentNot(String nickname,String recomment);
    ReCommentEntity findByBoardIdxAndId(String boardIdx,long id);
    long countByBoardIdx(String idx);
    long countByNicknameAndRecommentNot(String nickname,String recomment);
}
