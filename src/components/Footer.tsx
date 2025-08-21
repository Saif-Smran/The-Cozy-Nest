"use client";
import React from 'react';
import Link from 'next/link';
import { Facebook, Github, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-base-200 dark:border-base-700 bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/70 text-base-content/80">
      <div className="mx-auto max-w-11/12  px-5 md:px-8 py-12 grid gap-10 md:gap-12 lg:grid-cols-12">
        {/* Brand / About */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="font-semibold text-lg tracking-tight text-base-content">The <span className="text-primary">Cozy</span> Nest</h3>
          <p className="text-sm leading-relaxed">Curated comfort and quality supplies for pets and their people. We blend thoughtful design with practical function so every corner of your pet's life feels like home.</p>
          <div className="flex gap-3 pt-2">
            <Link href="https://twitter.com" aria-label="Twitter" className="btn btn-sm btn-ghost rounded-full">
              <Twitter className="h-4 w-4" />
            </Link>
            <Link href="https://facebook.com" aria-label="Facebook" className="btn btn-sm btn-ghost rounded-full">
              <Facebook className="h-4 w-4" />
            </Link>
            <Link href="https://github.com" aria-label="GitHub" className="btn btn-sm btn-ghost rounded-full">
              <Github className="h-4 w-4" />
            </Link>
            <Link href="/contact" aria-label="Email" className="btn btn-sm btn-ghost rounded-full">
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>
        {/* Navigation */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-semibold text-sm uppercase tracking-wide text-base-content/70">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-primary transition-colors" href="/products">All Products</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="/products?category=Pet+Food">Food</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="/products?category=Pet+Accessories">Accessories</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="/products?category=Pet+Toys">Toys</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-semibold text-sm uppercase tracking-wide text-base-content/70">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-primary transition-colors" href="/about">About Us</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="/contact">Contact</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="/blog">Blog</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="/careers">Careers</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-semibold text-sm uppercase tracking-wide text-base-content/70">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-primary transition-colors" href="/help">Help Center</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="/shipping">Shipping</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="/returns">Returns</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="/privacy">Privacy</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-semibold text-sm uppercase tracking-wide text-base-content/70">Newsletter</h4>
          <p className="text-sm">Get product updates, curated guides & seasonal picks.</p>
          <form className="join w-full" onSubmit={(e)=>e.preventDefault()}>
            <input type="email" required aria-label="Email address" placeholder="you@example.com" className="input input-sm md:input-md join-item input-bordered w-full" />
            <button type="submit" className="btn btn-sm md:btn-md btn-primary join-item">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-base-200 dark:border-base-700 py-5 text-center text-xs md:text-sm text-base-content/60">
        <div className="mx-auto w-11/12 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-2">
          <p>&copy; {year} The Cozy Nest. All rights reserved.</p>
          <p className="flex gap-3">
            <Link className="hover:text-primary" href="/terms">Terms</Link>
            <span aria-hidden>•</span>
            <Link className="hover:text-primary" href="/privacy">Privacy</Link>
            <span aria-hidden>•</span>
            <Link className="hover:text-primary" href="/cookies">Cookies</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
