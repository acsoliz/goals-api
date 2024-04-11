import { EditGoalDto, GoalEntity, RegisterGoalDto } from "..";

export abstract class GoalsDatasource {
  // todo:
  abstract register(registerGoalDto: RegisterGoalDto): Promise<GoalEntity>;
  abstract edit(editGoalDto: EditGoalDto): Promise<GoalEntity>;
}
