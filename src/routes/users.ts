const userRouter = require('express').Router();
import { deleteUser, getUser, getUsers, profileSettings, updateProfile } from '../controllers/user_controller';
import { isAuthorized } from '../utils/auth';


userRouter.get('/', getUsers)
userRouter.get('/:id', getUser);
userRouter.get('/:id/profile', isAuthorized, profileSettings);
userRouter.put('/:id/profile', isAuthorized, updateProfile);
userRouter.delete('/:id', isAuthorized, deleteUser);

module.exports = userRouter;