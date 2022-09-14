package com.example.flipperbackend;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ScoreRepo extends MongoRepository<Score, Long> {

    //@Query(fields="{'name' : 1, 'score' : 1}")
    List<Score> findAll();

    // public long count();

}
