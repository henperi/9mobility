// /* eslint-disable require-jsdoc */
// import axios, { AxiosRequestConfig } from 'axios';
// // import { ApiUrlService } from 'shared/services';

// export class TokenStorage {
//   private static readonly LOCAL_STORAGE_TOKEN = 'token';

//   private static readonly LOCAL_STORAGE_REFRESH_TOKEN = 'refresh_token';

//   public static isAuthenticated(): boolean {
//     return this.getToken() !== null;
//   }

//   public static getAuthentication(): AxiosRequestConfig {
//     return {
//       headers: { Authorization: `Bearer ${this.getToken()}` },
//     };
//   }

//   public static getNewToken(): Promise<string> {
//     return new Promise((resolve, reject) => {
//       axios
//         .post(ApiUrlService.refreshToken(), {
//           refresh_token: this.getRefreshToken(),
//         })
//         .then((response) => {
//           this.storeToken(response.data.token);
//           this.storeRefreshToken(response.data.refresh_token);

//           resolve(response.data.token);
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
//   }

//   public static storeToken(token: string): void {
//     localStorage.setItem(TokenStorage.LOCAL_STORAGE_TOKEN, token);
//   }

//   public static storeRefreshToken(refreshToken: string): void {
//     localStorage.setItem(
//       TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN,
//       refreshToken,
//     );
//   }

//   public static clear(): void {
//     localStorage.removeItem(TokenStorage.LOCAL_STORAGE_TOKEN);
//     localStorage.removeItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
//   }

//   private static getRefreshToken(): string | null {
//     return localStorage.getItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
//   }

//   private static getToken(): string | null {
//     return localStorage.getItem(TokenStorage.LOCAL_STORAGE_TOKEN);
//   }
// }

export {};
