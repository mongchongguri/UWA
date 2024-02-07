package com.uwa.uswine.seller.InfoWine.dto;

import com.uwa.uswine.seller.InfoWine.entity.InfoWineSellEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class InfoWineDTO {
    private String email;
    private String nickname;
    private String itemId;
    private String phone;
    private String sellMoney;
    private String sellStock;
    private String address;
    private String detailAddress;
    private boolean delivery;
    private Date sellDate;

    public InfoWineSellEntity toEntity() {
        InfoWineSellEntity infoWineSellEntity = new InfoWineSellEntity();
        infoWineSellEntity.setEmail(this.email);
        infoWineSellEntity.setNickname(this.nickname);
        infoWineSellEntity.setItemId(this.itemId);
        infoWineSellEntity.setPhone(this.phone);
        infoWineSellEntity.setSellMoney(this.sellMoney);
        infoWineSellEntity.setSellStock(this.sellStock);
        infoWineSellEntity.setAddress(this.address);
        infoWineSellEntity.setDetailAddress(this.detailAddress);
        infoWineSellEntity.setDelivery(this.delivery);
        infoWineSellEntity.setSellDate(this.sellDate);
        return infoWineSellEntity;
    }
}
