import { Router } from "express";
// import { AuthController } from './controller';
import { WellcomeController } from "./controller";
// import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import {
  WellcomeDatasourceImpl,
  WellcomeRepositoryImpl,
} from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class WellcomeRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new WellcomeDatasourceImpl();
    const welcomeRepository = new WellcomeRepositoryImpl(datasource);

    const controller = new WellcomeController(welcomeRepository);

    router.get("/", controller.getMessage);

    return router;
  }
}

// export class AuthRoutes {

//     static get routes(): Router {

//       const router = Router();

//     //   const datasource = new AuthDatasourceImpl();
//     //   const authRepository = new AuthRepositoryImpl(datasource);

//       const controller = new AuthController(authRepository);

//       // Definir todas mis rutas principales
//       router.post('/login', controller.loginUser )
//       router.post('/register', controller.registerUser)

//       router.get('/', [AuthMiddleware.validateJWT] ,controller.getUsers );

//       return router;
//     }

//   }
