package org.bits.assignment.equipmentservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Entity representing a user's equipment request.
 * Captures requester, equipment reference, requested/return dates,
 * status, notes and creation timestamp.
 */
@Entity
@Table(name = "requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String equipmentId;
    private String equipmentName;

    private LocalDate requestDate;
    private LocalDate returnDate;

    private String notes;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDate createdAt;

    public enum Status {
        PENDING, APPROVED, REJECTED, RETURNED, OVERDUE
    }
}
