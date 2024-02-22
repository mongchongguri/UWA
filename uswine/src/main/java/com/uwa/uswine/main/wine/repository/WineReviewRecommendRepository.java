package com.uwa.uswine.main.wine.repository;

import com.uwa.uswine.main.wine.entity.WineReviewRecommendEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WineReviewRecommendRepository extends JpaRepository<WineReviewRecommendEntity, Object> {
    int countByWineReviewIdx(String wineReviewIdx);

    Optional<WineReviewRecommendEntity> findByEmailAndWineReviewIdx(String email, String wineReviewIdx);
}
