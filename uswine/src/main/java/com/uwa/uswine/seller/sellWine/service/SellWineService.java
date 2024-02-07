package com.uwa.uswine.seller.sellWine.service;

import com.uwa.uswine.seller.sellWine.entity.SellWineEntity;
import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import com.uwa.uswine.seller.sellWine.repository.SellWineRepository;
import com.uwa.uswine.seller.sellWine.repository.SellWineSQLRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class SellWineService {
    private final SellWineRepository sellWineRepository;
    private final SellWineSQLRepository sellWineSQLRepository;

    public Mono<String> sellwine(SellWineEntity sellWineEntity) {
       return sellWineRepository.save(sellWineEntity).map(savedEntity -> savedEntity.getId().toString()).onErrorReturn("Error");
    }

    public int sellwineId(SellWineSqlEntity sellWineSqlEntity) {
        try {
            sellWineSQLRepository.save(sellWineSqlEntity);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    public SellWineEntity getWine(String id) {
        return sellWineRepository.findById(id).block();
    }
}