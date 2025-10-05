package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())  // Disable CSRF for API
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()  // Allow login/register
                .anyRequest().authenticated()  // Protect other endpoints
            )
            .formLogin(login -> login.disable()) // Disable form login
            .httpBasic(basic -> basic.disable()); // Disable basic auth

        return http.build();
    }
}
