package com.uwa.uswine.mypage.myinfo.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.uwa.uswine.mypage.cart.entity.WineTransactionEntity;
import com.uwa.uswine.mypage.cart.repository.WineTransactionRepository;
import com.uwa.uswine.user.entity.UserEntity;
import com.uwa.uswine.user.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MyInfoService {
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	private UserRepository userRepository;
	private WineTransactionRepository wineTransactionRepository;
	
	public UserEntity getUserInfo(Map<String, String> userinfo) {
		String email = userinfo.get("username");
		return userRepository.findByEmail(email);
	}

	public Page<WineTransactionEntity> buywine(Map<String, String> userinfo,int page) {
		String email = userinfo.get("username");
		int size = 5;
		Pageable pageable = PageRequest.of(page, size); 
		return wineTransactionRepository.findByUseremail(email, pageable);
	}

	public Page<Object> getState(Map<String, String> userinfo, int page) {
		String email = userinfo.get("username");
		int size = 5;
		Pageable pageable = PageRequest.of(page, size); 
		Page<Object> goods_state = wineTransactionRepository.findGoodsStateEntityByUseremail(email, pageable);
		
		return goods_state;
	}

	public int checkNewNickname(String new_nickname) {
		UserEntity entity =  userRepository.findByNickname(new_nickname);
		if(entity != null) {
			return 1;
		}else {
			return 0;
		}
	}

	public int updateNickname(Map<String, String> userinfo, String new_nickname) {
		String email = userinfo.get("username");
		UserEntity entity = userRepository.findByEmail(email);
		if(entity != null) {
			entity.setNickname(new_nickname);
			userRepository.save(entity);
			return 1;
		}else {
			return 0;
		}
	}

	public int updatePassword(Map<String, String> userinfo, String new_password) {
		String email = userinfo.get("username");
		UserEntity entity = userRepository.findByEmail(email);
		String decode_password = bCryptPasswordEncoder.encode(new_password);
		if(entity != null) {
			entity.setPassword(decode_password);
			userRepository.save(entity);
			return 1;
		}else {
			return 0;
		}
	}
	
	
	
}
