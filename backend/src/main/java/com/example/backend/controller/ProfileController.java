package com.example.backend.controller;

import com.example.backend.dto.ProfileResponse;
import com.example.backend.dto.ProfileUpdateRequest;
import com.example.backend.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<?> getProfile(Authentication authentication) {
        try {
            String email = authentication.getName();
            ProfileResponse profile = profileService.getProfile(email);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error loading profile: " + e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> updateProfile(Authentication authentication, @RequestBody ProfileUpdateRequest request) {
        try {
            String email = authentication.getName();
            ProfileResponse updated = profileService.updateProfile(email, request);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating profile: " + e.getMessage());
        }
    }
}
