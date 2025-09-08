export type ServerErrorResponse = {
  error?: string;
  Error?: string;
  message?: string;
  details?: string;
  Details?: string;
};

export type JwtRole = "Admin" | "User";

export type AuthMode = 'login' | 'register';
