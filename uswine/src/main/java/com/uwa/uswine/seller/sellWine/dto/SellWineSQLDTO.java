package com.uwa.uswine.seller.sellWine.dto;

import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SellWineSQLDTO {
    private String nickname;
    private String email;
    private String wineName;
    private String wineNameEn;
    private String wineImageURL;
    private String sellMoney;
    private String wineType;
    private String wineRegion;
    private String mongoId;
    private Date selldate;

    public SellWineSqlEntity toEntity() {
        SellWineSqlEntity sellWineSqlEntity = new SellWineSqlEntity();

        sellWineSqlEntity.setNickname(this.nickname);
        sellWineSqlEntity.setEmail(this.email);
        sellWineSqlEntity.setWineName(this.wineName);
        sellWineSqlEntity.setWineNameEn(this.wineNameEn);
        sellWineSqlEntity.setWineImageURL(this.wineImageURL);
        sellWineSqlEntity.setSellMoney(this.sellMoney);
        sellWineSqlEntity.setWineType(this.wineType);
        sellWineSqlEntity.setWineRegion(this.wineRegion);
        sellWineSqlEntity.setMongoId(this.mongoId);
        sellWineSqlEntity.setSelldate(this.selldate);
        return sellWineSqlEntity;
    }
}
