package org.bits.assignment.equipmentservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.bits.assignment.equipmentservice.dto.EquipmentCreateDTO;
import org.bits.assignment.equipmentservice.dto.EquipmentDTO;
import org.bits.assignment.equipmentservice.entity.Equipment;
import org.bits.assignment.equipmentservice.repository.EquipmentRepository;
import org.bits.assignment.equipmentservice.service.EquipmentService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EquipmentServiceImpl implements EquipmentService {

    private final EquipmentRepository equipmentRepository;

    @Override
    public List<EquipmentDTO> getAllEquipment() {
        return equipmentRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public EquipmentDTO getEquipmentById(Long id) {
        return equipmentRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Equipment not found"));
    }

    @Override
    public List<EquipmentDTO> searchEquipment(String query, String category) {
        if (query != null && !query.isEmpty() && category != null && !category.isEmpty()) {
            return equipmentRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query)
                    .stream()
                    .filter(e -> e.getCategory().equalsIgnoreCase(category))
                    .map(this::toDTO)
                    .collect(Collectors.toList());
        } else if (query != null && !query.isEmpty()) {
            return equipmentRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query)
                    .stream().map(this::toDTO).collect(Collectors.toList());
        } else if (category != null && !category.isEmpty()) {
            return equipmentRepository.findByCategory(category)
                    .stream().map(this::toDTO).collect(Collectors.toList());
        } else {
            return getAllEquipment();
        }
    }

    @Override
    public EquipmentDTO createEquipment(EquipmentCreateDTO dto) {
        Equipment equipment = Equipment.builder()
                .name(dto.getName())
                .category(dto.getCategory())
                .description(dto.getDescription())
                .quantity(dto.getQuantity())
                .available(dto.getQuantity())
                .condition(dto.getCondition())
                .location(dto.getLocation())
                .specifications(dto.getSpecifications())
                .usageInstructions(dto.getUsageInstructions())
                .restrictions(dto.getRestrictions())
                .lastMaintenance(LocalDate.now())
                .maintenanceInterval(dto.getMaintenanceInterval())
                .build();

        return toDTO(equipmentRepository.save(equipment));
    }

    @Override
    public EquipmentDTO updateEquipment(Long id, EquipmentCreateDTO dto) {
        Equipment equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipment not found"));

        equipment.setName(dto.getName());
        equipment.setCategory(dto.getCategory());
        equipment.setDescription(dto.getDescription());
        equipment.setQuantity(dto.getQuantity());
        equipment.setAvailable(dto.getQuantity());
        equipment.setCondition(dto.getCondition());
        equipment.setLocation(dto.getLocation());
        equipment.setSpecifications(dto.getSpecifications());
        equipment.setUsageInstructions(dto.getUsageInstructions());
        equipment.setRestrictions(dto.getRestrictions());
        equipment.setMaintenanceInterval(dto.getMaintenanceInterval());

        return toDTO(equipmentRepository.save(equipment));
    }

    @Override
    public void deleteEquipment(Long id) {
        equipmentRepository.deleteById(id);
    }

    private EquipmentDTO toDTO(Equipment equipment) {
        return EquipmentDTO.builder()
                .id(equipment.getId())
                .name(equipment.getName())
                .category(equipment.getCategory())
                .description(equipment.getDescription())
                .quantity(equipment.getQuantity())
                .available(equipment.getAvailable())
                .condition(equipment.getCondition())
                .location(equipment.getLocation())
                .specifications(equipment.getSpecifications())
                .usageInstructions(equipment.getUsageInstructions())
                .restrictions(equipment.getRestrictions())
                .lastMaintenance(equipment.getLastMaintenance())
                .maintenanceInterval(equipment.getMaintenanceInterval())
                .build();
    }
}
