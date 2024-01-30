package com.uwa.uswine.main.comment;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;

@Data
@Entity
public class ReCommentEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String boardIdx;

    @Column(nullable = false)
    private String commentIdx;

    @Column(length = 50, nullable = false)
    private String nickname;

    @Column(length = 600, nullable = false)
    private String recomment;

    @Column(nullable = false)
    private Date writedate;


}
