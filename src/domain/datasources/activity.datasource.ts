import { EditActivityDto, ActivityEntity, RegisterActivityDto } from "..";

export abstract class ActivityDatasource {
  // todo:
  abstract register(registerGoalDto: RegisterActivityDto): Promise<ActivityEntity>;
  abstract edit(editGoalDto: EditActivityDto): Promise<ActivityEntity>;
}
