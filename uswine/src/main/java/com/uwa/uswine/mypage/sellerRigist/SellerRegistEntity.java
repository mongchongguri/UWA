package com.uwa.uswine.mypage.sellerRigist;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class SellerRegistEntity {
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
}
