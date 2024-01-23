package com.uwa.uswine.wineDetails;

import com.uwa.uswine.main.WineEntity;
import com.uwa.uswine.main.WineListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WineDetailService {
    private final WineListRepository wineListRepository;

    public WineEntity getWineOne(String id) {
        return this.wineListRepository.findById(id).block();
    }
}
