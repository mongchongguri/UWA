package com.uwa.uswine.main.chat.repository;

import com.uwa.uswine.main.chat.entity.ChattingRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChattingRoomRepository extends JpaRepository<ChattingRoomEntity,Long> {
    List<ChattingRoomEntity> findByUserEmailOrSellerEmail(String email1,String email2);
    List<ChattingRoomEntity> findBySellerEmail(String email1);
    ChattingRoomEntity findBySellItemIdAndAndSellerEmailAndUserEmail(String item,String sellerEmail,String userEmail);
    ChattingRoomEntity findById(long room);
}
