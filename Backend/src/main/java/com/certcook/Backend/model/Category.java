package com.certcook.Backend.model;

import lombok.*;
import jakarta.persistence.*;
import java.util.List;

@Data
@Entity

public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    private String slug;
    private String description;
}
