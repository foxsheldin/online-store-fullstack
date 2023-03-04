import jsonwebtoken from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Не авторизован" });
  }
};

export default authMiddleware;
