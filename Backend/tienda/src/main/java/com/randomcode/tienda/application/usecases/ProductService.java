package com.randomcode.tienda.application.usecases;
import com.randomcode.tienda.domain.model.Product;
import com.randomcode.tienda.domain.port.ProductRepositoryPort;
import java.util.List;
import java.util.Optional;

public class ProductService {

    private final ProductRepositoryPort productRepositoryPort;

    public ProductService(ProductRepositoryPort productRepositoryPort) {
        this.productRepositoryPort = productRepositoryPort;
    }

    public Product saveProduct(Product product) {
        return productRepositoryPort.save(product);
    }

    public Optional<Product> getProductById(Long id) {
        return productRepositoryPort.findById(id);
    }

    public List<Product> getAllProducts() {
        return productRepositoryPort.findAll();
    }

    public void deleteProduct(Long id) {
        productRepositoryPort.deleteById(id);
    }
}