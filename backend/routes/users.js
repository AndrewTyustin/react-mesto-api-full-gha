const userRouter = require('express').Router();

const {
  getUserList,
  getUserId,
  updateUserData,
  updateUserAvatar,
  getUserProfile,
} = require('../controllers/users');

const {
  validateUserId,
  validateUserUpdate,
  validateUserAvatar,
} = require('../utils/data-validation');

userRouter.get('/', getUserList);
userRouter.get('/me', getUserProfile);
userRouter.get('/:userId', validateUserId, getUserId);
userRouter.patch('/me', validateUserUpdate, updateUserData);
userRouter.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = userRouter;
