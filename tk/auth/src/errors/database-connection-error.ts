import { CustomError } from './custom-error';

export class DatabaseConnectionError extends Error {
  statusCode=500;
  reason = 'Error connecting to database';
  constructor () {
    super('Error connecting to db');
    object.setPrototypeOf( this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
   return [{ message: this.reason }];
 }
}
