package org.bits.assignment.equipmentservice.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ApprovalDTO {
    private Long id;
    private String userId;
    private String userName;
    private String equipmentId;
    private String equipmentName;
    private LocalDate requestDate;
    private LocalDate returnDate;
    private String reason;
    private String status;
    private String notes;
    private LocalDate createdAt;
}
