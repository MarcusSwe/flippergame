package com.example.flipperbackend;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class FlipperBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(FlipperBackendApplication.class, args);
    }

}
