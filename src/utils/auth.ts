import { NextFunction, Request, Response } from "express";

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    console.log('auth');
    const user_id = req.params.id;
    if (req.session.authorized === false || req.session.user!.id != user_id) {
        res.status(401).send('not authorized please login. Redirect to login coming soon');
    } else {next()}
}