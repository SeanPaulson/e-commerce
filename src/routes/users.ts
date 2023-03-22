import express = require('express');
import { getUser, getUsers, profileSettings } from '../controllers/user_controller';
import { isAuthorized } from '../utils/auth';
const userRouter = express.Router();


userRouter.get('/', getUsers)


userRouter.get('/:id', getUser);

userRouter.get('/:id/profile', isAuthorized, profileSettings)

userRouter.put('/:id/profile')//
//user profile
    // address
        // CRUD
    //payment
        //CRUD
    //view orders
        //R


module.exports = userRouter;