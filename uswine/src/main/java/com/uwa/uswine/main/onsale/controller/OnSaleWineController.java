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

import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/onsale")
public class OnSaleWineController {
    private final OnSaleWineService onSaleWineService;

    @PostMapping("list")
    public Page<SellWineSqlEntity> list(@RequestBody Map<String,String> search) {
        return this.onSaleWineService.findSearch(search.get("wineName"));
    }

    @PostMapping("wine")
    public Map<String,Object> get(@RequestBody WineIdDTO wineIdDTO) {
        String stock = this.onSaleWineService.findStock(wineIdDTO.getId());
        Map<String,Object> info = new HashMap<>();
        info.put("stock",stock);
        info.put("info",this.onSaleWineService.findWine(wineIdDTO.getId()));
        return info;
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
