package com.uwa.uswine.adminseller.controller;

import com.uwa.uswine.adminseller.dto.MNWInfoWineSellDTO;
import com.uwa.uswine.adminseller.dto.MNWWineDTO;
import com.uwa.uswine.adminseller.service.MNWInfoWineService;
import com.uwa.uswine.seller.sellWine.dto.SellWineDTO;
import com.uwa.uswine.seller.sellWine.dto.SellWineSQLDTO;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping("/api/admin/management/wine")
public class MNWineController {

    private final MNWInfoWineService infoWineService;

    public MNWineController(MNWInfoWineService infoWineService){
        this.infoWineService = infoWineService;
    }

    @PostMapping("sellerwine")
    public Map<String, Object> getWineSeller(@RequestBody Map<String, String> params){

        int page = Integer.parseInt(params.get("page"));
        Map<String, Object> map = new HashMap<>();

        //sql에서 판매자 판매와인 정보를 가져오는 소스
         List<SellWineSQLDTO> mysql = infoWineService.getSellerWineList(page);
         map.put("mysql", mysql);

         int totalpage = mysql.size() / 20;
         map.put("totalpage", totalpage);

         List<String> mongoId = new ArrayList<>();
         for(SellWineSQLDTO dto : mysql){
             mongoId.add(dto.getMongoId());
         }

         List<SellWineDTO> mongo = infoWineService.getSellerWineList(mongoId);
         map.put("mongo", mongo);

        return map;
    }


    @PostMapping("wineDetail")
    public Map<String, Object> getWineDetails(@RequestBody MNWInfoWineSellDTO dto){

        //mysql 와인정보 가져오는 소스
        MNWInfoWineSellDTO wineInfo = infoWineService.getWineInfo(dto);

        //mongoDB 와인정보 가져오는 소스
        String itemId = wineInfo.getItemId();
        MNWWineDTO wine = infoWineService.getWine(itemId);

        Map<String, Object> map = new HashMap<>();
        map.put("mysql", wineInfo);
        map.put("mongo", wine);

        return map;
    }


    @PostMapping("/")
    public Map<String, Object> getWineList(@RequestBody Map<String, String> params){

        int page = Integer.parseInt(params.get("page"));
        String searchWine = params.get("searchWine");

        Map<String, Object> map = new HashMap<>();

        //와인 정보를 MySQL에서 가져오는 소스
        List<MNWInfoWineSellDTO> info = infoWineService.getWineInfo(page);
        System.out.println("info: " + info);

        int totalPage = info.size() / 20;

        map.put("totalpage", totalPage);

        //맵에 저장
        map.put("mysql", info);

        //MySQL에 있는 와인 정보 중 itemId를 가져와서 MongoDB에 있는 와인정보 가져오기
        List<String> itemId = new ArrayList<>();    //itemId를 담을 List

        for(MNWInfoWineSellDTO dto: info){
            System.out.println("Controller itemId: " + dto);
            itemId.add(dto.getItemId());
        }



        List<MNWWineDTO> wine = infoWineService.getWineList(itemId);

        map.put("mongo", wine);

        return map;
    }

}
