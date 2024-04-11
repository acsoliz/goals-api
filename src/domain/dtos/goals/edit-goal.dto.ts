// import { Validators } from "../../../config";

export class EditGoalDto {
  private constructor(
    public id: string,
    public title: string,
    public description: string,
    public type: string,
    public difficulty: number,
    public status: string
  ) {}

  static create(object: { [key: string]: any }): [string?, EditGoalDto?] {
    // const { name, email, password } = object;
    const { id, title, description, type, difficulty, status } = object;

    if (!id) return ["id is required"];
    if (!title) return ["Missing title"];
    if (!description) return ["Missing description"];
    if (!type) return ["Missing type"];
    if (!difficulty) return ["Missing difficulty"];
    if (!status) return ["Missing status"];

    return [
      undefined,
      new EditGoalDto(id, title, description, type, difficulty, status),
    ];
  }
}
