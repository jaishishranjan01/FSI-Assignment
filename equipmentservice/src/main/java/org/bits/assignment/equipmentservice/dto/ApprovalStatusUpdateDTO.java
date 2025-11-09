package org.bits.assignment.equipmentservice.dto;

import lombok.Data;

/**
 * DTO used to update the approval status of an equipment request.
 *
 * <p>Expected values for `status` are "APPROVED" or "REJECTED". `notes` may contain optional
 * reviewer comments explaining the decision.
 */
@Data
public class ApprovalStatusUpdateDTO {
    private String status; // APPROVED or REJECTED
    private String notes;
}
