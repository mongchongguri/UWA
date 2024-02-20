package com.uwa.uswine.seller.sellerChart.serivce;

import com.uwa.uswine.main.onsale.repository.OnSaleWineSqlRepository;
import com.uwa.uswine.mypage.cart.entity.WineTransactionEntity;
import com.uwa.uswine.mypage.cart.repository.WineTransactionRepository;
import com.uwa.uswine.seller.InfoWine.entity.InfoWineSellEntity;
import com.uwa.uswine.seller.InfoWine.repository.InfoWineRepository;
import com.uwa.uswine.seller.sellWine.entity.SellWineEntity;
import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import com.uwa.uswine.seller.sellerChart.dto.SellerChartDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class SellerChartService {
    private final WineTransactionRepository wineTransactionRepository;
    private final OnSaleWineSqlRepository onSaleWineSqlRepository;
    private final InfoWineRepository infoWineRepository;

    public Map<String,Object> price(SellerChartDTO sellerChartDTO) {
        Map<String,Object> pricelist = new HashMap<>();
        Date endDate = sellerChartDTO.getToday();
        Date startDate = null;
        String email = sellerChartDTO.getUseremail();
        if(sellerChartDTO.getCheck() == 0) {
            // 최근 5년
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(endDate);

            for(int i = 0; i < 5; i++) {
                int price = 0;
                calendar.add(Calendar.YEAR, -1);
                startDate = calendar.getTime();
                List<WineTransactionEntity> list = this.wineTransactionRepository.findBySelleremailAndTimestampBetween(email,startDate,endDate);
                for(WineTransactionEntity wine : list) {
                    price += (Integer.parseInt(wine.getPrice()) * wine.getStock());
                }
                pricelist.put(endDate+"",price);
                endDate = startDate;
            }
        } else if(sellerChartDTO.getCheck() == 1) {
            //최근 12개월
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(endDate);

            for(int i = 0; i < 12; i++) {
                int price = 0;
                calendar.add(Calendar.MONTH, -1);
                startDate = calendar.getTime();
                List<WineTransactionEntity> list = this.wineTransactionRepository.findBySelleremailAndTimestampBetween(email,startDate,endDate);
                for(WineTransactionEntity wine : list) {
                    price += (Integer.parseInt(wine.getPrice()) * wine.getStock());
                }
                pricelist.put(endDate+"",price);
                endDate = startDate;
            }
        }
        else if(sellerChartDTO.getCheck() == 2) {
            //최근 30일
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(endDate);

            for(int i = 0; i < 30; i++) {
                int price = 0;
                calendar.add(Calendar.DAY_OF_MONTH, -1);
                startDate = calendar.getTime();
                List<WineTransactionEntity> list = this.wineTransactionRepository.findBySelleremailAndTimestampBetween(email,startDate,endDate);
                for(WineTransactionEntity wine : list) {
                    price += (Integer.parseInt(wine.getPrice()) * wine.getStock());
                }
                pricelist.put(endDate+"",price);
                endDate = startDate;
            }
        } else if(sellerChartDTO.getCheck() == 3) {
            // 최근 24시간
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(endDate);

            for(int i = 0; i < 24; i++) {
                int price = 0;
                calendar.add(Calendar.HOUR, -1);
                startDate = calendar.getTime();
                List<WineTransactionEntity> list = this.wineTransactionRepository.findBySelleremailAndTimestampBetween(email,startDate,endDate);
                for(WineTransactionEntity wine : list) {
                    price += (Integer.parseInt(wine.getPrice()) * wine.getStock());
                }
                pricelist.put(endDate+"",price);
                endDate = startDate;
            }
        } else if(sellerChartDTO.getCheck() == 4) {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM");

            endDate = sellerChartDTO.getEndDate();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(endDate);

            while(true) {
                int price = 0;
                calendar.add(Calendar.MONTH, -1);
                startDate = calendar.getTime();
                List<WineTransactionEntity> list =  this.wineTransactionRepository.findBySelleremailAndTimestampBetween(email,startDate,endDate);
                for(WineTransactionEntity wine :list) {
                    price += (Integer.parseInt(wine.getPrice()) * wine.getStock());
                }

                pricelist.put(endDate+"",price);
                endDate = startDate;

                String simpleStart = simpleDateFormat.format(sellerChartDTO.getStartDate());
                String simpleEnd = simpleDateFormat.format(endDate);
                if(simpleStart.equals(simpleEnd)) {
                    break;
                }
            }
        }

        return pricelist;
    }

    public Map<String,Object> wine(SellerChartDTO sellerChartDTO) {
        Map<String,Object> winechart = new HashMap<>();
        Map<String,Object> winelist = new HashMap<>();
        Map<String,Object> wineCount = new HashMap<>();
        Map<String,Object> wineInfolist = new HashMap<>();
        Map<String,Object> wineInfoCount = new HashMap<>();

        Date endDate = sellerChartDTO.getToday();
        Date startDate = null;

        String email = sellerChartDTO.getUseremail();

        // 년도별
        if(sellerChartDTO.getCheck() == 0) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(endDate);

            for(int i = 0; i < 5; i++) {
                int stock = 0;
                int infoStock = 0;
                calendar.add(Calendar.YEAR, -1);
                startDate = calendar.getTime();
                List<SellWineSqlEntity> list = this.onSaleWineSqlRepository.findByEmailAndSelldateBetween(email,startDate,endDate);
                List<InfoWineSellEntity> listInfo = this.infoWineRepository.findByEmailAndSellDateBetween(email,startDate,endDate);

                for(SellWineSqlEntity wine : list) {
                    stock += Integer.parseInt(wine.getStock());
                }

                for(InfoWineSellEntity wine : listInfo) {
                    infoStock += Integer.parseInt(wine.getSellStock());
                }

                winelist.put(endDate + "",stock);
                wineCount.put(endDate + "",list.size());
                wineInfolist.put(endDate + "",infoStock);
                wineInfoCount.put(endDate + "",listInfo.size());

                endDate = startDate;
            }
            winechart.put("stock",winelist);
            winechart.put("infoStock",wineInfolist);
            winechart.put("count",wineCount);
            winechart.put("infoCount",wineInfoCount);
        } else if(sellerChartDTO.getCheck() == 1) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(endDate);

            for(int i = 0; i < 12; i++) {
                int stock = 0;
                int infoStock = 0;
                calendar.add(Calendar.MONTH, -1);
                startDate = calendar.getTime();
                List<SellWineSqlEntity> list = this.onSaleWineSqlRepository.findByEmailAndSelldateBetween(email,startDate,endDate);
                List<InfoWineSellEntity> listInfo = this.infoWineRepository.findByEmailAndSellDateBetween(email,startDate,endDate);

                for(SellWineSqlEntity wine : list) {
                    stock += Integer.parseInt(wine.getStock());
                }

                for(InfoWineSellEntity wine : listInfo) {
                    infoStock += Integer.parseInt(wine.getSellStock());
                }

                winelist.put(endDate + "",stock);
                wineCount.put(endDate + "",list.size());
                wineInfolist.put(endDate + "",infoStock);
                wineInfoCount.put(endDate + "",listInfo.size());

                endDate = startDate;
            }
            winechart.put("stock",winelist);
            winechart.put("infoStock",wineInfolist);
            winechart.put("count",wineCount);
            winechart.put("infoCount",wineInfoCount);
        }

        return winechart;

    }

    public Map<String,Object> transaction(SellerChartDTO sellerChartDTO) {
        Map<String,Object> transactionlist = new HashMap<>();
        Date endDate = sellerChartDTO.getToday();
        Date startDate = null;
        String email = sellerChartDTO.getUseremail();
        if(sellerChartDTO.getCheck() == 0) {
            // 최근 5년
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(endDate);

            for(int i = 0; i < 5; i++) {
                int stock = 0;
                calendar.add(Calendar.YEAR, -1);
                startDate = calendar.getTime();
                List<WineTransactionEntity> list = this.wineTransactionRepository.findBySelleremailAndTimestampBetween(email,startDate,endDate);
                for(WineTransactionEntity wine : list) {
                    stock += wine.getStock();
                }
                transactionlist.put(endDate+"",stock);
                endDate = startDate;
            }
        } else if(sellerChartDTO.getCheck() == 1) {
            //최근 12개월
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(endDate);

            for(int i = 0; i < 12; i++) {
                int stock = 0;
                calendar.add(Calendar.MONTH, -1);
                startDate = calendar.getTime();
                List<WineTransactionEntity> list = this.wineTransactionRepository.findBySelleremailAndTimestampBetween(email,startDate,endDate);
                for(WineTransactionEntity wine : list) {
                    stock += wine.getStock();
                }
                transactionlist.put(endDate+"",stock);
                endDate = startDate;
            }
        }
        return transactionlist;
    }
}
