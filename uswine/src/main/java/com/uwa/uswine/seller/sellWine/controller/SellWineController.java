package com.uwa.uswine.seller.sellWine.controller;

import com.uwa.uswine.seller.sellWine.dto.SellWineDTO;
import com.uwa.uswine.seller.sellWine.dto.SellWineSQLDTO;
import com.uwa.uswine.seller.sellWine.entity.SellWineEntity;
import com.uwa.uswine.seller.sellWine.service.SellWineService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/seller/wine")
public class SellWineController {

    private final SellWineService sellWineService;

    @PostMapping("/upload")
    public String wineUpload(@RequestBody SellWineDTO sellWineDTO) {
        Mono<String> rs = sellWineService.sellwine(sellWineDTO.toEntity());
        return rs.block();
    }

    @PostMapping("/idsave")
    public int wineIdSave(@RequestBody SellWineSQLDTO sellWineSQLDTO) {
        System.out.println(sellWineSQLDTO);
        return sellWineService.sellwineId(sellWineSQLDTO.toEntity());
    }
}
