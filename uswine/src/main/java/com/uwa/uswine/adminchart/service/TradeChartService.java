package com.uwa.uswine.adminchart.service;

import com.uwa.uswine.adminchart.dto.AdminRevenueDTO;
import com.uwa.uswine.adminchart.dto.WineTransactionDTO;
import com.uwa.uswine.mypage.cart.entity.WineTransactionEntity;
import com.uwa.uswine.mypage.cart.repository.WineTransactionRepository;
import com.uwa.uswine.seller.management.entity.AdminRevenueEntity;
import com.uwa.uswine.seller.management.repository.AdminRevenueRepository;
import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class TradeChartService {

    private final WineTransactionRepository wineTransactionRepository;
    private final AdminRevenueRepository adminRevenueRepository;

    public TradeChartService(WineTransactionRepository wineTransactionRepository,
            AdminRevenueRepository adminRevenueRepository) {
        this.wineTransactionRepository = wineTransactionRepository;
        this.adminRevenueRepository = adminRevenueRepository;
    }

    public List<WineTransactionDTO> getTradeList(int page) {

        int size = 10;

        List<Sort.Order> sorts = new ArrayList<>();
        sorts.add(Sort.Order.desc("id"));

        Pageable pageable = PageRequest.of(page, size, Sort.by(sorts));

        Page<WineTransactionEntity> data = wineTransactionRepository.findAll(pageable);

        List<WineTransactionDTO> rslist = new ArrayList<>();

        for (WineTransactionEntity entity : data) {
            WineTransactionDTO dto = new WineTransactionDTO();
            dto.setId(entity.getId());
            dto.setPrice(entity.getPrice());
            dto.setSelleremail(entity.getSelleremail());
            dto.setStock(entity.getStock());
            dto.setTimestamp(entity.getTimestamp());
            dto.setUseremail(entity.getUseremail());
            dto.setUsername(entity.getUsername());
            dto.setWineName(entity.getWineName());
            dto.setSellername(entity.getSellername());
            rslist.add(dto);
        }

        return rslist;
    }

    public List<AdminRevenueDTO> getWithdrawList(int page) {

        int size = 10;

        List<Sort.Order> sorts = new ArrayList<>();
        sorts.add(Sort.Order.desc("id"));

        Pageable pageable = PageRequest.of(page, size, Sort.by(sorts));

        Page<AdminRevenueEntity> list = adminRevenueRepository.findAll(pageable);

        List<AdminRevenueDTO> rslist = new ArrayList<>();

        for (AdminRevenueEntity entity : list) {
            AdminRevenueDTO dto = new AdminRevenueDTO();
            dto.setId(entity.getId());
            dto.setEmail(entity.getEmail());
            dto.setWithdraw(entity.getWithdraw());
            dto.setRevenue(entity.getRevenue());
            rslist.add(dto);
        }

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

            map.put(String.valueOf(year), entities.size());

        }

        return map;
    }

    public Map<String, Integer> getTradeCountMonthly(String startDate, String endDate) throws ParseException {

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

        // 월별 회원 수 계산
        for (WineTransactionEntity entity : list) {
            Date joinDate = sdf.parse(String.valueOf(entity.getTimestamp()));
            if (!joinDate.before(start) && !joinDate.after(end)) { // 시작일과 종료일 사이의 가입일인 경우
                String monthKey = sdf.format(joinDate).substring(0, 7);
                monthlyCounts.put(monthKey, monthlyCounts.get(monthKey) + 1); // 해당 월의 회원 수 증가
            }
        }
        return monthlyCounts;
    }
}
