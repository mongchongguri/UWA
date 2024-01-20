package com.uwa.uswine.main;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WineListService {
    private final WineListRepository wineListRepository;

    public List<WineEntity> getList(int page) {
        return this.wineListRepository.findBy(PageRequest.of(page,20)).collectList().block();
    }

    public long getTotal() {
        return this.wineListRepository.count().block();
    }
}
