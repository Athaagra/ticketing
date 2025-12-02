import { signoutRouter } from ' ./routes/signout';
import { signupRouter } from ' ./routes/signup';

import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());


app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', async (req,res) => {
	theow new NotFoundError();
});

app.use(errorHandler);


const start = () => {
	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',{
			userNewUrlParser: true,
			userUnifiedTopology: true,
			uaeCreateIndex: true
		});
		console.log('connected to Mongodb');
	} catch(err){
		console.error(err);
	}


app.listen(3000, () => {
	console.log("Listening on port 3000!");
 });
};

start();
