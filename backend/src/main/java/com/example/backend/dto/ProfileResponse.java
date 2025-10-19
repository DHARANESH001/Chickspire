package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileResponse {
    private String username;
    private String email;
    private String farmName;
    private String location;
    private String phone;
}
