package org.bits.assignment.equipmentservice.repository;

import org.bits.assignment.equipmentservice.entity.EquipmentRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRequestRepository extends JpaRepository<EquipmentRequest, Long> {
    List<EquipmentRequest> findByUserId(Long userId);
}
