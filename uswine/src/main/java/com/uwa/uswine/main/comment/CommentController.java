package com.uwa.uswine.main.comment;

import jakarta.activation.CommandMap;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {
    private final CommentService commentService;
    private final ReCommentService reCommentService;

    @PostMapping("write")
    public int write(@RequestBody CommentDTO commentDTO) {
        int rs = commentService.saveComment(commentDTO.toEntity());
        return rs;
    }

    @PostMapping("list")
    public List<CommentEntity> commentList(@RequestBody CommentDTO commentDTO) {
        return commentService.getComments(commentDTO.getBoardIdx());
    }

    @PostMapping("commentDelete")
    public int commentDelete(@RequestBody CommentDTO commentDTO) {
        return commentService.deleteComment(commentDTO);
    }

    @PostMapping("countComment")
    public long countComment(@RequestBody CommentDTO commentDTO) {
        return commentService.countComment(commentDTO.getBoardIdx());
    }

    @PostMapping("recomment")
    public int recomment(@RequestBody ReCommentDTO reCommentDTO) {
        int rs = reCommentService.saveReComment(reCommentDTO.toEntity());
        return rs;
    }

    @PostMapping("getrecomment")
    public List<ReCommentEntity> getReComment(@RequestBody ReCommentDTO reCommentDTO) {
        return reCommentService.getRecomments(reCommentDTO);
    }

    @PostMapping("reCommentDelete")
    public int recommentDelete(@RequestBody ReCommentDTO reCommentDTO) {
        return reCommentService.deleteComment(reCommentDTO);
    }

    @PostMapping("countReComment")
    public long countReComment(@RequestBody ReCommentDTO reCommentDTO) {
        return reCommentService.getCountReComments(reCommentDTO.getBoardIdx());
    }
}
