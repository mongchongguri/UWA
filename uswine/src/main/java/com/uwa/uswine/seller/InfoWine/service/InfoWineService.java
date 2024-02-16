package com.uwa.uswine.seller.InfoWine.service;

import com.uwa.uswine.seller.InfoWine.entity.InfoWineSellEntity;
import com.uwa.uswine.seller.InfoWine.repository.InfoWineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InfoWineService {
    private final InfoWineRepository infoWineRepository;

    public int save(InfoWineSellEntity infoWineSellEntity) {
        try {
            infoWineRepository.save(infoWineSellEntity);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    public List<InfoWineSellEntity> getStore(String id) {
        return this.infoWineRepository.findByItemIdAndSellStockGreaterThan(id,"0");
    }
}
