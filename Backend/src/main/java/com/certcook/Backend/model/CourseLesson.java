package com.certcook.Backend.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseLesson {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "module_id") // FK column
    private CourseModule module;

    private String title;

    private String videoUrl;

    private String duration;

    private Integer orderIndex;

}
