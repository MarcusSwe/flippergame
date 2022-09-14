package com.example.flipperbackend;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document("scores")
public class Score {

    private String name;
    private long score;

    public Score(String name, long score){
        this.name = name;
        this.score = score;
    }

}
