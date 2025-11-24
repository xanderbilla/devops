package com.certcook.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentResponse {
    private String id;
    private String user_id;
    private String course_id;
    private String enrolled_at;
    private double progress_percentage;
    private CourseResponse course;
}
