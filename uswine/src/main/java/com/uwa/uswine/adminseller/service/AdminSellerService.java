package com.uwa.uswine.adminseller.service;

import org.springframework.stereotype.Service;

import com.uwa.uswine.adminseller.entity.AdminSellerEntity;
import com.uwa.uswine.adminseller.repository.AdminSellerRepository;
import com.uwa.uswine.mypage.sellerRigist.entity.SellerRegistEntity;
import com.uwa.uswine.mypage.sellerRigist.repository.SellerRegistRepository;
import com.uwa.uswine.user.entity.Role;
import com.uwa.uswine.user.entity.UserEntity;
import com.uwa.uswine.user.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminSellerService {
	private final UserRepository userRepository;
	private final SellerRegistRepository sellerRegistRepository;
	private final AdminSellerRepository sellerRepository;

	public void requestConfirm(String email) {
		UserEntity user = userRepository.findByEmail(email);
		if (user != null) {
			user.setRole(Role.ROLE_SELLER);
			userRepository.save(user);
		}
		SellerRegistEntity user_seller = sellerRegistRepository.findByEmail(email);

		AdminSellerEntity seller_entity = new AdminSellerEntity().toSeller(user_seller);
		sellerRepository.save(seller_entity);
		sellerRegistRepository.delete(user_seller);
	}

	public void deniedConfirm(String email) {
		SellerRegistEntity user_seller = sellerRegistRepository.findByEmail(email);
		sellerRegistRepository.delete(user_seller);
	}

	public SellerRegistEntity findRegist(String userNick) {
		UserEntity user_entity = userRepository.findByNickname(userNick);
		String user_email = user_entity.getEmail();
		SellerRegistEntity sr_entity = sellerRegistRepository.findByEmail(user_email);
		if (sr_entity == null) {
			return null;
		}
		return sr_entity;
	}

	public AdminSellerEntity findSeller(String userNick) {
		UserEntity user_entity = userRepository.findByNickname(userNick);
		String user_email = user_entity.getEmail();
		AdminSellerEntity s_entity = sellerRepository.findByEmail(user_email);
		if (s_entity == null) {
			return null;
		}
		return s_entity;
	}

	public void deleteSeller(String email) {
		AdminSellerEntity seller_entity = sellerRepository.findByEmail(email);
		sellerRepository.delete(seller_entity);
	}
}
