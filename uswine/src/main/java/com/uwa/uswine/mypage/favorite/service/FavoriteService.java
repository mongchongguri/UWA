package com.uwa.uswine.mypage.favorite.service;

import com.uwa.uswine.main.onsale.repository.OnSaleWineSqlRepository;
import com.uwa.uswine.main.wine.entity.WineEntity;
import com.uwa.uswine.main.wine.repository.WineDetailRepository;
import com.uwa.uswine.main.wine.repository.WineListRepository;
import com.uwa.uswine.mypage.favorite.entity.FavoriteEntity;
import com.uwa.uswine.mypage.favorite.repository.FavoriteRepository;
import com.uwa.uswine.seller.InfoWine.repository.InfoWineRepository;
import com.uwa.uswine.seller.sellWine.entity.SellWineEntity;
import com.uwa.uswine.seller.sellWine.repository.SellWineRepository;
import com.uwa.uswine.seller.sellWine.repository.SellWineSQLRepository;
import lombok.RequiredArgsConstructor;
import org.reactivestreams.Publisher;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final SellWineRepository sellWineRepository;
    private final WineListRepository wineListRepository;

    public int addFavorite(FavoriteEntity favorite){
        try {
            favoriteRepository.save(favorite);
            return 1;
        }catch (Exception e){
            return -1;
        }
    }

    public int delFavorite(FavoriteEntity favorite){
        try {
            favoriteRepository.delete(favorite);
            return 1;
        }catch (Exception e){
            return -1;
        }
    }

    public Map<String,List<String>> getMongoId (String email){
        Map<String, List<String>> map = new HashMap<>();

        // uwa에서 동록한 와인
        int document = 0;

        // 즐겨찾기 된 uwa와인 리스트 불러오기
        List<FavoriteEntity> favoriteEntities1 = favoriteRepository.findAllByEmailAndDocument(email, document);

        // 즐겨찾기에 저장된 wineListMongoId 가져오기
        List<String> wineListMongoId = favoriteEntities1.stream()
                .map(FavoriteEntity::getMongoId)
                .collect(Collectors.toList());

        map.put("wineListMongoId", wineListMongoId);

        // 판매자 와인
        document = 1;

        // 즐겨찾기 된 uwa 와인 리스트 불러오기
        List<FavoriteEntity> favoriteEntities2 = favoriteRepository.findAllByEmailAndDocument(email,document);

        // 즐겨찾기에 저장된 sellWineListMongoId 가져오기
        List<String> sellWineListMongoId = favoriteEntities2.stream()
                .map(FavoriteEntity::getMongoId)
                .collect(Collectors.toList());

        map.put("sellWineListMongoId", sellWineListMongoId);

        return map;
    }

    public List<WineEntity> getMongoWineList(List<String> mongoId){

        List<WineEntity> wineEntities = wineListRepository.findById(mongoId).collectList().block();

        return wineEntities;
    }

    public List<SellWineEntity> getMongoSellWineList(List<String> mongoId){
        List<SellWineEntity> sellWineEntities = sellWineRepository.findAllById(mongoId).collectList().block();

        return sellWineEntities;
    }


}
