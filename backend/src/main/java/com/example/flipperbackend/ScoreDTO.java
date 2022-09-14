package com.example.flipperbackend;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScoreDTO {

    private String name;
    private long score;

    public ScoreDTO(String name, long score){
        this.name = name;
        this.score = score;
    }

}
