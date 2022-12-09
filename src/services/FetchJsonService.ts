import { ExtendsClass } from "../libs/ExtendsClass";

interface JsonRequest {
  objectId: string;
}

export class UploadJsonService {
  async execute({ objectId }: JsonRequest) {
    if (!objectId) return;
    return await ExtendsClass.fetchJson(objectId);
  }
}
