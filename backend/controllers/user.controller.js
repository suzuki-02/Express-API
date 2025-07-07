import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password -__v');
    if (!user) {
      return next(new ApiError('User not found', 404));
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      select: '-password -__v',
    });
    if (!user) {
      return next(new ApiError('User not found', 404));
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id).select(
      '-password -__v'
    );

    if (!deletedUser) {
      return next(new ApiError('User not found', 404));
    }

    res.status(200).json({ success: true, data: deletedUser });
  } catch (error) {
    next(error);
  }
};
