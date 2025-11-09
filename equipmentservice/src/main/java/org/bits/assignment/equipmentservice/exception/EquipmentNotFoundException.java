package org.bits.assignment.equipmentservice.exception;

/**
 * Exception thrown when a requested Equipment entity cannot be found.
 */
public class EquipmentNotFoundException extends RuntimeException {
    public EquipmentNotFoundException(String msg){ super(msg); }
}
