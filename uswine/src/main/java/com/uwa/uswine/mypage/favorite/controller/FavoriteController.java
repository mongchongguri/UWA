package com.uwa.uswine.mypage.favorite.controller;

import com.uwa.uswine.main.wine.entity.WineEntity;
import com.uwa.uswine.mypage.favorite.dto.FavoriteDTO;
import com.uwa.uswine.mypage.favorite.entity.FavoriteEntity;
import com.uwa.uswine.mypage.favorite.service.FavoriteService;
import com.uwa.uswine.seller.sellWine.entity.SellWineEntity;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/mypage/favorite")
public class FavoriteController {

    private final FavoriteService favoriteService;

    @PostMapping("add")
    public int addFavorite(@RequestBody FavoriteDTO favoriteDTO){
        return favoriteService.addFavorite(favoriteDTO.toEntity());
    }

    @DeleteMapping("delete")
    public int delFavorite(@RequestBody FavoriteDTO favoriteDTO){
        return favoriteService.delFavorite(favoriteDTO.toEntity());
    }

    @PostMapping("get")
    public Map<String, Object> getFavoriteList(@RequestBody Map<String, String> map){
        // 리턴 객체 선언
        Map<String, Object> result = new HashMap<>();

        // mongoId 가져오기
        String email = map.get("email");
        Map<String, List<String>> mongoId = favoriteService.getMongoId(email);

        List<String> wineListMongoId = mongoId.get("wineListMongoId");
        List<String> sellWineListMongoId = mongoId.get("sellWineListMongoId");

        // mongoDB 중 wineList 가져오기
        List<WineEntity> mongoWineList = favoriteService.getMongoWineList(wineListMongoId);
        result.put("mongoWineList",mongoWineList);


        // mongoDB 중 sellWineList 가져오기
        List<SellWineEntity> mongoSellWineList = favoriteService.getMongoSellWineList(sellWineListMongoId);
        result.put("mongoSellWineList",mongoSellWineList);


        return result;
    }
}
