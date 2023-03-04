import jsonwebtoken from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const checkRoleMiddleware = (role: string) => {
  /* TODO: Убрать дублирование кода в возвращаемой функции. Похожа на authMiddleware */
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      const decoded = jsonwebtoken.verify(
        token,
        process.env.SECRET_KEY as string
      );

      const { role: decodedRole } = decoded as jsonwebtoken.JwtPayload;
      if (decodedRole !== role) {
        return res.status(403).json({ message: "Нет доступа" });
      }
      req.user = decoded;

      next();
    } catch (error) {
      res.status(401).json({ message: "Не авторизован" });
    }
  };
};

export default checkRoleMiddleware;
