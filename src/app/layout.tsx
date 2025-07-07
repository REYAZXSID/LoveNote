import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/providers/app-provider';
import { AppLayout } from '@/components/app-layout';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { NotificationModal } from '@/components/notification-modal';
import { Inter, Lora } from 'next/font/google';

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontLora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

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
      <body className={cn("min-h-screen bg-background font-body antialiased", fontInter.variable, fontLora.variable)}>
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
