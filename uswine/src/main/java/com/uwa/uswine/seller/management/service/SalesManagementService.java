package com.uwa.uswine.seller.management.service;

import com.uwa.uswine.main.wine.repository.WineListRepository;
import com.uwa.uswine.mypage.cart.entity.WineTransactionEntity;
import com.uwa.uswine.mypage.cart.repository.WineTransactionRepository;
import com.uwa.uswine.seller.InfoWine.entity.InfoWineSellEntity;
import com.uwa.uswine.seller.InfoWine.repository.InfoWineRepository;
import com.uwa.uswine.seller.management.dto.ReSaleStockDTO;
import com.uwa.uswine.seller.management.entity.SellerEntity;
import com.uwa.uswine.seller.management.repository.SalesManagementSellerRepository;
import com.uwa.uswine.seller.management.repository.SalesManagementSqlRepository;
import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import com.uwa.uswine.seller.sellWine.repository.SellWineSQLRepository;
import com.uwa.uswine.user.repository.UserRepository;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class SalesManagementService {
    private final SalesManagementSqlRepository salesManagementSqlRepository;
    private final SalesManagementSellerRepository salesManagementSellerRepository;

    private final InfoWineRepository infoWineRepository;
    private final WineListRepository wineListRepository;
    private final SellWineSQLRepository sellWineSQLRepository;

    private final WineTransactionRepository wineTransactionRepository;

    public Page<SellWineSqlEntity> findWine(String email) {
        return salesManagementSqlRepository.findByEmailAndStockGreaterThan(email,"0",PageRequest.of(0,10));
    }

    public Page<SellWineSqlEntity> findsoldout(String email) {
        return salesManagementSqlRepository.findByEmailAndStock(email,"0",PageRequest.of(0,10));
    }

    public Page<InfoWineSellEntity> findMDWine(String email,int page) {
        return infoWineRepository.findByEmailAndSellStockGreaterThan(email,"0",PageRequest.of(page,10));
    }

    public Page<InfoWineSellEntity> findMDSoldout(String email,int page) {
        return infoWineRepository.findByEmailAndSellStock(email,"0",PageRequest.of(page,10));
    }

    public String findNameById(String id) {
        return this.wineListRepository.findById(id).block().getWine_name();
    }

    public SellerEntity findinfo(String email) {
        return salesManagementSellerRepository.findByEmail(email);
    }

    public Page<WineTransactionEntity> findByTransaction(String email,int page) {
        return this.wineTransactionRepository.findBySelleremailOrderByTimestampDesc(email,PageRequest.of(page,10));
    }

    public int updateStock(ReSaleStockDTO reSaleStockDTO) {
        if(reSaleStockDTO.getDocument() == 1) {
            SellWineSqlEntity wine = this.sellWineSQLRepository.findById(reSaleStockDTO.getId());
            if(wine != null) {
                wine.setStock(reSaleStockDTO.getReStock());
                this.sellWineSQLRepository.save(wine);
                return 1;
            } else {
                return 0;
            }
        } else if(reSaleStockDTO.getDocument() == 0) {
            InfoWineSellEntity wine = this.infoWineRepository.findById(reSaleStockDTO.getId());
            if(wine != null) {
                wine.setSellStock(reSaleStockDTO.getReStock());
                this.infoWineRepository.save(wine);
                return 1;
            } else {
                return 0;
            }
        }
        return 0;
    }
}
