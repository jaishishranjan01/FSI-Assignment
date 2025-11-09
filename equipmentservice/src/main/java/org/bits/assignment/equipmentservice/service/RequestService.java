package org.bits.assignment.equipmentservice.service;

import org.bits.assignment.equipmentservice.dto.RequestCreateDTO;
import org.bits.assignment.equipmentservice.dto.RequestDTO;
import org.bits.assignment.equipmentservice.dto.RequestStatusUpdateDTO;

import java.util.List;

public interface RequestService {
    List<RequestDTO> getRequestsByUserId(String userId);
    RequestDTO createRequest(RequestCreateDTO dto);
    RequestDTO updateStatus(Long requestId, RequestStatusUpdateDTO dto);
}
