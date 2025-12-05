import { Request, Response, NextFuction } from 'express';
import { CustomError } from '../errors/custom-error';

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
