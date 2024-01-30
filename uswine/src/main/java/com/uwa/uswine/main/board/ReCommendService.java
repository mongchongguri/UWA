package com.uwa.uswine.main.board;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ReCommendService {
    private final ReCommendRepository reCommendRepository;

    public int saveReCommend(ReCommendEntity reCommend) {
        try {
            reCommendRepository.save(reCommend);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    public int findReCommend(ReCommendDTO reCommendDTO) {
        ReCommendEntity recommend = reCommendRepository.findByBoardIdxAndNickname(reCommendDTO.getBoardIdx(),reCommendDTO.getNickname());
        if(recommend != null) {
            return 1;
        } else {
            return 0;
        }

    }

    public int deleteReCommend(ReCommendDTO reCommendDTO) {
        ReCommendEntity reCommendEntity = reCommendRepository.findByBoardIdxAndNickname(reCommendDTO.getBoardIdx(), reCommendDTO.getNickname());

        if(reCommendEntity != null) {
            reCommendRepository.delete(reCommendEntity);
            return 1;
        } else {
            return 0;
        }
    }

    public long countRecommend(ReCommendDTO reCommendDTO) {
        return reCommendRepository.countByBoardIdx(reCommendDTO.getBoardIdx());
    }
}
