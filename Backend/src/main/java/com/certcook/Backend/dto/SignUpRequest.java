package com.certcook.Backend.dto;

import lombok.*;

@Getter @Setter
public class SignUpRequest {
    private String fullName;
    private String email;
    private String password;
}
