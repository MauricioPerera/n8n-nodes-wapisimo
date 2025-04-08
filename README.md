![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-wapisimo

[English](#english) | [Español](#español) | [Português](#português)

# Español

Este nodo proporciona integración con la API de [Wapisimo](https://app.wapisimo.dev) (https://api.wapisimo.dev/v1), permitiendo automatizar la comunicación vía WhatsApp Business API.

## Funcionalidades

### Nodo Regular (Wapisimo)

- **Enviar Mensaje**
  ```
  POST /v1/{phone_or_group_id}/send
  {
    "to": "+1234567890",
    "message": "Hello from Wapisimo!"
  }
  ```
  Envía mensajes de WhatsApp usando ID de teléfono o grupo.
  
- **Verificar Número**
  ```
  GET /v1/verify?phone=525585526853
  
  Respuesta:
  {
    "exists": true,
    "formatted_number": "+525585526853"
  }
  ```
  
- **Obtener Código QR**
  ```
  GET /v1/{phone_id}/qr
  
  Respuesta:
  {
    "status": "disconnected",
    "qr_code": "base64_encoded_qr_image"
  }
  ```
  
- **Gestión de Webhooks**
  ```
  # Listar webhooks
  GET /v1/{phone_id}/webhook
  
  # Añadir webhook
  POST /v1/{phone_id}/webhook
  {
    "url": "https://your-webhook.com"
  }
  
  # Eliminar webhook
  DELETE /v1/{phone_id}/webhook/{webhook_id}
  ```

### Nodo Trigger (Wapisimo Trigger)

Recibe eventos de webhook con el siguiente formato:
```json
{
  "from": "521552312221@s.whatsapp.net",
  "message": "Hola",
  "timestamp": 1742968374,
  "fromMe": false
}
```

## Límites de Uso

- Envío de mensajes: 10 peticiones por minuto
- Código QR: 1 petición por minuto
- Webhooks: 60 peticiones por hora

## Configuración

1. Obtén tu API key en [app.wapisimo.dev](https://app.wapisimo.dev)
2. Configuración de autenticación:
   ```
   Authorization: Bearer your-api-key-here
   Base URL: https://api.wapisimo.dev/v1
   ```

## Manejo de Errores

- 200: Éxito
- 400: Solicitud incorrecta
- 401: No autorizado
- 404: No encontrado
- 429: Demasiadas peticiones
- 500: Error interno del servidor

---

# English

This node provides integration with [Wapisimo](https://app.wapisimo.dev) API (https://api.wapisimo.dev/v1), enabling WhatsApp Business API communication automation.

## Features

### Regular Node (Wapisimo)

- **Send Message**
  ```
  POST /v1/{phone_or_group_id}/send
  {
    "to": "+1234567890",
    "message": "Hello from Wapisimo!"
  }
  ```
  Send WhatsApp messages using phone or group ID.
  
- **Verify Number**
  ```
  GET /v1/verify?phone=525585526853
  
  Response:
  {
    "exists": true,
    "formatted_number": "+525585526853"
  }
  ```
  
- **Get QR Code**
  ```
  GET /v1/{phone_id}/qr
  
  Response:
  {
    "status": "disconnected",
    "qr_code": "base64_encoded_qr_image"
  }
  ```
  
- **Webhook Management**
  ```
  # List webhooks
  GET /v1/{phone_id}/webhook
  
  # Add webhook
  POST /v1/{phone_id}/webhook
  {
    "url": "https://your-webhook.com"
  }
  
  # Delete webhook
  DELETE /v1/{phone_id}/webhook/{webhook_id}
  ```

### Trigger Node (Wapisimo Trigger)

Receives webhook events in the following format:
```json
{
  "from": "521552312221@s.whatsapp.net",
  "message": "Hola",
  "timestamp": 1742968374,
  "fromMe": false
}
```

## Rate Limits

- Message sending: 10 requests per minute
- QR code: 1 request per minute
- Webhooks: 60 requests per hour

## Configuration

1. Get your API key at [app.wapisimo.dev](https://app.wapisimo.dev)
2. Authentication setup:
   ```
   Authorization: Bearer your-api-key-here
   Base URL: https://api.wapisimo.dev/v1
   ```

## Error Handling

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

---

# Português

Este nó fornece integração com a API do [Wapisimo](https://app.wapisimo.dev) (https://api.wapisimo.dev/v1), permitindo a automatização da comunicação via WhatsApp Business API.

## Funcionalidades

### Nó Regular (Wapisimo)

- **Enviar Mensagem**
  ```
  POST /v1/{phone_or_group_id}/send
  {
    "to": "+1234567890",
    "message": "Hello from Wapisimo!"
  }
  ```
  Envie mensagens do WhatsApp usando ID do telefone ou grupo.
  
- **Verificar Número**
  ```
  GET /v1/verify?phone=525585526853
  
  Resposta:
  {
    "exists": true,
    "formatted_number": "+525585526853"
  }
  ```
  
- **Obter Código QR**
  ```
  GET /v1/{phone_id}/qr
  
  Resposta:
  {
    "status": "disconnected",
    "qr_code": "base64_encoded_qr_image"
  }
  ```
  
- **Gerenciamento de Webhooks**
  ```
  # Listar webhooks
  GET /v1/{phone_id}/webhook
  
  # Adicionar webhook
  POST /v1/{phone_id}/webhook
  {
    "url": "https://your-webhook.com"
  }
  
  # Excluir webhook
  DELETE /v1/{phone_id}/webhook/{webhook_id}
  ```

### Nó Trigger (Wapisimo Trigger)

Recebe eventos de webhook no seguinte formato:
```json
{
  "from": "521552312221@s.whatsapp.net",
  "message": "Hola",
  "timestamp": 1742968374,
  "fromMe": false
}
```

## Limites de Uso

- Envio de mensagens: 10 requisições por minuto
- Código QR: 1 requisição por minuto
- Webhooks: 60 requisições por hora

## Configuração

1. Obtenha sua API key em [app.wapisimo.dev](https://app.wapisimo.dev)
2. Configuração de autenticação:
   ```
   Authorization: Bearer your-api-key-here
   Base URL: https://api.wapisimo.dev/v1
   ```

## Tratamento de Erros

- 200: Sucesso
- 400: Requisição inválida
- 401: Não autorizado
- 404: Não encontrado
- 429: Muitas requisições
- 500: Erro interno do servidor

## License / Licencia / Licença

[MIT](LICENSE.md)
