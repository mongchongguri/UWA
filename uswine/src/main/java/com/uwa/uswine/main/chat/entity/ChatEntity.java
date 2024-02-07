package com.uwa.uswine.main.chat.entity;


import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "chat")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatEntity {
    @Id
    private String id;

    private String room;
    private String nickName;
    private String email;
    private String content;
    private Date timestamp;
}
