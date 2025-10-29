import AuthCard from '@/components/auth/AuthCard';
import { useAuthContext } from '@/context/AuthContext';
import { AxiosError } from 'axios';
import { Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
  const { user, updateUser } = useAuthContext();
  const [name, setName] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({
        username: name,
        email,
      });
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Update failed');
      }
    }
  };

  return (
    <AuthCard
      title="Update Profile"
      description="Update your account information"
      buttonText="Update"
      onSubmit={handleSubmit}
      inputs={[
        {
          type: 'text',
          placeholder: 'Username',
          value: name,
          onChange: (e) => setName(e.target.value),
          required: true,
          icon: <User size={16} />,
        },
        {
          type: 'email',
          placeholder: 'Email',
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: true,
          icon: <Mail size={16} />,
        },
      ]}
      footerLink="/dashboard"
      footerNav="Cancel"
    />
  );
};

export default UpdateProfile;
