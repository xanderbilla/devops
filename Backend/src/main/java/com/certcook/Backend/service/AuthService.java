package com.certcook.Backend.service;


import org.springframework.stereotype.Service;
import com.certcook.Backend.repository.UserRepository;
import com.certcook.Backend.model.User;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String SignIn(String email, String password) {
        if (email == null || password == null) {
            return "Email and password are required";
        }

        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (user.getPassword().equals(password)) {
                return "Login successful";
            } else {
                return "Invalid credentials";
            }
        }
        return "Invalid credentials";
    }

    public String SignUp(String fullName, String email, String password) {
        if (fullName == null  || email == null || password == null) {
            return "Missing required fields";
        }

        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return "Email already registered";
        }

        User newUser = new User();
        newUser.setFullName(fullName);
        newUser.setEmail(email);
        newUser.setPassword(password);

        userRepository.save(newUser);
        return "User registered successfully";
    }

}
