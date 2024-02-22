package com.uwa.uswine.mypage.cart.repository;

import com.uwa.uswine.mypage.cart.entity.WineTransactionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Repository
public interface WineTransactionRepository extends JpaRepository<WineTransactionEntity,Long> {

    WineTransactionEntity findByTimestamp(Date timestamp);
    Page<WineTransactionEntity> findBySelleremail(String email, Pageable pageable);
    Page<WineTransactionEntity> findByUseremail(String email, Pageable pageable);
    List<WineTransactionEntity> findByUseremail(String email);
    Page<WineTransactionEntity> findBySelleremailOrderByTimestampDesc(String email, Pageable pageable);

    @Query("SELECT g, w " +
            "FROM GoodsStateEntity g JOIN WineTransactionEntity w " +
            "ON g.transactionId = w.id " +
            "WHERE w.useremail = :useremail")
    Page<Object> findGoodsStateEntityByUseremail(@Param("useremail") String useremail, Pageable pageable);

    @Query("SELECT g, w " +
            "FROM GoodsStateEntity g JOIN WineTransactionEntity w " +
            "ON g.transactionId = w.id " +
            "WHERE w.selleremail = :sellerEmail AND g.delivery = :delivery")
    Page<Object> findGoodsAndWineEntitiesBySellerEmailAndDelivery(String sellerEmail, int delivery,Pageable pageable);

     @Query("SELECT g, w " +
            "FROM GoodsStateEntity g JOIN WineTransactionEntity w " +
            "ON g.transactionId = w.id " +
            "WHERE g.delivery = 2")
    Page<Object> findByDeliver(Pageable pageable);
    
    @Query("SELECT g, w " +
            "FROM GoodsStateEntity g JOIN WineTransactionEntity w " +
            "ON g.transactionId = w.id " +
            "WHERE w.useremail = :userEmail AND g.delivery <= 3")
    List<Object> findGoodsAndWineEntitiesByUserEmail(String userEmail);

    List<WineTransactionEntity> findBySelleremailAndTimestampBetween(String email,Date startDate,Date endDate);

}
