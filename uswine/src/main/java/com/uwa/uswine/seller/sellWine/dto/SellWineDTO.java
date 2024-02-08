package com.uwa.uswine.seller.sellWine.dto;

import com.uwa.uswine.seller.sellWine.entity.SellWineEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SellWineDTO {
    private String nickName;
    private String phone;
    private String sellerInfo;
    private String sellMoney;
    private String postCode;
    private String address;

    private String wineImageURL;
    private String wineType;
    private String wineName;
    private String wineNameEn;
    private String wineInfo;
    private String addInfo;

    private List<Object> wineTaste;

    private List<String> wineAroma;
    private String wineRegion;
    private String alcohol;
    private String wineMaker;
    private String wineVarieties;
    private String wineStyle;
    private String wineBrewing;
    private String wineTemp;
    private String wineIncome;

    public SellWineEntity toEntity() {
        SellWineEntity sellWineEntity = new SellWineEntity();

        sellWineEntity.setNickName(this.nickName);
        sellWineEntity.setPhone(this.phone);
        sellWineEntity.setSellerInfo(this.sellerInfo);
        sellWineEntity.setSellMoney(this.sellMoney);
        sellWineEntity.setPostCode(this.postCode);
        sellWineEntity.setAddress(this.address);

        sellWineEntity.setWineImageURL(this.wineImageURL);
        sellWineEntity.setWineType(this.wineType);
        sellWineEntity.setWineName(this.wineName);
        sellWineEntity.setWineNameEn(this.wineNameEn);
        sellWineEntity.setWineInfo(this.wineInfo);
        sellWineEntity.setAddInfo(this.addInfo);

        sellWineEntity.setWineTaste(this.wineTaste);

        sellWineEntity.setWineAroma(this.wineAroma);
        sellWineEntity.setWineRegion(this.wineRegion);
        sellWineEntity.setAlcohol(this.alcohol);
        sellWineEntity.setWineMaker(this.wineMaker);
        sellWineEntity.setWineVarieties(this.wineVarieties);
        sellWineEntity.setWineStyle(this.wineStyle);
        sellWineEntity.setWineBrewing(this.wineBrewing);
        sellWineEntity.setWineTemp(this.wineTemp);
        sellWineEntity.setWineIncome(this.wineIncome);
        return sellWineEntity;
    }


}
