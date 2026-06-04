package com.randomcode.tienda.infrastructure.adapters.web;

import com.randomcode.tienda.application.usecases.PurchaseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/purchases")
@Tag(name = "Compras", description = "Endpoints para procesar compras de clientes")
public class PurchaseController {

    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @PostMapping
    @Operation(summary = "Procesar una compra", description = "Registra la compra de un cliente y actualiza el inventario")
    public ResponseEntity<PurchaseService.PurchaseSummary> processPurchase(@RequestBody PurchaseRequest request) {
        Map<Long, Integer> productQuantities = new HashMap<>();
        for (Map.Entry<String, Integer> entry : request.productQuantities().entrySet()) {
            productQuantities.put(Long.parseLong(entry.getKey()), entry.getValue());
        }
        PurchaseService.PurchaseSummary summary = purchaseService.processPurchase(request.clientId(), productQuantities);
        return new ResponseEntity<>(summary, HttpStatus.OK);
    }

    private record PurchaseRequest(Long clientId, Map<String, Integer> productQuantities) {}
}
