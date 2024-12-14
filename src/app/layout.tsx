import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | JAGOWORLD',
    default: 'Home',
  },
  description: 'Next Project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`max-w-screen-sm mx-auto bg-gradient-to-b from-[#f3e8d9] to-[#dcd3c7]`}>
        {children}
      </body>
    </html>
  );
}
