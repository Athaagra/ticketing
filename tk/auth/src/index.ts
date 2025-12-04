import { signoutRouter } from './routes/signout';
//import { User } from '../models/user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { currentUserRouter} from './routes/current-user';
import { errorHandler } from './middleware/error-handler';
//import { RequestValidationError } from '../errors/request-validation-error';
//import { BadRequestError } from '../errors/bad-request-error';
import { NotFoundError } from './errors/not-found-error'; 
//
import express from 'express';
import bodyParser from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';


const app = express();
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


const start = async () => {
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
