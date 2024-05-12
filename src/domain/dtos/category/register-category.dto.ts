// import { Validators } from "../../../config";

export class RegisterCategoryDto {
  private constructor(
    public name: string,
    public description: string,
    public icon: string,
    public color: string
  ) { }

  static create(object: { [key: string]: any }): [string?, RegisterCategoryDto?] {
    const { name, description, icon, color } = object;
    console.log('EN EL DTO DE CATEGORIAS, object:::', object)
    if (!name) return ["Missing name"];
    if (!description) return ["Missing description"];
    if (!icon) return ["Missing icon"];
    if (!color) return ["Missing color"];


    return [
      undefined,
      new RegisterCategoryDto(
        name,
        description,
        icon,
        color,
      ),
    ];
  }
}
