import express from 'express';

const router = express.Router();

router.get('/api/users/signup',(res,req) => {
  res.send('Hi there!');
});

export { router as signupRouter };
