package com.uwa.uswine.seller.goods.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DeliveryChangeDTO {
    private long id;
    private int state;
    private Date timestamp;
    private String deliveryCompany;
    private String invoice;
}
