package org.bits.assignment.equipmentservice.repository;

import org.bits.assignment.equipmentservice.entity.Approval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApprovalRepository extends JpaRepository<Approval, Long> {
    List<Approval> findByStatus(String status);
}
