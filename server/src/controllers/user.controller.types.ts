export interface IRequestBodyLoginUser {
  email: string;
  password: string;
}

export interface IRequestBodyRegistrationUser extends IRequestBodyLoginUser {
  role: string;
}
