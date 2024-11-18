# Prueba tecnica amigo-veloz

# Diseño de base de datos
<img src="/src/media/diagrama_de_base_de_datos.png" style="display:block;float:none;margin-left:auto;margin-right:auto;width:80%">

## Referencia API

#### Crear usuario

```http
  POST /usuarios
```

| Parametro | Tipo     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | **Requerido**.  Nombre del usuario.|
| `email` | `string` | **Requerido**. Email del usuario. |
| `contrasena` | `string` | **Requerido**.  Contraseña del usuario.|
| `documentoid` | `integer` | **Requerido** ID del documento del usuario.|
| `rolId` | `integer` | **Requerido** 1= usuario normal , 2= usuario admin. |

#### Respuesta
201 Created
```json
  {
    "id": 2,
    "nombre": "juan pablo",
    "email": "juanpanasdasd@gmail.com",
    "contrasena": "asdasdasd",
    "documentoid": 123123123,
    "rolId": 1,
    "updatedAt": "2024-11-18T17:24:13.283Z",
    "createdAt": "2024-11-18T17:24:13.283Z"
}
```
400 Bad Request
```json
{
    "message": "El email ya está registrado."
}
```


#### Crear ofertas

```http
  POST /usuarios/{userId}/ofertas
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `monto` | `integer` | **Requerido** Monto de la oferta.|
| `plazo` | `integer` | **Requerido** Plazo en semanas.|
| `tasa_interes` | `integer` | **Requerido** Taza de interes de la oferta.|

#### Respuesta
200 OK
```json
{
    "id": 2,
    "monto": 8850000,
    "plazo": 87,
    "tasa_interes": 43,
    "updatedAt": "2024-11-18T17:37:29.301Z",
    "createdAt": "2024-11-18T17:37:29.301Z"
}
```
400 Bad Request
```json
{
    "message": "Acceso denegado: solo administradores pueden realizar esta acción"
}
```

#### Traer ofertas

```http
  GET /usuarios/ofertas
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `No necesita`      |  | La petición no requiere parámetros. |

#### Respuesta
200 OK
```json
[
    {
        "id": 1,
        "monto": 8850000,
        "plazo": 87,
        "tasa_interes": 43,
        "createdAt": "2024-11-18T17:24:19.913Z",
        "updatedAt": "2024-11-18T17:24:19.913Z"
    },
    {
        "id": 2,
        "monto": 8850000,
        "plazo": 87,
        "tasa_interes": 43,
        "createdAt": "2024-11-18T17:37:29.301Z",
        "updatedAt": "2024-11-18T17:37:29.301Z"
    }
]
```

#### Crear prestamo

```http
  POST /usuarios/{userId}/prestamos
```

| Parametro | Tipo     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `ofertaId` | `integer` | **Requerido**. ID de la oferta seleccionada. |
| `plazo` | `integer` | **Requerido**.   Plazo en semanas.|


#### Respuesta
201 Created
```json
{
    "message": "Préstamo creado con éxito.",
    "prestamo": {
        "id": 2,
        "userId": "3",
        "ofertaId": 4,
        "tasa_interes": 43,
        "monto": 8850000,
        "plazo": 4,
        "pagado": 0,
        "completado": false,
        "updatedAt": "2024-11-18T16:29:17.747Z",
        "createdAt": "2024-11-18T16:29:17.747Z"
    },
    "calendario": [
        {
            "prestamoId": 2,
            "monto_pago": 2212500,
            "monto_pagado": 0,
            "estado": "pendiente",
            "fechaPago": "2024-11-25T16:29:17.751Z"
        },
        {
            "prestamoId": 2,
            "monto_pago": 2212500,
            "monto_pagado": 0,
            "estado": "pendiente",
            "fechaPago": "2024-12-02T16:29:17.751Z"
        },
        {
            "prestamoId": 2,
            "monto_pago": 2212500,
            "monto_pagado": 0,
            "estado": "pendiente",
            "fechaPago": "2024-12-09T16:29:17.751Z"
        },
        {
            "prestamoId": 2,
            "monto_pago": 2212500,
            "monto_pagado": 0,
            "estado": "pendiente",
            "fechaPago": "2024-12-16T16:29:17.751Z"
        }
    ]
}
```

#### Pagar prestamo

```http
  POST /prestamos/{loanId}/pagos
```

| Parametro | Tipo     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `montoPago` | `integer` | **Requerido**. Monto a pagar. |

#### Respuesta
201 Created
```json
{
        "message": "Pago aplicado con éxito.",
        "prestamo": {
        "id": 2,
        "monto": 8850000,
        "plazo": 4,
        "tasa_interes": 43,
        "pagado": 2703650,
        "completado": false,
        "createdAt": "2024-11-18T16:29:17.747Z",
        "updatedAt": "2024-11-18T16:30:02.280Z",
        "userId": 3,
        "ofertaId": 4,
        "Pagos": [
            {
                "id": 5,
                "monto_pago": 2212500,
                "monto_pagado": 2212500,
                "estado": "pagado",
                "prestamoId": 2,
                "createdAt": "2024-11-18T16:29:17.751Z",
                "updatedAt": "2024-11-18T16:30:02.269Z"
            },
            {
                "id": 6,
                "monto_pago": 2212500,
                "monto_pagado": 491150,
                "estado": "pendiente",
                "prestamoId": 2,
                "createdAt": "2024-11-18T16:29:17.751Z",
                "updatedAt": "2024-11-18T16:30:02.275Z"
            },
            {
                "id": 7,
                "monto_pago": 2212500,
                "monto_pagado": 0,
                "estado": "pendiente",
                "prestamoId": 2,
                "createdAt": "2024-11-18T16:29:17.751Z",
                "updatedAt": "2024-11-18T16:29:17.751Z"
            },
            {
                "id": 8,
                "monto_pago": 2212500,
                "monto_pagado": 0,
                "estado": "pendiente",
                "prestamoId": 2,
                "createdAt": "2024-11-18T16:29:17.751Z",
                "updatedAt": "2024-11-18T16:29:17.751Z"
            }
        ]
    }
}
```


#### Revertir pago

```http
  POST /pagos/{paymentId}/revertir
```

| Parametro | Tipo     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `No necesita` |  |La petición no requiere parámetros.   |

