const usersRouter = require('express').Router();

const {
  getUserValidator,
  updateProfileValidator,
  updateAvatarValidator,
} = require('../middlewares/prevalidation/user');

const {
  getUser,
  getMe,
  getAllUsers,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getMe);
usersRouter.get('/:id', getUserValidator, getUser);
usersRouter.patch('/me', updateProfileValidator, updateProfile);
usersRouter.patch('/me/avatar', updateAvatarValidator, updateAvatar);

module.exports = usersRouter;
