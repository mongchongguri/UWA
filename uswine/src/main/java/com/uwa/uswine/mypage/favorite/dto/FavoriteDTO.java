package com.uwa.uswine.mypage.favorite.dto;

import com.uwa.uswine.mypage.favorite.entity.FavoriteEntity;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FavoriteDTO {
    private long id;
    private String email;
    private String nickname;
    private int document;
    private String mongoId;
    private String favoriteDate;

    public FavoriteEntity toEntity(){
        FavoriteEntity favoriteEntity = new FavoriteEntity();
        favoriteEntity.setId(this.id);
        favoriteEntity.setEmail(this.email);
        favoriteEntity.setNickname(this.nickname);
        favoriteEntity.setDocument(this.document);
        favoriteEntity.setMongoId(this.mongoId);
        favoriteEntity.setFavoriteDate(this.favoriteDate);

        return favoriteEntity;
    }

}
