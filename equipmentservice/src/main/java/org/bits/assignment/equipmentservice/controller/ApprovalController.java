package org.bits.assignment.equipmentservice.controller;

import lombok.RequiredArgsConstructor;
import org.bits.assignment.equipmentservice.dto.ApprovalDTO;
import org.bits.assignment.equipmentservice.dto.ApprovalStatusUpdateDTO;
import org.bits.assignment.equipmentservice.service.ApprovalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/approvals")
@RequiredArgsConstructor
public class ApprovalController {

    private final ApprovalService approvalService;

    @GetMapping
    public ResponseEntity<List<ApprovalDTO>> getAllApprovals() {
        return ResponseEntity.ok(approvalService.getAllApprovals());
    }

    @GetMapping(params = "status")
    public ResponseEntity<List<ApprovalDTO>> getApprovalsByStatus(@RequestParam String status) {
        return ResponseEntity.ok(approvalService.getApprovalsByStatus(status));
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<ApprovalDTO> approve(@PathVariable Long id,
                                               @RequestBody(required = false) ApprovalStatusUpdateDTO dto) {
        String notes = dto != null ? dto.getNotes() : null;
        return ResponseEntity.ok(approvalService.approveRequest(id, notes));
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<ApprovalDTO> reject(@PathVariable Long id,
                                              @RequestBody ApprovalStatusUpdateDTO dto) {
        return ResponseEntity.ok(approvalService.rejectRequest(id, dto.getStatus(), dto.getNotes()));
    }
}
