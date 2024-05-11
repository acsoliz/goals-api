
import { EditActivityDto } from "../../dtos/activity/edit-activity.dto";
import { CustomError } from "../../errors/custom.error";
import { ActivityRepository } from "../../repositories/activity.repository";

interface ActivityObj {
  id: string;
  name: string;
  description: string;
  id_category: string;
  frequency: string;
}

interface EditActivityUseCase {
  execute(editActivityDto: EditActivityDto): Promise<ActivityObj>;
}

export class EditActivity implements EditActivityUseCase {
  constructor(
    private readonly activityResository: ActivityRepository //
  ) { }

  async execute(editActivityDto: EditActivityDto): Promise<ActivityObj> {
    // Editar activity
    const activity = await this.activityResository.edit(editActivityDto);

    return {
      id: activity.id,
      name: activity.name,
      description: activity.description,
      id_category: activity.id_category,
      frequency: activity.frequency,
    };
  }
}
