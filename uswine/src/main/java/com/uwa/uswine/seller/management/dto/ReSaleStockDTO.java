package com.uwa.uswine.seller.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReSaleStockDTO {
    private long id;
    private String reStock;
    private int document;
}
