package org.bits.assignment.user_service.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * JPA entity representing an application user.
 * Fields:
 * - id, name, email, password, role, status
 * Transient fields (not persisted): activeRequests, totalBorrows
 *
 * Lombok is used for boilerplate (getters/setters/builders).
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // STUDENT, STAFF, ADMIN

    @Column(nullable = false)
    private String status; // ACTIVE, SUSPENDED, INACTIVE

    @Transient
    private Integer activeRequests;

    @Transient
    private Integer totalBorrows;
}
