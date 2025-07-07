// src/components/notification-modal.tsx
'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useNotification } from '@/hooks/use-notification';
import { BellRing } from 'lucide-react';
import Image from 'next/image';

export function NotificationModal() {
  const { notification, hideNotification } = useNotification();

  const handleClose = () => {
    hideNotification();
  };

  if (!notification) {
    return null;
  }

  return (
    <AlertDialog open onOpenChange={handleClose}>
      <AlertDialogContent className="max-w-md">
        {notification.image && (
          <div className="relative w-full h-48 rounded-t-lg overflow-hidden -mt-6 -mx-6 mb-4 border-b">
            <Image
              src={notification.image}
              alt={notification.title || 'Notification Image'}
              layout="fill"
              objectFit="cover"
              data-ai-hint="couple celebration"
            />
          </div>
        )}
        <AlertDialogHeader className="text-center">
            <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                    <BellRing className="h-8 w-8 text-primary animate-bell-ring" />
                </div>
            </div>
          <AlertDialogTitle className="font-headline text-2xl">
            {notification.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-muted-foreground">
            {notification.body}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogAction onClick={handleClose} className="w-full">
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
