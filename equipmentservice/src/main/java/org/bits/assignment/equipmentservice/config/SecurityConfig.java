package org.bits.assignment.equipmentservice.config;

import org.bits.assignment.equipmentservice.security.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // public reads
                        .requestMatchers(HttpMethod.GET, "/api/equipment/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/equipment/search").permitAll()

                        // requests: creating a request needs authenticated user (student/staff)
                        .requestMatchers(HttpMethod.POST, "/api/requests").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/requests").authenticated()

                        // approvals and equipment management restricted to ADMIN or STAFF where appropriate
                        .requestMatchers("/api/equipment/**").hasRole("ADMIN") // POST/PUT/DELETE paths fall here
                        .requestMatchers("/api/approvals/**").hasAnyRole("ADMIN","STAFF")
                        .requestMatchers("/api/requests/*/status").hasAnyRole("ADMIN","STAFF")

                        // other endpoints require auth
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
