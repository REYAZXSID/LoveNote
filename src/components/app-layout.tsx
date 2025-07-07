
'use client';

import { Heart, MoreVertical, Palette, Images, LayoutDashboard, Calendar, ScrollText } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
  { href: '/', label: "Today's Note", icon: <Heart /> },
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
            <Heart className="h-7 w-7 text-primary" />
            <span className="font-headline text-xl font-semibold hidden sm:inline-block">Eternal Echoes</span>
          </Link>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <nav className="hidden md:flex items-center gap-2">
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
                  <MoreVertical className="h-5 w-5" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className='md:hidden'>
                    {navItems.map(item => (
                        <DropdownMenuItem key={item.href} asChild>
                             <Link href={item.href} className="flex items-center gap-3 py-1.5">
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                </div>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Palette />
                    <span>Theme</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
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
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
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
