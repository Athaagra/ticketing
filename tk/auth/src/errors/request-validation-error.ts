import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

//export class RequestValidationError extends Error implements CustomError {
export class RequestValidationError extends CustomError {
 statusCode=400; 
 constructor(public errors: ValidationError[]){
    super('Invalid request parameters');

   // Only because we are extendsing a built in class
   Object.setPrototypeOf( this, RequestValidationError.prototype);
  }
  serializeErrors() {
	return this.erros.map(err=>{
          return { message: err.msg, field?:err.param};
 });
 }
}
