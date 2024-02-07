package com.uwa.uswine.main.onsale.repository;

import com.uwa.uswine.seller.sellWine.entity.SellWineEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface OnSaleWineMongoRepository extends ReactiveMongoRepository<SellWineEntity,Object> {
    Mono<SellWineEntity> findById(String id);
}
