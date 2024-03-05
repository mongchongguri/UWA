package com.uwa.uswine.adminchart.service;

import com.uwa.uswine.mypage.cart.entity.WineTransactionEntity;
import com.uwa.uswine.mypage.cart.repository.WineTransactionRepository;
import com.uwa.uswine.seller.management.entity.AdminRevenueEntity;
import com.uwa.uswine.seller.management.repository.AdminRevenueRepository;
import com.uwa.uswine.user.entity.UserEntity;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PriceInfoService {

    // 관리자단 출금관리 repository
    private final AdminRevenueRepository adminRevenueRepository;
    // 거래장부 repository
    private final WineTransactionRepository wineTransactionRepository;

    public PriceInfoService(AdminRevenueRepository adminRevenueRepository,
            WineTransactionRepository wineTransactionRepository) {
        this.adminRevenueRepository = adminRevenueRepository;
        this.wineTransactionRepository = wineTransactionRepository;
    }

    public int getAllPrice() {

        List<WineTransactionEntity> list = wineTransactionRepository.findAll();
        int price = 0;
        int sumPrice = 0;
        int ea = 0;

        for (WineTransactionEntity entity : list) {
            price = Integer.parseInt(entity.getPrice());
            ea = entity.getStock();
            sumPrice += price * ea;
        }

        return sumPrice;
    }

    public List<Integer> getWithdrawAndCharge() {

        List<AdminRevenueEntity> list = adminRevenueRepository.findAll();

        int withdraw = 0;
        int sumWithdraw = 0;

        int charge = 0;
        int sumCharge = 0;

        for (AdminRevenueEntity entity : list) {
            // 출금금액
            withdraw = Integer.parseInt(entity.getWithdraw());
            sumWithdraw += withdraw;

            // 수수료
            charge = Integer.parseInt(entity.getRevenue());
            sumCharge += charge;
        }

        List<Integer> rslist = new ArrayList<>();
        rslist.add(sumWithdraw);
        rslist.add(sumCharge);

        return rslist;
    }

    public Map<String, Object> getPriceCount(String startDate, String endDate) throws ParseException {
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

            List<WineTransactionEntity> entities = wineTransactionRepository.findByTimestampBetween(startDateOfYear,
                    endDateOfYear);

            int priceSum = 0;
            int priceRs = 0;

            for (WineTransactionEntity en : entities) {
                priceSum = Integer.parseInt(en.getPrice()) * en.getStock();
                priceRs += priceSum;
            }

            map.put(String.valueOf(year), priceRs);

        }

        return map;

    }

    public Map<String, Object> getWithdrawCount(String startDate, String endDate) throws ParseException {

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

            List<AdminRevenueEntity> entities = adminRevenueRepository.findByTimestampBetween(startDateOfYear,
                    endDateOfYear);

            int withdrawSum = 0;
            int withdrawRs = 0;

            for (AdminRevenueEntity entity : entities) {
                withdrawSum = Integer.parseInt(entity.getWithdraw());
                withdrawRs += withdrawSum;
            }

            map.put(String.valueOf(year), withdrawRs);

        }

        return map;
    }

    public Map<String, Object> getRevenueCount(String startDate, String endDate) throws ParseException {

        Map<String, Object> map = new HashMap<>();
        String startYear = startDate.split("-")[0];
        String endYear = endDate.split("-")[0];

        int startYearInt = Integer.parseInt(startYear);
        int endYearInt = Integer.parseInt(endYear) + 1;

        for (int year = startYearInt + 1; year <= endYearInt; year++) {
            String startOfYear = year + "-01-01";
            String endOfYear = year + "-12-31";

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date startDateOfYear = dateFormat.parse(startOfYear);
            Date endDateOfYear = dateFormat.parse(endOfYear);

            List<AdminRevenueEntity> entities = adminRevenueRepository.findByTimestampBetween(startDateOfYear,
                    endDateOfYear);

            int revenueSum = 0;
            int revenueRs = 0;

            for (AdminRevenueEntity entity : entities) {
                revenueSum = Integer.parseInt(entity.getRevenue());
                revenueRs += revenueSum;
            }

            map.put(String.valueOf(year), revenueRs);
        }

        return map;
    }

    public Map<String, Integer> getPriceCountMonthly(String startDate, String endDate) throws ParseException {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date start = sdf.parse(startDate);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(sdf.parse(endDate));
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        calendar.add(Calendar.MONTH, 1);

        Date end = calendar.getTime();

        List<WineTransactionEntity> list = wineTransactionRepository.findAll();

        Map<String, Integer> monthlyCounts = new TreeMap<>();

        // 시작일부터 종료일까지의 모든 월에 대해 반복
        Calendar loopCalendar = Calendar.getInstance();
        loopCalendar.setTime(start);
        while (!loopCalendar.getTime().after(end)) {
            String monthKey = sdf.format(loopCalendar.getTime()).substring(0, 7); // 월까지만 포함된 키 생성
            monthlyCounts.put(monthKey, 0); // 초기값 설정
            loopCalendar.add(Calendar.MONTH, 1); // 다음 달로 이동
        }

        int sum = 0;
        // 월별 회원 수 계산
        for (WineTransactionEntity entity : list) {
            Date joinDate = sdf.parse(String.valueOf(entity.getTimestamp()));
            int price = Integer.parseInt(entity.getPrice());
            sum += price;
            String monthKey = sdf.format(joinDate).substring(0, 7);
            monthlyCounts.put(monthKey, sum);

        }
        return monthlyCounts;
    }

    public Map<String, Integer> getWithdrawCountMonthly(String startDate, String endDate) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date start = sdf.parse(startDate);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(sdf.parse(endDate));
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        calendar.add(Calendar.MONTH, 1);

        Date end = calendar.getTime();

        List<AdminRevenueEntity> list = adminRevenueRepository.findAll();

        Map<String, Integer> monthlyCounts = new TreeMap<>();

        // 시작일부터 종료일까지의 모든 월에 대해 반복
        Calendar loopCalendar = Calendar.getInstance();
        loopCalendar.setTime(start);
        while (!loopCalendar.getTime().after(end)) {
            String monthKey = sdf.format(loopCalendar.getTime()).substring(0, 7); // 월까지만 포함된 키 생성
            monthlyCounts.put(monthKey, 0); // 초기값 설정
            loopCalendar.add(Calendar.MONTH, 1); // 다음 달로 이동
        }

        int sum = 0;
        // 월별 회원 수 계산
        for (AdminRevenueEntity entity : list) {
            Date joinDate = sdf.parse(String.valueOf(entity.getTimestamp()));
            int price = Integer.parseInt(entity.getWithdraw());
            sum += price;
            String monthKey = sdf.format(joinDate).substring(0, 7);
            monthlyCounts.put(monthKey, sum);

        }
        return monthlyCounts;
    }

    public Map<String, Integer> getRevenueCountMonthly(String startDate, String endDate) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date start = sdf.parse(startDate);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(sdf.parse(endDate));
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        calendar.add(Calendar.MONTH, 1);

        Date end = calendar.getTime();

        List<AdminRevenueEntity> list = adminRevenueRepository.findAll();

        Map<String, Integer> monthlyCounts = new TreeMap<>();

        // 시작일부터 종료일까지의 모든 월에 대해 반복
        Calendar loopCalendar = Calendar.getInstance();
        loopCalendar.setTime(start);
        while (!loopCalendar.getTime().after(end)) {
            String monthKey = sdf.format(loopCalendar.getTime()).substring(0, 7); // 월까지만 포함된 키 생성
            monthlyCounts.put(monthKey, 0); // 초기값 설정
            loopCalendar.add(Calendar.MONTH, 1); // 다음 달로 이동
        }

        int sum = 0;
        // 월별 회원 수 계산
        for (AdminRevenueEntity entity : list) {
            Date joinDate = sdf.parse(String.valueOf(entity.getTimestamp()));
            int price = Integer.parseInt(entity.getRevenue());
            sum += price;
            String monthKey = sdf.format(joinDate).substring(0, 7);
            monthlyCounts.put(monthKey, sum);

        }
        return monthlyCounts;
    }
}
