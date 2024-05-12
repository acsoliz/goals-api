import { Router } from "express";
import { ActivitiesController } from "./controller";
// import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { ActivityDatasourceImpl, ActivityRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ActivitiesRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new ActivityDatasourceImpl();
    const activitiesRepository = new ActivityRepositoryImpl(datasource);

    const controller = new ActivitiesController(activitiesRepository);

    // Definir todas mis rutas principales
    router.post("/add", [AuthMiddleware.validateJWT], controller.registerActivity);
    router.post("/load", [AuthMiddleware.validateJWT], controller.registerActivities);
    router.put("/edit", [AuthMiddleware.validateJWT], controller.editActivity);

    router.get("/", [AuthMiddleware.validateJWT], controller.getActivities);
    router.get("/:id", [AuthMiddleware.validateJWT], controller.getActivity);

    return router;
  }
}
