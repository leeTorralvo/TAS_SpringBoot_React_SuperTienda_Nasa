package com.randomcode.tienda.infrastructure.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API SUPERTIENDAS NASA")
                        .version("1.0")
                        .description("Sistema de gestión para el inventario de suministros espaciales y administración de usuarios.")
                        .contact(new Contact().name("Centro de Control NASA").email("control@nasa.com")));
    }
}