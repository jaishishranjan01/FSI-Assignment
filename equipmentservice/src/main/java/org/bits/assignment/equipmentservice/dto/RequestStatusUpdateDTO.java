package org.bits.assignment.equipmentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestStatusUpdateDTO {
    private String status; // PENDING, APPROVED, REJECTED, RETURNED, OVERDUE
}
