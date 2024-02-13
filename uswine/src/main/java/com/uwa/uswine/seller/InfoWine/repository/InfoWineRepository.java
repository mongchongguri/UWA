package com.uwa.uswine.seller.InfoWine.repository;

import com.uwa.uswine.seller.InfoWine.entity.InfoWineSellEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InfoWineRepository extends JpaRepository<InfoWineSellEntity,Long> {
    List<InfoWineSellEntity> findByItemId(String id);
    InfoWineSellEntity findByItemIdAndEmail(String id,String email);
    InfoWineSellEntity findByNickname(String nickname);
    InfoWineSellEntity findById(long id);

    Page<InfoWineSellEntity> findByEmailAndSellStockGreaterThan(String email, String stock, Pageable pageable);
    Page<InfoWineSellEntity> findByEmailAndSellStock(String email,String stock, Pageable pageable);
}
