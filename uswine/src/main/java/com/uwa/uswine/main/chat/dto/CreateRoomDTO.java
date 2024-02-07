package com.uwa.uswine.main.chat.dto;

import com.uwa.uswine.main.chat.entity.ChattingRoomEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CreateRoomDTO {
    private String userEmail;
    private String userNickname;
    private String sellerEmail;
    private String sellerNickname;
    private String sellItemId;

    public ChattingRoomEntity toEntity() {
        ChattingRoomEntity chattingRoomEntity = new ChattingRoomEntity();
        chattingRoomEntity.setUserEmail(this.userEmail);
        chattingRoomEntity.setUserNickname(this.userNickname);
        chattingRoomEntity.setSellerEmail(this.sellerEmail);
        chattingRoomEntity.setSellerNickname(this.sellerNickname);
        chattingRoomEntity.setSellItemId(this.sellItemId);
        return chattingRoomEntity;
    }

}
