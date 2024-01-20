package com.uwa.uswine.main;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public Map<String,Object> wineList(@RequestBody Map<String,Integer> page) {
        Map<String,Object> wineMap = new HashMap<>();
        wineMap.put("totalPage",this.wineListService.getTotal());
        wineMap.put("wineList",this.wineListService.getList(page.get("page")));
        return wineMap;
    }
}
