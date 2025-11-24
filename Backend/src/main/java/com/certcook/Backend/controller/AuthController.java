package com.certcook.Backend.controller;

import com.certcook.Backend.dto.AuthenticationResponse;
import com.certcook.Backend.dto.SignInRequest;
import com.certcook.Backend.dto.SignUpRequest;
import com.certcook.Backend.model.User;
import com.certcook.Backend.repository.UserRepository;
import com.certcook.Backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:8081", "http://localhost:5173"})
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final UserDetailsService userDetailsService;

    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, UserRepository userRepository, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User();
        user.setFullName(signUpRequest.getFullName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        userRepository.save(user);

//        return ResponseEntity.ok(Map.of("message", "User registered successfully!"));

        final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        // Return the same response as signin
        return ResponseEntity.ok(new AuthenticationResponse(jwt, user.getEmail(), user.getFullName()));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SignInRequest signInRequest) {
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            // If authentication fails, return an unauthorized error
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Incorrect email or password"));
        }

        // If authentication is successful, generate a JWT
        final UserDetails userDetails = userDetailsService.loadUserByUsername(signInRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        // Fetch the full user object to get details for the response payload
        User user = userRepository.findByEmail(signInRequest.getEmail())
                .orElseThrow(() -> new IllegalStateException("User not found after successful authentication."));

        // Return the JWT and user info in the response
        return ResponseEntity.ok(new AuthenticationResponse(jwt, user.getEmail(), user.getFullName()));
    }
}
