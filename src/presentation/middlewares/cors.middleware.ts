/* cors.middleware.ts */
import cors from 'cors';

export class CorsMiddleware {
  static configure() {
    return cors({
      origin: '*', // Permitir solicitudes de estos orígenes
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Permitir los métodos HTTP especificados
      allowedHeaders: ['Content-Type', 'Authorization'], // Permitir los encabezados especificados
      optionsSuccessStatus: 200 // Establecer el código de estado para las solicitudes preflight OPTIONS
    });
  }

}
