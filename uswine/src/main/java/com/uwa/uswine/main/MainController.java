package com.uwa.uswine.main;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/main")
public class MainController {

    private final WineListService wineListService;

    @PostMapping("wine")
    public List<WineEntity> wineList() {
        return this.wineListService.getList();
    }
}
