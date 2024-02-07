package com.uwa.uswine.seller.management.controller;

import com.uwa.uswine.seller.management.dto.SalesManagementDTO;
import com.uwa.uswine.seller.management.service.SalesManagementService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/seller/management")
public class SalesManagementController {
    private final SalesManagementService salesManagementService;

    @PostMapping("/info")
    public Map<String,Object> info(@RequestBody SalesManagementDTO salesManagementDTO) {
        Map<String,Object> info = new HashMap<>();
        info.put("info",this.salesManagementService.findinfo(salesManagementDTO.getEmail()));
        info.put("wine",this.salesManagementService.findWine(salesManagementDTO.getEmail()));
        return info;
    }
}
