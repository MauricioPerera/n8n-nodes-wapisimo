# n8n-nodes-wapisimo

Este paquete contiene nodos para interactuar con la API de [Wapisimo](https://wapisimo.dev/), una plataforma para automatizar la comunicación a través de WhatsApp.

## Nodos disponibles

### 1. Wapisimo

Nodo principal para enviar mensajes y consultar información a través de la API de Wapisimo.

**Operaciones disponibles:**

#### Send Message
Envía un mensaje de WhatsApp a un número específico.
- **Phone ID** (obligatorio): ID de la cuenta de WhatsApp a utilizar
- **To** (obligatorio): Número de teléfono del destinatario (con código de país)
- **Message** (obligatorio): Contenido del mensaje a enviar
- **Respuesta**: Confirmación del envío con ID del mensaje

#### Verify Number
Verifica si un número tiene WhatsApp activo.
- **Phone** (obligatorio): Número a verificar (con código de país)
- **Respuesta**: 
  ```json
  {
    "exists": true,
    "phone": "5215512345678"
  }
  ```

#### Get QR Code
Obtiene un código QR para conectar una cuenta de WhatsApp.
- **Phone ID** (obligatorio): ID de la cuenta para la que se solicita el código QR
- **Respuesta**: 
  ```json
  {
    "qr": "https://wapisimo.dev/qr/abc123.png"
  }
  ```

### 2. Wapisimo Trigger

Nodo trigger que inicia un flujo de trabajo cuando se recibe un mensaje de WhatsApp.

**Configuración:**
- **Phone ID** (obligatorio): ID de la cuenta de WhatsApp para escuchar mensajes
- **Events** (obligatorio): Tipos de eventos a escuchar
  - `message` - Cuando se recibe un mensaje
  - `status` - Cuando cambia el estado de un mensaje

**Datos de salida:**
- Para eventos de tipo `message`:
  ```json
  {
    "from": "521552312221@s.whatsapp.net",
    "message": "Hola",
    "timestamp": 1742968374,
    "fromMe": false
  }
  ```
- Para eventos de tipo `status`:
  ```json
  {
    "id": "message_id",
    "status": "delivered",
    "timestamp": 1742968374
  }
  ```

### 3. Wapisimo Webhook

Nodo dedicado a la gestión de webhooks para la API de Wapisimo.

**Operaciones disponibles:**

#### List Webhooks
Obtiene todos los webhooks configurados para un teléfono.
- **Phone ID** (obligatorio): ID de la cuenta de WhatsApp
- **Respuesta**: Array de webhooks configurados
  ```json
  [
    {
      "id": "webhook_id",
      "url": "https://your-webhook.com",
      "name": "Webhook Name",
      "createdAt": "2025-03-26T05:38:03.105Z",
      "status": "active",
      "lastSeen": "2025-03-26T05:38:03.105Z"
    }
  ]
  ```

#### Add Webhook
Configura un nuevo webhook para recibir notificaciones.
- **Phone ID** (obligatorio): ID de la cuenta de WhatsApp
- **Webhook URL** (obligatorio): URL que recibirá las notificaciones
- **Respuesta**: 
  ```json
  {
    "id": "new_webhook_id",
    "url": "https://your-webhook.com",
    "name": "Webhook Name",
    "createdAt": "2025-03-26T05:38:03.105Z",
    "status": "active"
  }
  ```

#### Delete Webhook
Elimina un webhook configurado.
- **Phone ID** (obligatorio): ID de la cuenta de WhatsApp
- **Webhook ID** (obligatorio): ID del webhook a eliminar
- **Respuesta**: 
  ```json
  {
    "success": true,
    "message": "Webhook deleted successfully"
  }
  ```

## Credenciales: Wapisimo API

Para utilizar cualquiera de los nodos, es necesario configurar credenciales de acceso a la API de Wapisimo.

**Configuración requerida:**
- **API Key** (obligatorio): Clave de API proporcionada por Wapisimo

**Cómo obtener credenciales:**
1. Crear una cuenta en [Wapisimo](https://wapisimo.dev/)
2. Acceder al Dashboard
3. En la sección de Configuración, generar una nueva API Key
4. Copiar la API Key y utilizarla para configurar las credenciales en n8n

## Eventos de Webhook

Cuando se configura un webhook, Wapisimo envía notificaciones con el siguiente formato:

```json
{
  "from": "521552312221@s.whatsapp.net",
  "message": "Hola",
  "timestamp": 1742968374,
  "fromMe": false
}
```

## Instalación

Instalar el paquete en su instancia de n8n:

```bash
npm install n8n-nodes-wapisimo
```

O utilizando la interfaz de n8n:
1. Ir a "Configuración" > "Comunidad"
2. Buscar "wapisimo"
3. Instalar "n8n-nodes-wapisimo"

## Ejemplo de uso

1. **Enviar un mensaje cuando se reciba uno nuevo:**
   - Utilizar el nodo "Wapisimo Trigger" para escuchar mensajes entrantes
   - Conectar con un nodo "Wapisimo" configurado para "Send Message"
   - En el mensaje de respuesta, utilizar expresiones como `{{$json.message}}` para acceder al contenido del mensaje recibido

2. **Gestión de webhooks:**
   - Utilizar el nodo "Wapisimo Webhook" para listar, agregar o eliminar webhooks
   - Ideal para configurar dinámicamente notificaciones según las necesidades del flujo de trabajo

## Solución de problemas

- **Error de autenticación**: Verificar que la API Key sea correcta y esté activa en su cuenta de Wapisimo
- **Error "Teléfono no encontrado"**: Asegurarse de que el Phone ID exista y esté conectado en Wapisimo
- **Webhook no recibe eventos**: Verificar que la URL sea accesible públicamente y que el webhook esté activo en Wapisimo

## Documentación adicional

Para obtener más información sobre la API de Wapisimo, consulte la [documentación oficial](https://wapisimo.dev/docs).
