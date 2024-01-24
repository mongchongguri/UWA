package com.uwa.uswine.wine.wineDetails;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import com.uwa.uswine.wine.main.WineEntity;

import reactor.core.publisher.Mono;

@Repository
public interface WineDetailRepository extends ReactiveMongoRepository<WineEntity, String> {
    Mono<WineEntity> findById(String id);
}

