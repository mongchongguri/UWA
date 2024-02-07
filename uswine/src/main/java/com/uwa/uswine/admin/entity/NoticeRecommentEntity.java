package com.uwa.uswine.admin.entity;

import jakarta.persistence.Entity;

import java.util.Date;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class NoticeRecommentEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String noticeIdx;

    @Column(nullable = false)
    private String noticeCommentIdx;

    @Column(length = 50, nullable = false)
    private String nickname;

    @Column(length = 600, nullable = false)
    private String recomment;

    @Column(nullable = false)
    private Date writedate;


}

