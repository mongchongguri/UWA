package com.uwa.uswine.admin.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.uwa.uswine.admin.entity.NewChatEntity;
import com.uwa.uswine.admin.repository.NewChatRepository;
import com.uwa.uswine.main.chat.entity.ChatEntity;
import com.uwa.uswine.main.chat.entity.ChattingRoomEntity;
import com.uwa.uswine.main.chat.repository.ChatMongoRepository;
import com.uwa.uswine.main.chat.repository.ChattingRoomRepository;
import com.uwa.uswine.user.entity.Role;
import com.uwa.uswine.user.entity.UserEntity;
import com.uwa.uswine.user.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminChatService {
	
	private final UserRepository userRepository;
	private final ChattingRoomRepository chattingRoomRepository;
	private final NewChatRepository newChatRepository;
	private final ChatMongoRepository chatMongoRepository;
	
	public int checkEmail(String email) {
		UserEntity entity = userRepository.findByEmail(email);
		if(entity.getRole().equals(Role.ROLE_ADMIN)) {
			return 1;
		}else {
			return -1;
		}
	}

	public List<ChattingRoomEntity> getChatList() {
		return  chattingRoomRepository.findBySellerEmail("admin@admin");
	}

	public List<String> getNewChatList(List<ChattingRoomEntity> chatList) {
		List<String> newChatList = new ArrayList<String>();
		for(ChattingRoomEntity entity : chatList) {
			String room_id = Integer.toString((int)entity.getId());
			String user_nick = entity.getUserNickname();
			Date last_date = null;
			Date time_stamp = null;
			ChatEntity chat_entity = null;
			NewChatEntity newChat = newChatRepository.findByUserNickname(user_nick);
			if(newChat != null) {
				last_date = newChat.getLastDate();
			}else {
				newChat = new NewChatEntity();
				newChat.setLastDate(new Date());
				newChat.setUserNickname(user_nick);
				newChatRepository.save(newChat);
				newChatList.add("new");
				continue;
			}
			List<ChatEntity> chat_entity_list = chatMongoRepository.findByRoom(room_id).collectList().block();
			if(chat_entity_list.size() > 0) {
				chat_entity = chat_entity_list.get(chat_entity_list.size() - 1);
			}
			if(chat_entity != null) {
				time_stamp = chat_entity.getTimestamp();
			}
			int comparison = 0;
			if(last_date != null && time_stamp != null) {
				comparison = last_date.compareTo(time_stamp);
			}
			if(comparison >= 0) {
				newChatList.add("");
			}else {
				newChatList.add("new");
			}
			
			
			
		}
		return newChatList;
	}
}
