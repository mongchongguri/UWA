package com.uwa.uswine.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uwa.uswine.admin.entity.NewChatEntity;
import com.uwa.uswine.admin.service.AdminChatService;
import com.uwa.uswine.main.chat.entity.ChattingRoomEntity;

import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/api/adminChat")
public class AdminChatController {
	
	@Autowired
	AdminChatService adminChatService;
	
	@PostMapping("/chatList")
	public Map<String,Object> adminChatList(@RequestBody Map<String,String> map){
		String email = map.get("email");
		
		int rs = adminChatService.checkEmail(email);
		if(rs==1) {
			Map<String,Object> return_map = new HashMap<String,Object>();
			List<ChattingRoomEntity> chatList = adminChatService.getChatList();
			List<String> newChatList = adminChatService.getNewChatList(chatList);
			return_map.put("chatList", chatList);
			return_map.put("new_chat_list", newChatList);
			return return_map;
		}else {
			return null;
		}
	}
}
