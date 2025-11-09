package org.bits.assignment.equipmentservice.service;

import org.bits.assignment.equipmentservice.dto.ApprovalDTO;
import org.bits.assignment.equipmentservice.dto.ApprovalStatusUpdateDTO;

import java.util.List;

public interface ApprovalService {

    List<ApprovalDTO> getAllApprovals();

    List<ApprovalDTO> getApprovalsByStatus(String status);

    ApprovalDTO approveRequest(Long approvalId, String notes);

    ApprovalDTO rejectRequest(Long approvalId, String reason, String notes);
}
