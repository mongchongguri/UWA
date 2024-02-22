package com.uwa.uswine.main.wine.service;

import com.uwa.uswine.main.wine.dto.WineReviewDTO;
import com.uwa.uswine.main.wine.dto.WineReviewRecommendDTO;
import com.uwa.uswine.main.wine.entity.WineReviewEntity;
import com.uwa.uswine.main.wine.entity.WineReviewRecommendEntity;
import com.uwa.uswine.main.wine.repository.WineReviewRecommendRepository;
import com.uwa.uswine.main.wine.repository.WineReviewRepository;
import org.springframework.stereotype.Service;

import com.uwa.uswine.main.wine.entity.WineEntity;
import com.uwa.uswine.main.wine.repository.WineListRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WineDetailService {
    private final WineListRepository wineListRepository;
    private final WineReviewRepository wineReviewRepository;
    private final WineReviewRecommendRepository wineReviewRecommendRepository;

    public WineEntity getWineOne(String id) {
        return this.wineListRepository.findById(id).block();
    }

    // 리뷰 list 불러오기
    public List<WineReviewEntity> getWineReviewList(String mongoId) {
        return this.wineReviewRepository.findAllByMongoId(mongoId);
    }

    // 리뷰 수정/등록
    public int saveWineReview(WineReviewEntity wineReviewEntity){
        System.out.println("저장 서비스");
        try {
            System.out.println(".성공");
            wineReviewRepository.save(wineReviewEntity);
            return 1;
        }catch (Exception e){
            return -1;
        }
    }

    // 리뷰 삭제
    public int deleteWineReview(WineReviewDTO wineReviewDTO){
        Optional<WineReviewEntity> wineReviewEntity = wineReviewRepository.findById(wineReviewDTO.getId());
        wineReviewEntity.ifPresent(wineReviewRepository::delete);
        return wineReviewEntity.isPresent() ? 1:0;
    }

    // 리뷰 추천 가져오기
    public int countWineReviewRecommend(String wineReviewIdx){
        return wineReviewRecommendRepository.countByWineReviewIdx(wineReviewIdx);
    }

    // 리뷰 추천하기
    public int saveWineReviewRecommend(WineReviewRecommendDTO wineReviewRecommendDTO){
        Optional<WineReviewRecommendEntity> wineReviewRecommendEntity = wineReviewRecommendRepository.findByEmailAndWineReviewIdx(wineReviewRecommendDTO.getEmail(), wineReviewRecommendDTO.getWineReviewIdx());
        if (wineReviewRecommendEntity.isPresent()) {
            // 값이 이미 존재할 때의 처리
            return 0;
        } else {
            // 값이 없을 때의 처리 및 저장
            wineReviewRecommendRepository.save(wineReviewRecommendDTO.toEntity());
            return 1; // 또는 다른 결과 코드
        }
    }

    // 리뷰 추천 취소
    public int deleteWineReviewRecommend(WineReviewRecommendDTO wineReviewRecommendDTO){
        Optional<WineReviewRecommendEntity> wineReviewRecommendEntity = wineReviewRecommendRepository.findByEmailAndWineReviewIdx(wineReviewRecommendDTO.getEmail(), wineReviewRecommendDTO.getWineReviewIdx());
        wineReviewRecommendEntity.ifPresent(wineReviewRecommendRepository::delete);
        return wineReviewRecommendEntity.isPresent()?1:0;
    }

    // 리뷰 추천 여부 확인
    public int findWineReviewRecommend(WineReviewRecommendDTO wineReviewRecommendDTO){
        Optional<WineReviewRecommendEntity> wineReviewRecommendEntity = wineReviewRecommendRepository.findByEmailAndWineReviewIdx(wineReviewRecommendDTO.getEmail(), wineReviewRecommendDTO.getWineReviewIdx());
        return wineReviewRecommendEntity.isPresent()?1:0;
    }
}
