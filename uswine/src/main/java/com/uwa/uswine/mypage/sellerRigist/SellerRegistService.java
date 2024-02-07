package com.uwa.uswine.mypage.sellerRigist.service;

import com.uwa.uswine.mypage.sellerRigist.entity.SellerRegistEntity;
import com.uwa.uswine.mypage.sellerRigist.repository.SellerRegistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SellerRegistService {

    private final SellerRegistRepository sellerRegistRepository;

    public int requestSeller(SellerRegistEntity sellerRegistEntity) {
        try{
            sellerRegistRepository.save(sellerRegistEntity);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }
}
