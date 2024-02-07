package com.uwa.uswine.main.wine.service;

import org.springframework.stereotype.Service;

import com.uwa.uswine.main.wine.entity.WineEntity;
import com.uwa.uswine.main.wine.repository.WineListRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WineDetailService {
    private final WineListRepository wineListRepository;

    public WineEntity getWineOne(String id) {
        return this.wineListRepository.findById(id).block();
    }
}
