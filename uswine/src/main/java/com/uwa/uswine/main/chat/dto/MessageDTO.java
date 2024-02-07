package com.uwa.uswine.main.chat.dto;

import com.uwa.uswine.main.chat.entity.ChatEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MessageDTO {
    private String nickname;
    private String roomId;
    private String email;
    private String content;
    private Date timestamp;

    public ChatEntity toEntity() {
        ChatEntity chat = new ChatEntity();

        chat.setNickName(this.nickname);
        chat.setRoom(this.roomId);
        chat.setEmail(this.email);
        chat.setContent(this.content);
        chat.setTimestamp(this.timestamp);

        return chat;
    }
}
