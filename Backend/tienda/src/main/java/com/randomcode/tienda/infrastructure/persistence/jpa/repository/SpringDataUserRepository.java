package com.randomcode.tienda.infrastructure.persistence.jpa.repository;

import com.randomcode.tienda.domain.model.Role;
import com.randomcode.tienda.infrastructure.persistence.jpa.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

//@Repository
public interface SpringDataUserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    
    List<UserEntity> findByRole(Role role);
    
    boolean existsByAdministratorCode(String administratorCode);
}