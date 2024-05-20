import { Account } from './account';

export interface User extends Account {
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  language: string;
}

export interface RecoverForm {
  email: string;
}

export interface ActivateForm {
  token: string;
}

export interface EmailUpdateForm {
  token: string;
}

export interface TokenResponse {
  token: string;
  refreshToken: string;
}

export interface PasswordUpdateForm {
  token: string;
  password: string;
  passwordConfirm: string;
}

export interface RegisterResponse {
}

export interface ActivateResponse {
}

export interface EmailUpdateResponse {
}


export interface RecoverResponse {
}
export interface PasswordUpdateResponse {
}
