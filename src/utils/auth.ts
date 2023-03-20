import { NextFunction, Request, Response } from "express";

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    console.log('auth');
    if (!req.session.authorized && !req.session.user) {
        res.status(401).send('redirect to login comming soon');
    }
    next();
}