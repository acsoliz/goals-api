import {
  // AuthDatasource,
  WellcomeDatasource,
  WellcomeEntity,
  // AuthRepository,
  WellcomeRepository,
  // LoginUserDto,
  // RegisterUserDto,
  // UserEntity,
} from "../../domain";

export class WellcomeRepositoryImpl implements WellcomeRepository {
  constructor(private readonly wellcomeDatasource: WellcomeDatasource) {}

  getMessage(): Promise<WellcomeEntity> {
    return this.wellcomeDatasource.getMessage();
  }

  // register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
  //   return this.authDatasource.register(registerUserDto);
  // }
}
