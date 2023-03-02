import { Request } from "express";

export type TRequestWithParams<T> = Request<T>;
export type TRequestWithBody<T> = Request<{}, {}, T>;
export type TRequestWithQuery<T> = Request<{}, {}, {}, T>;
