import './globals.css';
import { Montserrat } from 'next/font/google';
import Header from './components/Header';
import Nav from './components/Nav';
import Providers from './components/Providers';

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
        <div className="flex flex-col gap-6 mb-[100px]">
          <Nav />
          <Header />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
