package com.uwa.uswine.mypage.diary.entity;


import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "aromaRank")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AromaEntity {

    @Id
    private String _id;
    private String rank;
    private List<String> aroma;
}
