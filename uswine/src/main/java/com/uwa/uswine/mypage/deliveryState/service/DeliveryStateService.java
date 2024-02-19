package com.uwa.uswine.mypage.deliveryState.service;

import com.uwa.uswine.main.onsale.repository.OnSaleWineMongoRepository;
import com.uwa.uswine.main.wine.entity.WineEntity;
import com.uwa.uswine.main.wine.repository.WineListRepository;
import com.uwa.uswine.mypage.cart.entity.WineTransactionEntity;
import com.uwa.uswine.mypage.cart.repository.WineTransactionRepository;
import com.uwa.uswine.mypage.deliveryState.dto.DeliveryStateDTO;
import com.uwa.uswine.seller.sellWine.entity.SellWineEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class DeliveryStateService {
    private final WineTransactionRepository wineTransactionRepository;
    private final WineListRepository wineListRepository;
    private final OnSaleWineMongoRepository onSaleWineMongoRepository;

    public Map<String,Object> deliveryList(String email) {
        List<Object> list = this.wineTransactionRepository.findGoodsAndWineEntitiesByUserEmail(email);
        List<Object> wineInfo = new ArrayList<>();
        for(Object obj : list) {
            if(obj instanceof Object[]) {
                Object[] array = (Object[]) obj;
                for(Object element : array) {
                    if(element instanceof WineTransactionEntity) {
                        List<String> wine = new ArrayList<>();
                        WineTransactionEntity wineTransactionEntity = (WineTransactionEntity) element;
                        if(wineTransactionEntity.getDocument() == 0) {
                            WineEntity wineEntity = this.wineListRepository.findById(wineTransactionEntity.getWineId()).block();
                            String wineImage = wineEntity.getWine_image();
                            String wineNameEn = wineEntity.getWine_name_en();
                            wine.add(wineImage);
                            wine.add(wineNameEn);
                        } else if(wineTransactionEntity.getDocument() == 1) {
                            SellWineEntity sellWineEntity = this.onSaleWineMongoRepository.findById(wineTransactionEntity.getWineId()).block();
                            String wineImage = sellWineEntity.getWineImageURL();
                            String wineNameEn = sellWineEntity.getWineNameEn();
                            wine.add(wineImage);
                            wine.add(wineNameEn);
                        }
                        wineInfo.add(wine);
                    }
                }
            }
        }
        Map<String,Object> deliveryList = new HashMap<>();
        deliveryList.put("delivery",list);
        deliveryList.put("wineInfo",wineInfo);
        return deliveryList;
    }
}
