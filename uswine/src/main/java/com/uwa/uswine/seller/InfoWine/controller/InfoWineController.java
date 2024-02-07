package com.uwa.uswine.seller.InfoWine.controller;

import com.uwa.uswine.seller.InfoWine.entity.InfoWineSellEntity;
import com.uwa.uswine.seller.InfoWine.service.InfoWineService;
import com.uwa.uswine.seller.InfoWine.dto.InfoWineDTO;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/seller/info")
public class InfoWineController {

    private final InfoWineService infoWineService;

    @PostMapping("/sell")
    public int sell(@RequestBody InfoWineDTO infoWineDTO) {
        return this.infoWineService.save(infoWineDTO.toEntity());
    }

    @PostMapping("/store")
    public List<InfoWineSellEntity> store(@RequestBody Map<String,String> item) {
        return this.infoWineService.getStore(item.get("id"));
    }

}
