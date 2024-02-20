package com.uwa.uswine.seller.sellerChart.controller;

import com.uwa.uswine.mypage.cart.entity.WineTransactionEntity;
import com.uwa.uswine.seller.sellerChart.dto.SellerChartDTO;
import com.uwa.uswine.seller.sellerChart.serivce.SellerChartService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/seller/chart")
public class SellerChartController {

    private final SellerChartService sellerChartService;
    @PostMapping("price")
    public Map<String, Object> price(@RequestBody SellerChartDTO sellerChartDTO) {
        return this.sellerChartService.price(sellerChartDTO);
    }

    @PostMapping("wine")
    public Map<String,Object> wine(@RequestBody SellerChartDTO sellerChartDTO) {
        return this.sellerChartService.wine(sellerChartDTO);
    }

    @PostMapping("transaction")
    public Map<String,Object> transaction(@RequestBody SellerChartDTO sellerChartDTO) {
        return this.sellerChartService.transaction(sellerChartDTO);
    }
}
