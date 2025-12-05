import { Request, Response, NextFunction } from 'express';
import jwt from jsonwebtoken

export const currentUser = (
   req: Request,
   res: Response,
   next: NextFuction
) => {
  if (!req.session?.jwt){
   return next();
  }
   try {
     const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)
     req.currentUser = payload;
   } catch (err) {}
   next();
};