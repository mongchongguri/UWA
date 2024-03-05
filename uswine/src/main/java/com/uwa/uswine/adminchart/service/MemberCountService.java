package com.uwa.uswine.adminchart.service;

import com.uwa.uswine.adminchart.dto.UserDTO;
import com.uwa.uswine.adminchart.repository.MemberCountRepository;
import com.uwa.uswine.user.entity.UserEntity;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class MemberCountService {

    private final MemberCountRepository memberCountRepository;

    public MemberCountService (MemberCountRepository memberCountRepository){
        this.memberCountRepository = memberCountRepository;
    }

    public Map<String, Object> getLabelsData() {

        List<UserEntity> entity = memberCountRepository.findAll();

        List<String> adminList = new ArrayList<>();
        List<String> sellerList = new ArrayList<>();
        List<String> userList = new ArrayList<>();

        for(UserEntity index: entity){
            String data = String.valueOf(index.getRole());
            String role = data.split("_")[1];

            if(role.equals("USER")){
                userList.add(role);
            } else if(role.equals("SELLER")){
                sellerList.add(role);
            } else {
                adminList.add(role);
            }
        }

        Map<String, Object> map = new HashMap<>();
        map.put("user", userList);
        map.put("admin", adminList);
        map.put("seller", sellerList);


        return map;
    }

    public Map<String, Object> getMemberCount(String startDate, String endDate) throws ParseException {

        Map<String, Object> map = new HashMap<>();

        int startnumber;
        int endnumber;

        startnumber = Integer.parseInt(startDate.split("-")[0])+1;
        endnumber = Integer.parseInt(endDate.split("-")[0])+1;
        for(int i=startnumber; i<=endnumber; i++){

            String year = String.valueOf(i);

            List<UserEntity> list = memberCountRepository.findByJoindateContaining(year);

            map.put(year, list.size());

        }

        return map;
    }

    public Map<String, Integer> getMemberCountMonthly(String startDate, String endDate) throws ParseException {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date start = sdf.parse(startDate);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(sdf.parse(endDate));
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        calendar.add(Calendar.MONTH, 1);
        Date end = calendar.getTime();

        List<UserEntity> list = memberCountRepository.findAll();

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
        for (UserEntity entity : list) {
            Date joinDate = sdf.parse(entity.getJoindate());
            if (!joinDate.before(start) && !joinDate.after(end)) { // 시작일과 종료일 사이의 가입일인 경우
                String monthKey = sdf.format(joinDate).substring(0, 7);
                monthlyCounts.put(monthKey, monthlyCounts.get(monthKey) + 1); // 해당 월의 회원 수 증가
            }
        }


        return monthlyCounts;
    }


}
