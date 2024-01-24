package com.uwa.uswine.wine.main;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WineListService {
    private final WineListRepository wineListRepository;

    public List<WineEntity> findAll(SearchWineDTO wineDTO) {
        return this.wineListRepository.findBy(PageRequest.of(wineDTO.getPage(),20)).collectList().block();
    };
    public long countAll() {
        return this.wineListRepository.count().block();
    }
    public List<WineEntity> findWine(SearchWineDTO wineDTO) {
        return this.wineListRepository.findByWine(wineDTO.getSearchWine(),wineDTO.getTagWineAroma(),wineDTO.getTagWine(),PageRequest.of(wineDTO.getPage(),20)).collectList().block();
    }
    public long pageWine(SearchWineDTO wineDTO) {
        return this.wineListRepository.countByWine(wineDTO.getSearchWine(),wineDTO.getTagWineAroma(),wineDTO.getTagWine()).block();
    }
    public List<WineEntity> findWineName(SearchWineDTO wineDTO) {
        return this.wineListRepository.findByWineName(wineDTO.getSearchWine(),wineDTO.getTagWineAroma(),wineDTO.getTagWine(),PageRequest.of(wineDTO.getPage(),20)).collectList().block();
    }
    public long pageWineName(SearchWineDTO wineDTO) {
        return this.wineListRepository.countByWineName(wineDTO.getSearchWine(),wineDTO.getTagWineAroma(),wineDTO.getTagWine()).block();
    }
    public List<WineEntity> findWineNameAroma(SearchWineDTO wineDTO){
        return this.wineListRepository.findByWineNameAroma(wineDTO.getSearchWine(),wineDTO.getTagWineAroma(),wineDTO.getTagWine(),PageRequest.of(wineDTO.getPage(),20)).collectList().block();
    }
    public long pageWineNameAroma(SearchWineDTO wineDTO) {
        return this.wineListRepository.countByWineNameAroma(wineDTO.getSearchWine(),wineDTO.getTagWineAroma(),wineDTO.getTagWine()).block();
    }
    public List<WineEntity> findWineNameWineInfo(SearchWineDTO wineDTO) {
        return this.wineListRepository.findByWineNameWineInfo(wineDTO.getSearchWine(),wineDTO.getTagWineAroma(),wineDTO.getTagWine(),PageRequest.of(wineDTO.getPage(),20)).collectList().block();
    }
    public long pageWineNameWineInfo(SearchWineDTO wineDTO) {
        return this.wineListRepository.countByWineNameWineInfo(wineDTO.getSearchWine(),wineDTO.getTagWineAroma(),wineDTO.getTagWine()).block();
    }
}
