import { ActivityModel } from "../../data/mongodb";
import {
  ActivityDatasource,
  CustomError,
  EditActivityDto,
  RegisterActivityDto,
  ActivityEntity,
} from "../../domain";
import { ActivityMapper } from "../mappers/activity.mapper";

export class ActivityDatasourceImpl implements ActivityDatasource {
  async register(registerActivityDto: RegisterActivityDto): Promise<ActivityEntity> {
    const { name, description, id_category, frequency } =
      registerActivityDto;

    try {
      // 1. insertar el nuevo registro
      const activity = await ActivityModel.create({
        name: name,
        description: description,
        id_category: id_category,
        frequency: frequency,
      });

      await activity.save(); // que hace esta linea?

      // 2. Mapear la respuesta a nuestra entidad
      return ActivityMapper.activityEntityFromObject(activity);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async edit(editActivityDto: EditActivityDto): Promise<ActivityEntity> {
    const { name, description, id_category, frequency } = editActivityDto;

    try {
      // 1. Verificar si el correo existe
      // const exists = await UserModel.findOne({ email });
      // if (exists) throw CustomError.badRequest("User already exists");

      // 2. Crear el Hash de contraseña
      const activity = await ActivityModel.findOne();
      if (!activity) throw CustomError.badRequest("activity not found");
      activity.name = name;
      activity.description = description;
      activity.id_category = id_category;
      activity.frequency = frequency;
      await activity.save();

      await activity.save(); // que hace esta linea?

      // 3. Mapear la respuesta a nuestra entidad
      // return UserMapper.userEntityFromObject(activity);
      return ActivityMapper.activityEntityFromObject(activity);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  // }
}
