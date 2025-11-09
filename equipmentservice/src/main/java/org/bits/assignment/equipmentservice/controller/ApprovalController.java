package org.bits.assignment.equipmentservice.controller;

import lombok.RequiredArgsConstructor;
import org.bits.assignment.equipmentservice.entity.Approval;
import org.bits.assignment.equipmentservice.entity.RequestStatus;
import org.bits.assignment.equipmentservice.repository.ApprovalRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/approvals")
@RequiredArgsConstructor
public class ApprovalController {

    private final ApprovalRepository approvalRepo;

    @GetMapping
    public ResponseEntity<List<Approval>> getAll(@RequestParam(required = false) String status) {
        if (status == null) return ResponseEntity.ok(approvalRepo.findAll());
        return ResponseEntity.ok(approvalRepo.findByStatus(status.toUpperCase()));
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<Approval> approve(@PathVariable Long id) {
        Approval a = approvalRepo.findById(id).orElseThrow();
        a.setStatus(RequestStatus.APPROVED);
        approvalRepo.save(a);
        return ResponseEntity.ok(a);
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<Approval> reject(@PathVariable Long id, @RequestBody RejectRequest rr) {
        Approval a = approvalRepo.findById(id).orElseThrow();
        a.setStatus(RequestStatus.REJECTED);
        a.setReason(rr.getReason());
        approvalRepo.save(a);
        return ResponseEntity.ok(a);
    }

    public static class RejectRequest {
        private String reason;
        public String getReason(){return reason;}
        public void setReason(String reason){this.reason = reason;}
    }
}
