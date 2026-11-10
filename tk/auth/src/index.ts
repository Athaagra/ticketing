import express from 'express';
import bodyParser from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import dotenv from "dotenv";
import path from 'path';

import { signoutRouter } from './routes/signout';
//import { RequestValidationError } from '../errors/request-validation-error';
//import { BadRequestError } from '../errors/bad-request-error';
//import jwt from jsonwebtoken;
import { currentUserRouter} from './routes/current-user';

import { User } from './models/user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error'; 


dotenv.config({path: path.join(__dirname, '.env')});
console.log(process.env.JWT_KEY);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true);
app.use(bodyParser.json());
app.use( 
        cookieSession({ 
	signed: false, 
	secure:true
      })
);


app.use(currentUserRouter);

app.use(signoutRouter);

app.use(signupRouter);
app.use(signinRouter);


app.all('*', async (req,res) => {
	throw new NotFoundError();
});

app.use(errorHandler);


const start = async () => {
        if (!process.env.JWT_KEY){
           console.log('JWT_KEY must be defined');
        }
	try {
		await mongoose.connect('mongodb+srv://athaagrak:malakas12q@cluster0.mbu7lx9.mongodb.net/?appName=Cluster0');
                console.log('connected to Mongodb');
	} catch(err){
		console.error(err);
	}


app.listen(3000, () => {
	console.log("Listening on port 3000!");
 });
};

start();
