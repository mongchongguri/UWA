package com.uwa.uswine.main.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BoardDTO {
    private Long id;
    private String nickname;
    private String title;
    private String content;
    private Date writedate;
    private long recommend;

    public BoardEntity toEntity() {
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setNickname(this.nickname);
        boardEntity.setTitle(this.title);
        boardEntity.setContent(this.content);
        boardEntity.setWritedate(this.writedate);
        return boardEntity;
    }
}
