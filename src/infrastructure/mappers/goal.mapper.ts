import { CustomError, GoalEntity } from "../../domain";

export class GoalMapper {
  static goalEntityFromObject(object: { [key: string]: any }) {
    const { id, _id, title, description, difficulty, status, type } = object;

    if (!_id || !id) {
      throw CustomError.badRequest("Missing id");
    }

    if (!title) throw CustomError.badRequest("Missing title");
    if (!description) throw CustomError.badRequest("Missing description");
    if (!difficulty) throw CustomError.badRequest("Missing difficulty");
    if (!status) throw CustomError.badRequest("Missing status");
    if (!type) throw CustomError.badRequest("Missing type");

    return new GoalEntity(
      _id || id,
      title,
      description,
      difficulty,
      status,
      type
    );
  }
}
