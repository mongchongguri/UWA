package com.uwa.uswine.seller.management.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class AdminRevenueEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String withdraw;

    @Column(nullable = false)
    private String revenue;

    @Column(nullable = false)
    private Date timestamp;
}
