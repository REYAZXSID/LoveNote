'use client';

import { Heart, MoreVertical, Moon, Palette, Images, LayoutDashboard, Calendar, ScrollText } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { FloatingHearts } from './floating-hearts';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: "Today's Note", icon: <Heart className="h-4 w-4" /> },
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: '/gallery', label: 'Gallery', icon: <Images className="h-4 w-4" /> },
  { href: '/calendar', label: 'Calendar', icon: <Calendar className="h-4 w-4" /> },
  { href: '/vows', label: 'Our Vows', icon: <ScrollText className="h-4 w-4" /> },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-auto flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg font-semibold hidden sm:inline-block">Eternal Echoes</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
             {navItems.map(item => (
                <Link key={item.href} href={item.href} className={`transition-colors hover:text-primary ${pathname === item.href ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                    {item.label}
                </Link>
             ))}
          </nav>
          <div className="ml-auto md:ml-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className='md:hidden'>
                    {navItems.map(item => (
                        <DropdownMenuItem key={item.href} asChild>
                             <Link href={item.href} className="flex items-center gap-2">
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                </div>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Palette className="mr-2 h-4 w-4" />
                    <span>Theme</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => setTheme('rose')}>
                        <span className="mr-2 h-4 w-4 rounded-full bg-pink-100 border border-pink-200"></span>
                        <span>Romantic Rose</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme('gold')}>
                        <span className="mr-2 h-4 w-4 rounded-full bg-amber-100 border border-amber-200"></span>
                        <span>Golden Sunshine</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme('ocean')}>
                        <span className="mr-2 h-4 w-4 rounded-full bg-cyan-100 border border-cyan-200"></span>
                        <span>Oceanic Serenity</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme('night')}>
                         <span className="mr-2 h-4 w-4 rounded-full bg-slate-800 border border-slate-700"></span>
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
      <main className="flex-1 container py-4 md:py-8 relative">
        {children}
        <FloatingHearts />
      </main>
    </div>
  );
}
