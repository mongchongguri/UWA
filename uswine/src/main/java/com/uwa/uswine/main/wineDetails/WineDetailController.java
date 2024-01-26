package com.uwa.uswine.main.wineDetails;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uwa.uswine.main.wine.WineEntity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/wine")
public class WineDetailController {
    private final WineDetailService wineDetailService;
    @PostMapping("idx")
    public WineEntity wineIdx(@RequestBody Map<String,String> wineId) {
        return this.wineDetailService.getWineOne(wineId.get("Id"));
    }
}
