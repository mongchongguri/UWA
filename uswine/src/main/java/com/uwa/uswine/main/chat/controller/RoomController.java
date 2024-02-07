package com.uwa.uswine.main.chat.controller;

import com.uwa.uswine.main.chat.dto.CreateRoomDTO;
import com.uwa.uswine.main.chat.dto.OutRoomDTO;
import com.uwa.uswine.main.chat.entity.ChatEntity;
import com.uwa.uswine.main.chat.entity.ChattingRoomEntity;
import com.uwa.uswine.main.chat.service.ChattingService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/chatting/")
public class RoomController {
    private final ChattingService chattingService;

    @PostMapping("create")
    public ChattingRoomEntity create(@RequestBody CreateRoomDTO createRoomDTO) {
        try {
            return this.chattingService.createRoom(createRoomDTO);
        } catch (Exception e) {
            return null;
        }

    }

    @PostMapping("chatlist")
    public List<ChattingRoomEntity> chatlist(@RequestBody Map<String,String> email) {
        return this.chattingService.findByEmail(email.get("email"));
    }

    @PostMapping("getchat")
    public List<ChatEntity> getChat(@RequestBody Map<String,String> room) {
        System.out.println(room.get("room"));
        return this.chattingService.getChat(room.get("room")).collectList().block();
    }

    @PostMapping("outroom")
    public int outRoom(@RequestBody OutRoomDTO outRoomDTO) {
        return this.chattingService.outRoom(outRoomDTO);
    }
}
