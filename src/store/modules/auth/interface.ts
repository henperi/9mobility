export interface AuthUser {
  expiresIn: Date | string | number;
  accesssToken: string;
  firstName: string;
  lastName: string;
  email: string;
  hasWallet: boolean;
  walletAccount: string;
  refreshToken: string;
  // mobile?: string;
}
