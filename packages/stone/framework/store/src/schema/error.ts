import { ErrorCode, InkStoneError } from '@ink/stone-global/exceptions';

export class SchemaValidateError extends InkStoneError {
  constructor(flavour: string, message: string) {
    super(ErrorCode.SchemaValidateError, `Invalid schema for ${flavour}: ${message}`);
  }
}
