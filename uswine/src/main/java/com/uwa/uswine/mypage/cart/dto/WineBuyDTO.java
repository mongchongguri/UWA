package com.uwa.uswine.mypage.cart.dto;

import com.uwa.uswine.mypage.cart.entity.WineTransactionEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WineBuyDTO {
    private String wineId;
    private String wineName;
    private String price;
    private int stock;

    private int document;
    private String selleremail;
    private String sellername;
    private String useremail;
    private String username;

    public WineTransactionEntity toEntity() {
        WineTransactionEntity wineTransactionEntity = new WineTransactionEntity();
        wineTransactionEntity.setWineId(this.wineId);
        wineTransactionEntity.setWineName(this.wineName);
        wineTransactionEntity.setPrice(this.price);
        wineTransactionEntity.setStock(this.stock);
        wineTransactionEntity.setDocument(this.document);

        wineTransactionEntity.setSelleremaiil(this.selleremail);
        wineTransactionEntity.setSellername(this.sellername);

        wineTransactionEntity.setUseremail(this.useremail);
        wineTransactionEntity.setUsername(this.username);
        return wineTransactionEntity;
    }
}
