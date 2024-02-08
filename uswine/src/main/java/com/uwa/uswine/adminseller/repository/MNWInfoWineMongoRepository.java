package com.uwa.uswine.adminseller.repository;


import com.uwa.uswine.main.wine.entity.WineEntity;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;


public interface MNWInfoWineMongoRepository extends ReactiveMongoRepository<WineEntity, Object> {


//    List<WineEntity> findByWine_nameIgnoreCase(String wineKeyword);
}

