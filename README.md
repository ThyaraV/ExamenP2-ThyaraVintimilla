# ExamenP2-ThyaraVintimilla
# LuxuryStay - Sistema de Gestión de Reservas de Hoteles

Este proyecto implementa un sistema centralizado para la gestión de reservas, disponibilidad de habitaciones y manejo de inventario de la cadena hotelera **LuxuryStay**.  
La solución incluye:

1. **Servicio SOAP**: Consulta la disponibilidad de habitaciones.
2. **API REST**: Gestión de reservas (crear, consultar y cancelar).
3. **Microservicio de Inventario**: Gestión de habitaciones (registrar y actualizar).

---

## **Requisitos Previos**

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes elementos:

- [**Node.js**](https://nodejs.org) (versión 16 o superior)
- [**MySQL**](https://www.mysql.com/) (servidor de base de datos)
- **Postman** o **SoapUI** para pruebas
- **Git** para control de versiones (opcional)

---

## **Configuración de la Base de Datos**

### **1. Crear las Bases de Datos**

Ejecuta los siguientes comandos SQL en tu servidor MySQL para crear las bases de datos:

```sql
CREATE DATABASE luxurystay_soap;
CREATE DATABASE luxurystay_api;
CREATE DATABASE luxurystay_inventory;

USE luxurystay_soap;
CREATE TABLE availability (
    room_id INT PRIMARY KEY,
    room_type VARCHAR(50) NOT NULL,
    available_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL
);

INSERT INTO availability (room_id, room_type, available_date, status) VALUES
(110, 'Deluxe', '2024-12-20', 'disponible'),
(111, 'Deluxe', '2024-12-21', 'disponible'),
(112, 'Suite', '2024-12-22', 'disponible'),
(113, 'Standard', '2024-12-23', 'disponible'),
(114, 'Suite', '2024-12-24', 'mantenimiento');

USE luxurystay_api;
CREATE TABLE reservations (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    room_number INT NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL
);

INSERT INTO reservations (reservation_id, room_number, customer_name, start_date, end_date, status) VALUES
(1, 101, 'Juan Pérez', '2024-12-20', '2024-12-21', 'activa'),
(2, 102, 'María Gómez', '2024-12-21', '2024-12-22', 'activa'),
(3, 104, 'Carlos Ruiz', '2024-12-23', '2024-12-24', 'activa'),
(4, 105, 'Ana Torres', '2024-12-24', '2024-12-25', 'cancelada');

USE luxurystay_inventory;
CREATE TABLE rooms (
    room_id INT PRIMARY KEY,
    room_number INT NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL
);

INSERT INTO rooms (room_id, room_number, room_type, status) VALUES
(110, 1, 'Deluxe', 'disponible'),
(111, 2, 'Deluxe', 'disponible'),
(112, 3, 'Suite', 'mantenimiento'),
(113, 4, 'Standard', 'disponible'),
(114, 5, 'Suite', 'disponible');

```
## **Instalación y Ejecución**

### **1. Clonar el Proyecto**
Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/usuario/luxurystay.git
cd luxurystay
```
---

### **2. Ejecución del servicio SOAP**
Dirígete a la carpeta del servicio SOAP:
```bash
cd soap-service
```
Instala las dependencias
```bash
npm install
```
Configura la conexión a la base de datos MySQL en el archivo db.js:
```bash
const sequelize = new Sequelize('luxurystay_soap', 'usuario', 'contraseña', {
    host: 'localhost',
    dialect: 'mysql'
});
```
Inicia el servidor SOAP:
```bash
node server.js
```
---
### **3. Ejecución de la API REST**
Dirígete a la carpeta del API REST:
```bash
cd rest-api
```
Instala las dependencias
```bash
npm install
```
Configura la conexión a la base de datos MySQL en el archivo db.js:
```bash
const sequelize = new Sequelize('luxurystay_api', 'usuario', 'contraseña', {
    host: 'localhost',
    dialect: 'mysql'
});
```
Inicia la API REST:
```bash
node server.js
```
Prueba los endpoints con Postman:
Crear reserva (POST): http://localhost:8086/reservations
Consultar reserva (GET): http://localhost:8086/reservations/1
Cancelar reserva (DELETE): http://localhost:8086/reservations/1
---
### **4. Ejecución del Microservicio de Inventario**
Dirígete a la carpeta del microservicio:
```bash
cd inventory-service
```
Instala las dependencias
```bash
npm install
```
Configura la conexión a la base de datos MySQL en el archivo db.js:
```bash
const sequelize = new Sequelize('luxurystay_inventory', 'usuario', 'contraseña', {
    host: 'localhost',
    dialect: 'mysql'
});
```
Inicia la API REST:
```bash
node server.js
```
Prueba los endpoints con Postman:
-Registrar habitación (POST): http://localhost:8087/rooms
-Actualizar estado (PATCH): http://localhost:8087/rooms/101

