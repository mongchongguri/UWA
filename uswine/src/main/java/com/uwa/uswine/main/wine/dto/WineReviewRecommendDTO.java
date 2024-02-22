package com.uwa.uswine.main.wine.dto;

import com.uwa.uswine.main.wine.entity.WineReviewRecommendEntity;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
public class WineReviewRecommendDTO {
    private long id;
    private String wineReviewIdx;
    private String email;
    private String wineReviewRecommendDate;

    public WineReviewRecommendEntity toEntity(){
        WineReviewRecommendEntity wineReviewRecommendEntity = new WineReviewRecommendEntity();
        wineReviewRecommendEntity.setId(this.id);
        wineReviewRecommendEntity.setWineReviewIdx(this.wineReviewIdx);
        wineReviewRecommendEntity.setEmail(this.email);
        wineReviewRecommendEntity.setWineReviewRecommendDate(this.wineReviewRecommendDate);
        return wineReviewRecommendEntity;
    }
}
