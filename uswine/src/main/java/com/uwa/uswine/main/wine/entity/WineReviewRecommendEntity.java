package com.uwa.uswine.main.wine.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter@Entity
public class WineReviewRecommendEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String wineReviewIdx;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String wineReviewRecommendDate;
}
