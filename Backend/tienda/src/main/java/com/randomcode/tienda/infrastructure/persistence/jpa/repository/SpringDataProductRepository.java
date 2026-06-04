package com.randomcode.tienda.infrastructure.persistence.jpa.repository;

import com.randomcode.tienda.infrastructure.persistence.jpa.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;

//@Repository
public interface SpringDataProductRepository extends JpaRepository<ProductEntity, Long> {
}