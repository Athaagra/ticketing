import { signoutRouter } from './routes/signout';
//import { User } from '../models/user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { currentUserRouter} from './routes/current-user';
import { errorHandler } from './middleware/error-handler';
//import { RequestValidationError } from '../errors/request-validation-error';
//import { BadRequestError } from '../errors/bad-request-error';
import { NotFoundError } from './errors/not-found-error'; 
import cookieSession from 'cookie-session';
//import jwt from jsonwebtoken;
//
import express from 'express';
import bodyParser from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';


const app = express();
app.set('trust proxy', true);
app.use(bodyParser.json());


app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', async (req,res) => {
	throw new NotFoundError();
	//console.log('Errror');
});

//app.use(errorHandler);
app.use( cookieSession({ signed: false, secure:true
}));

const start = async () => {
        if (!process.env.JWT_KEY){
          throw new Error('JWT_KEY must be defined');
        }
	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth);
		console.log('connected to Mongodb');
	} catch(err){
		console.error(err);
	}


app.listen(3000, () => {
	console.log("Listening on port 3000!");
 });
};

start();
