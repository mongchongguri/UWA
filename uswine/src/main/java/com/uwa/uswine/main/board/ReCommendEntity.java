package com.uwa.uswine.main.board;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ReCommendEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String boardIdx;

    @Column(length = 50, nullable = false)
    private String nickname;
}
