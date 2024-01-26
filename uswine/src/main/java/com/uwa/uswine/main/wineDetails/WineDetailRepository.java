package com.uwa.uswine.main.wineDetails;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import com.uwa.uswine.main.wine.WineEntity;

import reactor.core.publisher.Mono;

@Repository
public interface WineDetailRepository extends ReactiveMongoRepository<WineEntity, String> {
    Mono<WineEntity> findById(String id);
}

