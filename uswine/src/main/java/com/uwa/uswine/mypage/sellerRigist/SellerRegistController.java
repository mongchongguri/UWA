package com.uwa.uswine.mypage.sellerRigist;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/mypage/seller")
public class SellerRegistController {
    private final SellerRegistService sellerRegistService;

    BCryptPasswordEncoder bCryptPasswordEncoder;
    @PostMapping("regist")
    public int Regist(@RequestBody SellerRegistDTO sellerRegistDTO) {
        sellerRegistDTO.setAccount(bCryptPasswordEncoder.encode(sellerRegistDTO.getAccount()));
        int rs = sellerRegistService.requestSeller(sellerRegistDTO.toEntity());

        return rs;
    }

}
