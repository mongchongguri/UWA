package com.uwa.uswine.wine.main;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
public class SearchWineDTO {
    private int page;
    private String searchWine;
    private List<Object> tagWine;
    private List<Object> tagWineAroma;
}
