package com.uwa.uswine.wine.wineDetails;

import org.springframework.stereotype.Service;

import com.uwa.uswine.wine.main.WineEntity;
import com.uwa.uswine.wine.main.WineListRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WineDetailService {
    private final WineListRepository wineListRepository;

    public WineEntity getWineOne(String id) {
        return this.wineListRepository.findById(id).block();
    }
}
