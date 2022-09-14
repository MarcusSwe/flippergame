package com.example.flipperbackend;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ScoreRepo extends MongoRepository<Score, Long> {
    List<Score> findAll();
}
