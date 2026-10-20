Enlace al vídeo: https://drive.google.com/file/d/1plV6d9iEuG_RWUNNaVK-IHVJl5_ViGcG/view?usp=drive_link

Durante la demo, se me olvidó enseñar el output al hacer document.cookie. Adjunto captura de pantalla: https://drive.google.com/file/d/1CXuqnJUxmJOb6fXDjYCQi60pq4WsvpIW/view?usp=drive_link

Material consultado:

Se ha hecho uso de Gemini AI Pro en modo Flash.

PROMPTS:

1. Refactorización inicial a Cookies Seguras (Backend y Frontend)

    "Necesito actualizar mi aplicación web (Node.js/Express en el backend y Angular en el frontend). Quiero dejar de almacenar los tokens JWT en el localStorage y pasar a utilizar cookies HttpOnly y
    SameSite=Strict. ¿Cómo debo modificar el endpoint de login y refresh en Node.js, y cómo adapto el AuthService y el interceptor HTTP de Angular para que usen Signals en lugar de almacenamiento
    local y envíen credenciales (withCredentials)?"
	
	Incoherencias:0

2. Reconstrucción del payload del JWT en el cliente

    "Ahora al refrescar la página sí se mantiene la sesión, pero me desaparecen las vistas protegidas (Autores y Libros). Esto ocurre porque el endpoint de refresh solo devuelve el token, por lo que
    la Signal currentUser se queda en null y el rol se pierde. ¿Cómo puedo modificar el AuthService para decodificar el payload del nuevo JWT recibido y restaurar los datos del usuario y su rol en
    memoria sin cambiar el backend?"
	
	Incoherencias:0

3. Implementación del requisito de WebSockets (Planteamiento)

    "Pasemos a la parte de WebSockets. El ejercicio pide añadir otros eventos a socket.io que no sean de un chat. ¿Podemos hacer que al crear un libro se emita una notificación global a todos los
    usuarios? Quiero implementar la opción más sencilla posible para cumplir el requisito."
	
	Incoherencias:0

4. Integración del evento en el Backend (Socket.IO + Express)

    "Mi archivo server.ts gestiona la conexión a MongoDB, Express y Socket.IO [se adjuntó código de server.ts y Chat.ts]. ¿Cómo modifico estos archivos para poder acceder a la instancia de io desde
    cualquier controlador de Express (como el controlador de libros) y poder emitir el evento book:created cuando se guarde un libro en la base de datos?"
	
	Incoherencias:0

5. Integración del evento en el Frontend (Angular)

    "En el frontend, ya tengo un servicio de chat (chat.service.ts) que gestiona la conexión con Socket.IO usando RxJS [se adjuntó código del servicio]. ¿Cómo modifico este servicio para añadir un
    listener del nuevo evento book:created, y qué código debo añadir en el app.ts para que muestre un alert con la notificación sin importar en qué pantalla esté el usuario?"
	
	Incoherencias:0
