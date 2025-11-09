package org.bits.assignment.equipmentservice.repository;

import org.bits.assignment.equipmentservice.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for Equipment entities.
 * Exposes methods to search equipment by name/description and by category.
 */
@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    List<Equipment> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);
    List<Equipment> findByCategory(String category);
}
