# Documentación de la API Redis

## Introducción
Esta API permite gestionar productos, clientes, ventas y sucursales utilizando Redis como base de datos. Soporta la adición, consulta y manipulación de datos relacionados con la ubicación de sucursales, ventas, productos y clientes.

## Tabla de Contenidos
- [Introducción](#introducción)
- [Endpoints](#endpoints)
  - [General](#general)
  - [Productos](#productos)
    - [Añadir producto](#post-productsadd)
    - [Obtener información del producto](#get-productskeyvalue)
  - [Clientes](#clientes)
    - [Añadir cliente](#post-clientadd)
  - [Ventas](#ventas)
    - [Añadir venta](#post-salesadd)
  - [Sucursales](#sucursales)
    - [Añadir sucursal](#post-branchadd)
    - [Buscar sucursales cercanas](#post-branchfind)
    - [Obtener miembros de una sucursal](#get-branchmemberssucursalid)

## Endpoints

### General

#### GET `/hi`
- **Descripción**: Ruta simple para comprobar si la API está en funcionamiento.
- **Respuesta**:
    ```json
    {
      "message": "Hola, si estoy corriendo"
    }
    ```

### Productos

#### GET `/products/hi`
- **Descripción**: Ruta para comprobar si el endpoint de productos está funcionando.
- **Respuesta**:
    ```json
    {
      "products": "Si jala producto"
    }
    ```

#### GET `/products/:keyValue`
- **Descripción**: Obtiene información del producto con la clave proporcionada (`keyValue`) de Redis.
- **Parámetros**:
  - `keyValue`: Clave de Redis para el producto. Ejemplo: `producto:1001:sucursal:1111`
- **Respuesta**:
    ```json
    {
      "message": "Successfull",
      "data": {
        "nombre": "Cemento",
        "precio": 200,
        "categoria": "Material de Construcción"
      }
    }
    ```

#### POST `/products/add`
- **Descripción**: Añade un nuevo producto a la base de datos Redis.
- **Cuerpo de la solicitud**:
    ```json
    {
      "productId": 1001,
      "sucursalId": 1111,
      "nombre": "Cemento",
      "precio": 200,
      "categoria": "Material de Construcción"
    }
    ```
- **Respuesta**:
    ```json
    {
      "message": "Successfull",
      "data": {
        "keyValue": "producto:1001:sucursal:1111",
        "nombre": "Cemento",
        "precio": 200,
        "categoria": "Material de Construcción"
      }
    }
    ```

### Clientes

#### GET `/client/hi`
- **Descripción**: Ruta para comprobar si el endpoint de clientes está funcionando.
- **Respuesta**:
    ```json
    {
      "products": "Si jala cliente"
    }
    ```

#### POST `/client/add`
- **Descripción**: Añade un nuevo cliente a una sucursal específica.
- **Cuerpo de la solicitud**:
    ```json
    {
      "sucursal": 1111,
      "rfc": "RFC12345",
      "nombre": "Juan Perez"
    }
    ```
- **Respuesta**:
    ```json
    {
      "message": "Successfull",
      "data": {
        "sucClientKey": "sucursal:1111:clientes",
        "clientData": "cliente:RFC12345:nombre:Juan Perez"
      }
    }
    ```

### Ventas

#### GET `/sales/hi`
- **Descripción**: Ruta para comprobar si el endpoint de ventas está funcionando.
- **Respuesta**:
    ```json
    {
      "products": "Si jala sales"
    }
    ```

#### POST `/sales/add`
- **Descripción**: Añade una nueva venta a la base de datos Redis.
- **Cuerpo de la solicitud**:
    ```json
    {
      "sucursal": 1111,
      "ventas": 2024,
      "venta": 20001,
      "producto": 1003,
      "cantidad": 4,
      "costo_unitario": 60,
      "total": 240,
      "cliente": "RFC23456",
      "fecha": "2024-09-25",
      "hora": "12:35:00"
    }
    ```
- **Respuesta**:
    ```json
    {
      "message": "Successfull",
      "data": {
        "saleKey": "sucursal:1111:ventas:2024",
        "saleData": "VENTA:20001:PRODUCTO:1003:CANTIDAD:4:COSTO_UNITARIO:60:TOTAL:240:CLIENTE:RFC23456:SUCURSAL:1111:FECHA:20240925:HORA:123500"
      }
    }
    ```

### Sucursales

#### GET `/branch/hi`
- **Descripción**: Ruta para comprobar si el endpoint de sucursales está funcionando.
- **Respuesta**:
    ```json
    {
      "branch": "Si jala branch"
    }
    ```

#### POST `/branch/add`
- **Descripción**: Añade una nueva sucursal con su información y ubicación geográfica.
- **Cuerpo de la solicitud**:
    ```json
    {
      "codigo": 1111,
      "direccion": "Calle Hidalgo 123, Tepic, Nayarit",
      "email": "contacto1111@sucursales.com",
      "celular": "3111234567",
      "latitud": "21.5107",
      "longitud": "-104.8946"
    }
    ```
- **Respuesta**:
    ```json
    {
      "message": "Successfull",
      "data": {
        "key": "sucursal:1111",
        "content": {
          "codigo": 1111,
          "direccion": "Calle Hidalgo 123, Tepic, Nayarit",
          "email": "contacto1111@sucursales.com",
          "celular": "3111234567",
          "ubi": {
            "latitud": "21.5107",
            "longitud": "-104.8946"
          }
        }
      }
    }
    ```

#### POST `/branch/find`
- **Descripción**: Busca sucursales cercanas a una ubicación geográfica dada dentro de un radio específico.
- **Cuerpo de la solicitud**:
    ```json
    {
      "longitude": "-104.8946",
      "latitude": "21.5107",
      "radius": 10,
      "unit": "km"
    }
    ```
- **Respuesta**:
    ```json
    {
      "message": "Successfull",
      "data": {
        "longitude": "-104.8946",
        "latitude": "21.5107",
        "radius": 10,
        "unit": "km",
        "nearbyBranches": [...]
      }
    }
    ```

#### GET `/branch/members/:sucursalId`
- **Descripción**: Obtiene los miembros (clientes) asociados a una sucursal específica.
- **Parámetros**:
  - `sucursalId`: ID de la sucursal para obtener sus miembros.
- **Respuesta**:
    ```json
    {
      "message": "Successfull",
      "data": {
        "sucursalId": 1111,
        "sucursalMembers": [
          "cliente:RFC12345:nombre:'Juan Perez'",
          "cliente:RFC67890:nombre:'Maria Lopez'"
        ]
      }
    }
    ```

---

## Cómo Ejecutar la API

1. Instala las dependencias:
    ```bash
    npm install
    ```

2. Ejecuta el servidor:
    ```bash
    npm start
    ```

3. La API estará disponible en `http://localhost:3000/`
