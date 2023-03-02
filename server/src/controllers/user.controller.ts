import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
import ApiError from "../error/api.error";
import { Basket, User } from "../models/models";
import { TRequestWithBody } from "../types";
import {
  IRequestBodyLoginUser,
  IRequestBodyRegistrationUser,
} from "./user.controller.types";

const generateJWT = (id: number, email: string, role: string) =>
  jsonwebtoken.sign({ id, email, role }, process.env.SECRET_KEY as string, {
    expiresIn: "24h",
  });

/* TODO: Добавить к запросам обработчики ошибок */
class UserController {
  async registration(
    req: TRequestWithBody<IRequestBodyRegistrationUser>,
    res: Response,
    next: NextFunction
  ) {
    const { email, password, role } = req.body;

    /* FIXME: Не хватает правильной валидации данных */
    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или password"));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }

    dotenv.config();

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const token = generateJWT(user.id, user.email, user.role);

    const basket = await Basket.create({ userId: user.id });

    return res.status(200).json({ token });
  }

  async login(
    req: TRequestWithBody<IRequestBodyLoginUser>,
    res: Response,
    next: NextFunction
  ) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("Пользователь не найден"));
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный пароль"));
    }

    const token = generateJWT(user.id, user.email, user.role);
    return res.status(200).json({ token });
  }

  async check(req: Request, res: Response) {
    const { id, email, role } = req.user as jsonwebtoken.JwtPayload;
    const token = generateJWT(id, email, role);

    return res.status(200).json({ token });
  }
}

export default new UserController();
