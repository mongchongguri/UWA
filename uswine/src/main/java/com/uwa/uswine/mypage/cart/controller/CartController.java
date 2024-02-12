package com.uwa.uswine.mypage.cart.controller;

import com.uwa.uswine.mypage.cart.dto.CartDTO;
import com.uwa.uswine.mypage.cart.dto.WineBuyDTO;
import com.uwa.uswine.mypage.cart.dto.WineCartDTO;
import com.uwa.uswine.mypage.cart.service.BuyService;
import com.uwa.uswine.mypage.cart.service.CartService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/mypage/cart")
public class CartController {

    private final CartService cartService;
    private final BuyService buyService;

    @PostMapping("userAddress")
    public String address(@RequestBody Map<String,String> info) {
        return this.cartService.findAddress(info.get("email"));
    }

    @PostMapping("buyWine")
    public int buy(@RequestBody CartDTO cartDTO) {
        return this.cartService.cart(cartDTO);
    }


    @PostMapping("getWine")
    public List<WineCartDTO> getWine(@RequestBody Map<String,String> user) {
        return this.cartService.findWine(user.get("email"));
    }

    @PostMapping("buy")
    public List<Integer> buy(@RequestBody Map<String,Object> buyItems) {
        System.out.println(buyItems.get("wineDTO").toString());
        List<Map<String,Object>> itemList = (List<Map<String,Object>>) buyItems.get("wineDTO");

        List<Integer> buyRestult = new ArrayList<>();
        for(Map<String,Object> item : itemList) {
            WineBuyDTO dto = new WineBuyDTO();
            dto.setWineId((String) item.get("wineId"));
            dto.setWineName((String) item.get("wineName"));
            dto.setPrice((String) item.get("price"));
            dto.setStock((int) item.get("stock"));
            dto.setDocument((int) item.get("document"));
            dto.setSelleremail((String) item.get("selleremail"));
            dto.setSellername((String) item.get("sellername"));
            dto.setUseremail((String) item.get("useremail"));
            dto.setUsername((String) item.get("username"));

            int rs = buyService.updateStock(dto);
            buyRestult.add(rs);
        }

        return buyRestult;
    }

    @PostMapping("deleteCart")
    public int delete(@RequestBody Map<String,Object> cart) {
        return this.cartService.deleteCart((String) cart.get("id"),(String) cart.get("useremail"));
    }
}
