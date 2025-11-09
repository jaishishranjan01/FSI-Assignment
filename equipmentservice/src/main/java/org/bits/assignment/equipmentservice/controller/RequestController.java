package org.bits.assignment.equipmentservice.controller;

import lombok.RequiredArgsConstructor;
import org.bits.assignment.equipmentservice.dto.RequestCreateDTO;
import org.bits.assignment.equipmentservice.dto.RequestDTO;
import org.bits.assignment.equipmentservice.dto.RequestStatusUpdateDTO;
import org.bits.assignment.equipmentservice.service.RequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing equipment requests.
 * Base path: /api/requests
 */
@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    /**
     * Retrieve requests for a given user.
     *
     * @param userId the id of the user whose requests are returned
     * @return 200 OK with a list of RequestDTO
     */
    @GetMapping
    public ResponseEntity<List<RequestDTO>> getRequestsByUser(@RequestParam String userId) {
        return ResponseEntity.ok(requestService.getRequestsByUserId(userId));
    }

    /**
     * Create a new request.
     *
     * @param dto payload containing request creation data
     * @return 200 OK with the created RequestDTO
     */
    @PostMapping
    public ResponseEntity<RequestDTO> createRequest(@RequestBody RequestCreateDTO dto) {
        return ResponseEntity.ok(requestService.createRequest(dto));
    }

    /**
     * Update the status of an existing request.
     *
     * @param id  the id of the request to update
     * @param dto payload containing the new status
     * @return 200 OK with the updated RequestDTO
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<RequestDTO> updateStatus(@PathVariable Long id,
                                                   @RequestBody RequestStatusUpdateDTO dto) {
        return ResponseEntity.ok(requestService.updateStatus(id, dto));
    }
}
