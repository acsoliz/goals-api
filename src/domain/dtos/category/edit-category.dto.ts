// import { Validators } from "../../../config";

export class EditCategoryDto {
  private constructor(
    // public id: string,
    public name: string,
    public description: string,
    public icon: string,
    public color: string
  ) { }

  static create(object: { [key: string]: any }): [string?, EditCategoryDto?] {
    const { name, description, icon, color } = object;

    if (!name) return ["Missing name"];
    if (!description) return ["Missing description"];
    if (!icon) return ["Missing icon"];
    if (!color) return ["Missing color"];

    return [
      undefined,
      new EditCategoryDto(name, description, icon, color),
    ];
  }
}
