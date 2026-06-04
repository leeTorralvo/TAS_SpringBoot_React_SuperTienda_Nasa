package com.randomcode.tienda.infrastructure.adapters.persistence;

import com.randomcode.tienda.domain.model.Product;
import com.randomcode.tienda.domain.port.ProductRepositoryPort;
import com.randomcode.tienda.infrastructure.persistence.jpa.entity.ProductEntity;
import com.randomcode.tienda.infrastructure.persistence.jpa.repository.SpringDataProductRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class ProductPersistenceAdapter implements ProductRepositoryPort {

    private final SpringDataProductRepository repository;

    public ProductPersistenceAdapter(SpringDataProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public Product save(Product product) {
        ProductEntity entity = toEntity(product);
        ProductEntity savedEntity = repository.save(entity);
        return toDomain(savedEntity);
    }

    @Override
    public Optional<Product> findById(Long id) {
        return repository.findById(id).map(this::toDomain);
    }

    @Override
    public List<Product> findAll() {
        return repository.findAll().stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    private ProductEntity toEntity(Product domain) {
        return new ProductEntity(
                domain.getId(), domain.getName(), domain.getDescription(), domain.getPrice(), domain.getStock()
        );
    }

    private Product toDomain(ProductEntity entity) {
        return new Product(
                entity.getId(), entity.getName(), entity.getDescription(), entity.getPrice(), entity.getStock()
        );
    }
}