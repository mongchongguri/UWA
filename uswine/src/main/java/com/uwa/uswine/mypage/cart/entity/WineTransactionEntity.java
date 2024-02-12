package com.uwa.uswine.mypage.cart.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WineTransactionEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String wineId;

    @Column(nullable = false)
    private String wineName;

    @Column(nullable = false)
    private String price;

    @Column(nullable = false)
    private int stock;

    @Column(nullable = false)
    private int document;

    @Column(nullable = false)
    private String selleremaiil;

    @Column(nullable = false)
    private String sellername;

    @Column(nullable = false)
    private String useremail;

    @Column(nullable = false)
    private String username;
}
