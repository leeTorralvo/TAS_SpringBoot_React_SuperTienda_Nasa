package com.randomcode.tienda.infrastructure.adapters.web;

import com.randomcode.tienda.application.usecases.UserService;
import com.randomcode.tienda.domain.model.Role;
import com.randomcode.tienda.domain.model.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Autenticación", description = "Endpoints para registro e inicio de sesión")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    @Operation(summary = "Iniciar sesión", description = "Autentica un usuario por email y contraseña")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        return userService.getUserByEmail(request.email())
                .filter(user -> user.getPassword().equals(request.password()))
                .map(user -> {
                    User safeUser = new User(user.getId(), user.getName(), user.getEmail(), null, user.getRole(), user.getAdministratorCode());
                    return ResponseEntity.ok(Map.of(
                            "token", "token-" + user.getId() + "-" + System.currentTimeMillis(),
                            "user", safeUser
                    ));
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Credenciales inválidas")));
    }

    @PostMapping("/register")
    @Operation(summary = "Registrar usuario", description = "Crea un nuevo usuario. Si no se especifica el rol, se asigna CLIENT por defecto")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(request.password());
        user.setRole(request.role() != null ? request.role() : Role.CLIENT);
        User registered = userService.registerUser(user);
        User safeUser = new User(registered.getId(), registered.getName(), registered.getEmail(), null, registered.getRole(), registered.getAdministratorCode());
        return new ResponseEntity<>(Map.of(
                "token", "token-" + registered.getId() + "-" + System.currentTimeMillis(),
                "user", safeUser
        ), HttpStatus.CREATED);
    }

    private record LoginRequest(String email, String password) {}
    private record RegisterRequest(String name, String email, String password, Role role) {}
}
