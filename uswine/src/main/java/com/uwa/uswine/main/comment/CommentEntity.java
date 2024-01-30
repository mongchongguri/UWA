package com.uwa.uswine.main.comment;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class CommentEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String boardIdx;

    @Column(length = 50, nullable = false)
    private String nickname;

    @Column(length = 600, nullable = false)
    private String comment;

    @Column(nullable = false)
    private Date writedate;

}
