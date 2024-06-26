package com.uwa.uswine.main.board.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Entity
@Getter
@Setter
@ToString
public class BoardEntity {
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    @Column(length = 50,nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Date writedate;

}
