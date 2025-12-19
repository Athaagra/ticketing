import express, { Request,Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Password } from '../services/password';
import { User } from '../models/user';
import { validateRequest } from '../middleware/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
//import { RequestValidationError} from '../errors/request-validation-error';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/api/users/signin',[
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('You must supply a password') 
  ],
  validateRequest,
  async (req: Request,res: Response) => {
    const {email, password} =req.body;
    console.log('This is the email',req.body);
    console.log('This is the password',password.split('.'));
    const example = "emailpassword";
    console.log('This is the example',example.split('.'));
    const existingUser = await User.findOne({ email });
    console.log('This is the db',existingUser.password);
    if (!existingUser){
      throw new BadRequestError('Invalid credentials');
    }
    const passwordMatch = await Password.compare(
     existingUser.password,
     password 
    );
    console.log('This the password match.',password.split('.'));
    if (!passwordMatch){
      throw new BadRequestError('Invalid Credentials');
    }
    // Generate JWT
    const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email
    },
    process.env.JWT_KEY!
    // process.env.ACCESS_TOKEN!
    );
    console.log(userJwt);
   //Store it on session object 
    req.session = {
  	jwt: userJwt
    };
   res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
