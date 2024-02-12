package com.uwa.uswine.mypage.cart.service;

import com.uwa.uswine.mypage.cart.dto.WineBuyDTO;
import com.uwa.uswine.mypage.cart.entity.CartEntity;
import com.uwa.uswine.mypage.cart.repository.WineCartRepository;
import com.uwa.uswine.mypage.cart.repository.WineTransactionRepository;
import com.uwa.uswine.seller.InfoWine.entity.InfoWineSellEntity;
import com.uwa.uswine.seller.InfoWine.repository.InfoWineRepository;
import com.uwa.uswine.seller.management.entity.SellerEntity;
import com.uwa.uswine.seller.management.repository.SalesManagementSellerRepository;
import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import com.uwa.uswine.seller.sellWine.repository.SellWineSQLRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BuyService {
    private final InfoWineRepository infoWineRepository;
    private final SellWineSQLRepository sellWineSQLRepository;

    private final WineCartRepository wineCartRepository;
    private final WineTransactionRepository wineTransactionRepository;
    private final SalesManagementSellerRepository salesManagementSellerRepository;

    public int updateStock(WineBuyDTO dto) {
        // 0 : info_wine_sell_entity, 1 : sell_wine_sql_entity 재고 수정하기
        if(dto.getDocument() == 0) {
            InfoWineSellEntity sellWine = this.infoWineRepository.findByItemIdAndEmail(dto.getWineId(),dto.getSelleremail());
            if(sellWine != null) {
                int stock = (Integer.parseInt(sellWine.getSellStock()) - dto.getStock());
                // 재고가 존재하는 경우 구매 개수만큼 재고 삭제 -> 구매 확정
                // 판매자 계정 금액 증가
                if(stock > 0) {
                    sellWine.setSellStock(String.valueOf(stock));
                    this.infoWineRepository.save(sellWine);

                    // 판매자 판매 금액 증가
                    SellerEntity seller = this.salesManagementSellerRepository.findByEmail(dto.getSelleremail());
                    int total_price = Integer.parseInt(sellWine.getSellMoney()) * dto.getStock();
                    seller.setMoney(total_price);
                    seller.setTotalMoney(total_price);

                    //거래 명부 저장
                    this.wineTransactionRepository.save(dto.toEntity());

                    //장바구니에서 구매한 항목 삭제
                    CartEntity cart = this.wineCartRepository.findByMongoIdAndUseremail(dto.getWineId(),dto.getUseremail());
                    if(cart != null) {
                        this.wineCartRepository.delete(cart);
                    }
                    // 성공적으로 구매한 경우
                    return 1;
                } else {
                    // 재고가 없는 경우
                    return 2;
                }
            } else {
                // 판매 상품이 없는 경우
                return 0;
            }
        } else if(dto.getDocument() == 1) {
            SellWineSqlEntity sellWine = this.sellWineSQLRepository.findByMongoIdAndEmail(dto.getWineId(),dto.getSelleremail());
            if(sellWine != null) {
                int stock = (Integer.parseInt(sellWine.getStock()) - dto.getStock());
                // 재고가 존재하는 경우 구매 개수만큼 재고 삭제 -> 구매 확정
                // 판매자 계정 금액 증가
                if(stock > 0) {
                    // 재고 줄이기
                    sellWine.setStock(String.valueOf(stock));
                    this.sellWineSQLRepository.save(sellWine);

                    // 판매자 금액 증가
                    SellerEntity seller = this.salesManagementSellerRepository.findByEmail(dto.getSelleremail());
                    int total_price = Integer.parseInt(sellWine.getSellMoney()) * dto.getStock();
                    seller.setMoney(total_price);
                    seller.setTotalMoney(total_price);

                    //거래 명부 저장
                    this.wineTransactionRepository.save(dto.toEntity());

                    //장바구니에서 구매한 항목 삭제
                    CartEntity cart = this.wineCartRepository.findByMongoIdAndUseremail(dto.getWineId(),dto.getUseremail());
                    if(cart != null) {
                        this.wineCartRepository.delete(cart);
                    }
                } else {
                    // 재고가 없는 경우
                    return 2;
                }
            } else {
                // 판매 상품이 없는 경우
                return 0;
            }
        }
        return 0;
    }
}
