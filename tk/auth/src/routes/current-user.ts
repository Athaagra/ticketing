import express from 'express';
import { currentUser } from '../middleware/current-user';
import { Request, Response, NextFunction } from 'express';
const router = express.Router();

router.get('/api/users/currentuser', currentUser, ( res,req) => {
  res.send({currentUser:req.currentUser || null });
});

export { router as currentUserRouter };
