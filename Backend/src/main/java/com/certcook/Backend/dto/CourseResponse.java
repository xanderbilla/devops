package com.certcook.Backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseResponse {

    private String id;
    private String title;
    private String description;
    
    @JsonProperty("category_id")
    private String category_id;
    
    @JsonProperty("instructor_id")
    private String instructor_id;
    
    private double price;
    private String duration;
    private String level;
    
    @JsonProperty("thumbnail_url")
    private String thumbnail_url;
    
    @JsonProperty("video_url")
    private String video_url;
    
    @JsonProperty("is_featured")
    private boolean is_featured;
    
    private double rating;
    
    @JsonProperty("students_enrolled")
    private int students_enrolled;
    
    private InstructorResponse instructor;
    private CategoryResponse category;
}
