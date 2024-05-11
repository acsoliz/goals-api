// import { Validators } from "../../../config";

export class RegisterActivityDto {
  private constructor(
    public name: string,
    public description: string,
    public icon: string,
    public color: string
  ) { }

  static create(object: { [key: string]: any }): [string?, RegisterActivityDto?] {
    // const { name, email, password } = object;
    const { name, description, icon, color } = object;

    if (!name) return ["Missing name"];
    if (!description) return ["Missing description"];
    if (!icon) return ["Missing icon"];
    if (!color) return ["Missing color"];

    return [
      undefined,
      new RegisterActivityDto(name, description, icon, color),
    ];
  }
}
