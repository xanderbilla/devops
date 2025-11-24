package com.certcook.Backend.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.certcook.Backend.service.CourseService;
import com.certcook.Backend.dto.CourseResponse;

@RestController
@RequestMapping("/public/courses")
@CrossOrigin(origins = "*")

//public Api's for Course
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    //to GET all courses
    @GetMapping
    public List<CourseResponse> getAllCourses() {
        return courseService.getAllCourses();
    }

    //to GET all featured courses
    @GetMapping("/featured")
    public List<CourseResponse> getFeaturedCourses() {
        return courseService.getFeaturedCourses();
    }

    //to GET course by ID
    @GetMapping("/{id}")
    public CourseResponse getCourseById(@PathVariable String id) {
        return courseService.getCourseById(id);
    }


    //to GET courses by category
    @GetMapping("/category/{categoryId}")
    public List<CourseResponse> getCoursesByCategory(@PathVariable String categoryId) {
        return courseService.getCoursesByCategory(categoryId);
    }

    // Search courses
    @GetMapping("/search")
    public List<CourseResponse> searchCourses(@RequestParam String q) {
        return courseService.searchCourses(q);
    }
}