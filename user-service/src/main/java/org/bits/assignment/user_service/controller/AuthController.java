package org.bits.assignment.user_service.controller;

import org.bits.assignment.user_service.entity.User;
import org.bits.assignment.user_service.service.UserService;
import org.bits.assignment.user_service.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        Optional<User> userOpt = userService.login(request.email(), request.password());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
            user.setPassword(null); // hide password
            return ResponseEntity.ok(new AuthResponse(user, token));
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) throws Exception {
        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(request.password());
        user.setRole(request.role().toUpperCase());
        user.setStatus("active");

        User savedUser = userService.signup(user);
        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getRole());
        savedUser.setPassword(null);
        return ResponseEntity.ok(new AuthResponse(savedUser, token));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        boolean sent = userService.sendPasswordResetLink(request.email());
        if (sent) {
            return ResponseEntity.ok(new MessageResponse("Password reset link sent to email", "success"));
        } else {
            return ResponseEntity.status(404).body(new MessageResponse("Email not found", "failed"));
        }
    }

    public record AuthRequest(String email, String password) {}
    public record SignupRequest(String name, String email, String password, String role) {}
    public record ForgotPasswordRequest(String email) {}
    public record AuthResponse(User user, String token) {}
    public record MessageResponse(String message, String status) {}
}
