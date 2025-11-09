package org.bits.assignment.equipmentservice.controller;

import lombok.RequiredArgsConstructor;
import org.bits.assignment.equipmentservice.dto.EquipmentCreateDTO;
import org.bits.assignment.equipmentservice.dto.EquipmentDTO;
import org.bits.assignment.equipmentservice.service.EquipmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing equipment resources.
 *
 * Exposes CRUD endpoints and a search endpoint for equipment.
 */
@RestController
@RequestMapping("/api/equipment")
@RequiredArgsConstructor
public class EquipmentController {

    private final EquipmentService equipmentService;

    /**
     * Retrieve all equipment.
     *
     * @return 200 OK with a list of {@code EquipmentDTO}
     */
    @GetMapping
    public ResponseEntity<List<EquipmentDTO>> getAllEquipment() {
        return ResponseEntity.ok(equipmentService.getAllEquipment());
    }

    /**
     * Retrieve a single equipment by its identifier.
     *
     * @param id equipment identifier
     * @return 200 OK with the {@code EquipmentDTO} if found
     */
    @GetMapping("/{id}")
    public ResponseEntity<EquipmentDTO> getEquipmentById(@PathVariable Long id) {
        return ResponseEntity.ok(equipmentService.getEquipmentById(id));
    }

    /**
     * Search equipment by query string and/or category.
     *
     * Both parameters are optional; when omitted, the service may return
     * a wider result set depending on implementation.
     *
     * @param q       optional search query (e.g., name or description)
     * @param category optional equipment category
     * @return 200 OK with a list of matching {@code EquipmentDTO}
     */
    @GetMapping("/search")
    public ResponseEntity<List<EquipmentDTO>> searchEquipment(@RequestParam(required = false) String q,
                                                              @RequestParam(required = false) String category) {
        return ResponseEntity.ok(equipmentService.searchEquipment(q, category));
    }

    /**
     * Create a new equipment record.
     *
     * @param dto payload containing equipment creation data
     * @return 200 OK with the created {@code EquipmentDTO}
     */
    @PostMapping
    public ResponseEntity<EquipmentDTO> createEquipment(@RequestBody EquipmentCreateDTO dto) {
        return ResponseEntity.ok(equipmentService.createEquipment(dto));
    }

    /**
     * Update an existing equipment record.
     *
     * @param id  identifier of the equipment to update
     * @param dto payload containing updated equipment data
     * @return 200 OK with the updated {@code EquipmentDTO}
     */
    @PutMapping("/{id}")
    public ResponseEntity<EquipmentDTO> updateEquipment(@PathVariable Long id,
                                                        @RequestBody EquipmentCreateDTO dto) {
        return ResponseEntity.ok(equipmentService.updateEquipment(id, dto));
    }

    /**
     * Delete an equipment record by id.
     *
     * @param id identifier of the equipment to delete
     * @return 200 OK with a JSON string indicating success
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEquipment(@PathVariable Long id) {
        equipmentService.deleteEquipment(id);
        return ResponseEntity.ok().body("{\"success\": true, \"message\": \"Equipment deleted successfully\"}");
    }
}
