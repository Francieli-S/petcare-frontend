'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[var(--color-secondary)]'>
      <div className='max-w-md w-full bg-white p-8 shadow-lg rounded-lg'>
        <h2 className='text-3xl font-bold text-[var(--color-primary)] text-center mb-6'>
          Login
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input
              type='email'
              name='email'
              placeholder='Email'
              onChange={handleChange}
              required
              className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]'
            />
          </div>
          <div>
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={handleChange}
              required
              className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]'
            />
          </div>
          <div>
            <button
              type='submit'
              className='w-full py-3 px-6 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
