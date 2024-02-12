package com.uwa.uswine.seller.sellWine.entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "sellwinelist")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SellWineEntity {
    @Id
    private String id;

    private String nickName;
    private String email;
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
}
