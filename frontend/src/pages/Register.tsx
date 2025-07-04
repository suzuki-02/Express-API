import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const Register = () => {
  const { register } = useAuthContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Register failed');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          Register Your Account
        </h2>
        <p className="text-center text-sm mb-6">Create your account</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <input
              type="text"
              placeholder="username"
              required
              className="bg-transparent outline-none"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <input
              type="email"
              placeholder="email"
              required
              className="bg-transparent outline-none"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <input
              type="password"
              placeholder="password"
              required
              className="bg-transparent outline-none"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            Sign Up
          </button>

          <p className="text-gray-400 text-center text-xs mt-4">
            Already has an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
