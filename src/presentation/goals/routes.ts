import { Router } from "express";
import { GoalsController } from "./controller";
// import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { GoalsDatasourceImpl, GoalsRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class GoalsRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new GoalsDatasourceImpl();
    const goalsRepository = new GoalsRepositoryImpl(datasource);

    const controller = new GoalsController(goalsRepository);

    // Definir todas mis rutas principales
    router.post("/add", controller.registerGoal);
    router.put("/edit", controller.editGoal);

    router.get("/", controller.getGoals);

    // router.get("/", [AuthMiddleware.validateJWT], controller.getUsers);

    return router;
  }
}
