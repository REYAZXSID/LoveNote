'use client';

import { Heart, Palette, Images, LayoutDashboard, Calendar, ScrollText, PenSquare } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

          <div className="flex items-center gap-1">
            <TooltipProvider>
              <nav className="flex items-center gap-1">
                {navItems.map(item => (
                    <Tooltip key={item.href}>
                      <TooltipTrigger asChild>
                        <Button asChild variant={pathname === item.href ? 'secondary' : 'ghost'} size="icon">
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
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setTheme('rose')}>
                  <div className="mr-2 h-4 w-4 rounded-full bg-[#fbe2e3] border border-[#f5c6cb]"></div>
                  <span>Romantic Rose</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('gold')}>
                   <div className="mr-2 h-4 w-4 rounded-full bg-[#fef3c7] border border-[#fde68a]"></div>
                  <span>Golden Sunshine</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('ocean')}>
                   <div className="mr-2 h-4 w-4 rounded-full bg-[#cffafe] border border-[#a5f3fc]"></div>
                  <span>Oceanic Serenity</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('night')}>
                   <div className="mr-2 h-4 w-4 rounded-full bg-slate-800 border border-slate-700"></div>
                  <span>Midnight Rose</span>
                </DropdownMenuItem>
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
