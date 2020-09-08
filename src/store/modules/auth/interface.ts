export interface AuthUser {
  expiresIn: Date;
  accesssToken: string;
  firstName: string;
  lastName: string;
  email: string;
  hasWallet: boolean;
  walletAccount: string;
  refreshToken: string;
}
