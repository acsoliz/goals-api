import { CustomError, CategoryEntity } from "../../domain";

export class CategoryMapper {
  static categoryEntityFromObject(object: { [key: string]: any }) {
    const {
      id,
      _id,
      name,
      description,
      icon,
      color
    } = object;

    if (!_id || !id) {
      throw CustomError.badRequest("Missing id");
    }

    if (!name) throw CustomError.badRequest("Missing name");
    if (!description) throw CustomError.badRequest("Missing description");
    if (!icon) throw CustomError.badRequest("Missing icon");
    if (!color) throw CustomError.badRequest("Missing color");

    return new CategoryEntity(
      _id || id,
      name,
      description,
      icon,
      color
    );
  }
}
