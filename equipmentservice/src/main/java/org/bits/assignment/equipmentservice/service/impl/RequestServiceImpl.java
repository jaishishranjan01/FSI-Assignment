package org.bits.assignment.equipmentservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.bits.assignment.equipmentservice.dto.RequestCreateDTO;
import org.bits.assignment.equipmentservice.dto.RequestDTO;
import org.bits.assignment.equipmentservice.dto.RequestStatusUpdateDTO;
import org.bits.assignment.equipmentservice.entity.Request;
import org.bits.assignment.equipmentservice.repository.RequestRepository;
import org.bits.assignment.equipmentservice.service.RequestService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of RequestService that handles creation and status updates
 * for Request entities using the RequestRepository.
 */
@Service
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;

    @Override
    public List<RequestDTO> getRequestsByUserId(String userId) {
        return requestRepository.findByUserId(userId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RequestDTO createRequest(RequestCreateDTO dto) {
        Request request = Request.builder()
                .userId(dto.getUserId())
                .equipmentId(dto.getEquipmentId())
                .requestDate(dto.getRequestDate())
                .returnDate(dto.getReturnDate())
                .notes(dto.getNotes())
                .status(Request.Status.PENDING)
                .createdAt(LocalDate.now())
                .build();

        Request saved = requestRepository.save(request);
        return toDTO(saved);
    }

    @Override
    public RequestDTO updateStatus(Long requestId, RequestStatusUpdateDTO dto) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(Request.Status.valueOf(dto.getStatus().toUpperCase()));
        Request updated = requestRepository.save(request);
        return toDTO(updated);
    }

    private RequestDTO toDTO(Request request) {
        return RequestDTO.builder()
                .id(request.getId())
                .userId(request.getUserId())
                .equipmentId(request.getEquipmentId())
                .equipmentName(request.getEquipmentName())
                .requestDate(request.getRequestDate())
                .returnDate(request.getReturnDate())
                .notes(request.getNotes())
                .status(request.getStatus().name())
                .createdAt(request.getCreatedAt())
                .build();
    }
}
