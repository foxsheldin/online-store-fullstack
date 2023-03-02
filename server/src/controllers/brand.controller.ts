import { Request, Response } from "express";
import { Brand } from "../models/models";
import { TRequestWithBody } from "../types";

/* TODO: Добавить к запросам обработчики ошибок */
class BrandController {
  async create(req: TRequestWithBody<{ name: string }>, res: Response) {
    const { name } = req.body;
    const brand = await Brand.create({ name });

    return res.status(200).json(brand);
  }

  async getAll(req: Request, res: Response) {
    const brands = await Brand.findAll();

    return res.status(200).json(brands);
  }
}

export default new BrandController();
