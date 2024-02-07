package com.uwa.uswine.mypage.diary;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class DiaryDTO {
    private  long id;
    private String email;
    private String nickname;
    private String title;
    private String content;
    private String diarydate;

    public DiaryEntity toEntity(){
        DiaryEntity diaryEntity = new DiaryEntity();
        diaryEntity.setId(this.id);
        diaryEntity.setEmail(this.email);
        diaryEntity.setNickname(this.nickname);
        diaryEntity.setTitle(this.title);
        diaryEntity.setContent(this.content);
        diaryEntity.setDiarydate(this.diarydate);
        return diaryEntity;
    }
}
