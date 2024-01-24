package com.uwa.uswine.main.wineDetails;

import org.springframework.stereotype.Service;

import com.uwa.uswine.main.wine.WineEntity;
import com.uwa.uswine.main.wine.WineListRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WineDetailService {
    private final WineListRepository wineListRepository;

    public WineEntity getWineOne(String id) {
        return this.wineListRepository.findById(id).block();
    }
}
