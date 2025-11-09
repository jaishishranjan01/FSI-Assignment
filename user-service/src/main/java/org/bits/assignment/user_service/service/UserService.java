package org.bits.assignment.user_service.service;

import org.bits.assignment.user_service.entity.User;
import org.bits.assignment.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service layer for user operations:
 * - signup, login, forgot password (dummy)
 * - user listing, searching and status updates
 *
 * Uses UserRepository for persistence and PasswordEncoder for secure password handling.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Signup
    public User signup(User user) throws Exception {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new Exception("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Login
    public Optional<User> login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            return userOpt;
        }
        return Optional.empty();
    }

    // Forgot password (dummy)
    public String forgotPassword(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            return "Password reset link sent to email";
        }
        return "User not found";
    }

    // User management
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> searchUsers(String query, String role) {
        List<User> users;
        if (query != null && !query.isEmpty()) {
            users = userRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(query, query);
        } else {
            users = userRepository.findAll();
        }

        if (role != null && !role.equalsIgnoreCase("all")) {
            users = users.stream().filter(u -> u.getRole().equalsIgnoreCase(role)).collect(Collectors.toList());
        }
        return users;
    }

    public User updateStatus(Long id, String status) throws Exception {
        User user = userRepository.findById(id).orElseThrow(() -> new Exception("User not found"));
        user.setStatus(status);
        return userRepository.save(user);
    }

    public boolean sendPasswordResetLink(String email) {
        return true;
    }
}
