package com.uwa.uswine.seller.management.dto;

import com.uwa.uswine.seller.management.entity.SellerWithdrawEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SellerManagementWithdrawDTO {
    private String email;
    private String nickname;
    private String bank;
    private String account;
    private String withdraw;

    public SellerWithdrawEntity toEntity() {
        SellerWithdrawEntity sellerWithdrawEntity = new SellerWithdrawEntity();
        sellerWithdrawEntity.setEmail(this.email);
        sellerWithdrawEntity.setNickname(this.nickname);
        sellerWithdrawEntity.setBank(this.bank);
        sellerWithdrawEntity.setAccount(this.account);
        sellerWithdrawEntity.setWihtdraw(this.withdraw);
        return sellerWithdrawEntity;
    }
}
