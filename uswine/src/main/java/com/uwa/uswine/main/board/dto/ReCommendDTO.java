package com.uwa.uswine.main.board.dto;

import com.uwa.uswine.main.board.entity.ReCommendEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ReCommendDTO {
    private long id;
    private String boardIdx;
    private String nickname;

    public ReCommendEntity toEntity() {
        ReCommendEntity reCommendEntity = new ReCommendEntity();
        reCommendEntity.setBoardIdx(this.boardIdx);
        reCommendEntity.setNickname(this.nickname);

        return reCommendEntity;
    }
}
