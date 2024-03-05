package com.uwa.uswine.adminchart.repository;

import com.uwa.uswine.main.wine.entity.WineEntity;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface WineInfoMongoRepository extends ReactiveMongoRepository<WineEntity, Object> {
}
