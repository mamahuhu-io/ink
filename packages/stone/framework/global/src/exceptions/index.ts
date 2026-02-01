import { ErrorCode } from './code.js';

export class InkStoneError extends Error {
  static ErrorCode = ErrorCode;

  code: ErrorCode;

  isFatal: boolean;

  constructor(code: ErrorCode, message: string, options?: { cause: Error }) {
    super(message, options);
    this.name = 'InkStoneError';
    this.code = code;
    this.isFatal = code >= 10000;
  }
}

export function handleError(error: Error) {
  if (!(error instanceof InkStoneError)) {
    throw error;
  }

  if (error.isFatal) {
    throw new Error(
      'A fatal error for InkStone occurs, please contact the team if you find this.',
      { cause: error },
    );
  }

  console.error(
    "A runtime error for InkStone occurs, you can ignore this error if it won't break the user experience.",
  );
  console.error(error.stack);
}

export * from './code.js';
