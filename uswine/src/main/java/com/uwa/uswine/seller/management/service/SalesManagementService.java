package com.uwa.uswine.seller.management.service;

import com.uwa.uswine.seller.management.entity.SellerEntity;
import com.uwa.uswine.seller.management.repository.SalesManagementSellerRepository;
import com.uwa.uswine.seller.management.repository.SalesManagementSqlRepository;
import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import com.uwa.uswine.user.repository.UserRepository;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SalesManagementService {
    private final SalesManagementSqlRepository salesManagementSqlRepository;
    private final SalesManagementSellerRepository salesManagementSellerRepository;

    public Page<SellWineSqlEntity> findWine(String email) {
        return salesManagementSqlRepository.findByEmail(email, PageRequest.of(0,20));
    }

    public SellerEntity findinfo(String email) {
        return salesManagementSellerRepository.findByEmail(email);
    }


}
