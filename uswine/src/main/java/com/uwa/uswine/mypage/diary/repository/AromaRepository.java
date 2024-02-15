package com.uwa.uswine.mypage.diary.repository;

import com.uwa.uswine.mypage.diary.entity.AromaEntity;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface AromaRepository extends ReactiveMongoRepository<AromaEntity, Object> {

//    List<AromaEntity> findAllByAroma(int rank);
    Mono<AromaEntity> findByRank(String rank);
}
