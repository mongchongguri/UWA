package com.uwa.uswine.main.notice;

import java.util.Date;

import com.uwa.uswine.admin.entity.NoticeRecommentEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NoticeRecommentDTO {
    private long id;
    private String noticeIdx;
    private String noticeCommentIdx;
    private String nickname;
    private String recomment;
    private Date writedate;

    public NoticeRecommentEntity toEntity() {
    	NoticeRecommentEntity recommentEntity = new NoticeRecommentEntity();
        recommentEntity.setNoticeIdx(this.noticeIdx);
        recommentEntity.setNoticeCommentIdx(this.noticeCommentIdx);
        recommentEntity.setNickname(this.nickname);
        recommentEntity.setRecomment(this.recomment);
        recommentEntity.setWritedate(this.writedate);
        return recommentEntity;
    }
}
