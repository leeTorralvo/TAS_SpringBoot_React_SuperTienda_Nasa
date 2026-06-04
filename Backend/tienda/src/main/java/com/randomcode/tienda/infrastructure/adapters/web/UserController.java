package com.randomcode.tienda.infrastructure.adapters.web;

import com.randomcode.tienda.application.usecases.UserService;
import com.randomcode.tienda.domain.model.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Usuarios", description = "Endpoints para la gestión de clientes y administradores")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    @Operation(summary = "Registrar usuario", description = "Crea un nuevo usuario. Si es ADMIN, se genera automáticamente su código de acceso")
    public ResponseEntity<User> register(@Valid @RequestBody User user) {
        // El UserService se encarga de generar el código de administrador si el rol es ADMIN
        User registeredUser = userService.registerUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @GetMapping("/clients")
    @Operation(summary = "Listar clientes", description = "Obtiene la lista de todos los usuarios con rol CLIENT")
    public ResponseEntity<List<User>> listClients() {
        return ResponseEntity.ok(userService.getAllClients());
    }
}