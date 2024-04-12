// import { Validators } from "../../../config";

export class RegisterGoalDto {
  private constructor(
    public title: string,
    public description: string,
    public type: string,
    public difficulty: number,
    public status: string,
    public dates: {
      // Agrega el objeto de fechas
      createdAt?: Date;
      updatedAt?: Date;
      completionDate?: Date;
    }
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterGoalDto?] {
    // const { name, email, password } = object;
    const { title, description, type, difficulty, status, dates } = object;

    if (!title) return ["Missing title"];
    if (!description) return ["Missing description"];
    if (!type) return ["Missing type"];
    if (!difficulty) return ["Missing difficulty"];
    if (!Number.isInteger(difficulty)) return ["invalid type difficulty "];
    if (!status) return ["Missing status"];

    return [
      undefined,
      new RegisterGoalDto(title, description, type, difficulty, status, dates),
    ];
  }
}
