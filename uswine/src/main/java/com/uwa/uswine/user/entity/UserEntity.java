package com.uwa.uswine.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserEntity {
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    @Column(length = 50, nullable = false, unique = true)
    private String email;
    @Column(length = 100, nullable = false)
    private String password;
    @Column(length = 50, nullable = false, unique = true)
    private String nickname;
    @Column(length = 200, nullable = false)
    private String address;
    @Column(length = 50, nullable = false, unique = true)
    private String phone;
    @Enumerated(EnumType.STRING)
    private Role role;

}
