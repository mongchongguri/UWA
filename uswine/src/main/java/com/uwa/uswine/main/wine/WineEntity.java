package com.uwa.uswine.main.wine;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Document(collection = "winelist")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WineEntity {
    @Id
    private String id;

    private String wine_idx;
    private List<String> wine_info;
    private String wine_name;
    private String wine_name_en;
    private String wine_image;
    private List<Object> wine_taste;
    private List<String> wine_aroma;
    private Object wine_detail_info;
    private String wine_region_info;
    private String wine_note;
}
