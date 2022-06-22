export interface UserPayload {
  sub: string;
  name: string;
  nick: string;
  role: string;
  iat?: number;
  exp?: number;
}
