package com.example.flipperbackend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceFlipper {

    private final ScoreRepo scoreRepo;

    @Autowired
    public ServiceFlipper(ScoreRepo scoreRepo){
        this.scoreRepo = scoreRepo;
    }

    public List<ScoreDTO> getScores() {
        return null;
    }

    public String addScore(Score score){
        scoreRepo.save(score);
        return null;
    }

}
