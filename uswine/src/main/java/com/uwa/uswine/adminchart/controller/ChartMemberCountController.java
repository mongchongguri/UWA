package com.uwa.uswine.adminchart.controller;

import com.uwa.uswine.adminchart.dto.AdminRevenueDTO;
import com.uwa.uswine.adminchart.dto.WineTransactionDTO;
import com.uwa.uswine.adminchart.service.MemberCountService;
import com.uwa.uswine.adminchart.service.PriceInfoService;
import com.uwa.uswine.adminchart.service.TradeChartService;
import com.uwa.uswine.adminchart.service.WineInfoService;
import com.uwa.uswine.seller.management.entity.AdminRevenueEntity;
import io.grpc.netty.shaded.io.netty.util.internal.ObjectCleaner;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/chart")
public class ChartMemberCountController {

    private final MemberCountService memberCountService;
    private final WineInfoService wineInfoService;
    private final PriceInfoService priceInfoService;
    private final TradeChartService tradeChartService;

    public ChartMemberCountController(
            MemberCountService memberCountService,
            WineInfoService wineInfoService,
            PriceInfoService priceInfoService,
            TradeChartService tradeChartService
    ){
        this.memberCountService = memberCountService;
        this.wineInfoService = wineInfoService;
        this.priceInfoService = priceInfoService;
        this.tradeChartService = tradeChartService;
    }


    @PostMapping("dateChart")
    public Map<String, Object> getDateChart(@RequestBody Map<String, Object> params) throws ParseException {
        //selectValue 값에 따라 연도별인지 월별인지 구분하고
        //조건에 따라 로직을 구성해야 함
        // ============= 구성이 필요한 부분 =============
        // 1. 회원가입수
        // 2. 와인 등록수
        // 3. 품절 와인수
        // 4. 거래수량
        // 5. 총 판매금액
        // 6. 총 수수료

        // 해당 하는 연도의 전체 데이터를 가져와서 프론트 단의 checkbox가 체크 될 때마다 차트에 표시되게끔

        Map<String, Object> map = new HashMap<>();
        Map<String, Object> monthMap = new HashMap<>();

        //datepicker에서 가져온 데이터들은 String
        String startDate = (String) params.get("startdate");
        String endDate = (String) params.get("enddate");

        String selectValue = (String) params.get("selectValue");

        if(selectValue.equals("year")){
            Map<String, Object> memberMap = memberCountService.getMemberCount(startDate, endDate);
            map.put("memberCount", memberMap);

            Map<String, Object> insertWineMap = wineInfoService.getInsertWineCount(startDate, endDate);
            map.put("insertWineCount", insertWineMap);

            Map<String, Object> doneSellWineMap = wineInfoService.getSellDoneWineCount(startDate, endDate);
            map.put("doneSellWineCount", doneSellWineMap);

            Map<String, Object> tradeCount = tradeChartService.getPriceCount(startDate, endDate);
            map.put("tradeCount", tradeCount);

            Map<String, Object> priceCount = priceInfoService.getPriceCount(startDate, endDate);
            map.put("priceCount", priceCount);

            Map<String, Object> withdrawCount = priceInfoService.getWithdrawCount(startDate, endDate);
            map.put("withdrawCount", withdrawCount);

            Map<String, Object> revenueCount = priceInfoService.getRevenueCount(startDate, endDate);
            map.put("revenueCount", revenueCount);


            return map;
        } else {
            //selectValue가 month일때의 소스
            Map<String, Integer> memberCountMonthly = memberCountService.getMemberCountMonthly(startDate, endDate);
            monthMap.put("memberCount",memberCountMonthly);

            //insertWineCount
            Map<String, Integer> insertWineCount = wineInfoService.getInsertWineCountMonthly(startDate, endDate);
            monthMap.put("insertWineCount", insertWineCount);

            //doneSellWineCount
            Map<String, Integer> doneSellWineCount = wineInfoService.getDoneSellWineCount(startDate, endDate);
            monthMap.put("doneSellWineCount", doneSellWineCount);

            //tradeCount
            Map<String, Integer> tradeCount = tradeChartService.getTradeCountMonthly(startDate, endDate);
            monthMap.put("tradeCount", tradeCount);


            Map<String, Integer> priceCount = priceInfoService.getPriceCountMonthly(startDate, endDate);
            monthMap.put("priceCount", priceCount);

            Map<String, Integer> withdrawCount = priceInfoService.getWithdrawCountMonthly(startDate, endDate);
            monthMap.put("withdrawCount", withdrawCount);

            Map<String, Integer> revenueCount = priceInfoService.getRevenueCountMonthly(startDate, endDate);
            monthMap.put("revenueCount", revenueCount);


            return monthMap;
        }


    }

    @PostMapping("withdrawchart")
    public Map<String, Object> getWithdrawList(@RequestBody Map<String, Integer> param){

        int page = param.get("page");

        List<AdminRevenueDTO> list = tradeChartService.getWithdrawList(page);

        int totalPage = list.size() / 10;

        Map<String, Object> map = new HashMap<>();
        map.put("withdrawList", list);
        map.put("totalPage", totalPage);

        return map;
    }

    @PostMapping("tradechart")
    public Map<String, Object> getTradeList(@RequestBody Map<String, Integer> param){

        int page = param.get("page");

        List<WineTransactionDTO> list = tradeChartService.getTradeList(page);

        int totalPage = list.size() / 10;

        Map<String, Object> map = new HashMap<>();
        map.put("tradeList", list);
        map.put("totalPage", totalPage);


        return map;
    }

    @PostMapping("pricechart/priceinfo")
    public Map<String, Integer> getPriceInfo(){

        Map<String, Integer> map = new HashMap<>();

        //총 판매금액
        int allPrice = priceInfoService.getAllPrice();
        //출금금액 및 수수료
        List<Integer> list = priceInfoService.getWithdrawAndCharge();
        int allWithdraw = list.get(0);
        int allCharge = list.get(1);

        map.put("AllPrice", allPrice);
        map.put("AllWithdraw", allWithdraw);
        map.put("AllCharge", allCharge);

        return map;
    }


    @PostMapping("winechart/wineinfo")
    public Map<String, Object> getWineData(){

        Map<String, Object> winedata = new HashMap<>();


        //현재 등록된 와인수
        int allWineCount = wineInfoService.getAllWineCount();
        winedata.put("AllWineCount", allWineCount);

        //현재 판매중인 와인수
        int sellCount = wineInfoService.getInfoWineSellCount();
        winedata.put("SellCoount", sellCount);

        //현재 판매완료 와인수
        int sellDoneWineCount = wineInfoService.getSellDoneWineCount();
        winedata.put("SellDoneWineCount", sellDoneWineCount);

        //현재 판매취소 와인수
        int sellBreakWineCount = wineInfoService.getSellBreakWineCount();
        winedata.put("SellBreakWineCount", sellBreakWineCount);


        //현재 거래수량
        int transferWineCount = wineInfoService.getTransferWineCount();
        winedata.put("TransferWineCount", transferWineCount);


        return winedata;
    }

    @PostMapping("membernumber/labelsdata")
    public Map<String, Object> getLabelsData(){
        Map<String, Object> labelsData = memberCountService.getLabelsData();
        return labelsData;
    }

}
