package com.uwa.uswine.adminseller.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
public class MNWWineDTO {
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
