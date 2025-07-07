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
import { Button } from './ui/button';

export function NotificationModal() {
  const { notification, hideNotification } = useNotification();

  const handleClose = () => {
    hideNotification();
  };

  if (!notification) {
    return null;
  }
  
  const hasImage = !!notification.image;

  return (
    <AlertDialog open onOpenChange={handleClose}>
      <AlertDialogContent className="w-[90vw] max-w-md p-0 overflow-hidden rounded-xl shadow-2xl">
         <div className="p-6 pt-12 relative">
           <div className="absolute left-1/2 -translate-x-1/2 -top-12 flex items-center justify-center">
             <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center p-1">
               {hasImage ? (
                 <div className="relative h-full w-full rounded-full overflow-hidden shadow-lg">
                   <Image
                     src={notification.image!}
                     alt={notification.title || 'Notification Image'}
                     fill
                     className="object-cover"
                     data-ai-hint="couple celebration"
                     sizes="96px"
                   />
                 </div>
               ) : (
                 <div className="h-full w-full rounded-full bg-background flex items-center justify-center shadow-lg">
                   <BellRing className="h-10 w-10 text-primary animate-bell-ring" />
                 </div>
               )}
             </div>
           </div>
 
           <AlertDialogHeader className="text-center items-center space-y-2 pt-2">
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
