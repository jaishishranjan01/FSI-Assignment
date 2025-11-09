package org.bits.assignment.equipmentservice.controller;

import lombok.RequiredArgsConstructor;
import org.bits.assignment.equipmentservice.entity.EquipmentRequest;
import org.bits.assignment.equipmentservice.entity.RequestStatus;
import org.bits.assignment.equipmentservice.repository.EquipmentRequestRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class RequestController {

    private final EquipmentRequestRepository requestRepo;

    @GetMapping
    public ResponseEntity<List<EquipmentRequest>> getRequests(@RequestParam Long userId) {
        return ResponseEntity.ok(requestRepo.findByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<EquipmentRequest> createRequest(@RequestBody EquipmentRequest req) {
        req.setStatus(RequestStatus.PENDING);
        req.setCreatedAt(LocalDateTime.now());
        return ResponseEntity.ok(requestRepo.save(req));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<EquipmentRequest> updateStatus(@PathVariable Long id, @RequestBody StatusUpdate su) {
        EquipmentRequest r = requestRepo.findById(id).orElseThrow();
        r.setStatus(RequestStatus.valueOf(su.getStatus().toUpperCase()));
        requestRepo.save(r);
        return ResponseEntity.ok(r);
    }

    public static class StatusUpdate {
        private String status;
        public String getStatus(){return status;}
        public void setStatus(String status){this.status = status;}
    }
}
