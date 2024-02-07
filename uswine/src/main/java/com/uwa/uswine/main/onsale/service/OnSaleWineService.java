package com.uwa.uswine.main.onsale.service;

import com.uwa.uswine.main.onsale.repository.OnSaleWineMongoRepository;
import com.uwa.uswine.main.onsale.repository.OnSaleWineSqlRepository;
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


    public Page<SellWineSqlEntity> findAll() {
        return this.onSaleWineSqlRepository.findBy(PageRequest.of(0,20));
    }

    public SellWineEntity findWine(String id) {
        return this.onSaleWineMongoRepository.findById(id).block();
    }

    public SellWineSqlEntity findEmail(String nickname) {
        return this.onSaleWineSqlRepository.findEmailByNickname(nickname);
    }
}
