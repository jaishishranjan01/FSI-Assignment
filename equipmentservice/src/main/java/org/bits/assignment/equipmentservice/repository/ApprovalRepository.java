package org.bits.assignment.equipmentservice.repository;

import org.bits.assignment.equipmentservice.entity.Approval;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository for Approval entities.
 * Provides CRUD operations and query methods to fetch approval records by status.
 */
public interface ApprovalRepository extends JpaRepository<Approval, Long> {

    List<Approval> findByStatus(Approval.Status status);
}
