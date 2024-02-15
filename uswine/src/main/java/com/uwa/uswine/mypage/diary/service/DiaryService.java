package com.uwa.uswine.mypage.diary.service;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.language.v1.*;
import com.uwa.uswine.main.wine.entity.WineEntity;
import com.uwa.uswine.main.wine.repository.WineListRepository;
import com.uwa.uswine.mypage.diary.dto.DiaryDTO;
import com.uwa.uswine.mypage.diary.entity.DiaryEntity;
import com.uwa.uswine.mypage.diary.entity.AromaEntity;
import com.uwa.uswine.mypage.diary.repository.DiaryRepository;
import com.uwa.uswine.mypage.diary.repository.AromaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;


@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;
    private final AromaRepository aromaRepository;
    private final WineListRepository wineListRepository;

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

    // 기분 분석 하기
    public Sentiment getSentiment(String content) throws IOException {

        // resource 파일 내 json 경로 찾아오기
        ClassPathResource resource = new ClassPathResource("keyPath/seraphic-camera-413007-80fc598ef314.json");

        // 인증 키 파일을 사용하여 Credentials 객체 생성
        GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());
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

    // 아로마 찾아오기
    public AromaEntity getRandomAromaList (int rank) {

        // 모든 aroma
        AromaEntity allAroma = aromaRepository.findByRank(String.valueOf(rank)).block();
        // 랜덤 추천 개수
        int recommendCount = 4;

        // [랜덤 뽑기]
        // 추천 개수 보다 아로마가 적을 경우 걍 전부 반환
        if (allAroma.getAroma().size() <= recommendCount) {
            return allAroma;
        } else {
            // 추천 아로마 담을 객체 생성
            AromaEntity randomAromaList = new AromaEntity();
            List<String> ls = new ArrayList<>();
            randomAromaList.setAroma(ls);
            // 랜덤
            Random random = new Random();
            // 추천 개수 채워질때까지
            while (randomAromaList.getAroma().size() < recommendCount) {
                // 아로마리스트 사이즈 중 랜덤으로 숫자 뽑아서 그에 맞는 인덱스로 반환
                String randomAroma = allAroma.getAroma().get(random.nextInt(allAroma.getAroma().size()));
                // 혹시 이미 있는거면 빼고 다시 뽑기
                if (!randomAromaList.getAroma().contains(randomAroma)) {
                    randomAromaList.getAroma().add(randomAroma);
                }
            }
            return randomAromaList;
        }
    }

    public List<WineEntity> getRecommendedWineList (List<String> aromaList) {

        List<WineEntity> allRandomWineList = wineListRepository.findByWineAroma(aromaList).collectList().block();
        System.out.println(allRandomWineList.size());
        int recommendCount = 4;

        if (allRandomWineList.size() <= 4) {
            return allRandomWineList;
        } else {
            List<WineEntity> randomWineList = new ArrayList<>();
            Random random = new Random();
            while (randomWineList.size() < recommendCount) {
                WineEntity randomWine = allRandomWineList.get(random.nextInt(allRandomWineList.size()));
                if (!randomWineList.contains(randomWine)) {
                    randomWineList.add(randomWine);
                }
            }
            return randomWineList;
        }
    }


    }
