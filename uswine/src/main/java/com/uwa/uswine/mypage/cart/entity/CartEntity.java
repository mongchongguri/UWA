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
public class CartEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String mongoId;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String useremail;

    @Column(nullable = false)
    private String sellername;

    @Column(nullable = false)
    private String selleremail;

    @Column(nullable = false)
    private String price;

    @Column(nullable = false)
    private int stock = 1;

    @Column(nullable = false)
    private int document;
}
