# 🚀 SUPERTIENDAS NASA — Sistema de Gestión de Inventario Espacial

Aplicación web full-stack para la gestión de suministros espaciales, administración de usuarios y procesamiento de compras, inspirada en la temática de la NASA.

---


## Tecnologías Utilizadas

### Backend

| Tecnología | Versión | Propósito |
|---|---|---|
| Java | 17 | Lenguaje de programación |
| Spring Boot | 4.0.6 | Framework principal |
| Spring Data JPA | — | Persistencia y acceso a datos |
| Spring WebMVC | — | API REST |
| Spring DevTools | — | Recarga en caliente en desarrollo |
| MySQL Connector/J | — | Conector de base de datos MySQL |
| Hibernate (via JPA) | — | ORM y mapeo objeto-relacional |
| Springdoc OpenAPI | 3.0.2 | Documentación Swagger/OpenAPI |
| Lombok | — | Reducción de boilerplate (getters/setters) |
| Maven | — | Gestión de dependencias y build |
| Swagger Annotations | 2.2.0 | Anotaciones para documentación de API |

### Frontend

| Tecnología | Versión | Propósito |
|---|---|---|
| React | 18.2.0 | Biblioteca de interfaz de usuario |
| TypeScript | ~5.x (vía Vite) | Tipado estático |
| Vite | 5.4.21 | Bundler y servidor de desarrollo |
| React Router DOM | 7.16.0 | Enrutamiento del lado del cliente |
| Tailwind CSS | 3.4.1 | Framework de estilos utilitario |
| shadcn/ui | — | Componentes de UI basados en Radix |
| Recharts | 3.8.1 | Gráficos y visualización de datos |
| Lucide React | 0.344.0 | Iconos SVG |
| Radix UI | ^1.x | Componentes accesibles headless |
| PostCSS / Autoprefixer | — | Procesamiento de CSS |
| ESLint | — | Linter de código |

### IDEs y Herramientas

| Herramienta | Uso |
|---|---|
| IntelliJ IDEA | Desarrollo del backend (Spring Boot) |
| VS Code | Desarrollo del frontend (React) |
| MySQL Workbench (recomendado) | Gestión de base de datos |
| Postman / Insomnia (recomendado) | Pruebas de API REST |

---

## Estructura del Proyecto

```
TAS_SpringBoot_React_SuperTienda_Nasa/
├── README.md
├── Backend/
│   └── tienda/
│       ├── pom.xml
│       ├── mvnw / mvnw.cmd
│       └── src/
│           ├── main/
│           │   ├── java/com/randomcode/tienda/
│           │   │   ├── TiendaApplication.java
│           │   │   ├── application/usecases/
│           │   │   │   ├── ProductService.java
│           │   │   │   ├── PurchaseService.java
│           │   │   │   └── UserService.java
│           │   │   ├── domain/
│           │   │   │   ├── model/
│           │   │   │   │   ├── Product.java
│           │   │   │   │   ├── User.java
│           │   │   │   │   └── Role.java
│           │   │   │   └── port/
│           │   │   │       ├── ProductRepositoryPort.java
│           │   │   │       └── UserRepositoryPort.java
│           │   │   └── infrastructure/
│           │   │       ├── config/
│           │   │       │   ├── BeanConfig.java
│           │   │       │   ├── OpenApiConfig.java
│           │   │       │   └── WebConfig.java
│           │   │       ├── adapters/
│           │   │       │   ├── persistence/
│           │   │       │   │   ├── ProductPersistenceAdapter.java
│           │   │       │   │   └── UserPersistenceAdapter.java
│           │   │       │   └── web/
│           │   │       │       ├── AuthController.java
│           │   │       │       ├── ProductController.java
│           │   │       │       ├── PurchaseController.java
│           │   │       │       ├── UserController.java
│           │   │       │       └── GlobalExceptionHandler.java
│           │   │       └── persistence/jpa/
│           │   │           ├── entity/
│           │   │           │   ├── ProductEntity.java
│           │   │           │   └── UserEntity.java
│           │   │           └── repository/
│           │   │               ├── SpringDataProductRepository.java
│           │   │               └── SpringDataUserRepository.java
│           │   └── resources/
│           │       └── application.properties
│           └── test/
│               └── java/com/randomcode/tienda/
│                   └── TiendaApplicationTests.java
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── tsconfig.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── eslint.config.js
    ├── components.json
    ├── index.html
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    └── src/
        ├── main.jsx
        ├── index.css
        ├── App.jsx
        ├── AdminDashboard.tsx
        ├── lib/
        │   └── utils.js
        ├── services/
        │   └── api.ts
        ├── contexts/
        │   └── AuthContext.tsx
        ├── components/
        │   ├── Header.tsx
        │   ├── Sidebar.tsx
        │   ├── StoreFront.tsx
        │   ├── ProtectedRoute.tsx
        │   └── ui/
        │       ├── badge.jsx
        │       ├── button.jsx
        │       ├── card.jsx
        │       ├── dialog.jsx
        │       ├── input.jsx
        │       ├── label.jsx
        │       ├── table.jsx
        │       └── tabs.jsx
        └── pages/
            ├── LoginPage.tsx
            └── RegisterPage.tsx
```

## Requisitos Previos

- **Java JDK 17** — [Descargar](https://adoptium.net/)
- **Node.js 18+** — [Descargar](https://nodejs.org/)
- **MySQL 8+** — [Descargar](https://dev.mysql.com/downloads/)
- **Maven 3.9+** (incluido como wrapper en el proyecto)
- **Git** (opcional)

---

## Configuración de la Base de Datos

### 1. Crear la base de datos en MySQL

```sql
CREATE DATABASE nasa;
```

### 2. Configurar credenciales

Editar `Backend/tienda/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/nasa?useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=tu_nombredeusuario
spring.datasource.password=tu contraseña
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

> **Nota**: `ddl-auto=update` crea/actualiza las tablas automáticamente al iniciar la aplicación.

### 3. Tablas generadas automáticamente

| Tabla | Descripción |
|---|---|
| `products` | Almacena los productos del inventario |
| `users` | Almacena los usuarios registrados (clientes y administradores) |

---

## Instalación y Ejecución

### Backend (Spring Boot)

```bash
# Navegar al directorio del backend
cd Backend/tienda

# Compilar el proyecto
./mvnw.cmd clean compile

# Ejecutar la aplicación
./mvnw.cmd spring-boot:run
```

El backend se iniciará en `http://localhost:8080`.

### Frontend (React + Vite)

```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend se iniciará en `http://localhost:5173`.

### Verificar la Conexión

1. Backend corriendo en `http://localhost:8080`
2. Frontend corriendo en `http://localhost:5173`
3. Abrir `http://localhost:5173` en el navegador
4. Registrar un nuevo usuario o iniciar sesión


## Comandos Útiles

### Backend

```bash
# Compilar
./mvnw.cmd compile

# Ejecutar tests
./mvnw.cmd test

# Empaquetar JAR
./mvnw.cmd package

# Ejecutar JAR
java -jar target/tienda-0.0.1-SNAPSHOT.jar

# Limpiar compilación
./mvnw.cmd clean
```

### Frontend

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build de producción
npm run build

# Previsualizar build
npm run preview
```

---

## TRABAJO COLABORATIVO CONTEXTUALIZADO RANDOM CODE

Este proyecto es de uso educativo y académico. Desarrollado como parte del curso de **Topicos Avanzados de Software** — Universidad de Cartagena.
