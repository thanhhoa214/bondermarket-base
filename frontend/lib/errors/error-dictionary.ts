export enum ErrorCode {
  WALLET_NOT_CONNECTED,
  NULL_OR_UNDEFINED,
  INVALID_AMOUNT,
}

// https://blog.logrocket.com/understanding-resolving-metamask-error-codes/
export enum MetamaskErrorCode {
  InsufficientFunds = '0xfb8f41b2',
  ContractFunctionExecutionError = 'ContractFunctionExecutionError',
}

export interface TxError {
  name: MetamaskErrorCode;
  message: string;
}
