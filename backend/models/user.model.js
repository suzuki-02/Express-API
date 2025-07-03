import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      minLength: [3, 'Username must be at least 3 characters long'],
      maxLength: [20, 'Username must be at most 20 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        'Please enter a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password must be at least 6 characters long'],
    },
    // verifyOtp: {type: String, default: ''},
    // verifyOtpExpireAt: {type: Number, default: 0},
    // isAccountVerified: {type: Boolean, default: false},
    // resetOtp: {type: String, default: ''},
    // resetOtpExpireAt: {type: Number, default: 0},
  },
  { timestamps: true }
);

// const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default mongoose.model('User', userSchema);
