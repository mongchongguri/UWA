package com.uwa.uswine.admin.dto;

import java.util.List;

import com.uwa.uswine.main.wine.entity.WineEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WineInsertDTO {
	
	private List<String> wine_info;
    private String wine_name;
    private String wine_name_en;
    private String wine_image;
    private List<Object> wine_taste;
    private List<String> wine_aroma;
    private Object wine_detail_info;
    private String wine_note;
    
    public WineEntity toEntity() {
    	WineEntity wineEntity = new WineEntity();
    	wineEntity.setWine_info(this.wine_info);
    	wineEntity.setWine_name(this.wine_name);
    	wineEntity.setWine_name_en(this.wine_name_en);
    	wineEntity.setWine_image(this.wine_image);
    	wineEntity.setWine_taste(this.wine_taste);
    	wineEntity.setWine_aroma(this.wine_aroma);
    	wineEntity.setWine_detail_info(this.wine_detail_info);
    	wineEntity.setWine_note(this.wine_note);
        return wineEntity;
    }
}
