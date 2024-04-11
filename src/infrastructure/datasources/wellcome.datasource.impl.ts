import { BcryptAdapter } from "../../config";
import { WellcomeModel } from "../../data/mongodb";
import {
  // AuthDatasource,
  WellcomeDatasource,
  CustomError,
  // LoginUserDto,
  // RegisterUserDto,
  // UserEntity,
  WellcomeEntity,
} from "../../domain";
import { MessageMapper } from "../mappers/message.mapper";
// import { UserMapper } from "../mappers/user.mapper";

// type HashFunction = (password: string) => string;
// type CompareFunction = (password: string, hashed: string) => boolean;

export class WellcomeDatasourceImpl implements WellcomeDatasource {
  constructor() {}

  // getMessage(): Promise<WellcomeEntity> {
  //   return this.wellcomeDatasource.getMessage();
  // }

  async getMessage(): Promise<WellcomeEntity> {
    try {
      const message = await WellcomeModel.findOne();
      if (!message) throw CustomError.badRequest("Message does not exists");

      return MessageMapper.messageEntityFromObject(message);
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  // async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
  //   const { email, password } = loginUserDto;
  // }

  // async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
  //   const { name, email, password } = registerUserDto;

  //   try {
  //     // 1. Verificar si el correo existe
  //     const exists = await UserModel.findOne({ email });
  //     if (exists) throw CustomError.badRequest("User already exists");

  //     // 2. Hash de contraseña
  //     const user = await UserModel.create({
  //       name: name,
  //       email: email,
  //       password: this.hashPassword(password),
  //     });

  //     await user.save();

  //     // 3. Mapear la respuesta a nuestra entidad
  //     return UserMapper.userEntityFromObject(user);
  //   } catch (error) {
  //     if (error instanceof CustomError) {
  //       throw error;
  //     }
  //     throw CustomError.internalServer();
  //   }
  // }
}
