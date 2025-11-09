package org.bits.assignment.equipmentservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "equipment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;

    @Column(length = 1000)
    private String description;

    private Integer quantity;
    private Integer available;
    private String condition;
    private String location;

    @ElementCollection
    @CollectionTable(name = "equipment_specifications", joinColumns = @JoinColumn(name = "equipment_id"))
    @Column(name = "spec")
    private List<String> specifications;

    @Column(length = 1000)
    private String usageInstructions;

    private String restrictions;
    private LocalDate lastMaintenance;
    private Integer maintenanceInterval;
}
