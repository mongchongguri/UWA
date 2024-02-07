package com.uwa.uswine.admin.entity;


import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class NoticeEntity {
	
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    @Column(length = 50, nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    @Column(nullable=false)
    private Date writedate;
    @Column(nullable = false)
    private int hits;


}
