package com.uwa.uswine.admin.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class NoticeCommentEntity {

    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String noticeIdx;
    @Column(length = 50, nullable = false)
    private String nickname;
    @Column(length=600,nullable=false)
    private String comment;
    @Column(nullable = false)
    private Date writedate;


}
