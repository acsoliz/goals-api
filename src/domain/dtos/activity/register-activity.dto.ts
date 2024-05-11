// import { Validators } from "../../../config";

export class RegisterActivityDto {
  private constructor(
    public name: string,
    public description: string,
    public id_category: string,
    public frequency: string
  ) { }

  static create(object: { [key: string]: any }): [string?, RegisterActivityDto?] {
    const { name, description, id_category, frequency } = object;

    if (!name) return ["Missing name"];
    if (!description) return ["Missing description"];
    if (!id_category) return ["Missing id_category"];
    if (!frequency) return ["Missing frequency"];


    return [
      undefined,
      new RegisterActivityDto(
        name,
        description,
        id_category,
        frequency
      ),
    ];
  }
}
