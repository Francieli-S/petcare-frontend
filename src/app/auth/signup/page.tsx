'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '../../../utils/api';

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await apiRequest('/users/register', 'POST', {
        firstName,
        lastName,
        email,
        password,
      });
      if (data) {
        router.push('/auth/signin');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[var(--color-secondary)]'>
      <div className='max-w-md w-full bg-white p-8 shadow-lg rounded-lg'>
        <h1 className='text-3xl font-bold text-[var(--color-primary)] text-center mb-6'>
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='First Name'
              required
              className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]'
            />
          </div>
          <div>
            <input
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Last Name'
              required
              className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]'
            />
          </div>
          <div>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
              className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]'
            />
          </div>
          <div>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
              className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]'
            />
          </div>
          <div>
            <button
              type='submit'
              disabled={loading}
              className='w-full py-3 px-6 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors'
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
