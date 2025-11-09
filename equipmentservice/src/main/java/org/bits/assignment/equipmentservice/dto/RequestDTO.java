package org.bits.assignment.equipmentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO representing a request record returned by the service.
 * Includes request metadata, status and timestamps.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestDTO {
    private Long id;
    private String userId;
    private String equipmentId;
    private String equipmentName;
    private LocalDate requestDate;
    private LocalDate returnDate;
    private String notes;
    private String status;
    private LocalDate createdAt;
}
