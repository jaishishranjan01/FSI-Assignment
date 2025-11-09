package org.bits.assignment.equipmentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EquipmentCreateDTO {
    private String name;
    private String category;
    private String description;
    private int quantity;
    private String condition;
    private String location;
    private List<String> specifications;
    private String usageInstructions;
    private String restrictions;
    private int maintenanceInterval;
}
