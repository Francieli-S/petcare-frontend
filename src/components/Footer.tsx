// src/components/Footer.tsx
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-white)] border-t border-gray-200 py-4 fixed bottom-0 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} PetCare. All rights reserved.
        </p>
        <div className="social-icons flex space-x-4 mt-2 md:mt-0">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:opacity-80"
          >
            <FaFacebook className="w-6 h-6 text-[var(--color-primary)]" />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:opacity-80"
          >
            <FaTwitter className="w-6 h-6 text-[var(--color-primary)]" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:opacity-80"
          >
            <FaInstagram className="w-6 h-6 text-[var(--color-primary)]" />
          </a>
        </div>
      </div>
    </footer>
  );
}

