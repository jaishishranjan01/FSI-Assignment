package org.bits.assignment.equipmentservice.dto;

import lombok.Data;

@Data
public class ApprovalStatusUpdateDTO {
    private String status; // APPROVED or REJECTED
    private String notes;
}
