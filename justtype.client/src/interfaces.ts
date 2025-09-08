export interface UserState {
  token: string | null;
  username: string | null;
  isAdmin: boolean;
  userId: string | null;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface RegisterResponse {
  message: string;
  userId: string;
}

export interface JwtPayload {
  exp?: number;
  iat?: number;
  sub?: string;
  // TODO delete unknown
  [key: string]: unknown;
}
