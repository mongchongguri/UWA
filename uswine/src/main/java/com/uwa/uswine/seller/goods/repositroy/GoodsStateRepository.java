package com.uwa.uswine.seller.goods.repositroy;

import com.uwa.uswine.seller.goods.entity.GoodsStateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoodsStateRepository extends JpaRepository<GoodsStateEntity,Long> {
    GoodsStateEntity findById(long id);
}
