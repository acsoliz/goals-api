import { Request, Response } from "express";
import {
  WellcomeRepository,
  CustomError,
  //   LoginUserDto,
  //   RegisterUser,
  //   RegisterUserDto,
} from "../../domain";
// import { UserModel } from "../../data/mongodb";
import { WellcomeModel } from "../../data/mongodb";

export class WellcomeController {
  // DI
  constructor(private readonly wellcomeRepository: WellcomeRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error); // Winston
    return res.status(500).json({ error: "Internal Server Error" });
  };

  getMessage = (req: Request, res: Response) => {
    const { name, type = "default" } = req.query;

    WellcomeModel.find()
      .then((message) => {
        res.json({
          message,
        });
      })
      .catch(() =>
        res
          .status(500)
          .json({ error: "Internal server error in wellcomeController" })
      );
  };

  //TODO. Implementar postMessage
  // postMessage = (req: Request, res: Response) => {
  //   // const [error, registerUserDto] = RegisterUserDto.create(req.body);
  //   const [error, registerUserDto] = RegisterUserDto.create(req.body);
  //   if (error) return res.status(400).json({ error });

  //   new RegisterUser(this.authRepository)
  //     .execute(registerUserDto!)
  //     .then((data) => res.json(data))
  //     .catch((error) => this.handleError(error, res));
  // };
}
