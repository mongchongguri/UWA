package com.uwa.uswine.main.chat.service;

import com.uwa.uswine.admin.entity.NewChatEntity;
import com.uwa.uswine.admin.repository.NewChatRepository;
import com.uwa.uswine.main.chat.dto.CreateRoomDTO;
import com.uwa.uswine.main.chat.dto.MessageDTO;
import com.uwa.uswine.main.chat.dto.OutRoomDTO;
import com.uwa.uswine.main.chat.entity.ChatEntity;
import com.uwa.uswine.main.chat.entity.ChattingRoomEntity;
import com.uwa.uswine.main.chat.repository.ChatMongoRepository;
import com.uwa.uswine.main.chat.repository.ChattingRoomRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChattingService {
    private final ChattingRoomRepository chattingRoomRepository;
    private final ChatMongoRepository chatMongoRepository;
    private final NewChatRepository newChatRepository; 
    

    public ChattingRoomEntity createRoom(CreateRoomDTO createRoomDTO) {
        ChattingRoomEntity chattingRoomEntity = findRoom(createRoomDTO);
        if(chattingRoomEntity == null ) {
            chattingRoomRepository.save(createRoomDTO.toEntity());
        }

        return findRoom(createRoomDTO);
    }

    public ChattingRoomEntity findRoom(CreateRoomDTO createRoomDTO) {
        return this.chattingRoomRepository.findBySellItemIdAndAndSellerEmailAndUserEmail(createRoomDTO.getSellItemId(),createRoomDTO.getSellerEmail(),createRoomDTO.getUserEmail());
    }

    public List<ChattingRoomEntity> findByEmail(String email) {
        return this.chattingRoomRepository.findByUserEmailOrSellerEmail(email,email);
    }

    public void chatMessages(ChatEntity chatEntity) {
            this.chatMongoRepository.save(chatEntity).block();
    }

    public int outRoom(OutRoomDTO outRoomDTO) {
        ChattingRoomEntity chattingRoomEntity = this.chattingRoomRepository.findById(outRoomDTO.getRoom());
        if(outRoomDTO.getEmail().equals(chattingRoomEntity.getUserEmail())) {
            chattingRoomEntity.setUserEmail("");
        }
        if(outRoomDTO.getEmail().equals(chattingRoomEntity.getSellerEmail())) {
            chattingRoomEntity.setSellerEmail("");
        }
        String user_nick = chattingRoomEntity.getUserNickname();
        NewChatEntity new_entity = newChatRepository.findByUserNickname(user_nick);
        if(new_entity != null) {
        	newChatRepository.delete(new_entity);
        }

        try {
            this.chattingRoomRepository.save(chattingRoomEntity);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    public Flux<ChatEntity> getChat(String room) {
    	Long room_id = (long)Integer.parseInt(room);
    	Optional<ChattingRoomEntity> optional = this.chattingRoomRepository.findById(room_id);
    	ChattingRoomEntity entity = optional.get();
    	String user_nick = entity.getUserNickname();
    	NewChatEntity new_entity = newChatRepository.findByUserNickname(user_nick);
    	if(new_entity != null) {
    		new_entity.setUserNickname(user_nick);
    		new_entity.setLastDate(new Date());
    		newChatRepository.save(new_entity);
    	}
        return this.chatMongoRepository.findByRoom(room);
    }
}
