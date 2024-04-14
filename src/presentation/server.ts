import express, { Router } from "express";

interface Options {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3000, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middlewares

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); // x-www-

    // // Middlewares CORS
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "http://localhost:19006");
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
      );
      // res.header("Access-Control-Allow-Credentials", "true");
      next();
    });

    // Usar las rutas definidas
    this.app.use(this.routes);

    // Escuchar el puerto
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
