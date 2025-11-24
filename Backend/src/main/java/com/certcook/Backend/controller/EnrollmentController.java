package com.certcook.Backend.controller;

import com.certcook.Backend.dto.EnrollmentResponse;
import com.certcook.Backend.service.EnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @GetMapping("/my-courses")
    public ResponseEntity<List<EnrollmentResponse>> getMyEnrollments(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        
        String userEmail = authentication.getName();
        List<EnrollmentResponse> enrollments = enrollmentService.getUserEnrollmentsByEmail(userEmail);
        return ResponseEntity.ok(enrollments);
    }

    @GetMapping("/check/{courseId}")
    public ResponseEntity<Boolean> isEnrolled(@PathVariable String courseId, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.ok(false);
        }
        
        String userEmail = authentication.getName();
        boolean enrolled = enrollmentService.isUserEnrolledByEmail(userEmail, courseId);
        return ResponseEntity.ok(enrolled);
    }

    @GetMapping("/my-course-ids")
    public ResponseEntity<List<String>> getMyEnrolledCourseIds(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.ok(List.of());
        }
        
        String userEmail = authentication.getName();
        List<String> courseIds = enrollmentService.getUserEnrolledCourseIdsByEmail(userEmail);
        return ResponseEntity.ok(courseIds);
    }
}
