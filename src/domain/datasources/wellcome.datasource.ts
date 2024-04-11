// import { UserEntity } from "../entities/user.entity";
import { WellcomeEntity } from "../entities/wellcome.entity";
// import { LoginUserDto, RegisterUserDto } from "..";

export abstract class WellcomeDatasource {
  // todo:
  abstract getMessage(): Promise<WellcomeEntity>;

  // abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
