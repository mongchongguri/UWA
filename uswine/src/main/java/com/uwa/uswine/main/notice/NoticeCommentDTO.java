package com.uwa.uswine.main.notice;

import java.util.Date;

import com.uwa.uswine.admin.entity.NoticeCommentEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NoticeCommentDTO {
    private long id;
    private String noticeIdx;
    private String nickname;
    private String comment;
    private Date writedate;
    
    public NoticeCommentEntity toEntity() {
        NoticeCommentEntity commentEntity = new NoticeCommentEntity();
        commentEntity.setNoticeIdx(this.noticeIdx);
        commentEntity.setNickname(this.nickname);
        commentEntity.setComment(this.comment);
        commentEntity.setWritedate(this.writedate);
        return commentEntity;
    }
}
