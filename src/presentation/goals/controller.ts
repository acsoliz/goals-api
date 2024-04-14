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
  constructor(private readonly goalsRepository: GoalsRepository) { }

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
    const { id } = req.body;

    if (error) return res.status(400).json({ error });
    if (!id) return res.status(400).json({ error: "id is required!" });

    GoalModel.findOneAndUpdate({ _id: id }, { ...editGoalDto }, { new: true })
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getGoals = (req: Request, res: Response) => {
    const { goals } = req.body;
    const { owner } = req.query;
    const query = goals ? { _id: { $in: goals } } : (owner ? { owner } : {});

    GoalModel.find(query)
      .then((goals) => {
        res.json(goals);
      })
      .catch(() => res.status(500).json({ error: "Internal server error" }));
  };

}
