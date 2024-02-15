package com.uwa.uswine.seller.sellWine.repository;

import com.uwa.uswine.seller.sellWine.entity.SellWineEntity;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Repository
public interface SellWineRepository extends ReactiveMongoRepository<SellWineEntity,Object> {
    Mono<SellWineEntity> findById(String id);
    Flux<SellWineEntity> findAllById(List<String> mongoId);
}
