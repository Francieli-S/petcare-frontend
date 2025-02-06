import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SitterProvider } from '@/context/SitterContext';
import '@/app/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-[var(--color-secondary)] text-gray-800'>
        <AuthProvider>
          <SitterProvider>
            <Navbar />
            <main className='container mx-auto p-4'>{children}</main>
            <Footer />
          </SitterProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
