package org.bits.assignment.equipmentservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

/**
 * Entity representing an equipment item in inventory.
 * Includes metadata such as name, category, quantity, location,
 * specifications, usage guidelines and maintenance information.
 */
@Entity
@Table(name = "equipment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private String description;
    private int quantity;
    private int available;
    private String condition;
    private String location;

    @ElementCollection
    @CollectionTable(name = "equipment_specifications", joinColumns = @JoinColumn(name = "equipment_id"))
    @Column(name = "specifications")
    private List<String> specifications;


    private String usageInstructions;
    private String restrictions;

    private LocalDate lastMaintenance;
    private int maintenanceInterval; // in days
}
