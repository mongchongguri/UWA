package com.uwa.uswine.mypage.sellerRigist.dto;

import com.uwa.uswine.mypage.sellerRigist.entity.SellerRegistEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SellerRegistDTO {
    private String email;
    private String phone;
    private String bank;
    private String account;
    private boolean policy;
    private Date registdate;

    public SellerRegistEntity toEntity() {
        SellerRegistEntity sellerRegistEntity = new SellerRegistEntity();
        sellerRegistEntity.setEmail(this.email);
        sellerRegistEntity.setPhone(this.phone);
        sellerRegistEntity.setBank(this.bank);
        sellerRegistEntity.setAccount(this.account);
        sellerRegistEntity.setPolicy(this.policy);
        sellerRegistEntity.setRegistdate(this.registdate);
        return sellerRegistEntity;
    }
}
