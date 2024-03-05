package com.uwa.uswine.adminchart.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WineTransactionDTO {
    private long id;
    private String wineName;
    private String price;
    private int stock;
    private String selleremail;
    private String sellername;
    private String useremail;
    private String username;
    private Date timestamp;
}
