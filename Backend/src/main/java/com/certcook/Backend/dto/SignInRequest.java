package com.certcook.Backend.dto;

import lombok.*;

@Getter @Setter
public class SignInRequest {
    private String email;
    private String password;
}