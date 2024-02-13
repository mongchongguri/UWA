package com.uwa.uswine.main.onsale.controller;

import com.uwa.uswine.main.onsale.dto.SellerNickNameDTO;
import com.uwa.uswine.main.onsale.dto.WineIdDTO;
import com.uwa.uswine.main.onsale.service.OnSaleWineService;
import com.uwa.uswine.seller.sellWine.entity.SellWineEntity;
import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import jakarta.persistence.Tuple;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/onsale")
public class OnSaleWineController {
    private final OnSaleWineService onSaleWineService;

    @PostMapping("list")
    public Page<SellWineSqlEntity> list() {
        return this.onSaleWineService.findAll();
    }

    @PostMapping("wine")
    public SellWineEntity get(@RequestBody WineIdDTO wineIdDTO) {
        return this.onSaleWineService.findWine(wineIdDTO.getId());
    }

    @PostMapping("email")
    public String getEmail(@RequestBody SellerNickNameDTO sellerNickNameDTO) {
        System.out.println(sellerNickNameDTO.toString());
        if (sellerNickNameDTO.getDocument() != 0) {
            return this.onSaleWineService.findEmail(sellerNickNameDTO.getNickname()).getEmail();
        } else {
            return this.onSaleWineService.findInfoEmail(sellerNickNameDTO.getNickname()).getEmail();
        }

    }
}
