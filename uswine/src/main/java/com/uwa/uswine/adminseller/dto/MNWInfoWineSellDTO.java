package com.uwa.uswine.adminseller.dto;

import lombok.*;

import java.util.Date;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class MNWInfoWineSellDTO {
    private long id;
    private String email;
    private String nickname;
    private String itemId;
    private String phone;
    private String sellMoney;
    private String sellStock;
    private String address;
    private String detailAddress;
    private boolean delivery;
    private Date sellDate;
}
