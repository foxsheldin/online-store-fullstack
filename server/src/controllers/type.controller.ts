import { Request, Response } from "express";
import { Type } from "../models/models";
import { TRequestWithBody } from "../types";

/* TODO: Добавить к запросам обработчики ошибок */
class TypeController {
  async create(req: TRequestWithBody<{ name: string }>, res: Response) {
    const { name } = req.body;
    const type = await Type.create({ name });

    return res.status(200).json(type);
  }

  async getAll(req: Request, res: Response) {
    const types = await Type.findAll();

    return res.status(200).json(types);
  }
}

export default new TypeController();
