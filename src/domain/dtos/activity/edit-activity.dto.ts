// import { Validators } from "../../../config";

export class EditActivityDto {
  private constructor(
    //public id: string,
    public name: string,
    public description: string,
    public id_category: string,
    public frequency: string
  ) { }

  static create(object: { [key: string]: any }): [string?, EditActivityDto?] {
    // const { name, email, password } = object;
    const { name, description, id_category, frequency } = object;

    // if (!id) return ["id is required"];
    if (!name) return ["Missing name"];
    if (!description) return ["Missing description"];
    if (!id_category) return ["Missing id_category"];
    if (!frequency) return ["Missing frequency"];

    return [
      undefined,
      // new EditGoalDto(id, title, description, type, difficulty, status, dates),
      new EditActivityDto(name, description, id_category, frequency),
    ];
  }
}
