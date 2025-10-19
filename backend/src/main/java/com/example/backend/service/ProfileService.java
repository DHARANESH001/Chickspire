package com.example.backend.service;

import com.example.backend.dto.ProfileResponse;
import com.example.backend.dto.ProfileUpdateRequest;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;

    public ProfileResponse getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new ProfileResponse(
                user.getUsername(),
                user.getEmail(),
                user.getFarmName(),
                user.getLocation(),
                user.getPhone()
        );
    }

    public ProfileResponse updateProfile(String email, ProfileUpdateRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(request.getUsername());
        user.setFarmName(request.getFarmName());
        user.setLocation(request.getLocation());
        user.setPhone(request.getPhone());

        userRepository.save(user);

        return new ProfileResponse(
                user.getUsername(),
                user.getEmail(),
                user.getFarmName(),
                user.getLocation(),
                user.getPhone()
        );
    }
}
