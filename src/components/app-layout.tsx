'use client';

import { Heart, Palette, Images, LayoutDashboard, Calendar, ScrollText, PenSquare } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { FloatingHearts } from './floating-hearts';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: "Today's Note", icon: <PenSquare /> },
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
  { href: '/gallery', label: 'Gallery', icon: <Images /> },
  { href: '/calendar', label: 'Calendar', icon: <Calendar /> },
  { href: '/vows', label: 'Our Vows', icon: <ScrollText /> },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-7 w-7 text-primary animate-heart-pulse" />
            <span className="font-headline text-xl font-semibold hidden sm:inline-block">LoveNote</span>
          </Link>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <nav className="flex items-center gap-1.5">
                {navItems.map(item => (
                    <Tooltip key={item.href}>
                      <TooltipTrigger asChild>
                        <Button
                          asChild
                          variant="outline"
                          size="icon"
                          className={cn(
                            "border-border/60 hover:border-primary/50 hover:bg-accent",
                            pathname === item.href ? 'border-primary/80 bg-primary/10 text-primary' : 'text-muted-foreground'
                          )}
                        >
                            <Link href={item.href}>
                                {item.icon}
                                <span className="sr-only">{item.label}</span>
                            </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                ))}
              </nav>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Palette className="h-5 w-5" />
                  <span className="sr-only">Change Theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 p-2">
                <DropdownMenuLabel className="text-center font-semibold text-base pb-2">Choose a Theme</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <DropdownMenuItem onClick={() => setTheme('rose')} className="h-auto cursor-pointer flex-col gap-1 p-2 focus:bg-accent/50">
                    <div className="w-full h-12 rounded-md bg-[#fbe2e3] border border-[#f5c6cb]"></div>
                    <span className="text-sm pt-1">Romantic Rose</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('gold')} className="h-auto cursor-pointer flex-col gap-1 p-2 focus:bg-accent/50">
                    <div className="w-full h-12 rounded-md bg-[#fef3c7] border border-[#fde68a]"></div>
                    <span className="text-sm pt-1">Golden Sunshine</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('ocean')} className="h-auto cursor-pointer flex-col gap-1 p-2 focus:bg-accent/50">
                    <div className="w-full h-12 rounded-md bg-[#cffafe] border border-[#a5f3fc]"></div>
                    <span className="text-sm pt-1">Oceanic Serenity</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('night')} className="h-auto cursor-pointer flex-col gap-1 p-2 focus:bg-accent/50">
                    <div className="w-full h-12 rounded-md bg-slate-800 border border-slate-700"></div>
                    <span className="text-sm pt-1">Midnight Rose</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8 md:py-12 relative">
        {children}
        <FloatingHearts />
      </main>
    </div>
  );
}
