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
    const owner = req.body.user._id && req.body.user._id.toString();

    if (!owner) return res.status(400).json({ error: "Owner field is required, veify authMidleware" });
    req.body.owner = owner;

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
    const { goalsIds } = req.body;
    const { owner } = req.query;
    const query = goalsIds ? { _id: { $in: goalsIds } } : (owner ? { owner } : {});

    GoalModel.find(query)
      .then((goals) => {
        res.json({ total: goals.length, goals });
      })
      .catch(() => res.status(500).json({ error: "Internal server error" }));
  };

  getGoal = (req: Request, res: Response) => {
    const { id } = req.params;

    GoalModel.find({ _id: id })
      .then((goal) => {
        console.log('la response es goal:::', goal)
        res.json(goal[0]);
      })
      .catch(() => res.status(500).json({ error: "Internal server error" }));
  };
}
