export class DatabaseConnectionError extends Error {
  reason = 'Error connecting to database';
  constructor () {
    super();
    object.setPrototypeOf( this, DatabaseConnectionError.prototype);
  }
}
