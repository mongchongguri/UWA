package com.uwa.uswine.seller.management.entity;

import java.util.Date;

import com.uwa.uswine.mypage.sellerRigist.entity.SellerRegistEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class SellerEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(length = 50, nullable = false,unique = true)
    private String email;
    @Column(length = 50,nullable = false,unique = true)
    private String phone;
    @Column(nullable = false)
    private String bank;
    @Column(nullable = false,unique = true)
    private String account;
    @Column(nullable = false)
    private boolean policy;
    @Column(nullable = false)
    private Date registdate;
    @Column(nullable = false, columnDefinition = "bigint default 0")
    private long totalMoney;
    @Column(nullable = false, columnDefinition = "bigint default 0")
    private long Money;
    
    public SellerEntity toSeller(SellerRegistEntity entity) {
    	this.email = entity.getEmail();
    	this.phone = entity.getPhone();
    	this.bank = entity.getBank();
    	this.account = entity.getAccount();
    	this.policy = true;
    	this.registdate = entity.getRegistdate();
        this.totalMoney = entity.getTotalMoney();
        this.Money = entity.getMoney();
    	return this;
    }
}
