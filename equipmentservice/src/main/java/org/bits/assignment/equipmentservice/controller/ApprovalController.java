package org.bits.assignment.equipmentservice.controller;

import lombok.RequiredArgsConstructor;
import org.bits.assignment.equipmentservice.dto.ApprovalDTO;
import org.bits.assignment.equipmentservice.dto.ApprovalStatusUpdateDTO;
import org.bits.assignment.equipmentservice.service.ApprovalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing approval requests.
 *
 * Provides endpoints to list approvals, filter by status, and approve/reject requests.
 */
@RestController
@RequestMapping("/api/approvals")
@RequiredArgsConstructor
public class ApprovalController {

    /**
     * Service handling approval business logic.
     */
    private final ApprovalService approvalService;

    /**
     * Get all approvals.
     *
     * @return list of all ApprovalDTO
     */
    @GetMapping
    public ResponseEntity<List<ApprovalDTO>> getAllApprovals() {
        return ResponseEntity.ok(approvalService.getAllApprovals());
    }

    /**
     * Get approvals filtered by status.
     *
     * @param status approval status to filter by
     * @return list of ApprovalDTO matching status
     */
    @GetMapping(params = "status")
    public ResponseEntity<List<ApprovalDTO>> getApprovalsByStatus(@RequestParam String status) {
        return ResponseEntity.ok(approvalService.getApprovalsByStatus(status));
    }

    /**
     * Approve a request.
     *
     * Notes are optional and may be provided in the request body.
     *
     * @param id   request id to approve
     * @param dto  optional ApprovalStatusUpdateDTO containing notes
     * @return updated ApprovalDTO
     */
    @PostMapping("/{id}/approve")
    public ResponseEntity<ApprovalDTO> approve(@PathVariable Long id,
                                               @RequestBody(required = false) ApprovalStatusUpdateDTO dto) {
        String notes = dto != null ? dto.getNotes() : null;
        return ResponseEntity.ok(approvalService.approveRequest(id, notes));
    }

    /**
     * Reject a request.
     *
     * @param id  request id to reject
     * @param dto ApprovalStatusUpdateDTO containing status and notes
     * @return updated ApprovalDTO
     */
    @PostMapping("/{id}/reject")
    public ResponseEntity<ApprovalDTO> reject(@PathVariable Long id,
                                              @RequestBody ApprovalStatusUpdateDTO dto) {
        return ResponseEntity.ok(approvalService.rejectRequest(id, dto.getStatus(), dto.getNotes()));
    }
}
