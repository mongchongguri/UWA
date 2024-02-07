package com.uwa.uswine.mypage.diary;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.language.v1.*;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;

    // 일기 입력
    public int saveDiary(DiaryEntity diary){
//        String date = diary.getDiarydate();
//        String formatDate = date.split(" ")[0];
//        diary.setDiarydate(formatDate);
        try {
            diaryRepository.save(diary);
            return 1;
        }catch (Exception e){
            return -1;
        }
    }

    // 일기 삭제
    public int deleteDiary(DiaryDTO diaryDTO){
        System.out.println("삭제 요청");
        System.out.println("삭제id확인 : "+diaryDTO.getId());
        Optional<DiaryEntity> delDiary = diaryRepository.findById(diaryDTO.getId());
        delDiary.ifPresent(diaryRepository::delete);
        return delDiary.isPresent() ? 1 : 0;
    }

    public List<DiaryEntity> getDiaryList(DiaryDTO diaryDTO){

        return diaryRepository.findAllByDiarydateContainingAndEmail(diaryDTO.getDiarydate().split(" ")[0], diaryDTO.getEmail());

    }

    public List<DiaryEntity> getAllDiaryList(DiaryDTO diaryDTO){
        return  diaryRepository.findAllByEmail(diaryDTO.getEmail());
    }



    public Optional<DiaryEntity> getDiary(DiaryDTO diaryDTO){
        System.out.println("하나만 : "+diaryDTO.getId());
        Optional<DiaryEntity> diaryOne = diaryRepository.findById(diaryDTO.getId());
        return diaryOne;
    }

    public Sentiment getSentiment(String content) throws IOException {

        // 인증 키 파일 경로 설정
        String keyPath = "C:/Users/dpqbw/Desktop/uswine/src/main/java/com/uwa/uswine/mypage/diary/seraphic-camera-413007-80fc598ef314.json";
        System.out.println("키패쓰 : "+keyPath);
        // 인증 키 파일을 사용하여 Credentials 객체 생성
        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(keyPath));
        System.out.println("크레댄셜 : " + credentials);

        try (LanguageServiceClient language = LanguageServiceClient.create(LanguageServiceSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build())) {
            System.out.println("get content : "+ content );
            Document doc = Document.newBuilder().setContent(content).setType(Document.Type.PLAIN_TEXT).build();
            AnalyzeSentimentResponse response = language.analyzeSentiment(doc);
            Sentiment sentiment = response.getDocumentSentiment();

            if (sentiment == null) {
                System.out.println("No sentiment found");
            } else {
                System.out.printf("Sentiment magnitude: %.3f\n", sentiment.getMagnitude());
                System.out.printf("Sentiment score: %.3f\n", sentiment.getScore());
                return sentiment;
            }
        } catch (Exception e) {
            return null;
        }

        return null;
    }
}