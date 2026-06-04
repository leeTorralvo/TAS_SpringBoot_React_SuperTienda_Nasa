package com.randomcode.tienda.infrastructure.config;

import com.randomcode.tienda.application.usecases.ProductService;
import com.randomcode.tienda.application.usecases.UserService;
import com.randomcode.tienda.domain.port.ProductRepositoryPort;
import com.randomcode.tienda.domain.port.UserRepositoryPort;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public ProductService productService(ProductRepositoryPort productRepositoryPort) {
        return new ProductService(productRepositoryPort);
    }

    @Bean
    public UserService userService(UserRepositoryPort userRepositoryPort) {
        return new UserService(userRepositoryPort);
    }

    // Si necesitas el PurchaseService, también se registra aquí
    @Bean
    public com.randomcode.tienda.application.usecases.PurchaseService purchaseService(
            UserRepositoryPort userRepositoryPort, ProductRepositoryPort productRepositoryPort) {
        return new com.randomcode.tienda.application.usecases.PurchaseService(userRepositoryPort, productRepositoryPort);
    }
}