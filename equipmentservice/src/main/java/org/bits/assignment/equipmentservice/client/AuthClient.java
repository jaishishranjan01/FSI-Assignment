package org.bits.assignment.equipmentservice.client;

import org.bits.assignment.equipmentservice.client.dto.UserValidationResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

// points to /api/auth/validate on your auth service
@FeignClient(name = "authService", url = "${auth.service.url}")
public interface AuthClient {

    @GetMapping
    UserValidationResponse validateToken(@RequestHeader("Authorization") String authorization);
}
