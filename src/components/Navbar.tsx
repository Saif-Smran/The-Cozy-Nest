"use client";
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '../Asset/logo.png';
import { Moon, Sun } from 'lucide-react';

// Utility: golden ratio constant for potential dynamic calculations (optional future use)
const PHI = 1.618;

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Apply theme to <html>
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.dataset.theme = theme; // DaisyUI respects data-theme
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  }, []);

  const closeOnRoute = useCallback(() => setOpen(false), []);
  useEffect(() => {
    closeOnRoute();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        className="backdrop-blur supports-[backdrop-filter]:bg-base-100/80 bg-base-100/95 dark:bg-base-300/40 border-b border-base-200 dark:border-base-700 shadow-sm"
        aria-label="Main"
      >
        {/* Golden ratio flex distribution: brand ~38.2%, nav/actions ~61.8% */}
  <div className="mx-auto flex max-w-11/12 items-center gap-5 px-5 md:px-8 py-3 md:py-5">
          {/* Brand */}
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/" className="flex items-center gap-3 group" aria-label="The Cozy Nest Home">
              <div className="relative h-10 w-10 md:h-12 md:w-12">
                <Image
                  src={logo}
                  alt="The Cozy Nest Logo"
                  placeholder="blur"
                  className="rounded-xl ring-1 ring-base-300/60 group-hover:ring-primary/60 transition-all"
                />
              </div>
              <span className="font-semibold text-lg md:text-xl tracking-tight">
                The <span className="text-primary">Cozy</span> Nest
              </span>
            </Link>
          </div>

          {/* Desktop Nav (center) */}
            <ul className="hidden lg:flex flex-1 items-center justify-center gap-6 xl:gap-8">
              {navItems.map(item => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md focus:outline-none focus-visible:ring ring-primary/40 ring-offset-2 ring-offset-base-100
                        ${active ? 'text-primary' : 'text-base-content/70 hover:text-primary'}
                      `}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute inset-x-1 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              className="btn btn-sm md:btn-md btn-ghost p-2 md:p-3 h-auto w-auto min-h-0 aspect-square"
              aria-label={theme === 'light' ? 'Activate dark mode' : 'Activate light mode'}
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 md:h-6 md:w-6 text-black" aria-hidden />
              ) : (
                <Sun className="h-5 w-5 md:h-6 md:w-6" aria-hidden />
              )}
            </button>
            <Link
              href="/login"
              className="btn btn-primary btn-sm md:btn-md shadow-sm shadow-primary/20"
            >
              Log In
            </Link>
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden btn btn-sm btn-outline"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(o => !o)}
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1.5">
                <span className={`h-0.5 w-5 rounded bg-current transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}></span>
                <span className={`h-0.5 w-5 rounded bg-current transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`h-0.5 w-5 rounded bg-current transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Panel */}
        <div
          id="mobile-nav"
          className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ease-out border-t border-base-200 dark:border-base-700 bg-base-100/95 backdrop-blur supports-[backdrop-filter]:bg-base-100/80 ${open ? 'max-h-96' : 'max-h-0'}`}
        >
          <ul className="flex flex-col px-5 md:px-8 py-4 gap-2">
            {navItems.map(item => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring ring-primary/40 ring-offset-2 ring-offset-base-100
                      ${active ? 'bg-primary/10 text-primary' : 'hover:bg-base-200 dark:hover:bg-base-300/40 text-base-content/80'}
                    `}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                href="/login"
                className="btn btn-primary btn-sm w-full"
              >
                Log In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
