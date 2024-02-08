package com.uwa.uswine.adminseller.repository;


import com.uwa.uswine.seller.sellWine.entity.SellWineEntity;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface MNWSellWineSqlMongoRepository extends ReactiveMongoRepository<SellWineEntity, Object> {
}
