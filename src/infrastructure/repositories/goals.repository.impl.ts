import {
  GoalsRepository,
  GoalsDatasource,
  EditGoalDto,
  RegisterGoalDto,
  GoalEntity,
} from "../../domain";

export class GoalsRepositoryImpl implements GoalsRepository {
  constructor(private readonly goalsDatasource: GoalsDatasource) {}
  edit(editGoalDto: EditGoalDto): Promise<GoalEntity> {
    return this.goalsDatasource.edit(editGoalDto);
  }

  register(registerGoalDto: RegisterGoalDto): Promise<GoalEntity> {
    return this.goalsDatasource.register(registerGoalDto);
  }
}
