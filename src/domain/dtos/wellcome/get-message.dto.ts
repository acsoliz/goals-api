import { Validators } from "../../../config";

export class GetMessageDto {
  constructor() {}

  static create(): [string?, GetMessageDto?] {
    return [undefined, new GetMessageDto()];
  }
}
