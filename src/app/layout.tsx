// src/app/layout.tsx
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SitterProvider } from '@/context/SitterContext';
import '@/app/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[var(--color-secondary)]">
        <AuthProvider>
          <SitterProvider>
            <Navbar />
            {/* Add top padding or margin to offset the fixed navbar */}
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
          </SitterProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

