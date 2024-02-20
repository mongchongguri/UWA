package com.uwa.uswine.seller.sellerChart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SellerChartDTO {
    private Date today;
    private Date startDate;
    private Date endDate;
    private String useremail;
    private int check;
}
