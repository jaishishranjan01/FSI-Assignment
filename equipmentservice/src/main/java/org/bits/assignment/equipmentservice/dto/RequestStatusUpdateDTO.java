package org.bits.assignment.equipmentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for updating the status of a request.
 * The status value is expected to be one of: PENDING, APPROVED, REJECTED, RETURNED, OVERDUE.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestStatusUpdateDTO {
    private String status; // PENDING, APPROVED, REJECTED, RETURNED, OVERDUE
}
