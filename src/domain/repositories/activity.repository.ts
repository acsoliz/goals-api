import { ActivityEntity } from "../entities/activity.entity";
import { EditActivityDto, RegisterActivityDto } from "..";

export abstract class ActivityRepository {
  abstract register(registerActivityDto: RegisterActivityDto): Promise<ActivityEntity>;
  abstract edit(editActivityDto: EditActivityDto): Promise<ActivityEntity>;
}
