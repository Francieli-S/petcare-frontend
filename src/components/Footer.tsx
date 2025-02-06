import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='bg-[var(--color-white)] border-t border-gray-200 py-4 mt-8'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
        <p className='text-gray-600'>
          &copy; {new Date().getFullYear()} PetCare. All rights reserved.
        </p>
        <div className='social-icons flex space-x-4 mt-2 md:mt-0'>
          <a
            href='https://www.facebook.com'
            target='_blank'
            rel='noopener noreferrer'
            className='transition-colors hover:text-[var(--color-accent)]'
          >
            <FaFacebook className='w-6 h-6 text-[var(--color-primary)]' />
          </a>
          <a
            href='https://www.twitter.com'
            target='_blank'
            rel='noopener noreferrer'
            className='transition-colors hover:text-[var(--color-accent)]'
          >
            <FaTwitter className='w-6 h-6 text-[var(--color-primary)]' />
          </a>
          <a
            href='https://www.instagram.com'
            target='_blank'
            rel='noopener noreferrer'
            className='transition-colors hover:text-[var(--color-accent)]'
          >
            <FaInstagram className='w-6 h-6 text-[var(--color-primary)]' />
          </a>
        </div>
      </div>
    </footer>
  );
}
