import { RegisterActivityDto } from "../../dtos/activity/register-activity.dto";
import { CustomError } from "../../errors/custom.error";
import { ActivityRepository } from "../../repositories/activity.repository";

interface ActivityObj {
  // activity: {
  id: string;
  name: string;
  description: string;
  id_category: string;
  frequency: string;
}

interface RegisterActivityUseCase {
  execute(registerActivityDto: RegisterActivityDto): Promise<ActivityObj>;
}

export class RegisterActivity implements RegisterActivityUseCase {
  constructor(
    private readonly activityResository: ActivityRepository //
  ) { }

  async execute(registerActivityDto: RegisterActivityDto): Promise<ActivityObj> {
    // Crear activity
    const activity = await this.activityResository.register(registerActivityDto);
    return {
      // activity: {
      id: activity.id,
      name: activity.name,
      description: activity.description,
      id_category: activity.id_category,
      frequency: activity.frequency,
    };
  }
}
