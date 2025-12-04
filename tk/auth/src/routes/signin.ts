import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
//import { RequestValidationError} ../error/validate-request;

const router = express.Router();

router.post('/api/users/signin',[
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('You must supply a password') 
  ],
  validateRequest,
  (res: Response,req: Response) => {
   
  }
);

export { router as signinRouter };
