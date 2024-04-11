import { GoalEntity } from "../entities/goal.entity";
import { EditGoalDto, RegisterGoalDto } from "..";

export abstract class GoalsRepository {
  abstract register(registerGoalDto: RegisterGoalDto): Promise<GoalEntity>;
  abstract edit(editGoalDto: EditGoalDto): Promise<GoalEntity>;
}
