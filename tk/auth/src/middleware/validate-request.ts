import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import { RequestValidationError} from '../errors/request-validation-error';
import { body, validationResult } from 'express-validator';

export const validateRequest = (
  err: Error,
  req: Request,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
   throw new RequestValidationError(errors.array());
 }
 next();
}
