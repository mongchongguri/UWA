package com.uwa.uswine.seller.goods.entity;

import com.uwa.uswine.mypage.cart.entity.WineTransactionEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class GoodsStateEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private int delivery = 0;

    @Column(nullable = false)
    private long transactionId;

    @Column(nullable = true)
    private String invoiceNumber;

    @Column(nullable = true)
    private String courierCompany;

    @Column(nullable = false)
    private Date orderTime;

    @Column(nullable = true)
    private Date stockingTime;

    @Column(nullable = true)
    private Date deliveryTime;

    @Column(nullable = true)
    private Date completionTime;
}
