package com.uwa.uswine.main.wine.dto;

import com.uwa.uswine.main.wine.entity.WineReviewEntity;
import lombok.*;

 @Getter
 @Setter
 @AllArgsConstructor
 @NoArgsConstructor
 @ToString
public class WineReviewDTO {
    private long id;
    private String mongoId;
    private String email;
    private String nickname;
    private String content;
    private String wineReviewDate;

    public WineReviewEntity toEntity(){
        WineReviewEntity wineReviewEntity = new WineReviewEntity();
        wineReviewEntity.setId(this.id);
        wineReviewEntity.setMongoId(this.mongoId);
        wineReviewEntity.setEmail(this.email);
        wineReviewEntity.setNickname(this.nickname);
        wineReviewEntity.setContent(this.content);
        wineReviewEntity.setWineReviewDate(this.wineReviewDate);
        return wineReviewEntity;
    }
}
