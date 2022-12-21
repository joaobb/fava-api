import axios from "axios";

export class ExtendsClass {
  static async uploadJson(payload: Object) {
    try {
      const response = await axios.post(
        "https://json.extendsclass.com/bin",
        { payload },
        {
          headers: {
            "Api-key": process.env.EXTENDS_CLASS_API_KEY,
            Private: true,
          },
        }
      );

      return response.data?.uri;
    } catch (error: any) {
      throw new Error("Error at uploading element: " + error.message);
    }
  }
  static async fetchJson(objectId: string) {
    try {
      const response = await axios.get(
        `https://json.extendsclass.com/bin/${objectId}`,
        {
          headers: {
            "Api-key": process.env.EXTENDS_CLASS_API_KEY,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error("Error at fetching element: " + error.message);
    }
  }
  static async fetchJsonByUrl(sourceUrl: string) {
    try {
      const response = await axios.get(sourceUrl, {
        headers: {
          "Api-key": process.env.EXTENDS_CLASS_API_KEY,
        },
      });

      return response.data;
    } catch (error: any) {
      throw new Error("Error at fetching element: " + error.message);
    }
  }
}
