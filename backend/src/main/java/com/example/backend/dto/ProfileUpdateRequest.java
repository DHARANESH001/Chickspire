package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProfileUpdateRequest {
    private String username;
    private String farmName;
    private String location;
    private String phone;
}
