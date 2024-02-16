package com.uwa.uswine.main.onsale.service;

import com.uwa.uswine.main.onsale.repository.OnSaleWineMongoRepository;
import com.uwa.uswine.main.onsale.repository.OnSaleWineSqlRepository;
import com.uwa.uswine.seller.InfoWine.entity.InfoWineSellEntity;
import com.uwa.uswine.seller.InfoWine.repository.InfoWineRepository;
import com.uwa.uswine.seller.sellWine.entity.SellWineEntity;
import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import jakarta.persistence.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OnSaleWineService {
    private final OnSaleWineMongoRepository onSaleWineMongoRepository;
    private final OnSaleWineSqlRepository onSaleWineSqlRepository;

    private final InfoWineRepository infoWineRepository;

    public Page<SellWineSqlEntity> findSearch(String search) {
        return this.onSaleWineSqlRepository.findByWineNameContainingAndStockGreaterThan(search,"0",PageRequest.of(0,20));
    }

    public SellWineEntity findWine(String id) {
        return this.onSaleWineMongoRepository.findById(id).block();
    }
    public String findStock(String id) {
        return this.onSaleWineSqlRepository.findByMongoId(id).getStock();
    }

    public SellWineSqlEntity findEmail(String nickname) {
        return this.onSaleWineSqlRepository.findEmailByNickname(nickname);
    }

    public InfoWineSellEntity findInfoEmail(String nickname) {
        return this.infoWineRepository.findByNickname(nickname);
    }
}
