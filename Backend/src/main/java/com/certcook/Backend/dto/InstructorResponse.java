package com.certcook.Backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InstructorResponse {
    private String id;
    private String name;
    private String bio;
    private String expertise;
    
    @JsonProperty("image_url")
    private String image_url;
    
    private double rating;
    
    @JsonProperty("students_count")
    private int students_count;
    
    @JsonProperty("courses_count")
    private int courses_count;
}
