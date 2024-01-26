package com.uwa.uswine.mypage.sellerRigist;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SellerRegistService {

    private final SellerRegistRepository sellerRegistRepository;

    public int requestSeller(SellerRegistEntity sellerRegistEntity) {
        try{
            sellerRegistRepository.save(sellerRegistEntity);
            return 1;
        } catch (Exception e) {
            return -1;
        }
    }
}
