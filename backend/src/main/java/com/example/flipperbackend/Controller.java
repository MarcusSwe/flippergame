package com.example.flipperbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class Controller {

    private final ServiceFlipper service;

    @Autowired
    public Controller(ServiceFlipper service){
        this.service = service;
    }

    @GetMapping("/all")
    public List<ScoreDTO> getScores(){
        return service.getScores();
    }

    @PostMapping("/newscore")
    public String createScore(@RequestBody ScoreModel newScore){

        return service.addScore(new Score(newScore.getName(), newScore.getScore()));
    }



}
