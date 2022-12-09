import { ExtendsClass } from "../libs/ExtendsClass";

interface JsonRequest {
  payload: Object;
}

export class UploadJsonService {
  async execute({ payload }: JsonRequest) {
    if (!payload) return;
    return await ExtendsClass.uploadJson(payload);
  }
}
