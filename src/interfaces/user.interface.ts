export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface UserAuthenticateResponse extends User {
  accessToken?: string;
}

export interface UserSignUpPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserSignInPayload {
  email: string;
  password: string;
}
