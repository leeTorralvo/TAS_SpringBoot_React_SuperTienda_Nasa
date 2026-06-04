package com.randomcode.tienda.infrastructure.adapters.persistence;

import com.randomcode.tienda.domain.model.Role;
import com.randomcode.tienda.domain.model.User;
import com.randomcode.tienda.domain.port.UserRepositoryPort;
import com.randomcode.tienda.infrastructure.persistence.jpa.entity.UserEntity;
import com.randomcode.tienda.infrastructure.persistence.jpa.repository.SpringDataUserRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class UserPersistenceAdapter implements UserRepositoryPort {

    private final SpringDataUserRepository repository;

    public UserPersistenceAdapter(SpringDataUserRepository repository) {
        this.repository = repository;
    }

    @Override
    public User save(User user) {
        UserEntity entity = toEntity(user);
        UserEntity savedEntity = repository.save(entity);
        return toDomain(savedEntity);
    }

    @Override
    public Optional<User> findById(Long id) {
        return repository.findById(id).map(this::toDomain);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email).map(this::toDomain);
    }

    @Override
    public List<User> findAllClients() {
        return repository.findByRole(Role.CLIENT).stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public boolean existsByAdministratorCode(String code) {
        return repository.existsByAdministratorCode(code);
    }

    private UserEntity toEntity(User domain) {
        return new UserEntity(
                domain.getId(), domain.getName(), domain.getEmail(), domain.getPassword(), domain.getRole(), domain.getAdministratorCode()
        );
    }

    private User toDomain(UserEntity entity) {
        return new User(
                entity.getId(), entity.getName(), entity.getEmail(), entity.getPassword(), entity.getRole(), entity.getAdministratorCode()
        );
    }
}