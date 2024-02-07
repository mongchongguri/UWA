package com.uwa.uswine.admin.dto;

import java.util.Date;

import com.uwa.uswine.admin.entity.NoticeEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AdminNoticeDTO {
	private String title;
    private String content;
    private Date writedate;
    
    public NoticeEntity toEntity() {
        NoticeEntity noticeEntity = new NoticeEntity();
        noticeEntity.setTitle(this.title);
        noticeEntity.setContent(this.content);
        noticeEntity.setWritedate(this.writedate);
        return noticeEntity;
    }
}
