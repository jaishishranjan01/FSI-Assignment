package org.bits.assignment.equipmentservice.client;

import org.bits.assignment.equipmentservice.client.dto.UserValidationResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AuthClientRest {

    private final RestTemplate restTemplate;
    private final String validateUrl;

    public AuthClientRest(RestTemplate restTemplate, @Value("${auth.service.url}") String validateUrl) {
        this.restTemplate = restTemplate;
        this.validateUrl = validateUrl;
    }

    public UserValidationResponse validateToken(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, token);
        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<UserValidationResponse> response =
                restTemplate.exchange(validateUrl, HttpMethod.GET, request, UserValidationResponse.class);

        return response.getBody();
    }
}
