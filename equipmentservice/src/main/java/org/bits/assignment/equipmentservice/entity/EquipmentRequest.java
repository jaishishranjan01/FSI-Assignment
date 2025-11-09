package org.bits.assignment.equipmentservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "equipment_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EquipmentRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long equipmentId;
    private Long userId;
    private LocalDate requestDate;
    private LocalDate returnDate;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    @Column(length = 1000)
    private String notes;

    private LocalDateTime createdAt;
}
