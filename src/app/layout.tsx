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
      <body className={`max-w-screen-sm mx-auto bg-gradient-to-b from-[#f5ece0] to-[#ddc39f]`}>
        <div className="flex items-center justify-center min-h-screen">{children}</div>
      </body>
    </html>
  );
}
