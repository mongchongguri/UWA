package com.uwa.uswine.main.board.service;

import com.uwa.uswine.main.board.dto.ReCommentDTO;
import com.uwa.uswine.main.board.entity.ReCommentEntity;
import com.uwa.uswine.main.board.repository.ReCommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ReCommentService {
    private final ReCommentRepository reCommentRepository;

    public int saveReComment(ReCommentEntity recomment) {
        try{
            reCommentRepository.save(recomment);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    public List<ReCommentEntity> getRecomments(ReCommentDTO reCommentDTO) {
        return reCommentRepository.findByBoardIdx(reCommentDTO.getBoardIdx());
    }

    public int deleteComment(ReCommentDTO ReCommentDTO) {
        ReCommentEntity delReComment = reCommentRepository.findByBoardIdxAndId(ReCommentDTO.getBoardIdx(),ReCommentDTO.getId());

        if(delReComment != null) {
            delReComment.setRecomment("작성자에 의해 삭제된 댓글입니다.");
            reCommentRepository.save(delReComment);
            return 1;
        } else {
            return 0;
        }
    }

    public long getCountReComments(String idx) {
        return reCommentRepository.countByBoardIdx(idx);
    }
}
