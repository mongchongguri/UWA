package com.uwa.uswine.seller.management.controller;

import com.uwa.uswine.mypage.cart.entity.WineTransactionEntity;
import com.uwa.uswine.mypage.cart.repository.WineTransactionRepository;
import com.uwa.uswine.seller.InfoWine.entity.InfoWineSellEntity;
import com.uwa.uswine.seller.management.dto.ReSaleStockDTO;
import com.uwa.uswine.seller.management.dto.SalesManagementDTO;
import com.uwa.uswine.seller.management.dto.SellerManagementWithdrawDTO;
import com.uwa.uswine.seller.management.service.SalesManagementService;
import com.uwa.uswine.seller.management.service.WithdrawService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/seller/management")
public class SalesManagementController {
    private final SalesManagementService salesManagementService;
    private final WithdrawService withdrawService;

    // 개인 와인 판매
    @PostMapping("/info")
    public Map<String,Object> info(@RequestBody SalesManagementDTO salesManagementDTO) {
        Map<String,Object> info = new HashMap<>();
        info.put("info",this.salesManagementService.findinfo(salesManagementDTO.getEmail()));
        info.put("wine",this.salesManagementService.findWine(salesManagementDTO.getEmail()));
        info.put("soldout",this.salesManagementService.findsoldout(salesManagementDTO.getEmail()));
        return info;
    }

    // MD와인 판매
    @PostMapping("/infoMD")
    public Map<String,Object> infoMD(@RequestBody SalesManagementDTO salesManagementDTO) {
        Map<String,Object> info = new HashMap<>();
        info.put("info",this.salesManagementService.findinfo(salesManagementDTO.getEmail()));

        Page<InfoWineSellEntity> infoWine = this.salesManagementService.findMDWine(salesManagementDTO.getEmail(),salesManagementDTO.getSellingpage());
        List<String> wineName = new ArrayList<>();
        for(InfoWineSellEntity infoWineSellEntity : infoWine) {
            wineName.add(this.salesManagementService.findNameById(infoWineSellEntity.getItemId()));
        }

        Page<InfoWineSellEntity> infoSoldoutWine = this.salesManagementService.findMDSoldout(salesManagementDTO.getEmail(),salesManagementDTO.getSoldpage());
        List<String> wineSoldName = new ArrayList<>();
        for(InfoWineSellEntity infoWineSellEntity : infoSoldoutWine) {
            wineSoldName.add(this.salesManagementService.findNameById(infoWineSellEntity.getItemId()));
        }

        info.put("wine",infoWine);
        info.put("wineName",wineName);
        info.put("soldout",infoSoldoutWine);
        info.put("wineSoldName",wineSoldName);
        return info;
    }

    @PostMapping("/transaction")
    public Page<WineTransactionEntity> transaction(@RequestBody Map<String,String> info) {
        return this.salesManagementService.findByTransaction(info.get("email"), Integer.parseInt(info.get("page")));
    }

    @PostMapping("/resale")
    public int reSale(@RequestBody ReSaleStockDTO reSaleStockDTO) {
        return this.salesManagementService.updateStock(reSaleStockDTO);
    }

    @PostMapping("/withdraw")
    public int withdraw(@RequestBody SellerManagementWithdrawDTO sellerManagementWithdrawDTO) {
        return this.withdrawService.withdraw(sellerManagementWithdrawDTO);
    }
}
