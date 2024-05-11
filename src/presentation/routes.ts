import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { WellcomeRoutes } from "./wellcome/routes";
import { GoalsRoutes } from "./goals/routes";
import { CategoriesRoutes } from "./categories/routes";
import { ActivitiesRoutes } from "./activities/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir todas mis rutas principales
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/wellcome", WellcomeRoutes.routes);

    router.use("/api/goals", GoalsRoutes.routes);

    router.use("/api/categories", CategoriesRoutes.routes);


    router.use("/api/activities", ActivitiesRoutes.routes);


    // router.use('/api/user')
    // router.use('/api/products')
    // router.use('/api/clients')
    // router.use('/api/orders')

    return router;
  }
}
