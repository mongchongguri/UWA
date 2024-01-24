package com.uwa.uswine.main.wine;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface WineListRepository extends ReactiveMongoRepository<WineEntity,Object> {

    Flux<WineEntity> findBy(Pageable pageable);
    Mono<Long> count();
    // Mono is total Page
    @Query("{'$and': [{'$or': [{'wine_name': {$regex: ?0, $options: 'i', $exists: true}}, {'wine_name': {$exists: false}}, {'wine_name_en': {$regex: ?0, $options: 'i', $exists: true}},{'wine_name_en': {$exists: false}}]},{'$or': [{'wine_aroma': {$in: ?1, $exists: true}}, {'wine_aroma': {$exists: false}}]},{'$or': [{'wine_info.0': {$in: ?2, $exists: true}}, {'wine_info': {$exists: false}}]}]}")
    Flux<WineEntity> findByWine(String wineName, List<Object> wineAromaList, List<Object> wineKind, Pageable pageable);
    @Aggregation(pipeline = {
            "{'$match': {'$and': [{'$or': [{'wine_name': {$regex: ?0, $options: 'i', $exists: true}}, {'wine_name': {$exists: false}}, {'wine_name_en': {$regex: ?0, $options: 'i', $exists: true}},{'wine_name_en': {$exists: false}}]},{'$or': [{'wine_aroma': {$in: ?1, $exists: true}}, {'wine_aroma': {$exists: false}}]},{'$or': [{'wine_info.0': {$in: ?2, $exists: true}}, {'wine_info': {$exists: false}}]}]}}",
            "{'$count': 'count'}"
    })
    Mono<Long> countByWine(String wineName, List<Object> wineAromaList, List<Object> wineKind);

    // name이 존재하거나 없는경우
    @Query("{'$or': [{'wine_name': {$regex: ?0, $options: 'i', $exists: true}}, {'wine_name': {$exists: false}}, {'wine_name_en': {$regex: ?0, $options: 'i', $exists: true}},{'wine_name_en': {$exists: false}}]}")
    Flux<WineEntity> findByWineName(String wineName, List<Object> wineAromaList, List<Object> wineKind, Pageable pageable);
    @Aggregation(pipeline = {
            "{'$match': {'$or': [{'wine_name': {$regex: ?0, $options: 'i', $exists: true}}, {'wine_name': {$exists: false}}, {'wine_name_en': {$regex: ?0, $options: 'i', $exists: true}},{'wine_name_en': {$exists: false}}]}}",
            "{'$count': 'count'}"
    })
    Mono<Long> countByWineName(String wineName, List<Object> wineAromaList, List<Object> wineKind);

    //name 혹은 aroma만 존재할경우
    @Query("{'$and': [{'$or': [{'wine_name': {$regex: ?0, $options: 'i', $exists: true}}, {'wine_name': {$exists: false}}, {'wine_name_en': {$regex: ?0, $options: 'i', $exists: true}},{'wine_name_en': {$exists: false}}]},{'$or': [{'wine_aroma': {$in: ?1, $exists: true}}, {'wine_aroma': {$exists: false}}]}]}")
    Flux<WineEntity> findByWineNameAroma(String wineName, List<Object> wineAromaList, List<Object> wineKind, Pageable pageable);
    @Aggregation(pipeline = {
            "{'$match': {'$and': [{'$or': [{'wine_name': {$regex: ?0, $options: 'i', $exists: true}}, {'wine_name': {$exists: false}}, {'wine_name_en': {$regex: ?0, $options: 'i', $exists: true}},{'wine_name_en': {$exists: false}}]},{'$or': [{'wine_aroma': {$in: ?1, $exists: true}}, {'wine_aroma': {$exists: false}}]}]}}",
            "{'$count': 'count'}"
    })
    Mono<Long> countByWineNameAroma(String wineName, List<Object> wineAromaList, List<Object> wineKind);

    // name 혹은 wine_info만 존재할 경우
    @Query("{'$and': [{'$or': [{'wine_name': {$regex: ?0, $options: 'i', $exists: true}}, {'wine_name': {$exists: false}}, {'wine_name_en': {$regex: ?0, $options: 'i', $exists: true}},{'wine_name_en': {$exists: false}}]},{'$or': [{'wine_info.0': {$in: ?2, $exists: true}}, {'wine_info': {$exists: false}}]}]}")
    Flux<WineEntity> findByWineNameWineInfo(String wineName, List<Object> wineAromaList, List<Object> wineKind, Pageable pageable);
    @Aggregation(pipeline = {
            "{'$match': {'$and': [{'$or': [{'wine_name': {$regex: ?0, $options: 'i', $exists: true}}, {'wine_name': {$exists: false}}, {'wine_name_en': {$regex: ?0, $options: 'i', $exists: true}},{'wine_name_en': {$exists: false}}]},{'$or': [{'wine_info.0': {$in: ?2, $exists: true}}, {'wine_info': {$exists: false}}]}]}}",
            "{'$count': 'count'}"
    })
    Mono<Long> countByWineNameWineInfo(String wineName, List<Object> wineAromaList, List<Object> wineKind);
}
