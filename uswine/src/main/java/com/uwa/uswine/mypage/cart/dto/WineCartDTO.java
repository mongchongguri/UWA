package com.uwa.uswine.mypage.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WineCartDTO {
    private String wineId;
    private String wineName;
    private String wineNameEn;
    private String wineImage;
    private String price;
    private int stock;
    private int document;

    private String selleremail;
    private String sellername;
}
