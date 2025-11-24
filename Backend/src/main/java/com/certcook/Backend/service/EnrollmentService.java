package com.certcook.Backend.service;

import com.certcook.Backend.dto.CategoryResponse;
import com.certcook.Backend.dto.CourseResponse;
import com.certcook.Backend.dto.EnrollmentResponse;
import com.certcook.Backend.dto.InstructorResponse;
import com.certcook.Backend.model.Category;
import com.certcook.Backend.model.Course;
import com.certcook.Backend.model.Enrollment;
import com.certcook.Backend.model.Instructor;
import com.certcook.Backend.model.User;
import com.certcook.Backend.repository.EnrollmentRepository;
import com.certcook.Backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository, UserRepository userRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
    }

    private EnrollmentResponse mapToResponse(Enrollment e) {
        EnrollmentResponse response = new EnrollmentResponse();
        response.setId(e.getId());
        response.setUser_id(e.getUserId());
        response.setCourse_id(e.getCourse() != null ? e.getCourse().getId() : null);
        response.setEnrolled_at(e.getEnrolledAt() != null ? e.getEnrolledAt().toString() : null);
        response.setProgress_percentage(e.getProgressPercentage() != null ? e.getProgressPercentage() : 0.0);

        // Map course if present
        if (e.getCourse() != null) {
            Course c = e.getCourse();
            
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
            
            CourseResponse courseResponse = new CourseResponse(
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
            
            response.setCourse(courseResponse);
        }

        return response;
    }

    public List<EnrollmentResponse> getUserEnrollments(String userId) {
        return enrollmentRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public boolean isUserEnrolled(String userId, String courseId) {
        return enrollmentRepository.findByUserId(userId)
                .stream()
                .anyMatch(e -> e.getCourseId() != null && e.getCourseId().equals(courseId));
    }

    public List<String> getUserEnrolledCourseIds(String userId) {
        return enrollmentRepository.findByUserId(userId)
                .stream()
                .map(Enrollment::getCourseId)
                .filter(id -> id != null)
                .collect(Collectors.toList());
    }

    // Methods that work with email instead of userId
    public List<EnrollmentResponse> getUserEnrollmentsByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            return List.of();
        }
        String userId = String.valueOf(user.get().getId());
        return getUserEnrollments(userId);
    }

    public boolean isUserEnrolledByEmail(String email, String courseId) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            return false;
        }
        String userId = String.valueOf(user.get().getId());
        return isUserEnrolled(userId, courseId);
    }

    public List<String> getUserEnrolledCourseIdsByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            return List.of();
        }
        String userId = String.valueOf(user.get().getId());
        return getUserEnrolledCourseIds(userId);
    }
}
