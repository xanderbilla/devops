package com.certcook.Backend.service;

import com.certcook.Backend.dto.CategoryResponse;
import com.certcook.Backend.dto.CourseResponse;
import com.certcook.Backend.dto.InstructorResponse;
import com.certcook.Backend.model.Category;
import com.certcook.Backend.model.Course;
import com.certcook.Backend.model.Instructor;
import com.certcook.Backend.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    // Convert entity to DTO
    private CourseResponse mapToResponse(Course c) {
        InstructorResponse instructorResponse = null;
        if (c.getInstructor() != null) {
            Instructor inst = c.getInstructor();
            instructorResponse = new InstructorResponse(
                inst.getId(),
                inst.getName(),
                inst.getBio(),
                inst.getExpertise(),
                inst.getImageUrl(),
                inst.getRating(),
                inst.getStudentsCount(),
                inst.getCoursesCount()
            );
        }
        
        CategoryResponse categoryResponse = null;
        if (c.getCategory() != null) {
            Category cat = c.getCategory();
            categoryResponse = new CategoryResponse(
                cat.getId(),
                cat.getName(),
                cat.getSlug(),
                cat.getDescription()
            );
        }
        
        return new CourseResponse(
            c.getId(),
            c.getTitle(),
            c.getDescription(),
            c.getCategoryId(),
            c.getInstructorId(),
            c.getPrice(),
            c.getDuration(),
            c.getLevel(),
            c.getThumbnailUrl(),
            c.getVideoUrl(),
            c.isFeatured(),
            c.getRating(),
            c.getStudentsEnrolled(),
            instructorResponse,
            categoryResponse
        );
    }

    public List<CourseResponse> getFeaturedCourses() {
        return courseRepository.findByIsFeatured(true)
                .stream().map(this::mapToResponse).toList();
    }

    public CourseResponse getCourseById(String id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return mapToResponse(course);
    }

    public List<CourseResponse> getAllCourses() {
        return courseRepository.findAll()
                .stream().map(this::mapToResponse).toList();
    }

    public List<CourseResponse> getCoursesByCategory(String categoryId) {
        return courseRepository.findByCategoryId(categoryId)
                .stream().map(this::mapToResponse).toList();
    }

    public List<CourseResponse> searchCourses(String q) {
        return courseRepository.findByTitleContainingIgnoreCase(q)
                .stream().map(this::mapToResponse).toList();
    }
}
