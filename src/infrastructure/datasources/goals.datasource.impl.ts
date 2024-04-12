import { GoalModel } from "../../data/mongodb";
import {
  GoalsDatasource,
  CustomError,
  EditGoalDto,
  RegisterGoalDto,
  GoalEntity,
} from "../../domain";
import { GoalMapper } from "../mappers/goal.mapper";

export class GoalsDatasourceImpl implements GoalsDatasource {
  async register(registerGoalDto: RegisterGoalDto): Promise<GoalEntity> {
    const { title, description, difficulty, status, type, owner, dates } =
      registerGoalDto;

    try {
      // 1. insertar el nuevo registro
      const goal = await GoalModel.create({
        title: title,
        description: description,
        difficulty: difficulty,
        status: status,
        type: type,
        owner: owner,
        dates: dates,
      });

      await goal.save(); // que hace esta linea?

      // 2. Mapear la respuesta a nuestra entidad
      return GoalMapper.goalEntityFromObject(goal);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async edit(editGoalDto: EditGoalDto): Promise<GoalEntity> {
    const { title, description, difficulty, status, type } = editGoalDto;

    try {
      // 1. Verificar si el correo existe
      // const exists = await UserModel.findOne({ email });
      // if (exists) throw CustomError.badRequest("User already exists");

      // 2. Crear el Hash de contraseña
      const goal = await GoalModel.findOne();
      if (!goal) throw CustomError.badRequest("goal not found");
      goal.title = title;
      goal.description = description;
      goal.difficulty = difficulty;
      goal.status = status;
      goal.type = type;
      await goal.save();

      await goal.save(); // que hace esta linea?

      // 3. Mapear la respuesta a nuestra entidad
      // return UserMapper.userEntityFromObject(goal);
      return GoalMapper.goalEntityFromObject(goal);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  // }
}
