package com.certcook.Backend.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Data
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)

    private String id;
    private String title;
    private String description;
    @Column(name = "category_id")
    private String categoryId;
    @Column(name = "instructor_id")
    private String instructorId;
    private double price;
    private String duration;
    private String level;
    @Column(name = "thumbnail_url")
    private String thumbnailUrl;
    @Column (name = "video_url")
    private String videoUrl;
    @Column(name = "is_featured")
    private boolean isFeatured;
    private double rating;
    @Column(name = "students_enrolled")
    private int studentsEnrolled;


    @ManyToOne
    @JoinColumn(name = "instructor_id", insertable = false, updatable = false)
    private Instructor instructor;

    @ManyToOne
    @JoinColumn(name = "category_id", insertable = false, updatable = false)
    private Category category;
}



