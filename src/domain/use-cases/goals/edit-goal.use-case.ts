// import { EditGoalDto } from "../../dtos/goals/edit-goal.dto";
// import { RegisterGoalDto } from "../../dtos/goals/register-goal.dto";
import { EditGoalDto } from "../../dtos/goals/edit-goal.dto";
import { CustomError } from "../../errors/custom.error";
import { GoalsRepository } from "../../repositories/goals.repository";

interface GoalObj {
  goal: {
    id: string;
    title: string;
    type: string;
    difficulty: number;
    status: string;
  };
}

interface EditGoalUseCase {
  execute(editGoalDto: EditGoalDto): Promise<GoalObj>;
}

export class EditGoal implements EditGoalUseCase {
  constructor(
    private readonly goalResository: GoalsRepository //
  ) {}

  async execute(editGoalDto: EditGoalDto): Promise<GoalObj> {
    // Editar goal
    const goal = await this.goalResository.edit(editGoalDto);
    console.log("edit goal::", goal);

    return {
      goal: {
        id: goal.id,
        title: goal.title,
        type: goal.type,
        difficulty: goal.difficulty,
        status: goal.status,
      },
    };
  }
}
