import { NextFunction, Request, Response } from "express";

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    console.log('auth');
    if (!req.session.user) {
        return res.redirect('/auth/login')
    } else if (req.session.authorized === false) {
        return res.status(401).send('not authorized please login. Redirect to login coming soon');
    } else {next()}
}