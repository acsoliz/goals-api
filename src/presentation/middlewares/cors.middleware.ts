/* cors.middleware.ts */
import cors from 'cors';

export class CorsMiddleware {
  static configure() {
    return cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir los métodos HTTP especificados
      allowedHeaders: ['Content-Type', 'Authorization'], // Permitir los encabezados especificados
      optionsSuccessStatus: 200 // Establecer el código de estado para las solicitudes preflight OPTIONS
    });
  }
}
