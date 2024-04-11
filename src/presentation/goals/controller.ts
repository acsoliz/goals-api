import { Request, Response } from "express";
import {
  GoalsRepository,
  EditGoal,
  EditGoalDto,
  RegisterGoal,
  RegisterGoalDto,
  CustomError,
} from "../../domain";
import { GoalModel } from "../../data/mongodb";

export class GoalsController {
  // DI
  constructor(private readonly goalsRepository: GoalsRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log("error:", error); // Winston
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerGoal = (req: Request, res: Response) => {
    const [error, registerGoalDto] = RegisterGoalDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new RegisterGoal(this.goalsRepository)
      .execute(registerGoalDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  editGoal = (req: Request, res: Response) => {
    const [error, editGoalDto] = EditGoalDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new EditGoal(this.goalsRepository)
      .execute(editGoalDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getGoals = (req: Request, res: Response) => {
    GoalModel.find()
      .then((goals) => {
        res.json({
          goals,
          // user: req.body.user,
        });
      })
      .catch(() => res.status(500).json({ error: "Internal server error" }));
  };
}
