package com.certcook.Backend.config;

import com.certcook.Backend.repository.CategoryRepository;
import com.certcook.Backend.repository.CourseRepository;
import com.certcook.Backend.repository.InstructorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

import javax.sql.DataSource;

@Configuration
public class DataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Bean
    CommandLineRunner initDatabase(
            DataSource dataSource,
            CategoryRepository categoryRepository,
            InstructorRepository instructorRepository,
            CourseRepository courseRepository
    ) {
        return args -> {
            // Check if data already exists
            long categoryCount = categoryRepository.count();
            long instructorCount = instructorRepository.count();
            long courseCount = courseRepository.count();

            if (categoryCount == 0 && instructorCount == 0 && courseCount == 0) {
                logger.info("Database is empty. Initializing with sample data...");
                
                try {
                    ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
                    populator.addScript(new ClassPathResource("data.sql"));
                    populator.execute(dataSource);
                    
                    logger.info(" Sample data initialized successfully!");
                } catch (Exception e) {
                    logger.error(" Failed to initialize sample data: " + e.getMessage());
                }
            } else {
                logger.info(" Database already contains data. Skipping initialization.");
                logger.info("   Categories: {}, Instructors: {}, Courses: {}", 
                    categoryCount, instructorCount, courseCount);
            }
        };
    }
}
