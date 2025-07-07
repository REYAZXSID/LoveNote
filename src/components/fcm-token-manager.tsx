// src/components/fcm-token-manager.tsx
'use client';

import { useFcm } from '@/hooks/use-fcm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Copy, BellRing, BellOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from './ui/input';
import { Switch } from './ui/switch';

export function FcmTokenManager() {
  const { fcmToken, notificationPermission, isMuted, toggleMute } = useFcm();
  const { toast } = useToast();

  const handleCopy = () => {
    if (fcmToken) {
      navigator.clipboard.writeText(fcmToken);
      toast({ title: 'Copied!', description: 'FCM token copied to clipboard.' });
    }
  };

  const isEnabled = notificationPermission === 'granted' && !isMuted;

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

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-4">
          {isEnabled
            ? <BellRing className="h-6 w-6 text-primary" />
            : <BellOff className="h-6 w-6 text-muted-foreground" />
          }
          <div>
            <CardTitle>Push Notifications</CardTitle>
            <CardDescription>
              {notificationPermission !== 'granted'
                ? "Enable to receive updates and reminders."
                : isMuted
                ? "Notifications are currently paused."
                : "You're all set to receive notifications."
              }
            </CardDescription>
          </div>
        </div>
        <Switch
          checked={isEnabled}
          onCheckedChange={toggleMute}
          aria-label="Toggle notifications"
        />
      </CardHeader>
      {isEnabled && fcmToken && (
        <CardContent>
            <p className="text-sm font-medium">Your FCM Token for Testing:</p>
            <div className="flex gap-2 pt-2">
                <Input readOnly value={fcmToken} className="truncate bg-muted/50" />
                <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy FCM Token">
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              To test, go to your Firebase project &gt; Engage &gt; Messaging &gt; Create your first campaign. Use this token to send a test message to this device.
            </p>
        </CardContent>
      )}
    </Card>
  );
}
