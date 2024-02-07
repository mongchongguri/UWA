package com.uwa.uswine.main.board.service;

import com.uwa.uswine.main.board.dto.CommentDTO;
import com.uwa.uswine.main.board.entity.CommentEntity;
import com.uwa.uswine.main.board.repository.CommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public int saveComment(CommentEntity comment) {
        try{
            commentRepository.save(comment);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    public List<CommentEntity> getComments(String idx) {
        return commentRepository.findByBoardIdx(idx);
    }

    public int deleteComment(CommentDTO commentDTO) {
       CommentEntity delComment = commentRepository.findByBoardIdxAndId(commentDTO.getBoardIdx(),commentDTO.getId());

       if(delComment != null) {
           delComment.setComment("작성자에 의해 삭제된 댓글입니다.");
           commentRepository.save(delComment);
           return 1;
       } else {
           return 0;
       }
    }

    public long countComment(String idx) {
        return commentRepository.countByBoardIdx(idx);
    }
}
