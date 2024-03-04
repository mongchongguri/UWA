package com.uwa.uswine.main.wine.repository;

import com.uwa.uswine.main.wine.entity.WineReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.nio.channels.MembershipKey;
import java.util.List;

@Repository
public interface WineReviewRepository extends JpaRepository<WineReviewEntity, Object> {

    List<WineReviewEntity> findAllByMongoId(String mongoId);
}
