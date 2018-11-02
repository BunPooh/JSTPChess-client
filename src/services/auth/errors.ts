export enum ErrorCode {
  ACCOUNT_EXISTS = "auth/account-exists-with-different-credential",
  POPUP_CANCELED_BY_USER = "auth/popup-closed-by-user",
  POPUP_CANCELED = "auth/cancelled-popup-request",
  POPUP_BLOCKED = "auth/popup-blocked",
  POPUP_CLOSED = "auth/popup-closed-by-user",
  UNAUTHORIZED_DOMAIN = "auth/unauthorized-domain",
  OPERATION_NOT_ALLOWED = "auth/operation-not-allowed"
}

export interface IAuthError {
  code: string;
  message: string;
}
