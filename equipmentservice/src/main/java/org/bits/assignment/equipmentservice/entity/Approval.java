package org.bits.assignment.equipmentservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Entity representing an approval record for an equipment request.
 * Stores approver information, referenced equipment, request/return dates,
 * status, notes and creation timestamp.
 */
@Entity
@Table(name = "approvals")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Approval {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String userName;

    private String equipmentId;
    private String equipmentName;

    private LocalDate requestDate;
    private LocalDate returnDate;

    private String reason;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String notes;

    private LocalDate createdAt;

    public enum Status {
        PENDING, APPROVED, REJECTED
    }
}
