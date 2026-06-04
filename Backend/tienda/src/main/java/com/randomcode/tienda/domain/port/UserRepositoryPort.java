package com.randomcode.tienda.domain.port;

import com.randomcode.tienda.domain.model.User;
import java.util.List;
import java.util.Optional;

public interface UserRepositoryPort {
    User save(User user);
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
    List<User> findAllClients();
    boolean existsByAdministratorCode(String code);
}