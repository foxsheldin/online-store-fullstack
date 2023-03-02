import fileUpload from "express-fileupload";
import {
  TRequestWithBody,
  TRequestWithParams,
  TRequestWithQuery,
} from "./../types/index";
import { NextFunction, Response } from "express";
import { Device, DeviceInfo } from "../models/models";
import fileService from "../services/file.service";
import ApiError from "../error/api.error";
import { IRequestBodyCreateDevice } from "./device.controller.types";

/* TODO: Добавить к запросам обработчики ошибок */
class DeviceController {
  async create(
    req: TRequestWithBody<IRequestBodyCreateDevice>,
    res: Response,
    next: NextFunction
  ) {
    try {
      let { name, price, brandId, typeId, info } = req.body;

      const filename = fileService.saveFile(
        req.files?.img as fileUpload.UploadedFile
      );

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: filename,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((item: any) =>
          DeviceInfo.create({
            title: item.title,
            description: item.description,
            deviceId: device.id,
          })
        );
      }

      return res.status(200).json(device);
    } catch (err) {
      const error = err as Error;
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(
    req: TRequestWithQuery<{
      brandId: number;
      typeId: number;
      limit: number;
      page: number;
    }>,
    res: Response
  ) {
    let { brandId, typeId, limit, page } = req.query;
    let devices;

    page = page || 1;
    limit = limit || 9;

    const offset = page * limit - limit;

    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ offset, limit });
    }

    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        offset,
        limit,
        where: { brandId },
      });
    }

    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        offset,
        limit,
        where: { typeId },
      });
    }

    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        offset,
        limit,
        where: { brandId, typeId },
      });
    }

    return res.status(200).json(devices);
  }

  async getOne(req: TRequestWithParams<{ id: number }>, res: Response) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id: id },
      include: [{ model: DeviceInfo, as: "info" }],
    });

    return res.status(200).json(device);
  }
}

export default new DeviceController();
