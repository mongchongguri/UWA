package com.uwa.uswine.main.wine.controller;

import java.util.List;
import java.util.Map;

import com.uwa.uswine.main.wine.dto.WineReviewDTO;
import com.uwa.uswine.main.wine.dto.WineReviewRecommendDTO;
import com.uwa.uswine.main.wine.entity.WineReviewEntity;
import com.uwa.uswine.main.wine.service.WineDetailService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uwa.uswine.main.wine.entity.WineEntity;

import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/wine")
public class WineDetailController {
    private final WineDetailService wineDetailService;
    @PostMapping("idx")
    public WineEntity wineIdx(@RequestBody Map<String,String> wineId) {
        return this.wineDetailService.getWineOne(wineId.get("Id"));
    }


    // 와인 리뷰 가져오기
    @PostMapping("getWineReview")
    public List<WineReviewEntity> getWineReview(@RequestBody Map<String, String> wineId){
        return this.wineDetailService.getWineReviewList(wineId.get("mongoId"));
    }

    // 와인 리뷰 등록하기
    @PostMapping("saveWineReview")
    public int saveWineReview(@RequestBody WineReviewDTO wineReviewDTO){
        return wineDetailService.saveWineReview(wineReviewDTO.toEntity());
    }

    // 와인 리뷰 삭제하기
    @PostMapping("deleteWineReview")
    public int deleteWineReview(@RequestBody WineReviewDTO wineReviewDTO){
        WineReviewRecommendDTO wineReviewRecommendDTO = new WineReviewRecommendDTO();
        wineReviewRecommendDTO.setWineReviewIdx(String.valueOf(wineReviewDTO.getId()));
        wineDetailService.deleteWineReviewRecommend(wineReviewRecommendDTO);
        return this.wineDetailService.deleteWineReview(wineReviewDTO);
    }

    // 리뷰 추천 가져오기
    @PostMapping("countWineReviewRecommend")
    public int countWineReviewRecommend(@RequestBody WineReviewRecommendDTO wineReviewRecommendDTO){
        return this.wineDetailService.countWineReviewRecommend(wineReviewRecommendDTO.getWineReviewIdx());
    }

    // 리뷰 추천 하기
    @PostMapping("saveWineReviewRecommend")
    public int saveWineReviewRecommend(@RequestBody WineReviewRecommendDTO wineReviewRecommendDTO){
        return this.wineDetailService.saveWineReviewRecommend(wineReviewRecommendDTO);
    }

    // 리뷰 추천 취소
    @PostMapping("deleteWineReviewRecommend")
    public int deleteWineReviewRecommend (@RequestBody WineReviewRecommendDTO wineReviewRecommendDTO){
        return this.wineDetailService.deleteWineReviewRecommend(wineReviewRecommendDTO);
    }

    // 리뷰 추천 여부
    @PostMapping("findWineReviewRecommend")
    public int fineWineReviewRecommend (@RequestBody WineReviewRecommendDTO wineReviewRecommendDTO){
        return this.wineDetailService.findWineReviewRecommend(wineReviewRecommendDTO);
    }
}
