import { RegisterGoalDto } from "../../dtos/goals/register-goal.dto";
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

interface RegisterGoalUseCase {
  execute(registerGoalDto: RegisterGoalDto): Promise<GoalObj>;
}

export class RegisterGoal implements RegisterGoalUseCase {
  constructor(
    private readonly goalsResository: GoalsRepository //
  ) {}

  async execute(registerGoalDto: RegisterGoalDto): Promise<GoalObj> {
    // Crear goal
    const goal = await this.goalsResository.register(registerGoalDto);
    console.log("en execute, goal::", goal);
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
