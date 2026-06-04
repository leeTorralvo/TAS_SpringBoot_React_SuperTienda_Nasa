package com.randomcode.tienda.application.usecases;

import com.randomcode.tienda.domain.model.Product;
import com.randomcode.tienda.domain.model.Role;
import com.randomcode.tienda.domain.model.User;
import com.randomcode.tienda.domain.port.ProductRepositoryPort;
import com.randomcode.tienda.domain.port.UserRepositoryPort;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PurchaseService {

    private final UserRepositoryPort userRepositoryPort;
    private final ProductRepositoryPort productRepositoryPort;

    public PurchaseService(UserRepositoryPort userRepositoryPort, ProductRepositoryPort productRepositoryPort) {
        this.userRepositoryPort = userRepositoryPort;
        this.productRepositoryPort = productRepositoryPort;
    }

    public PurchaseSummary processPurchase(Long clientId, Map<Long, Integer> productQuantities) {
        User user = userRepositoryPort.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + clientId));

        if (!Role.CLIENT.equals(user.getRole())) {
            throw new IllegalStateException("Operación denegada: Solo los clientes pueden realizar compras.");
        }

        BigDecimal totalAmount = BigDecimal.ZERO;
        List<String> transactionDetails = new ArrayList<>();

        for (Map.Entry<Long, Integer> entry : productQuantities.entrySet()) {
            Long productId = entry.getKey();
            Integer quantityToBuy = entry.getValue();

            Product product = productRepositoryPort.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + productId));

            if (product.getStock() < quantityToBuy) {
                throw new IllegalStateException("Stock insuficiente para: " + product.getName() + ". Disponible: " + product.getStock());
            }

            product.setStock(product.getStock() - quantityToBuy);
            productRepositoryPort.save(product);

            BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(quantityToBuy));
            totalAmount = totalAmount.add(subtotal);
            transactionDetails.add(String.format("%s (x%d) - Subtotal: $%s", product.getName(), quantityToBuy, subtotal));
        }

        return new PurchaseSummary(user.getName(), totalAmount, transactionDetails, "COMPRA_EXITOSA");
    }

    public record PurchaseSummary(String clientName, BigDecimal totalAmount, List<String> details, String status) {}
}