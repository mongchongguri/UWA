package com.uwa.uswine.main.chat.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ChattingRoomEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 50, nullable = false)
    private String userEmail;

    @Column(length = 50, nullable = false)
    private String userNickname;

    @Column(length = 50, nullable = false)
    private String sellerEmail;

    @Column(length = 50, nullable = false)
    private String sellerNickname;

    @Column(nullable = false)
    private String sellItemId;
}
