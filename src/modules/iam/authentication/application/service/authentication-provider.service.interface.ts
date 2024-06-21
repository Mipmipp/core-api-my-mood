import { UUID } from 'crypto';

import { AuthenticationCredentials } from '../../interface/dto/authenticationCredentials';

export const AUTHENTICATION_PROVIDER_SERVICE_KEY =
  'AUTHENTICATION_PROVIDER_SERVICE';

export interface IAccessToken {
  access_token: string;
}

export interface IAccessTokenPayload {
  userId: UUID;
  email: string;
}

export interface IAuthenticationProviderService {
  validateUser(password: string, hashedPassword: string): boolean;
  signUp(password: string): Promise<string>;
  signIn(credentials: AuthenticationCredentials): Promise<IAccessToken>;
}
