package com.uwa.uswine.mypage.favorite.controller;

import com.uwa.uswine.main.wine.entity.WineEntity;
import com.uwa.uswine.mypage.favorite.dto.FavoriteDTO;
import com.uwa.uswine.mypage.favorite.service.FavoriteService;
import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import lombok.AllArgsConstructor;
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

    @PostMapping("getOne")
    public Boolean getFavoriteOne (@RequestBody FavoriteDTO favoriteDTO){
        return favoriteService.getFavorite(favoriteDTO.getEmail(), favoriteDTO.getMongoId());
    }

    @PostMapping("add")
    public int addFavorite(@RequestBody FavoriteDTO favoriteDTO){
        return favoriteService.addFavorite(favoriteDTO.toEntity());
    }

    @PostMapping("delete")
    public int delFavorite(@RequestBody FavoriteDTO favoriteDTO) {
        return favoriteService.delFavorite(favoriteDTO.getEmail(), favoriteDTO.getMongoId());
    }

    @PostMapping("getList")
    public Map<String, Object> getFavoriteList(@RequestBody FavoriteDTO favoriteDTO){
        System.out.println("여기까진 오나?");

        // 리턴 객체 선언
        Map<String, Object> result = new HashMap<>();

        Map<String, Object> mongoIdListCount = favoriteService.getMongoIdListCount(favoriteDTO.getEmail(), favoriteDTO.getDocument());
        // mongoId 가져오기
        List<String> mongoId = (List<String>)mongoIdListCount.get("mongoId");
        long count = (long)mongoIdListCount.get("count");

        // mongoDB 중 wineList 가져오기
        if(favoriteDTO.getDocument() == 0){
            List<WineEntity> mongoWineList = favoriteService.getMongoWineList(mongoId, favoriteDTO.getPage());
            System.out.println("몽고리스트 : "+mongoWineList);
            result.put("wineList",mongoWineList);
            result.put("type","mongo");

        } else {
            List<SellWineSqlEntity> mongoSellWineList = favoriteService.getMongoSellWineList(mongoId, favoriteDTO.getPage());
            System.out.println("샐리스트 : "+mongoSellWineList);
            result.put("wineList",mongoSellWineList);
            result.put("type","sell");
        }
        result.put("totalPage",count);

        return result;
    }

}
