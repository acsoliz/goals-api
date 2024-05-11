import { Router } from "express";
import { CategoriesController } from "./controller";
// import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { CategoryDatasourceImpl, CategoryRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class CategoriesRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new CategoryDatasourceImpl();
    const categoryRepository = new CategoryRepositoryImpl(datasource);

    const controller = new CategoriesController(categoryRepository);

    // Definir todas mis rutas principales
    router.post("/add", [AuthMiddleware.validateJWT], controller.registerCategory);
    router.put("/edit", [AuthMiddleware.validateJWT], controller.editCategory);

    router.get("/", [AuthMiddleware.validateJWT], controller.getCategories);
    router.get("/:id", [AuthMiddleware.validateJWT], controller.getCategory);

    return router;
  }
}
