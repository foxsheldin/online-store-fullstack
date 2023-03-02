import fileUpload from "express-fileupload";
import path from "path";
import * as uuid from "uuid";

class FileService {
  saveFile(file: fileUpload.UploadedFile) {
    try {
      let filename = `${uuid.v4()}.${file.mimetype.split("/")[1]}`;
      file.mv(path.resolve(__dirname, "..", "..", "static", filename));

      return filename;
    } catch (error) {
      throw new Error("Что-то пошло не так при загрузке картинки");
    }
  }
}

export default new FileService();
