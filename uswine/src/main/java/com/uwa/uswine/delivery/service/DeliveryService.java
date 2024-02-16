package com.uwa.uswine.delivery.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.uwa.uswine.mypage.cart.repository.WineTransactionRepository;
import com.uwa.uswine.seller.goods.entity.GoodsStateEntity;
import com.uwa.uswine.seller.goods.repositroy.GoodsStateRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DeliveryService {
	
	private WineTransactionRepository wineTransactionRepository;
	private GoodsStateRepository goodsStateRepository;
	
	public Page<Object> getDeliveryState(int page){
		int size = 10;
		Pageable pageable = PageRequest.of(page, size);
		Page<Object> delivery_list = wineTransactionRepository.findByDeliver(pageable);
		return delivery_list;
	}

	public int complete(Long id) {
		Optional<GoodsStateEntity> optional = goodsStateRepository.findById(id);
		if(optional.isPresent()) {
			GoodsStateEntity entity = optional.get();
			entity.setDelivery(3);
			goodsStateRepository.save(entity);
			return 1;
		}else {
			return 0;
		}
	}
}
