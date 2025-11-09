package org.bits.assignment.equipmentservice.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.bits.assignment.equipmentservice.client.AuthClient;
import org.bits.assignment.equipmentservice.client.dto.UserValidationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final AuthClient authClient;

    public JwtAuthFilter(AuthClient authClient) {
        this.authClient = authClient;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        // Public equipment reads & swagger/openapi can be public
        String path = request.getServletPath();
        return path.startsWith("/api/equipment") && "GET".equalsIgnoreCase(request.getMethod())
                || path.startsWith("/v3/api-docs") || path.startsWith("/swagger-ui");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {

        String authHeader = req.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // For endpoints that require authentication, Spring will throw 401 later.
            chain.doFilter(req, res);
            return;
        }

        try {
            UserValidationResponse info = authClient.validateToken(authHeader);
            if (info == null) {
                res.setStatus(HttpStatus.UNAUTHORIZED.value());
                return;
            }

            String role = info.getRole(); // expected ADMIN / STUDENT / STAFF
            String principal = info.getEmail();

            var auth = new UsernamePasswordAuthenticationToken(
                    principal,
                    null,
                    List.of(new SimpleGrantedAuthority("ROLE_" + role)) // Spring expects ROLE_ prefix if using hasRole(...)
            );

            // set authenticated principal
            org.springframework.security.core.context.SecurityContextHolder.getContext().setAuthentication(auth);

            chain.doFilter(req, res);
        } catch (Exception ex) {
            res.setStatus(HttpStatus.UNAUTHORIZED.value());
        }
    }
}
