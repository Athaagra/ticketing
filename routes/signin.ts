import express from 'express';

const router = express.Router();

router.get('/api/users/signin',(res,req) => {
  res.send('Hi there!');
});

export { router as signinRouter };
