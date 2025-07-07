// src/components/ui/toaster.tsx
"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CheckCircle, AlertTriangle } from "lucide-react"
import Image from "next/image"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, image, ...props }) {
        return (
          <Toast key={id} variant={variant} {...props} className="p-0 overflow-hidden w-full">
            <div className="flex items-center w-full">
              {image && (
                <div className="relative w-24 h-full aspect-square self-stretch">
                  <Image 
                    src={image} 
                    alt={typeof title === 'string' ? title : 'Notification image'} 
                    fill
                    className="object-cover"
                    data-ai-hint="couple celebration"
                  />
                </div>
              )}
              
              <div className="flex items-center flex-grow p-4">
                 {!image && (
                  <div className="pr-4">
                      {variant === 'destructive' ? (
                          <AlertTriangle className="h-6 w-6 text-destructive" />
                      ) : (
                          <CheckCircle className="h-6 w-6 text-primary" />
                      )}
                  </div>
                )}
                <div className="grid gap-1">
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {description && (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
