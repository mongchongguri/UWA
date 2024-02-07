package com.uwa.uswine.main.board.dto;

import com.uwa.uswine.main.board.entity.ReCommentEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@AllArgsConstructor
@ToString
public class ReCommentDTO {
    private long id;
    private String boardIdx;
    private String commentIdx;
    private String nickname;
    private String recomment;
    private Date writedate;

    public ReCommentEntity toEntity() {
        ReCommentEntity recommentEntity = new ReCommentEntity();
        recommentEntity.setBoardIdx(this.boardIdx);
        recommentEntity.setCommentIdx(this.commentIdx);
        recommentEntity.setNickname(this.nickname);
        recommentEntity.setRecomment(this.recomment);
        recommentEntity.setWritedate(this.writedate);
        return recommentEntity;
    }
}
