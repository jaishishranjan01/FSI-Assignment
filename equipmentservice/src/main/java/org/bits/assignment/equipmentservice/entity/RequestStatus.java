package org.bits.assignment.equipmentservice.entity;

/**
 * Enumeration of possible request statuses used across the application.
 * Values indicate the lifecycle state of an equipment request.
 */
public enum RequestStatus {
    PENDING,
    APPROVED,
    REJECTED,
    RETURNED,
    OVERDUE
}
