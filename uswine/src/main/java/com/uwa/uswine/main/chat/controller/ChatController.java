package com.uwa.uswine.main.chat.controller;

import com.uwa.uswine.main.chat.dto.MessageDTO;
import com.uwa.uswine.main.chat.service.ChattingService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@CrossOrigin
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChattingService chattingService;

    @MessageMapping("/chat/{roomId}")
    @SendTo("/queue/messages/{roomId}")
    public MessageDTO sendMessage(@Payload MessageDTO messageDTO) throws Exception{
        this.chattingService.chatMessages(messageDTO.toEntity());
        return messageDTO;
    }
}
