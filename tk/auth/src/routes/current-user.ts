import express from 'express';
import { currentUser } from '../middleware/current-user';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.get('/api/users/currentuser', currentUser, ( res,req) => {
    if(!req.session?.jwt){
        return res.send({currentUser: null})
    }
    try{
        const payload = jwt.verify(req.session.jwt,
                                   process.env.JWT!
        );
    }
    catch(err){
    res.send({ currentUser: null});
    }
});

export { router as currentUserRouter };
