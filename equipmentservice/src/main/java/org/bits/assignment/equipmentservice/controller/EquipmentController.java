package org.bits.assignment.equipmentservice.controller;

import lombok.RequiredArgsConstructor;
import org.bits.assignment.equipmentservice.entity.Equipment;
import org.bits.assignment.equipmentservice.service.EquipmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipment")
@RequiredArgsConstructor
public class EquipmentController {

    private final EquipmentService service;

    @GetMapping
    public ResponseEntity<List<Equipment>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Equipment>> search(@RequestParam(required = false) String q,
                                                  @RequestParam(required = false) String category) {
        return ResponseEntity.ok(service.search(q, category));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipment> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<Equipment> create(@RequestBody Equipment equipment) {
        return ResponseEntity.ok(service.create(equipment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Equipment> update(@PathVariable Long id, @RequestBody Equipment equipment) {
        return ResponseEntity.ok(service.update(id, equipment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().body("{\"success\":true,\"message\":\"Equipment deleted successfully\"}");
    }
}
