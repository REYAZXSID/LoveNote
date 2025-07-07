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
      <AlertDialogContent className="max-w-md p-0 overflow-hidden rounded-xl shadow-2xl">
        {notification.image && (
          <div className="relative w-full aspect-video">
            <Image
              src={notification.image}
              alt={notification.title || 'Notification Image'}
              fill
              className="object-cover"
              data-ai-hint="couple celebration"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        <div className="p-6 pt-2 relative">
          <div className={cn(
            "flex items-center justify-center h-16 w-16 bg-background rounded-full shadow-lg",
            notification.image ? "absolute left-1/2 -translate-x-1/2 -top-8" : "relative mx-auto mb-4"
          )}>
             <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                 <BellRing className="h-8 w-8 text-primary animate-bell-ring" />
             </div>
          </div>

          <AlertDialogHeader className={cn("text-center items-center space-y-2", notification.image ? "pt-8" : "pt-0")}>
            <AlertDialogTitle className="font-headline text-2xl md:text-3xl">
                {notification.title || "Notification"}
            </AlertDialogTitle>
            {notification.body && (
                <AlertDialogDescription className="text-base text-muted-foreground leading-relaxed">
                {notification.body}
                </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogAction asChild>
              <Button onClick={handleClose} className="w-full" size="lg">Close</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
