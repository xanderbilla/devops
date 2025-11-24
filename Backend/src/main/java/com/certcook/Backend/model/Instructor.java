package com.certcook.Backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Instructor {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    private String bio;
    private String expertise;
    @Column(name = "image_url")
    private String imageUrl;
    private double rating;
    @Column(name = "students_count")
    private int studentsCount;
    @Column(name = "courses_count")
    private int coursesCount;
}
