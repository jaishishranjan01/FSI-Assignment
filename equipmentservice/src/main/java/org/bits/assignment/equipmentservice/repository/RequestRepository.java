package org.bits.assignment.equipmentservice.repository;

import org.bits.assignment.equipmentservice.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for Request entities.
 * Provides methods to retrieve requests by requester user id.
 */
@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findByUserId(String userId);
}
