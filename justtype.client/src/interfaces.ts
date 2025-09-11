export interface UserState {
  token: string | null;
  username: string | null;
  email: string | null;
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

export interface ProfileResponse {
  id: string;
  login: string;
  role: string;
  email?: string;
}

export interface JwtPayload {
  nbf?: number; // not before
  exp?: number; // expiration time
  iat?: number; // issued at
  iss?: string; // issuer
  aud?: string; // audience

  nameid?: string;
  unique_name?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
}
