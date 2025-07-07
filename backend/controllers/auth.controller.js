import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { JWT_SECRET, JWT_EXPIRATION } from '../config/env.js';
import ApiError from '../utils/ApiError.js';

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  // Atomic Operations
  try {
    // What is a request body? -> A request body is the data sent by the client to the server in an HTTP request, typically used in POST or PUT requests to send data to be processed.
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return next(new ApiError('User already exists', 409));
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUsers = await User.create(
      [{ username, email, password: hashedPassword }],
      { session }
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        user: newUsers[0],
        token,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return next(error);
  }
};

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success, returns token
 *       401:
 *         description: Invalid credentials
 */
export const signIn = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError('User not found', 404));
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ApiError('Invalid credentials', 401));
    }

    // Generate a token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return next(error);
  }
};

export const signOut = async (req, res, next) => {
  // Sign out logic can vary based on how you manage sessions or tokens.
  // If you're using JWT, you might not need to do anything server-side,
  // as the token will simply expire after its defined duration.

  res.status(200).json({
    success: true,
    message: 'User signed out successfully',
  });
};
