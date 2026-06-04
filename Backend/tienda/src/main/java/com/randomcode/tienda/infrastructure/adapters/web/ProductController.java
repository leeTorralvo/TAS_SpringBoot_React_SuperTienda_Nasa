package com.randomcode.tienda.infrastructure.adapters.web;

import com.randomcode.tienda.application.usecases.ProductService;
import com.randomcode.tienda.domain.model.Product;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Productos", description = "Endpoints para la gestión del inventario de suministros")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    @Operation(summary = "Registrar un nuevo producto", description = "Añade un nuevo suministro al inventario de la tienda")
    public ResponseEntity<Product> registerProduct(@Valid @RequestBody Product product) {
        return new ResponseEntity<>(productService.saveProduct(product), HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Listar todos los productos", description = "Obtiene la lista completa de suministros disponibles")
    public ResponseEntity<List<Product>> listAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un producto", description = "Modifica los detalles de un suministro existente mediante su ID")
    public ResponseEntity<Product> editProduct(@PathVariable Long id, @Valid @RequestBody Product product) {
        return productService.getProductById(id)
                .map(existingProduct -> {
                    product.setId(id);
                    return ResponseEntity.ok(productService.saveProduct(product));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un producto", description = "Elimina permanentemente un suministro del sistema")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(p -> {
                    productService.deleteProduct(id);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}