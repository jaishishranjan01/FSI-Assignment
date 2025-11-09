package org.bits.assignment.equipmentservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.bits.assignment.equipmentservice.entity.Equipment;
import org.bits.assignment.equipmentservice.exception.EquipmentNotFoundException;
import org.bits.assignment.equipmentservice.repository.EquipmentRepository;
import org.bits.assignment.equipmentservice.service.EquipmentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EquipmentServiceImpl implements EquipmentService {

    private final EquipmentRepository repo;

    @Override
    public Equipment create(Equipment equipment) {
        if (equipment.getAvailable() == null) equipment.setAvailable(equipment.getQuantity());
        return repo.save(equipment);
    }

    @Override
    public Equipment update(Long id, Equipment equipment) {
        Equipment ex = repo.findById(id).orElseThrow(() -> new EquipmentNotFoundException("Not found"));
        ex.setName(equipment.getName());
        ex.setCategory(equipment.getCategory());
        ex.setDescription(equipment.getDescription());
        ex.setQuantity(equipment.getQuantity());
        ex.setAvailable(equipment.getAvailable());
        ex.setCondition(equipment.getCondition());
        ex.setLocation(equipment.getLocation());
        ex.setSpecifications(equipment.getSpecifications());
        ex.setUsageInstructions(equipment.getUsageInstructions());
        ex.setRestrictions(equipment.getRestrictions());
        ex.setLastMaintenance(equipment.getLastMaintenance());
        ex.setMaintenanceInterval(equipment.getMaintenanceInterval());
        return repo.save(ex);
    }

    @Override
    public Equipment getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new EquipmentNotFoundException("Not found"));
    }

    @Override
    public List<Equipment> getAll() {
        return repo.findAll();
    }

    @Override
    public List<Equipment> search(String q, String category) {
        if ((q == null || q.isBlank()) && (category == null || category.isBlank())) return repo.findAll();
        if (category != null && !category.isBlank()) return repo.findByCategoryIgnoreCase(category);
        return repo.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(q, q);
    }

    @Override
    public void delete(Long id) {
        if (!repo.existsById(id)) throw new EquipmentNotFoundException("Not found");
        repo.deleteById(id);
    }
}
