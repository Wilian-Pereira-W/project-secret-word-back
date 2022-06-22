import { UserPayload } from './UserPayload';

export interface UserToken extends UserPayload {
  access_token: string;
}
