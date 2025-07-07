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
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

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
      <AlertDialogContent className="max-w-md p-0 overflow-hidden">
        {notification.image && (
          <div className="relative w-full aspect-video">
            <Image
              src={notification.image}
              alt={notification.title || 'Notification Image'}
              fill
              className="object-cover"
              data-ai-hint="couple celebration"
            />
          </div>
        )}
        <div className="p-6 pt-4 relative">
          <div className={cn(
              "absolute left-1/2 -translate-x-1/2 p-3 bg-background rounded-full border-4 border-background shadow-lg",
              notification.image ? "-top-8" : "relative -top-2"
          )}>
            <BellRing className="h-8 w-8 text-primary animate-bell-ring" />
          </div>

          <AlertDialogHeader className="text-center items-center space-y-2 pt-8">
            <AlertDialogTitle className="font-headline text-2xl">
                {notification.title}
            </AlertDialogTitle>
            {notification.body && (
                <AlertDialogDescription className="text-base text-muted-foreground">
                {notification.body}
                </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogAction asChild>
              <Button onClick={handleClose} className="w-full">Close</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
