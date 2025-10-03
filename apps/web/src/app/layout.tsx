import './globals.css';
import { Montserrat } from 'next/font/google';
import Nav from './components/Nav';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans`}>
        <div className="mb-[100px] flex flex-col gap-6">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
