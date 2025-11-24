package com.certcook.Backend.dto;

import lombok.*;

@Getter
public class AuthenticationResponse {
    private final String token;
    private final String email;
    private final String fullName;

    public AuthenticationResponse(String token, String email, String fullName) {
        this.token = token;
        this.email = email;
        this.fullName = fullName;
    }
}
