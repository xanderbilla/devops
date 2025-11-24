package com.certcook.Backend.repository;

import com.certcook.Backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, String> {
    List<Course> findByIsFeatured(boolean isFeatured);
    List<Course> findByCategoryId(String categoryId);
    List<Course> findByTitleContainingIgnoreCase(String title);
}
