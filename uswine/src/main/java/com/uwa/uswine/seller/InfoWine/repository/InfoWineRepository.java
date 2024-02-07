package com.uwa.uswine.seller.InfoWine.repository;

import com.uwa.uswine.seller.InfoWine.entity.InfoWineSellEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InfoWineRepository extends JpaRepository<InfoWineSellEntity,Long> {
    List<InfoWineSellEntity> findByItemId(String id);
}
