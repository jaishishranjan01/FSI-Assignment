package org.bits.assignment.equipmentservice.controller;

import lombok.RequiredArgsConstructor;
import org.bits.assignment.equipmentservice.dto.EquipmentCreateDTO;
import org.bits.assignment.equipmentservice.dto.EquipmentDTO;
import org.bits.assignment.equipmentservice.service.EquipmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipment")
@RequiredArgsConstructor
public class EquipmentController {

    private final EquipmentService equipmentService;

    @GetMapping
    public ResponseEntity<List<EquipmentDTO>> getAllEquipment() {
        return ResponseEntity.ok(equipmentService.getAllEquipment());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EquipmentDTO> getEquipmentById(@PathVariable Long id) {
        return ResponseEntity.ok(equipmentService.getEquipmentById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<EquipmentDTO>> searchEquipment(@RequestParam(required = false) String q,
                                                              @RequestParam(required = false) String category) {
        return ResponseEntity.ok(equipmentService.searchEquipment(q, category));
    }

    @PostMapping
    public ResponseEntity<EquipmentDTO> createEquipment(@RequestBody EquipmentCreateDTO dto) {
        return ResponseEntity.ok(equipmentService.createEquipment(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EquipmentDTO> updateEquipment(@PathVariable Long id,
                                                        @RequestBody EquipmentCreateDTO dto) {
        return ResponseEntity.ok(equipmentService.updateEquipment(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEquipment(@PathVariable Long id) {
        equipmentService.deleteEquipment(id);
        return ResponseEntity.ok().body("{\"success\": true, \"message\": \"Equipment deleted successfully\"}");
    }
}
