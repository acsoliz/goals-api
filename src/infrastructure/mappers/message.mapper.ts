import { CustomError, WellcomeEntity } from "../../domain";

export class MessageMapper {
  static messageEntityFromObject(object: { [key: string]: any }) {
    const { id, _id, message } = object;
    // public id: string, public message: string
    if (!_id || !id) {
      throw CustomError.badRequest("Missing id");
    }

    if (!message) throw CustomError.badRequest("Missing message");

    return new WellcomeEntity(_id || id, message);
  }
}
