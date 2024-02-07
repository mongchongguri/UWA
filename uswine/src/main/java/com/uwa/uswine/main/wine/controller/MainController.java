package com.uwa.uswine.main.wine.controller;

import java.util.HashMap;
import java.util.Map;

import com.uwa.uswine.main.wine.dto.SearchWineDTO;
import com.uwa.uswine.main.wine.service.WineListService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/main")
public class MainController {

    private final WineListService wineListService;

    @PostMapping("wine")
    public Map<String,Object> wineList(@RequestBody SearchWineDTO wineDTO) {
        Map<String,Object> wineMap = new HashMap<>();

        try {
            if(wineDTO.getSearchWine() == null && wineDTO.getTagWine() == null && wineDTO.getTagWineAroma() == null) {
                wineMap.put("wineList",this.wineListService.findAll(wineDTO));
                wineMap.put("totalPage",this.wineListService.countAll());
            } else if(wineDTO.getTagWine().size() == 0 && wineDTO.getTagWineAroma().size() == 0){
                wineMap.put("wineList",this.wineListService.findWineName(wineDTO));
                wineMap.put("totalPage",this.wineListService.pageWineName(wineDTO));
            } else if(wineDTO.getTagWine().size() == 0) {
                wineMap.put("wineList",this.wineListService.findWineNameAroma(wineDTO));
                wineMap.put("totalPage",this.wineListService.pageWineNameAroma(wineDTO));
            } else if(wineDTO.getTagWineAroma().size() == 0) {
                wineMap.put("wineList",this.wineListService.findWineNameWineInfo(wineDTO));
                wineMap.put("totalPage",this.wineListService.pageWineNameWineInfo(wineDTO));
            } else {
                wineMap.put("wineList",this.wineListService.findWine(wineDTO));
                wineMap.put("totalPage",this.wineListService.pageWine(wineDTO));
            }
        } catch(Exception e) {
            wineMap.put("totalPage",0);
        }

        return wineMap;
    }
}
