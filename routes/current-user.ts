import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', ( res,req) => {
  res.send('Hi there!');
});

export { router as currentUserRouter };
