package com.certcook.Backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseModule {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;


    @Column(nullable = false)
    private String courseId;

    private String title;

    private int orderIndex;

    @OneToMany(
            mappedBy = "module",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<CourseLesson> lessons;


}
