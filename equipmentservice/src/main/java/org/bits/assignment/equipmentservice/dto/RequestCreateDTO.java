package org.bits.assignment.equipmentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO used to create a new equipment request.
 * Carries user, equipment, and requested date information.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestCreateDTO {
    private String userId;
    private String equipmentId;
    private LocalDate requestDate;
    private LocalDate returnDate;
    private String notes;
}
