package com.uwa.uswine.mypage.favorite.service;

import com.uwa.uswine.main.wine.entity.WineEntity;
import com.uwa.uswine.main.wine.repository.WineListRepository;
import com.uwa.uswine.mypage.favorite.entity.FavoriteEntity;
import com.uwa.uswine.mypage.favorite.repository.FavoriteRepository;
import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import com.uwa.uswine.seller.sellWine.repository.SellWineSQLRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final SellWineSQLRepository sellWineSQLRepository;
    private final WineListRepository wineListRepository;

    public int addFavorite(FavoriteEntity favorite){
        try {
            favoriteRepository.save(favorite);
            return 1;
        }catch (Exception e){
            return 0;
        }
    }

    public int delFavorite(String email, String mongoId){
        FavoriteEntity favorite = favoriteRepository.findByEmailAndMongoId(email,mongoId);
        if (favorite != null) {
            favoriteRepository.delete(favorite);
            return 1;
        } else {
            return -1;
        }
    }
    public Boolean getFavorite(String email, String mongoId){
        try{
            FavoriteEntity byEmailAndMongoId = favoriteRepository.findByEmailAndMongoId(email, mongoId);
            if(byEmailAndMongoId != null){

            return true;
            }else {
                return false;
            }
        }catch (Exception e){
            return false;
        }
    }

    public Map<String, Object> getMongoIdListCount (String email, int document){
        Map<String, Object> map = new HashMap<>();

        // 즐겨찾기 된 와인 리스트 불러오기
        List<FavoriteEntity> favoriteEntities = favoriteRepository.findAllByEmailAndDocument(email, document);

        // 즐겨찾기에 저장된 wineListMongoId 가져오기
        List<String> mongoId = favoriteEntities.stream()
                .map(FavoriteEntity::getMongoId)
                .collect(Collectors.toList());

        // 즐겨찾기 된 와인 개수
        long count = favoriteRepository.countByEmailAndDocument(email, document);

        map.put("mongoId", mongoId);
        map.put("count", count);

        return map;
    }

    public List<WineEntity> getMongoWineList(List<String> mongoId, int page){

        Map<String, Object> map = new HashMap<>();
        List<WineEntity> wineEntities = wineListRepository.findById(mongoId, PageRequest.of(page,8)).collectList().block();

        return wineEntities;
    }

    public List<SellWineSqlEntity> getMongoSellWineList(List<String> mongoId, int page){
        List<SellWineSqlEntity> sellWineSqlEntities = sellWineSQLRepository.findByMongoIdIn(mongoId, PageRequest.of(page,8));
        return sellWineSqlEntities;
    }

}
