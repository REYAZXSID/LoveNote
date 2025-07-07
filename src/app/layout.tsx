import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/providers/app-provider';
import { AppLayout } from '@/components/app-layout';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { NotificationModal } from '@/components/notification-modal';

export const metadata: Metadata = {
  title: 'Eternal Echoes',
  description: 'A sanctuary for your love notes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background font-sans")}>
        <AppProviders>
          <AppLayout>
            {children}
          </AppLayout>
          <Toaster />
          <NotificationModal />
        </AppProviders>
      </body>
    </html>
  );
}
