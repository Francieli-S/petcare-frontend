import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SitterProvider } from '@/context/SitterContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <SitterProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SitterProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
