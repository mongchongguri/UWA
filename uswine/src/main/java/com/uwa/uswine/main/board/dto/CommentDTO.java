package com.uwa.uswine.main.board.dto;

import com.uwa.uswine.main.board.entity.CommentEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CommentDTO {
    private long id;
    private String boardIdx;
    private String nickname;
    private String comment;
    private Date writedate;

    public CommentEntity toEntity() {
        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setBoardIdx(this.boardIdx);
        commentEntity.setNickname(this.nickname);
        commentEntity.setComment(this.comment);
        commentEntity.setWritedate(this.writedate);
        return commentEntity;
    }
}
