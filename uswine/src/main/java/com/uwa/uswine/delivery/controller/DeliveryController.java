package com.uwa.uswine.delivery.controller;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uwa.uswine.delivery.service.DeliveryService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/delivery")
public class DeliveryController {
	
	private DeliveryService deliveryService;

    @PostMapping("getDeliveryState")
    public Page<Object> getDeliveryState(@RequestBody Map<String,String> map) {
    	int page = Integer.parseInt((String)map.get("currentPage"));
        return deliveryService.getDeliveryState(page-1);
    }
    @PostMapping("complete")
    public int complete(@RequestBody Map<String,String> map) {
    	Long id = Long.parseLong(map.get("id"));
    	
    	return deliveryService.complete(id);
    }
}
