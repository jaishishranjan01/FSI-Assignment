package org.bits.assignment.equipmentservice.service;

import org.bits.assignment.equipmentservice.dto.EquipmentCreateDTO;
import org.bits.assignment.equipmentservice.dto.EquipmentDTO;

import java.util.List;

/**
 * Service interface for managing equipment inventory.
 * Provides methods to list, retrieve, search, create, update and delete equipment.
 */
public interface EquipmentService {

    List<EquipmentDTO> getAllEquipment();

    EquipmentDTO getEquipmentById(Long id);

    List<EquipmentDTO> searchEquipment(String query, String category);

    EquipmentDTO createEquipment(EquipmentCreateDTO dto);

    EquipmentDTO updateEquipment(Long id, EquipmentCreateDTO dto);

    void deleteEquipment(Long id);
}
