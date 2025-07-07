// src/components/fcm-token-manager.tsx
'use client';

import { useFcm } from '@/hooks/use-fcm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Copy, BellRing, BellOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from './ui/input';

export function FcmTokenManager() {
  const { fcmToken, notificationPermission } = useFcm();
  const { toast } = useToast();

  const handleCopy = () => {
    if (fcmToken) {
      navigator.clipboard.writeText(fcmToken);
      toast({ title: 'Copied!', description: 'FCM token copied to clipboard.' });
    }
  };

  if (notificationPermission === 'denied') {
    return (
      <Card>
        <CardHeader className="flex-row gap-4 items-center space-y-0">
           <BellOff className="h-8 w-8 text-destructive" />
           <div>
            <CardTitle>Push Notifications Denied</CardTitle>
            <CardDescription>
                You have blocked notifications. To receive updates, please enable them in your browser's site settings.
            </CardDescription>
           </div>
        </CardHeader>
      </Card>
    );
  }

  if (notificationPermission === 'granted' && fcmToken) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Notifications Enabled</CardTitle>
          <CardDescription>
            You're all set to receive push notifications. You can send a test message from the Firebase Console using the token below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            <p className="text-sm font-medium">Your FCM Token:</p>
            <div className="flex gap-2">
                <Input readOnly value={fcmToken} className="truncate bg-muted/50" />
                <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy FCM Token">
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              To test, go to your Firebase project &gt; Engage &gt; Messaging &gt; Create your first campaign. Use this token to send a test message to this device.
            </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Enable Push Notifications</CardTitle>
        <CardDescription>
          Enable push notifications to get real-time updates and reminders from your loved one.
        </CardDescription>
      </CardHeader>
      <CardContent>
          <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg bg-card">
            <BellRing className="w-8 h-8 text-muted-foreground/50 mr-4 animate-pulse" />
            <p className="text-muted-foreground">Waiting for notification permission...</p>
          </div>
      </CardContent>
    </Card>
  );
}
