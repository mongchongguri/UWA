package com.uwa.uswine.mypage.cart.service;

import com.uwa.uswine.main.onsale.repository.OnSaleWineMongoRepository;
import com.uwa.uswine.main.wine.entity.WineEntity;
import com.uwa.uswine.main.wine.repository.WineListRepository;
import com.uwa.uswine.mypage.cart.dto.CartDTO;
import com.uwa.uswine.mypage.cart.dto.WineCartDTO;
import com.uwa.uswine.mypage.cart.entity.CartEntity;
import com.uwa.uswine.mypage.cart.repository.UserCartRepository;
import com.uwa.uswine.mypage.cart.repository.WineCartRepository;
import com.uwa.uswine.seller.sellWine.entity.SellWineEntity;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CartService {
    private final UserCartRepository userCartRepository;
    private final WineCartRepository wineCartRepository;

    private final WineListRepository wineListRepository;
    private final OnSaleWineMongoRepository onSaleWineMongoRepository;

    public String findAddress(String email) {
        return this.userCartRepository.findAddressByEmail(email).getAddress();
    }

    public int cart(CartDTO cartDTO) {
        CartEntity cart = this.wineCartRepository.findByMongoIdAndUseremail(cartDTO.getMongoId(), cartDTO.getUseremail());

        if(cart == null) {
            this.wineCartRepository.save(cartDTO.toEntity());
            return 1;
        } else {
            return 0;
        }
    }

    public List<WineCartDTO> findWine(String email) {
        List<CartEntity> carts = this.wineCartRepository.findByUseremail(email);
        List<WineCartDTO> userCarts = new ArrayList<>();
        for(CartEntity cart : carts) {
            WineCartDTO dto = new WineCartDTO();
            if (cart.getDocument() == 0) {
                WineEntity wine = this.wineListRepository.findById(cart.getMongoId()).block();
                dto.setWineId(cart.getMongoId());
                dto.setWineName(wine.getWine_name());
                dto.setWineNameEn(wine.getWine_name_en());
                dto.setWineImage(wine.getWine_image());
                dto.setPrice(cart.getPrice());
                dto.setStock(cart.getStock());
                dto.setDocument(cart.getDocument());

                dto.setSelleremail(cart.getSelleremail());
                dto.setSellername(cart.getSellername());
            } else if (cart.getDocument() == 1) {
                SellWineEntity wine = this.onSaleWineMongoRepository.findById(cart.getMongoId()).block();
                dto.setWineId(cart.getMongoId());
                dto.setWineName(wine.getWineName());
                dto.setWineNameEn(wine.getWineNameEn());
                dto.setWineImage(wine.getWineImageURL());
                dto.setPrice(cart.getPrice());
                dto.setStock(cart.getStock());
                dto.setDocument(cart.getDocument());

                dto.setSelleremail(cart.getSelleremail());
                dto.setSellername(cart.getSellername());
            }
            userCarts.add(dto);
        }
        return userCarts;
    }

    public int deleteCart(String id,String email) {
        CartEntity cart = this.wineCartRepository.findByMongoIdAndUseremail(id,email);
        if(cart != null) {
            this.wineCartRepository.delete(cart);
            return 1;
        } else {
            return 0;
        }
    }
}
