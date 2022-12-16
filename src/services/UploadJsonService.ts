import { ExtendsClass } from "../libs/ExtendsClass";

interface JsonRequest {
  payload: Object;
}

export class UploadJsonService {
  execute({ payload }: JsonRequest) {
    if (!payload) return;
    return ExtendsClass.uploadJson(payload);
  }
}
