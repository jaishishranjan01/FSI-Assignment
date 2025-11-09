package org.bits.assignment.equipmentservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.bits.assignment.equipmentservice.dto.ApprovalDTO;
import org.bits.assignment.equipmentservice.dto.ApprovalStatusUpdateDTO;
import org.bits.assignment.equipmentservice.entity.Approval;
import org.bits.assignment.equipmentservice.repository.ApprovalRepository;
import org.bits.assignment.equipmentservice.service.ApprovalService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of ApprovalService that performs CRUD and status updates
 * on Approval entities via the ApprovalRepository.
 */
@Service
@RequiredArgsConstructor
public class ApprovalServiceImpl implements ApprovalService {

    private final ApprovalRepository approvalRepository;

    private ApprovalDTO mapToDTO(Approval approval) {
        ApprovalDTO dto = new ApprovalDTO();
        dto.setId(approval.getId());
        dto.setUserId(approval.getUserId());
        dto.setUserName(approval.getUserName());
        dto.setEquipmentId(approval.getEquipmentId());
        dto.setEquipmentName(approval.getEquipmentName());
        dto.setRequestDate(approval.getRequestDate());
        dto.setReturnDate(approval.getReturnDate());
        dto.setReason(approval.getReason());
        dto.setStatus(approval.getStatus().name());
        dto.setNotes(approval.getNotes());
        dto.setCreatedAt(approval.getCreatedAt());
        return dto;
    }

    @Override
    public List<ApprovalDTO> getAllApprovals() {
        return approvalRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ApprovalDTO> getApprovalsByStatus(String status) {
        Approval.Status s = Approval.Status.valueOf(status.toUpperCase());
        return approvalRepository.findByStatus(s).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ApprovalDTO approveRequest(Long approvalId, String notes) {
        Approval approval = approvalRepository.findById(approvalId)
                .orElseThrow(() -> new RuntimeException("Approval not found"));
        approval.setStatus(Approval.Status.APPROVED);
        approval.setNotes(notes);
        approvalRepository.save(approval);
        return mapToDTO(approval);
    }

    @Override
    public ApprovalDTO rejectRequest(Long approvalId, String reason, String notes) {
        Approval approval = approvalRepository.findById(approvalId)
                .orElseThrow(() -> new RuntimeException("Approval not found"));
        approval.setStatus(Approval.Status.REJECTED);
        approval.setReason(reason);
        approval.setNotes(notes);
        approvalRepository.save(approval);
        return mapToDTO(approval);
    }
}
