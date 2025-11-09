package org.bits.assignment.equipmentservice.service;

import org.bits.assignment.equipmentservice.entity.Equipment;

import java.util.List;

public interface EquipmentService {
    Equipment create(Equipment equipment);
    Equipment update(Long id, Equipment equipment);
    Equipment getById(Long id);
    List<Equipment> getAll();
    List<Equipment> search(String q, String category);
    void delete(Long id);
}
