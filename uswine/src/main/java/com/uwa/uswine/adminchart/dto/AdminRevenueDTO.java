package com.uwa.uswine.adminchart.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminRevenueDTO {
    private long id;
    private String email;
    private String withdraw;
    private String revenue;
}
