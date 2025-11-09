package org.bits.assignment.equipmentservice.controller;

import lombok.RequiredArgsConstructor;
import org.bits.assignment.equipmentservice.dto.RequestCreateDTO;
import org.bits.assignment.equipmentservice.dto.RequestDTO;
import org.bits.assignment.equipmentservice.dto.RequestStatusUpdateDTO;
import org.bits.assignment.equipmentservice.service.RequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @GetMapping
    public ResponseEntity<List<RequestDTO>> getRequestsByUser(@RequestParam String userId) {
        return ResponseEntity.ok(requestService.getRequestsByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<RequestDTO> createRequest(@RequestBody RequestCreateDTO dto) {
        return ResponseEntity.ok(requestService.createRequest(dto));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<RequestDTO> updateStatus(@PathVariable Long id,
                                                   @RequestBody RequestStatusUpdateDTO dto) {
        return ResponseEntity.ok(requestService.updateStatus(id, dto));
    }
}
