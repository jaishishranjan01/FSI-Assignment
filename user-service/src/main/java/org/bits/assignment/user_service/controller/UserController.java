package org.bits.assignment.user_service.controller;

import org.bits.assignment.user_service.entity.User;
import org.bits.assignment.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for user management operations exposed under /api/users.
 * Endpoints include:
 * - GET /api/users                : list all users
 * - GET /api/users/search?q=&role: search users by name/email and filter by role
 * - PATCH /api/users/{id}/status  : update a user's status
 *
 * Access to these endpoints is controlled by SecurityConfig (ADMIN role required for /api/users/**).
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam(required = false) String q,
                                                  @RequestParam(required = false, defaultValue = "all") String role) {
        return ResponseEntity.ok(userService.searchUsers(q, role));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<User> updateStatus(@PathVariable Long id, @RequestBody StatusRequest request) throws Exception {
        return ResponseEntity.ok(userService.updateStatus(id, request.status()));
    }

    record StatusRequest(String status) {}
}
