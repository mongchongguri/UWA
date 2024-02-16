package com.uwa.uswine.seller.goods.service;

import com.uwa.uswine.mypage.cart.repository.WineTransactionRepository;
import com.uwa.uswine.seller.goods.dto.DeliveryChangeDTO;
import com.uwa.uswine.seller.goods.entity.GoodsStateEntity;
import com.uwa.uswine.seller.goods.repositroy.GoodsStateRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class GoodsStateService {
    private final GoodsStateRepository goodsStateRepository;
    private final WineTransactionRepository wineTransactionRepository;

    public Page<Object> findJoin(String email, int delivery, int page) {
        return this.wineTransactionRepository.findGoodsAndWineEntitiesBySellerEmailAndDelivery(email,delivery, PageRequest.of(page,10));
    }

    public int changeOrder(DeliveryChangeDTO dto) {
        try {
            GoodsStateEntity goodsStateEntity = this.goodsStateRepository.findById(dto.getId());
            goodsStateEntity.setStockingTime(dto.getTimestamp());
            goodsStateEntity.setDelivery(dto.getState()+1);
            this.goodsStateRepository.save(goodsStateEntity);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    public int changeDelivery(DeliveryChangeDTO dto) {
        try{
            GoodsStateEntity goodsStateEntity = this.goodsStateRepository.findById(dto.getId());
            goodsStateEntity.setDeliveryTime(dto.getTimestamp());
            goodsStateEntity.setCourierCompany(dto.getDeliveryCompany());
            goodsStateEntity.setInvoiceNumber(dto.getInvoice());
            goodsStateEntity.setDelivery(dto.getState()+1);
            this.goodsStateRepository.save(goodsStateEntity);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }
}
