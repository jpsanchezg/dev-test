# Prueba tecnica amigo-veloz



## Referencia API

#### Crear usuario

```http
  POST /usuarios
```

| Parametro | Tipo     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | **Requerido**.  |
| `email` | `string` | **Requerido**.  |
| `es_admin` | `booleano` | **Requerido**. |

#### Traer ofertas

```http
  GET /usuarios/ofertas
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `No necesita`      |  |  |

#### Crear prestamo

```http
  POST /usuarios/{userId}/prestamos
```

| Parametro | Tipo     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `ofertaId` | `integer` | **Requerido**.  |
| `plazo` | `integer` | **Requerido**.  |

#### Pagar prestamo

```http
  POST /prestamos/{loanId}/pagos
```

| Parametro | Tipo     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `montoPago` | `integer` | **Requerido**.  |


#### Revertir pago

```http
  POST /pagos/{paymentId}/revertir
```

| Parametro | Tipo     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `No necesita` |  |   |

