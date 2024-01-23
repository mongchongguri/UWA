package com.uwa.uswine.wineDetails;

import com.uwa.uswine.main.WineEntity;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface WineDetailRepository extends ReactiveMongoRepository<WineEntity, String> {
    Mono<WineEntity> findById(String id);
}

