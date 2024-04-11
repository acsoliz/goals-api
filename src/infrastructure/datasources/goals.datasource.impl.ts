// import { BcryptAdapter } from "../../config";
import { stat } from "fs";
import { GoalModel } from "../../data/mongodb";
import {
  AuthDatasource,
  GoalsDatasource,
  CustomError,
  EditGoalDto,
  RegisterGoalDto,
  GoalEntity,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";
import { GoalMapper } from "../mappers/goal.mapper";

export class GoalsDatasourceImpl implements GoalsDatasource {
  async register(registerGoalDto: RegisterGoalDto): Promise<GoalEntity> {
    const { title, description, difficulty, status, type } = registerGoalDto;

    try {
      // 1. Verificar si el correo existe
      // const exists = await UserModel.findOne({ email });
      // if (exists) throw CustomError.badRequest("User already exists");

      // 2. Crear el Hash de contraseña

      console.log("obj goal:::", {
        title: title,
        description: description,
        difficulty: difficulty,
        status: status,
        type: type,
      });
      const goal = await GoalModel.create({
        title: title,
        description: description,
        difficulty: difficulty,
        status: status,
        type: type,
      });

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

  async edit(editGoalDto: EditGoalDto): Promise<GoalEntity> {
    const { id, title, description, difficulty, status, type } = editGoalDto;

    try {
      // 1. Verificar si el correo existe
      // const exists = await UserModel.findOne({ email });
      // if (exists) throw CustomError.badRequest("User already exists");

      // 2. Crear el Hash de contraseña
      const goal = await GoalModel.findOne({ id });
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
