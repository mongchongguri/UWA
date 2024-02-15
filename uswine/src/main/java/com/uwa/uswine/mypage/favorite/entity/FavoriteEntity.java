package com.uwa.uswine.mypage.favorite.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class FavoriteEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String nickname;
    @Column(nullable = false)
    private int document;
    @Column(nullable = false)
    private String mongoId;
    @Column(nullable = false)
    private String favoriteDate;

}
