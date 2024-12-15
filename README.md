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

