package com.uwa.uswine.main;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.util.List;

@Repository
public interface WineListRepository extends ReactiveMongoRepository<WineEntity,Object> {
    @Override
    Flux<WineEntity> findAll();
    Flux<WineEntity> findBy(Pageable pageable);
}
