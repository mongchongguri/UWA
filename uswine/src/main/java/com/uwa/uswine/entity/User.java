package com.uwa.uswine.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor
public class User {

    /**
     * 유저 정보를 저장하는 용도의 엔티티
     * **/


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Setter
    @Column(nullable = false)
    private String password;

    @Setter
    @Column(nullable = false)
    private String nickname;

    @Column(columnDefinition = "TEXT",nullable = false)
    private String address;

    @Column(nullable = false)
    private String phone;



    @Builder
    public User(String email, String password, String nickname, String address, String phone) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.address = address;
        this.phone = phone;
    }
}
