package com.uwa.uswine;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@SpringBootApplication
@EnableMongoRepositories
public class UswineApplication {

	public static void main(String[] args) {
		SpringApplication.run(UswineApplication.class, args);
	}

}
