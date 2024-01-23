package com.uwa.uswine.wineDetails;

import com.uwa.uswine.main.WineEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

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
