import { NextFunction, Request, Response } from "express";

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.session.user) {
        console.log('not auth')
        return res.status(401).send('Not Authorized');
    } else if (req.session.authorized === false) {
        return res.status(401).send('not authorized please login. Redirect to login coming soon');
    } else {next()}
}