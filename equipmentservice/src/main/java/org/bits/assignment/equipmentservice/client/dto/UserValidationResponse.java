package org.bits.assignment.equipmentservice.client.dto;

import lombok.Data;

@Data
public class UserValidationResponse {
    // adapt to what your auth/validate returns; this is an example
    private Long id;
    private String email;
    private String role; // e.g., ADMIN, STUDENT, STAFF
    private String status;
}
