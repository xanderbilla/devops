package com.certcook.Backend.service;

import com.certcook.Backend.dto.CategoryResponse;
import com.certcook.Backend.model.Category;
import com.certcook.Backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    private CategoryResponse convertToDto(Category cat) {
        CategoryResponse dto = new CategoryResponse();
        dto.setId(cat.getId());
        dto.setName(cat.getName());
        dto.setSlug(cat.getSlug());
        dto.setDescription(cat.getDescription());
        return dto;
    }

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<CategoryResponse> getCategoryById(String id) {
        return categoryRepository.findById(id)
                .map(this::convertToDto);
    }

    public Optional<CategoryResponse> getCategoryBySlug(String slug) {
        return categoryRepository.findBySlug(slug)
                .map(this::convertToDto);
    }
}
