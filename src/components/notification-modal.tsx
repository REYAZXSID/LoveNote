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
        <div className="p-6 pt-4">
          <AlertDialogHeader className="text-center items-center space-y-4">
              <div className={cn(
                "p-3 bg-primary/10 rounded-full bg-background border-4 border-background",
                notification.image ? "-mt-12" : "mt-0"
              )}>
                <BellRing className="h-8 w-8 text-primary animate-bell-ring" />
              </div>
            <div className="space-y-1">
                <AlertDialogTitle className="font-headline text-2xl">
                    {notification.title}
                </AlertDialogTitle>
                {notification.body && (
                    <AlertDialogDescription className="text-base text-muted-foreground">
                    {notification.body}
                    </AlertDialogDescription>
                )}
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogAction onClick={handleClose} className="w-full">
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
