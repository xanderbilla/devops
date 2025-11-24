package com.certcook.Backend.controller;

import com.certcook.Backend.dto.InstructorResponse;
import com.certcook.Backend.service.InstructorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/instructors")
@CrossOrigin(origins = "*")
public class InstructorController {

    private final InstructorService instructorService;

    public InstructorController(InstructorService instructorService) {
        this.instructorService = instructorService;
    }

    // Get all instructors
    @GetMapping
    public ResponseEntity<List<InstructorResponse>> getAllInstructors() {
        return ResponseEntity.ok(instructorService.getAllInstructors());
    }

    // Get instructor by ID
    @GetMapping("/{id}")
    public ResponseEntity<InstructorResponse> getInstructorById(@PathVariable String id) {
        return instructorService.getInstructorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
