package com.uwa.uswine.main.onsale.repository;

import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import jakarta.persistence.Tuple;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OnSaleWineSqlRepository extends JpaRepository<SellWineSqlEntity,Long> {
    Page<SellWineSqlEntity> findByWineNameContainingAndStockGreaterThan(String search,String stock,Pageable pageable);
    SellWineSqlEntity findEmailByNickname(String nickname);
    SellWineSqlEntity findByMongoId(String id);
    List<SellWineSqlEntity> findByEmailAndSelldateBetween(String email, Date startDate, Date endDate);

    @Query("SELECT SUM(CAST(w.stock AS INTEGER)) FROM SellWineSqlEntity w WHERE w.email = :email")
    Long getStockSum(@Param("email") String email);

    Long countAllByEmail(String email);
}
