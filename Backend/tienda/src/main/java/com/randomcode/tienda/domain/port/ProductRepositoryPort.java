package com.randomcode.tienda.domain.port;

import com.randomcode.tienda.domain.model.Product;
import java.util.List;
import java.util.Optional;

public interface ProductRepositoryPort {
    Product save(Product product);
    Optional<Product> findById(Long id);
    List<Product> findAll();
    void deleteById(Long id);
}