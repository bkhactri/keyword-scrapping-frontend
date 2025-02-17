export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
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
