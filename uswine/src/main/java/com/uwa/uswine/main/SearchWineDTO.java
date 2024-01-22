package com.uwa.uswine.main;

import lombok.*;

import java.util.List;

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
