package com.uwa.uswine.main;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/main")
public class MainController {

    private final WineListService wineListService;

    @PostMapping("wine")
    public Map<String,Object> wineList(@RequestBody SearchWineDTO wineDTO) {
        Map<String,Object> wineMap = new HashMap<>();

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

        return wineMap;
    }
}
