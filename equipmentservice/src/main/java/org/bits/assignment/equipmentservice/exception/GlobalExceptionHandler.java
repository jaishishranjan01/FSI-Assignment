package org.bits.assignment.equipmentservice.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Global exception handler that maps application exceptions to HTTP responses.
 * Handles EquipmentNotFoundException and generic exceptions to produce appropriate status codes.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EquipmentNotFoundException.class)
    public ResponseEntity<?> handle(EquipmentNotFoundException ex) {
        return ResponseEntity.status(404).body(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handle(Exception ex) {
        return ResponseEntity.status(500).body(ex.getMessage());
    }
}
