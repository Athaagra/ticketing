import express from 'express';
import { currentUser } from '../middleware/current-user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, ( res,req) => {
    res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
