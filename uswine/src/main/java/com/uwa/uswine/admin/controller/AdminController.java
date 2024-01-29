package com.uwa.uswine.admin.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uwa.uswine.admin.dto.UserSearchDTO;
import com.uwa.uswine.admin.service.AdminService;
import com.uwa.uswine.user.entity.UserEntity;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
	AdminService adminService;
	@PostMapping("/List")
	public Page<UserEntity> getUserList(@RequestBody UserSearchDTO userSearch){
		System.out.println(userSearch);
		Page<UserEntity> userList = adminService.getUserList(userSearch);
		return userList;
	}
	
	@PostMapping("/Delete")
	public int deleteUser(@RequestBody Map<String,Object> users) {
		@SuppressWarnings("unchecked")
		Map<String,Boolean> getUsers=(Map<String,Boolean>)users.get("users");
		for(Map.Entry<String, Boolean> entry : getUsers.entrySet()) {
			String userNick=entry.getKey();
			adminService.deleteUser(userNick);
		}
		return 1;
	}
	
	@PostMapping("/Update")
	public int updateUser(@RequestBody Map<String, Object> user) {
		String changeNick = (String)user.get("changeNick");
		String changeRole = (String)user.get("changeRole");
		@SuppressWarnings("unchecked")
		Map<String,String> updatedUser = (Map<String,String>)user.get("user");
		String userNick = updatedUser.get("nickname");
		adminService.updateUser(changeNick,changeRole,userNick);
		return 1;
	}
	
	@SuppressWarnings("unchecked")
	@PostMapping("/UpdateUsers")
	public int udateUsers(@RequestBody Map<String,Object> users) {
		System.out.println(users);
		Map<String,Boolean> getUsers=(Map<String,Boolean>)users.get("users");
		Map<String,String> changeRoles = (Map<String,String>)users.get("userChangeRoles");
		Map<String,String> changeNicks = (Map<String,String>)users.get("userChangeNicks");
		for(Map.Entry<String, Boolean> entry : getUsers.entrySet()) {
			String userNick=entry.getKey();
			String changeNick = (String)changeNicks.get(userNick);
			String changeRole = (String)changeRoles.get(userNick);
			adminService.updateUser(changeNick,changeRole,userNick);
		}
		return 1;
	}
	
	@PostMapping("sellerRequest")
	public Page<UserEntity> getSellerRequest(@RequestBody int rs){
		Page<UserEntity> sellerRequest=adminService.getSellerRequest();
		return sellerRequest;
	}
}
