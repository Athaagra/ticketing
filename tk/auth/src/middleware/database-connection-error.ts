export class DatabaseConnectionError extends Error {
  reason = 'Error connecting to database';
  constructor () {
    super();
    object.setProtypeOf( this, DatabaseConnectionError.prototype);
  }
}
