package com.uwa.uswine.mypage.deliveryState.controller;

import com.uwa.uswine.mypage.deliveryState.service.DeliveryStateService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/mypage/delivery")
public class DeliveryStateController {

    private final DeliveryStateService deliveryStateService;
    @PostMapping("list")
    public Map<String,Object> list(@RequestBody Map<String,String> info) {
        return this.deliveryStateService.deliveryList(info.get("useremail"));

    }
}
