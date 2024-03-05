package com.uwa.uswine.adminchart.service;

import com.uwa.uswine.adminchart.repository.InfoWineSellRepository;
import com.uwa.uswine.adminchart.repository.SellWineSqlRepository;
import com.uwa.uswine.adminchart.repository.WineInfoMongoRepository;
import com.uwa.uswine.adminseller.dto.MNWInfoWineSellDTO;
import com.uwa.uswine.mypage.cart.entity.WineTransactionEntity;
import com.uwa.uswine.mypage.cart.repository.WineTransactionRepository;
import com.uwa.uswine.seller.InfoWine.entity.InfoWineSellEntity;
import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import com.uwa.uswine.user.entity.UserEntity;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class WineInfoService {

    private final WineInfoMongoRepository wineInfoMongoRepository; // 전체 와인 관련 repository
    private final InfoWineSellRepository infoWineSellRepository; // infowinesell 관련 repository
    private final SellWineSqlRepository sellWineSqlRepository; // sellwinesql 관련 repository
    private final WineTransactionRepository wineTransactionRepository;

    public WineInfoService(WineInfoMongoRepository wineInfoMongoRepository,
            InfoWineSellRepository infoWineSellRepository, SellWineSqlRepository sellWineSqlRepository,
            WineTransactionRepository wineTransactionRepository) {
        this.wineInfoMongoRepository = wineInfoMongoRepository;
        this.infoWineSellRepository = infoWineSellRepository;
        this.sellWineSqlRepository = sellWineSqlRepository;
        this.wineTransactionRepository = wineTransactionRepository;
    }

    // mongoDB에서 전체 와인 개수 가져오는 메서드
    public int getAllWineCount() {
        int allWineCount = Math.toIntExact(wineInfoMongoRepository.count().block());

        return allWineCount;
    }

    // MySQL에서 infowinesell,sellwinesql stock을 가져와서 팬매중인 와인 수 구하는 메서드
    public int getInfoWineSellCount() {

        // infowinesell의 stock count 구하는 소스
        List<InfoWineSellEntity> entitylist = infoWineSellRepository.findAll();

        int stock = 0;
        int sumStock = 0;

        for (InfoWineSellEntity entity : entitylist) {
            stock = Integer.parseInt(entity.getSellStock());
            sumStock += stock;
        }

        // sellwinesql의 stock count 구하는 소스
        List<SellWineSqlEntity> sellWineSqlEntities = sellWineSqlRepository.findAll();

        int sellWineSqlStock = 0;
        int sumSellWineSqlStock = 0;

        for (SellWineSqlEntity entity : sellWineSqlEntities) {
            if (Integer.parseInt(entity.getStock()) > 0) {
                sellWineSqlStock = Integer.parseInt(entity.getStock());
                sumSellWineSqlStock += sellWineSqlStock;
            } else {
                continue;
            }

        }

        // stock count 합계
        int totalSellWine = sumSellWineSqlStock + sumStock;

        return totalSellWine;
    }

    public int getSellDoneWineCount() {

        // sellwinesql stock이 0인 와인들을 찾는 소스
        List<SellWineSqlEntity> entities = sellWineSqlRepository.findAll();

        int sellWineSqlCount = 0;

        for (SellWineSqlEntity entity : entities) {
            if (Integer.parseInt(entity.getStock()) == 0) {
                sellWineSqlCount = sellWineSqlCount + 1;
            } else {
                continue;
            }
        }

        // infowinesell stock이 0인 와인들을 찾는 소스
        List<InfoWineSellEntity> entities1 = infoWineSellRepository.findAll();

        int infoWineSellCount = 0;

        for (InfoWineSellEntity entity : entities1) {
            if (Integer.parseInt(entity.getSellStock()) == 0) {
                infoWineSellCount = infoWineSellCount + 1;
            } else {
                continue;
            }
        }

        // 판매완료 된 와인의 개수
        int totalDoneSellCount = sellWineSqlCount + infoWineSellCount;

        return totalDoneSellCount;
    }

    public int getSellBreakWineCount() {
        // sellwinesql stock이 -1인 와인들을 찾는 소스
        List<SellWineSqlEntity> entities = sellWineSqlRepository.findAll();

        int selBreaklWineSqlCount = 0;

        for (SellWineSqlEntity entity : entities) {
            if (Integer.parseInt(entity.getStock()) == -1) {
                selBreaklWineSqlCount = selBreaklWineSqlCount + 1;
            } else {
                continue;
            }
        }

        // infowinesell stock이 -1인 와인들을 찾는 소스
        List<InfoWineSellEntity> entities1 = infoWineSellRepository.findAll();

        int infoWineSellBreakCount = 0;

        for (InfoWineSellEntity entity : entities1) {
            if (Integer.parseInt(entity.getSellStock()) == -1) {
                infoWineSellBreakCount = infoWineSellBreakCount + 1;
            } else {
                continue;
            }
        }

        // 판매완료 된 와인의 개수
        int totalBreakSellCount = selBreaklWineSqlCount + infoWineSellBreakCount;

        return totalBreakSellCount;
    }

    // 와인 총 거래량 구하는 메서드
    public int getTransferWineCount() {

        List<WineTransactionEntity> list = wineTransactionRepository.findAll();

        int stock = 0;
        int sumStock = 0;

        for (WineTransactionEntity entity : list) {
            stock = entity.getStock();
            sumStock = stock + stock;
        }

        return sumStock;
    }

    public Map<String, Object> getInsertWineCount(String startDate, String endDate) throws ParseException {

        String startYear = startDate.split("-")[0];
        String endYear = endDate.split("-")[0];

        int startYearInt = Integer.parseInt(startYear);
        int endYearInt = Integer.parseInt(endYear) + 1;

        Map<String, Object> map = new HashMap<>();

        for (int year = startYearInt + 1; year <= endYearInt; year++) {
            String startOfYear = year + "-01-01";
            String endOfYear = year + "-12-31";

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date startDateOfYear = dateFormat.parse(startOfYear);
            Date endDateOfYear = dateFormat.parse(endOfYear);

            List<InfoWineSellEntity> list = infoWineSellRepository.findBySellDateBetween(startDateOfYear,
                    endDateOfYear);
            List<SellWineSqlEntity> list2 = sellWineSqlRepository.findBySelldateBetween(startDateOfYear, endDateOfYear);

            map.put(String.valueOf(year), list.size() + list2.size());
        }

        return map;

    }

    public Map<String, Object> getSellDoneWineCount(String startDate, String endDate) throws ParseException {

        String startYear = startDate.split("-")[0];
        String endYear = endDate.split("-")[0];

        int startYearInt = Integer.parseInt(startYear);
        int endYearInt = Integer.parseInt(endYear) + 1;

        Map<String, Object> map = new HashMap<>();

        for (int year = startYearInt + 1; year <= endYearInt; year++) {
            String startOfYear = year + "-01-01";
            String endOfYear = year + "-12-31";

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date startDateOfYear = dateFormat.parse(startOfYear);
            Date endDateOfYear = dateFormat.parse(endOfYear);

            List<InfoWineSellEntity> list = infoWineSellRepository.findBySellDateBetween(startDateOfYear,
                    endDateOfYear);
            List<InfoWineSellEntity> templist = new ArrayList<>();

            for (InfoWineSellEntity entity : list) {
                if (entity.getSellStock().equals("0")) {
                    templist.add(entity);
                } else {
                    continue;
                }
            }

            List<SellWineSqlEntity> list2 = sellWineSqlRepository.findBySelldateBetween(startDateOfYear, endDateOfYear);
            List<SellWineSqlEntity> templist2 = new ArrayList<>();

            for (SellWineSqlEntity entity : list2) {
                if (entity.getStock().equals("0")) {
                    templist2.add(entity);
                } else {
                    continue;
                }
            }

            map.put(String.valueOf(year), templist.size() + templist2.size());

        }

        return map;
    }

    public Map<String, Integer> getInsertWineCountMonthly(String startDate, String endDate) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date start = sdf.parse(startDate);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(sdf.parse(endDate));
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        calendar.add(Calendar.MONTH, 1);

        Date end = calendar.getTime();

        List<InfoWineSellEntity> list = infoWineSellRepository.findAll();

        Map<String, Integer> monthlyCounts = new TreeMap<>();

        // 시작일부터 종료일까지의 모든 월에 대해 반복
        Calendar loopCalendar = Calendar.getInstance();
        loopCalendar.setTime(start);
        while (!loopCalendar.getTime().after(end)) {
            String monthKey = sdf.format(loopCalendar.getTime()).substring(0, 7); // 월까지만 포함된 키 생성
            monthlyCounts.put(monthKey, 0); // 초기값 설정
            loopCalendar.add(Calendar.MONTH, 1); // 다음 달로 이동
        }

        // 월별 회원 수 계산
        for (InfoWineSellEntity entity : list) {
            Date joinDate = sdf.parse(String.valueOf(entity.getSellDate()));
            if (!joinDate.before(start) && !joinDate.after(end)) { // 시작일과 종료일 사이의 가입일인 경우
                String monthKey = sdf.format(joinDate).substring(0, 7);
                monthlyCounts.put(monthKey, monthlyCounts.get(monthKey) + 1); // 해당 월의 회원 수 증가
            }
        }
        return monthlyCounts;
    }

    public Map<String, Integer> getDoneSellWineCount(String startDate, String endDate) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date start = sdf.parse(startDate);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(sdf.parse(endDate));
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        calendar.add(Calendar.MONTH, 1);
        Date end = calendar.getTime();

        List<SellWineSqlEntity> list = sellWineSqlRepository.findAll();

        Map<String, Integer> monthlyCounts = new TreeMap<>();

        // 시작일부터 종료일까지의 모든 월에 대해 반복
        Calendar loopCalendar = Calendar.getInstance();
        loopCalendar.setTime(start);
        while (!loopCalendar.getTime().after(end)) {
            String monthKey = sdf.format(loopCalendar.getTime()).substring(0, 7); // 월까지만 포함된 키 생성
            monthlyCounts.put(monthKey, 0); // 초기값 설정
            loopCalendar.add(Calendar.MONTH, 1); // 다음 달로 이동
        }

        // 월별 회원 수 계산
        for (SellWineSqlEntity entity : list) {
            Date joinDate = sdf.parse(String.valueOf(entity.getSelldate()));
            if (!joinDate.before(start) && !joinDate.after(end)) { // 시작일과 종료일 사이의 가입일인 경우
                String monthKey = sdf.format(joinDate).substring(0, 7);
                monthlyCounts.put(monthKey, monthlyCounts.get(monthKey) + 1); // 해당 월의 회원 수 증가
            }
        }
        return monthlyCounts;

    }
}
