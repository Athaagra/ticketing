import express from 'express';

const router = express.Router();

router.get('/api/users/signout',(res,req) => {
  req.session=null;
  res.send({});
});

export { router as signoutRouter };
