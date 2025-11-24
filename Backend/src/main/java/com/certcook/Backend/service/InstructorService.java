package com.certcook.Backend.service;

import com.certcook.Backend.dto.InstructorResponse;
import com.certcook.Backend.model.Instructor;
import com.certcook.Backend.repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InstructorService {

    private final InstructorRepository instructorRepository;

    @Autowired
    public InstructorService(InstructorRepository instructorRepository) {
        this.instructorRepository = instructorRepository;
    }

    // Convert Model -> DTO
    private InstructorResponse convertToDto(Instructor inst) {
        InstructorResponse dto = new InstructorResponse();
        dto.setId(inst.getId());
        dto.setName(inst.getName());
        dto.setBio(inst.getBio());
        dto.setExpertise(inst.getExpertise());
        dto.setImage_url(inst.getImageUrl());
        dto.setRating(inst.getRating());
        dto.setStudents_count(inst.getStudentsCount());
        dto.setCourses_count(inst.getCoursesCount());
        return dto;
    }

    // Get all instructors
    public List<InstructorResponse> getAllInstructors() {
        return instructorRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get instructor by ID
    public Optional<InstructorResponse> getInstructorById(String id) {
        return instructorRepository.findById(id)
                .map(this::convertToDto);
    }

}
