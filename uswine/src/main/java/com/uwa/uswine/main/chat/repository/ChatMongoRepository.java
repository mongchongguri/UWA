package com.uwa.uswine.main.chat.repository;

import com.uwa.uswine.main.chat.entity.ChatEntity;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface ChatMongoRepository extends ReactiveMongoRepository<ChatEntity,Object> {
    Flux<ChatEntity> findByRoom(String room);

}
