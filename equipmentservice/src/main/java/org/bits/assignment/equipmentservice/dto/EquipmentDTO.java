package org.bits.assignment.equipmentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

/**
 * DTO representing equipment details returned by the service.
 * Includes identification, availability, specifications and maintenance data.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EquipmentDTO {
    private Long id;
    private String name;
    private String category;
    private String description;
    private int quantity;
    private int available;
    private String condition;
    private String location;
    private List<String> specifications;
    private String usageInstructions;
    private String restrictions;
    private LocalDate lastMaintenance;
    private int maintenanceInterval;
}
