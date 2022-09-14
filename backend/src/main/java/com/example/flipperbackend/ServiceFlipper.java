package com.example.flipperbackend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceFlipper {

    private final ScoreRepo scoreRepo;

    @Autowired
    public ServiceFlipper(ScoreRepo scoreRepo){
        this.scoreRepo = scoreRepo;
    }

    public List<ScoreDTO> getScores() {
        List<Score> scores = scoreRepo.findAll();
        return scores.stream().map(x -> new ScoreDTO(x.getName(), x.getScore())).collect(Collectors.toList());
    }

    public String addScore(Score score){
        scoreRepo.save(score);
        return null;
    }

}
