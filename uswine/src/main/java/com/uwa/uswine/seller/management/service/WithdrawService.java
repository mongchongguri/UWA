package com.uwa.uswine.seller.management.service;

import com.uwa.uswine.seller.management.dto.SellerManagementWithdrawDTO;
import com.uwa.uswine.seller.management.entity.AdminRevenueEntity;
import com.uwa.uswine.seller.management.entity.SellerEntity;
import com.uwa.uswine.seller.management.entity.SellerWithdrawEntity;
import com.uwa.uswine.seller.management.repository.AdminRevenueRepository;
import com.uwa.uswine.seller.management.repository.SalesManagementSellerRepository;
import com.uwa.uswine.seller.management.repository.SellerWithdrawRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class WithdrawService {
    private final SellerWithdrawRepository sellerWithdrawRepository;
    private final AdminRevenueRepository adminRevenueRepository;

    private final SalesManagementSellerRepository salesManagementSellerRepository;

    public int withdraw(SellerManagementWithdrawDTO sellerManagementWithdrawDTO) {
        try {
            // 해당 판매자 금액 제거
            SellerEntity seller = this.salesManagementSellerRepository.findByEmail(sellerManagementWithdrawDTO.getEmail());
            seller.setMoney(seller.getMoney() - Integer.parseInt(sellerManagementWithdrawDTO.getWithdraw()));
            this.salesManagementSellerRepository.save(seller);

            // 출금 수수료 제거
            int charge = (int) (Integer.parseInt(sellerManagementWithdrawDTO.getWithdraw()) * 0.05);
            sellerManagementWithdrawDTO.setWithdraw(String.valueOf(Integer.parseInt(sellerManagementWithdrawDTO.getWithdraw()) - charge));
            sellerManagementWithdrawDTO.setRevenue(String.valueOf(charge));
            this.sellerWithdrawRepository.save(sellerManagementWithdrawDTO.toEntity());

            // 관리자 수수료 저장
            AdminRevenueEntity adminRevenue = new AdminRevenueEntity();
            adminRevenue.setEmail(sellerManagementWithdrawDTO.getEmail());
            adminRevenue.setWithdraw(sellerManagementWithdrawDTO.getWithdraw());
            adminRevenue.setRevenue(String.valueOf(charge));
            adminRevenue.setTimestamp(sellerManagementWithdrawDTO.getTimestamp());
            this.adminRevenueRepository.save(adminRevenue);

            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    public Page<SellerWithdrawEntity> withdrawlist(String email,int page) {
        return this.sellerWithdrawRepository.findByEmailOrderByTimestampDesc(email, PageRequest.of(0,10));
    }
}
