import { Model } from "sequelize";

export interface IBodyUserModel extends Model {
  id: number;
  email: string;
  password: string;
  role: string;
}

export interface IBodyBasketModel extends Model {
  id: number;
  user_id: number;
}

export interface IBodyBasketDeviceModel extends Model {
  id: number;
  deviceId: number;
  basketId: number;
}

export interface IBodyDeviceModel extends Model {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  brandId: number;
  typeId: number;
}

export interface IBodyTypeModel extends Model {
  id: number;
  name: string;
}

export interface IBodyBrandModel extends Model {
  id: number;
  name: string;
}

export interface IBodyRatingModel extends Model {
  id: number;
  rate: number;
  userId: number;
  deviceId: number;
}

export interface IBodyDeviceInfoModel extends Model {
  id: number;
  title: string;
  description: string;
  deviceId: number;
}

export interface IBodyTypeBrandModel extends Model {
  id: number;
}
