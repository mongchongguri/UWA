package com.uwa.uswine.seller.goods.controller;

import com.uwa.uswine.seller.goods.dto.DeliveryChangeDTO;
import com.uwa.uswine.seller.goods.service.GoodsStateService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/seller/goods")
public class GoodsStateController {

    private final GoodsStateService goodsStateService;

    @PostMapping("order")
    public Page<Object> getOrder(@RequestBody Map<String,Object> info) {
        String email = (String) info.get("email");
        int page = (int) info.get("page");

        Page<Object> goods = goodsStateService.findJoin(email,0,page);

        return goods;
    }

    @PostMapping("invoke")
    public Page<Object> getInvoke(@RequestBody Map<String,Object> info) {
        String email = (String) info.get("email");
        int page = (int) info.get("page");

        Page<Object> goods = goodsStateService.findJoin(email,1,page);

        return goods;
    }

    @PostMapping("delivery")
    public Page<Object> getDelivery(@RequestBody Map<String,Object> info) {
        String email = (String) info.get("email");
        int page = (int) info.get("page");

        Page<Object> goods = goodsStateService.findJoin(email,2,page);

        return goods;
    }

    @PostMapping("complete")
    public Page<Object> getComplete(@RequestBody Map<String,Object> info) {
        String email = (String) info.get("email");
        int page = (int) info.get("page");

        Page<Object> goods = goodsStateService.findJoin(email,3,page);

        return goods;
    }

    @PostMapping("change")
    public int changeDelivery(@RequestBody DeliveryChangeDTO deliveryChangeDTO) {
        System.out.println(deliveryChangeDTO.toString());
        if(deliveryChangeDTO.getState() == 0) {
            return this.goodsStateService.changeOrder(deliveryChangeDTO);
        } else if(deliveryChangeDTO.getState() == 1) {
            return this.goodsStateService.changeDelivery(deliveryChangeDTO);
        }
        return 0;
    }



}

