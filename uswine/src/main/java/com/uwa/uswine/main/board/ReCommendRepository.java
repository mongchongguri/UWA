package com.uwa.uswine.main.board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReCommendRepository extends JpaRepository<ReCommendEntity,Long> {
    ReCommendEntity findByBoardIdxAndNickname(String boardIdx,String nickname);
    long countByBoardIdx(String boardIdx);
}
