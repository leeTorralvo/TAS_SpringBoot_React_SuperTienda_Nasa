package com.randomcode.tienda.application.usecases;

import com.randomcode.tienda.domain.model.Role;
import com.randomcode.tienda.domain.model.User;
import com.randomcode.tienda.domain.port.UserRepositoryPort;

import java.util.List;
import java.util.Optional;

public class UserService {

    private final UserRepositoryPort userRepositoryPort;

    public UserService(UserRepositoryPort userRepositoryPort) {
        this.userRepositoryPort = userRepositoryPort;
    }

    public User registerUser(User user) {
        if (Role.ADMIN.equals(user.getRole())) {
            user.setAdministratorCode(generateUniqueAdminCode());
        }
        return userRepositoryPort.save(user);
    }

    private String generateUniqueAdminCode() {
        for (int i = 0; i <= 99; i++) {
            String code = String.format("75322200%02d", i);
            if (!userRepositoryPort.existsByAdministratorCode(code)) {
                return code;
            }
        }
        throw new IllegalStateException("Error: Se ha agotado el cupo de administradores (00-99). No es posible generar más códigos únicos.");
    }

    public Optional<User> getUserById(Long id) {
        return userRepositoryPort.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepositoryPort.findByEmail(email);
    }

    public List<User> getAllClients() {
        return userRepositoryPort.findAllClients();
    }
}