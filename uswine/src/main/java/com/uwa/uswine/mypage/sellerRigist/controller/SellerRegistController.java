package com.uwa.uswine.mypage.sellerRigist.controller;

import com.uwa.uswine.mypage.sellerRigist.dto.SellerRegistDTO;
import com.uwa.uswine.mypage.sellerRigist.service.SellerRegistService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/mypage/seller")
public class SellerRegistController {
    private final SellerRegistService sellerRegistService;

    @PostMapping("regist")
    public int Regist(@RequestBody SellerRegistDTO sellerRegistDTO) {
        int rs = sellerRegistService.requestSeller(sellerRegistDTO.toEntity());

        return rs;
    }

}
