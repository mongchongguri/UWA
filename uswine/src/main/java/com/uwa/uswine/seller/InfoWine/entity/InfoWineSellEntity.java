package com.uwa.uswine.seller.InfoWine.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class InfoWineSellEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String itemId;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String sellMoney;

    @Column(nullable = false)
    private String sellStock;

    @Column(nullable = false)
    private String address;

    private String detailAddress;

    @Column(nullable = false)
    private boolean delivery;

    @Column(nullable = false)
    private Date sellDate;

}
