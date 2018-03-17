package se.munhunger.wunderbaren.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Created by munHunger on 2018-03-12.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {
    public String userId;

    public int wallet;
}
