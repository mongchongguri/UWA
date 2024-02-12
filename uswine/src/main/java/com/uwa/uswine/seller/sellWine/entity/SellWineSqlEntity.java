package com.uwa.uswine.seller.sellWine.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class SellWineSqlEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String wineName;

    @Column(nullable = true)
    private String wineNameEn;

    @Column(nullable = false)
    private String wineImageURL;

    @Column(nullable = false)
    private String sellMoney;

    @Column(nullable = false)
    private String wineType;

    @Column(nullable = false)
    private String wineRegion;

    @Column(nullable = false)
    private String stock;

    @Column(nullable = false, columnDefinition = "int default 0")
    private int sellState;

    @Column(nullable = false,unique = true)
    private String mongoId;

    @Column(nullable = false)
    private Date selldate;
}
