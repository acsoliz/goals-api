import {
  ActivityRepository,
  ActivityDatasource,
  EditActivityDto,
  RegisterActivityDto,
  ActivityEntity,
} from "../../domain";

export class ActivityRepositoryImpl implements ActivityRepository {
  constructor(private readonly activityDatasource: ActivityDatasource) { }
  edit(editActivityDto: EditActivityDto): Promise<ActivityEntity> {
    return this.activityDatasource.edit(editActivityDto);
  }

  register(registerActivityDto: RegisterActivityDto): Promise<ActivityEntity> {
    return this.activityDatasource.register(registerActivityDto);
  }
}
