package com.uwa.uswine.mypage.diary;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/mypage/diary")
public class DiaryController {
    private final DiaryService diaryService;

    @PostMapping("insertD")
    public int insertD(@RequestBody DiaryDTO diaryDTO){
        System.out.println("연결 됨");
        int rs = diaryService.saveDiary(diaryDTO.toEntity());
        System.out.println("결과"+rs);
        return rs;
    }

    @PostMapping("deleteD")
    public int deleteD(@RequestBody DiaryDTO diaryDTO) {
        System.out.println("삭제 연결");
        int rs = diaryService.deleteDiary(diaryDTO);
        System.out.println("결과 : "+rs);
        return rs;
    }

    @PostMapping("all")
    public ResponseEntity<List<DiaryEntity>> getAllDiaryList(@RequestBody DiaryDTO diaryDTO) {
        return ResponseEntity.ok(this.diaryService.getAllDiaryList(diaryDTO));
    }

    @PostMapping("List")
    public ResponseEntity<List<DiaryEntity>> getDiaryList(@RequestBody DiaryDTO diaryDTO){
        System.out.println("list call");
        return ResponseEntity.ok(this.diaryService.getDiaryList(diaryDTO));
    }

    @PostMapping("one")
    public ResponseEntity<DiaryEntity> getDiary(@RequestBody DiaryDTO diaryDTO){
        System.out.println("list call");
        DiaryEntity diaryEntity = this.diaryService.getDiary(diaryDTO).orElseThrow(() -> new EntityNotFoundException("해당 다이어리를 찾을 수 없습니다."));
        return ResponseEntity.ok(diaryEntity);
    }



    @PostMapping("analysis")
    public int getSentiment(@RequestBody DiaryDTO diaryDTO) throws IOException {
        int rs = 0;
        int i = 0;
        List<Float> scoreList = new ArrayList<>();

        List<DiaryEntity> diaryList = this.diaryService.getDiaryList(diaryDTO);
        List<String> contentList = diaryList.stream()
                .map(DiaryEntity::getContent)
                .collect(Collectors.toList());

        for(String content : contentList) {
            Document doc = Jsoup.parse(content);
            content = doc.text();
            float score = this.diaryService.getSentiment(content).getScore();

            if (score == 0.100 || score == 0.00) {
                continue;
            } else {
                scoreList.add(score);
            }
        }
            for(Float score : scoreList) {
            System.out.println("몇점?:"+(int)((score*100.0)/scoreList.size()));
            rs+= (int)((score*100.0)/scoreList.size());
            System.out.println(rs);
            }


        return rs;
    }
}
