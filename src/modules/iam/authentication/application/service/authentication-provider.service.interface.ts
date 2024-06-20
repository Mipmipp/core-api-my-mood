import { UUID } from 'crypto';

import { AuthenticationCredentials } from '../../interface/dto/authenticationCredentials';

export const AUTHENTICATION_PROVIDER_SERVICE_KEY =
  'AUTHENTICATION_PROVIDER_SERVICE';

export type AccessToken = {
  access_token: string;
};

export type AccessTokenPayload = {
  userId: UUID;
  email: string;
};

export interface AuthenticationProviderService {
  validateUser(password: string, hashedPassword: string): boolean;
  signUp(password: string): Promise<string>;
  signIn(credentials: AuthenticationCredentials): Promise<AccessToken>;
}
