package com.uwa.uswine.mypage.cart.dto;

import com.uwa.uswine.mypage.cart.entity.CartEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CartDTO {
    private String mongoId;
    private String username;
    private String useremail;
    private String sellername;
    private String selleremail;
    private String price;
    private int document;

    public CartEntity toEntity() {
        CartEntity cartEntity = new CartEntity();
        cartEntity.setMongoId(this.mongoId);
        cartEntity.setUsername(this.username);
        cartEntity.setUseremail(this.useremail);
        cartEntity.setSellername(this.sellername);
        cartEntity.setSelleremail(this.selleremail);
        cartEntity.setPrice(this.price);
        cartEntity.setDocument(this.document);
        return cartEntity;
    }
}
