import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import axios from '../utils/Axios';
import type { User } from '../types/types';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('/users');
        setUsers(response.data?.data || []);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <>
      <NavBar />

      <div className="max-w-3xl mx-auto mt-10 bg-transparent p-6 rounded-lg shadow text-white">
        <h1 className="text-3xl font-bold mb-6">Home Page</h1>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          User List
        </h2>

        <ul className="space-y-4">
          {users &&
            users.map((user: User) => (
              <li
                key={user._id}
                className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
              >
                <p className="text-gray-800 font-semibold">
                  Name: {user.username}
                </p>
                <p className="text-gray-600 text-sm">Email: {user.email}</p>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
