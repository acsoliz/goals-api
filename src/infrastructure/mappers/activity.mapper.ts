import { CustomError, ActivityEntity } from "../../domain";

export class ActivityMapper {
  static activityEntityFromObject(object: { [key: string]: any }) {
    const {
      id,
      _id,
      name,
      description,
      id_category,
      frequency,
    } = object;

    if (!_id || !id) {
      throw CustomError.badRequest("Missing id");
    }

    if (!name) throw CustomError.badRequest("Missing name");
    if (!description) throw CustomError.badRequest("Missing description");
    if (!id_category) throw CustomError.badRequest("Missing id_category");
    if (!frequency) throw CustomError.badRequest("Missing frequency");

    return new ActivityEntity(
      _id || id,
      name,
      description,
      id_category,
      frequency,
    );
  }
}
